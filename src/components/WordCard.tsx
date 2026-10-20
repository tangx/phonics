import { useCallback, useEffect, useRef, useState } from 'react'
import { ActionIcon, Box, Card, Group, Stack, Text, Tooltip, Image } from '@mantine/core'
import type { LetterMark, Syllable, WordEntry } from '../types'
import { playWord } from '../utils/audio'
import { fetchPixabayImage, getCachedImage, isImageSkipped, setCachedImage, skipImage } from '../utils/pixabay'

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

const SYLLABLE_BG: Record<string, string> = {
  '#d64045': 'rgba(214,64,69,0.12)',
  '#1b6ca8': 'rgba(27,108,168,0.12)',
  '#2d8a4e': 'rgba(45,138,78,0.12)',
  '#7b3fa0': 'rgba(123,63,160,0.12)',
}

// ── Letter mark ────────────────────────────────────────────────────────────
function LetterBadge({ text, mark }: { text: string; mark: LetterMark }) {
  const isChanged = mark.type === 'changed'
  return (
    <Tooltip label={mark.note} withArrow multiline maw={220}
      events={{ hover: true, focus: true, touch: true }}>
      <span style={{
        color: isChanged ? '#c2410c' : '#9ca3af',
        textDecoration: isChanged ? 'underline wavy #c2410c' : 'line-through #9ca3af',
        textDecorationThickness: '2px',
        cursor: 'help',
      }}>
        {text}
      </span>
    </Tooltip>
  )
}

function SyllableLetters({ syl }: { syl: Syllable }) {
  if (!syl.marks?.length) {
    return <span style={{ color: syl.color }}>{syl.text}</span>
  }
  const sorted = [...syl.marks].sort(
    (a, b) => syl.text.indexOf(a.letters) - syl.text.indexOf(b.letters),
  )
  const segments: { text: string; mark?: LetterMark }[] = []
  let remaining = syl.text
  for (const mark of sorted) {
    const idx = remaining.indexOf(mark.letters)
    if (idx === -1) continue
    if (idx > 0) segments.push({ text: remaining.slice(0, idx) })
    segments.push({ text: mark.letters, mark })
    remaining = remaining.slice(idx + mark.letters.length)
  }
  if (remaining) segments.push({ text: remaining })
  return (
    <>
      {segments.map((seg, i) =>
        seg.mark
          ? <LetterBadge key={i} text={seg.text} mark={seg.mark} />
          : <span key={i} style={{ color: syl.color }}>{seg.text}</span>
      )}
    </>
  )
}

// ── Syllable chip ──────────────────────────────────────────────────────────
function SyllableChip({ syl }: { syl: Syllable }) {
  const bg = SYLLABLE_BG[syl.color] ?? 'rgba(0,0,0,0.06)'
  return (
    <Stack gap={0} align="center" style={{
      background: bg,
      border: `2px solid ${syl.color}`,
      borderRadius: '1vw',
      padding: 'clamp(6px, 1.2vw, 16px) clamp(8px, 1.5vw, 20px)',
      minWidth: 'clamp(40px, 6vw, 80px)',
    }}>
      <span style={{
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 800,
        fontSize: 'clamp(28px, 5vw, 7vh)',
        lineHeight: 1.1,
        display: 'block',
      }}>
        <SyllableLetters syl={syl} />
      </span>
      <span style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: 'clamp(11px, 1.6vw, 2.2vh)',
        color: syl.color,
        lineHeight: 1.2,
        letterSpacing: '0.2px',
      }}>
        {syl.phonetic}
      </span>
    </Stack>
  )
}

// ── WordCard ───────────────────────────────────────────────────────────────
export default function WordCard({ entry, pixabayKey }: { entry: WordEntry; pixabayKey: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [bouncing, setBouncing] = useState(false)

  const localSrc = entry.image
    ? `/images/${entry.image}`
    : `https://placehold.co/400x400/e8f4ff/1b6ca8?text=${entry.word}`

  const [imgSrc, setImgSrc] = useState<string>(
    () => getCachedImage(entry.word) ?? localSrc
  )
  const [imgLoading, setImgLoading] = useState(false)
  const skipRef = useRef(0)

  const allMarks = entry.syllables.flatMap((s) => s.marks ?? [])

  // 拉取新图的公共函数（自动排除已跳过的）
  const fetchNew = useCallback(async (skipCount: number) => {
    if (!pixabayKey) return
    setImgLoading(true)
    try {
      const skippedUrls = JSON.parse(
        localStorage.getItem(`phonics_img_skip_${entry.word}`) ?? '[]'
      ) as string[]
      const url = await fetchPixabayImage(entry.word, entry.chinese, pixabayKey, skipCount, skippedUrls)
      if (url) {
        setImgSrc(url)
        setCachedImage(entry.word, url)
      }
    } finally {
      setImgLoading(false)
    }
  }, [pixabayKey, entry.word, entry.chinese])

  // 卡片 mount：有 key 且（无缓存 或 缓存已被跳过）时自动拉取
  useEffect(() => {
    if (!pixabayKey) return
    const cached = getCachedImage(entry.word)
    if (cached && !isImageSkipped(entry.word, cached)) return
    let cancelled = false
    setImgLoading(true)
    const skippedUrls = JSON.parse(
      localStorage.getItem(`phonics_img_skip_${entry.word}`) ?? '[]'
    ) as string[]
    fetchPixabayImage(entry.word, entry.chinese, pixabayKey, 0, skippedUrls).then((url) => {
      if (cancelled || !url) return
      setImgSrc(url)
      setCachedImage(entry.word, url)
    }).finally(() => {
      if (!cancelled) setImgLoading(false)
    })
    return () => { cancelled = true }
  }, [entry.word, entry.chinese, pixabayKey])

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    el.animate(
      [
        { transform: 'translateY(28px) scale(0.94)', opacity: 0 },
        { transform: 'translateY(0) scale(1)', opacity: 1 },
      ],
      { duration: 500, easing: SPRING, fill: 'forwards' },
    )
  }, [])

  const handleSpeak = useCallback(() => {
    setBouncing(true)
    playWord(entry.word)
    setTimeout(() => setBouncing(false), 380)
  }, [entry.word])

  const handleRefreshImage = useCallback(async () => {
    if (!pixabayKey || imgLoading) return
    skipRef.current += 1
    await fetchNew(skipRef.current)
  }, [pixabayKey, imgLoading, fetchNew])

  const handleSkipImage = useCallback(async () => {
    if (!pixabayKey || imgLoading) return
    skipImage(entry.word, imgSrc)
    skipRef.current += 1
    await fetchNew(skipRef.current)
  }, [pixabayKey, imgLoading, imgSrc, entry.word, fetchNew])

  const imageEl = (
    <Stack gap={0} align="center" style={{ height: '100%', justifyContent: 'center', position: 'relative' }}>
      {/* 换图 + 跳过 按钮组 */}
      {pixabayKey && (
        <Group gap={4} style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
          <Tooltip label="换一张" withArrow events={{ hover: true, focus: true, touch: true }}>
            <ActionIcon
              size={28} radius="xl" variant="white"
              loading={imgLoading}
              onClick={handleRefreshImage}
              aria-label="换一张图片"
              style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.12)' }}
            >
              🔄
            </ActionIcon>
          </Tooltip>
          <Tooltip label="跳过此图" withArrow events={{ hover: true, focus: true, touch: true }}>
            <ActionIcon
              size={28} radius="xl" variant="white"
              loading={imgLoading}
              onClick={handleSkipImage}
              aria-label="跳过此图片"
              style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.12)' }}
            >
              🚫
            </ActionIcon>
          </Tooltip>
        </Group>
      )}
      <Image
        src={imgSrc}
        alt={entry.chinese}
        fit="contain"
        style={{
          width: 'min(30vw, 50vh)',
          height: 'min(30vw, 50vh)',
          borderRadius: 'clamp(8px, 1.5vw, 20px)',
        }}
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).src =
            `https://placehold.co/400x400/e8f4ff/1b6ca8?text=${entry.word}`
        }}
      />
      <Text style={{
        fontFamily: "'Noto Sans SC', sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(18px, 3vw, 4.5vh)',
        color: '#1a1a2e',
        marginTop: 'clamp(6px, 1vw, 14px)',
      }}>
        {entry.chinese}
      </Text>
    </Stack>
  )

  const wordEl = (
    <Stack gap="clamp(12px, 2vh, 24px)" align="center" justify="center" style={{ flex: 1, minWidth: 0 }}>
      {/* 音节块 横排 */}
      <Group gap="clamp(6px, 1vw, 14px)" align="flex-start" wrap="wrap">
        {entry.syllables.map((syl, i) => (
          <SyllableChip key={i} syl={syl} />
        ))}
      </Group>

      {/* 完整单词 + 发音 */}
      <Group gap="clamp(8px, 1.5vw, 20px)" align="flex-end" wrap="nowrap">
        <Stack gap={2} style={{ minWidth: 0 }}>
          <Group gap="clamp(4px, 0.8vw, 10px)" align="flex-end" wrap="nowrap">
            <Text style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 8vw, 12vh)',
              lineHeight: 1,
              color: '#1a1a2e',
              letterSpacing: '-1px',
              whiteSpace: 'nowrap',
            }}>
              {entry.word}
            </Text>
            <ActionIcon
              size="clamp(28px, 3.5vw, 5vh)"
              radius="xl"
              variant="filled"
              mb="0.4em"
              aria-label={`播放 ${entry.word} 发音`}
              onClick={handleSpeak}
              style={{
                background: '#f5a623',
                color: '#fff',
                transform: bouncing ? 'scale(1.4)' : 'scale(1)',
                transition: `transform 0.22s ${SPRING}`,
                flexShrink: 0,
              }}
            >
              🔊
            </ActionIcon>
          </Group>
          <Text style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(16px, 2.5vw, 3.5vh)',
            color: '#9ca3af',
            letterSpacing: '0.5px',
          }}>
            {entry.phonetic}
          </Text>
        </Stack>
      </Group>

      {/* 字母标注说明 */}
      {allMarks.length > 0 && (
        <Box px="clamp(8px,1vw,14px)" py="clamp(6px,0.8vw,10px)"
          style={{ background: '#f0f4ff', borderRadius: 10 }}>
          <Stack gap={4}>
            {allMarks.map((m, i) => (
              <Text key={i} style={{ fontSize: 'clamp(11px, 1.5vw, 2vh)' }} c="dark.4">
                {m.type === 'changed' ? '〰️ ' : '🔇 '}
                <Text component="span" fw={700}>{m.letters}</Text>：{m.note}
              </Text>
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  )

  return (
    <Card
      ref={cardRef}
      radius="xl"
      shadow="lg"
      p={0}
      style={{ overflow: 'hidden', willChange: 'transform', height: '100%' }}
    >
      {/* 横屏：左字右图 / 竖屏：上图下字 */}
      <Box
        style={{
          display: 'grid',
          height: '100%',
          // 横屏：左60右40；竖屏：上图下字（通过 @media 覆盖）
          gridTemplateColumns: '60fr 40fr',
          gridTemplateRows: '1fr',
          gridTemplateAreas: '"word image"',
        }}
        className="card-layout"
      >
        <Box style={{
          gridArea: 'word',
          padding: 'clamp(16px, 3vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {wordEl}
        </Box>
        <Box style={{
          gridArea: 'image',
          background: '#f0f4ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(12px, 2vw, 28px)',
        }}>
          {imageEl}
        </Box>
      </Box>
    </Card>
  )
}
