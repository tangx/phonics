import { useCallback, useEffect, useRef, useState } from 'react'
import { ActionIcon, Box, Card, Group, Popover, Stack, Tabs, Text, Tooltip, UnstyledButton } from '@mantine/core'
import {
  IconVolume,
  IconRefresh,
  IconAbc,
  IconMessageCircle,
  IconLink,
  IconVolumeOff,
  IconWaveSine,
  IconHelpCircle,
} from '@tabler/icons-react'
import type { LetterMark, Syllable, WordEntry } from '../types'
import { playWord } from '../utils/audio'
import { getSentencesForWord, nextSentence, pickSentence } from '../utils/sentences'
import { loadVoiceConfigs, speakWithConfig, SLOT_META } from '../pages/settings/voice'
import WordImage from './WordImage'

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

const SYLLABLE_BG: Record<string, string> = {
  '#d64045': 'rgba(214,64,69,0.12)',
  '#1b6ca8': 'rgba(27,108,168,0.12)',
  '#2d8a4e': 'rgba(45,138,78,0.12)',
  '#7b3fa0': 'rgba(123,63,160,0.12)',
}

// ── Letter mark ────────────────────────────────────────────────────────────
function LetterBadge({ text, mark, syllableColor }: { text: string; mark: LetterMark; syllableColor: string }) {
  const isCluster = mark.type === 'cluster'
  const isChanged = mark.type === 'changed'
  const isSilent = mark.type === 'silent' || mark.type === 'silent-e'

  // cluster：只用音节颜色，无背景框
  if (isCluster) {
    return (
      <Tooltip label={mark.note} withArrow multiline maw={220}
        events={{ hover: true, focus: true, touch: true }}>
        <span style={{ color: syllableColor, cursor: 'help' }}>
          {text}
        </span>
      </Tooltip>
    )
  }

  return (
    <Tooltip label={mark.note} withArrow multiline maw={220}
      events={{ hover: true, focus: true, touch: true }}>
      <span style={{
        color: isChanged ? '#c2410c' : '#9ca3af',
        textDecoration: isSilent
          ? 'line-through #9ca3af'
          : 'underline wavy #c2410c',
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

  // 把音节文字按 marks 切成 segment 数组
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

  // cluster 字母用背景色块，其余直接渲染；segment 之间加中点分隔
  return (
    <>
      {segments.map((seg, i) => {
        const dot = i > 0
          ? <span key={`dot-${i}`} style={{ color: `${syl.color}80`, margin: '0 0.05em', fontSize: '0.7em', verticalAlign: 'middle' }}>·</span>
          : null
        if (seg.mark) {
          return (
            <span key={i}>
              {dot}
              <LetterBadge text={seg.text} mark={seg.mark} syllableColor={syl.color} />
            </span>
          )
        }
        // 普通字母段：如果多于1个字符也加点分隔（如 "m" 和 "th" 之间）
        return (
          <span key={i}>
            {dot}
            <span style={{ color: syl.color }}>{seg.text}</span>
          </span>
        )
      })}
    </>
  )
}

// 生成带点分隔的音标行：cluster 片段用音节色，其余用 dimmed
function buildPhoneticWithDots(syl: Syllable): React.ReactNode {
  const clusters = (syl.marks ?? []).filter(m => m.type === 'cluster' && m.phonetic)
  if (!clusters.length) return syl.phonetic

  // 把整体音标按 cluster 的 phonetic 片段拆分
  const dot = <span style={{ color: `${syl.color}60`, margin: '0 0.15em' }}>·</span>
  const raw = syl.phonetic.replace(/^\/|\/$/g, '')
  const parts: React.ReactNode[] = []
  let rem = raw

  for (const mark of clusters) {
    const frag = mark.phonetic!.replace(/^\/|\/$/g, '')
    const idx = rem.indexOf(frag)
    if (idx === -1) continue
    if (idx > 0) {
      parts.push(<span key={`pre-${frag}`} style={{ color: syl.color }}>{rem.slice(0, idx)}</span>)
      parts.push(dot)
    }
    parts.push(
      <span key={frag} style={{ color: syl.color }}>{frag}</span>
    )
    rem = rem.slice(idx + frag.length)
    if (rem.length > 0) parts.push(dot)
  }
  if (rem) parts.push(<span key="tail" style={{ color: syl.color }}>{rem}</span>)

  return <span>/{parts}/</span>
}

// ── Syllable chip ──────────────────────────────────────────────────────────
function SyllableChip({ syl }: { syl: Syllable }) {
  const bg = SYLLABLE_BG[syl.color] ?? 'rgba(0,0,0,0.06)'
  return (
    <Stack gap={2} align="center" style={{
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
        {buildPhoneticWithDots(syl)}
      </span>
    </Stack>
  )
}

// ── WordCard ───────────────────────────────────────────────────────────────
export default function WordCard({ entry, pixabayKey }: { entry: WordEntry; pixabayKey: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [bouncing, setBouncing] = useState(false)

  const allMarks = entry.syllables.flatMap((s) => s.marks ?? [])

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

  // ── 例句逻辑 ──────────────────────────────────────────────────────────────
  const wordSentences = getSentencesForWord(entry.word)
  const [sentenceSeed, setSentenceSeed] = useState(() => Date.now())
  const currentSentence = pickSentence(wordSentences, sentenceSeed)

  const handleNextSentence = useCallback(() => {
    setSentenceSeed(prev => {
      const next = nextSentence(wordSentences, currentSentence?.id ?? '', prev + 1)
      // 找到下一句在列表中的位置作为新 seed
      const idx = wordSentences.findIndex(s => s.id === next?.id)
      return idx >= 0 ? idx : prev + 1
    })
  }, [wordSentences, currentSentence])

  const wordEl = (
    <Stack gap={0} align="center" justify="center" style={{ flex: 1, minWidth: 0, height: '100%' }}>
      {/* 音节块 横排 */}
      <Group gap="clamp(6px, 1vw, 14px)" align="flex-start" wrap="wrap" mb="clamp(8px,1.5vh,20px)">
        {entry.syllables.map((syl, i) => (
          <SyllableChip key={i} syl={syl} />
        ))}
      </Group>

      {/* 完整单词 + 发音 */}
      <Group gap="clamp(8px, 1.5vw, 20px)" align="flex-end" wrap="nowrap" mb="clamp(4px,0.8vh,10px)">
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
              <IconVolume size="60%" stroke={1.8} />
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

      {/* Tabs：标注 / 句子 */}
      <Tabs defaultValue={wordSentences.length > 0 ? 'sentences' : 'marks'} radius="md" style={{ width: '100%' }}>
        <Tabs.List>
          {wordSentences.length > 0 && (
            <Tabs.Tab value="sentences" leftSection={<IconMessageCircle size={14} stroke={1.8} />} style={{ fontSize: 'clamp(11px, 1.4vw, 2vh)' }}>例句</Tabs.Tab>
          )}
          <Tabs.Tab value="marks" leftSection={<IconAbc size={14} stroke={1.8} />} style={{ fontSize: 'clamp(11px, 1.4vw, 2vh)' }}>拼读</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="marks" pt="xs">
          {allMarks.length > 0 ? (
            <Box px="clamp(8px,1vw,14px)" py="clamp(6px,0.8vw,10px)"
              style={{ background: '#f0f4ff', borderRadius: 10 }}>
              <Stack gap={4}>
                {allMarks.map((m, i) => (
                  <Text key={i} style={{ fontSize: 'clamp(11px, 1.5vw, 2vh)' }} c="dark.4">
                  {m.type === 'cluster'
                    ? <IconLink size={12} stroke={1.8} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                    : m.type === 'changed'
                    ? <IconWaveSine size={12} stroke={1.8} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                    : <IconVolumeOff size={12} stroke={1.8} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                  }
                    <Text component="span" fw={700}>{m.letters}</Text>：{m.note}
                  </Text>
                ))}
              </Stack>
            </Box>
          ) : (
            <Text size="xs" c="dimmed" ta="center" py="xs">规则发音，无特殊标注</Text>
          )}
        </Tabs.Panel>

        {wordSentences.length > 0 && currentSentence && (
          <Tabs.Panel value="sentences" pt="xs">
            <Box px="clamp(8px,1vw,14px)" py="clamp(6px,0.8vw,10px)"
              style={{ background: '#f0f4ff', borderRadius: 10 }}>

              {/* 句子文本 */}
              <Text style={{ fontSize: 'clamp(12px, 1.8vw, 2.2vh)', fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#1a1a2e', marginBottom: 4 }}>
                {currentSentence.en.split(new RegExp(`(\b${entry.word}\b)`, 'i')).map((part, j) =>
                  part.toLowerCase() === entry.word.toLowerCase()
                    ? <span key={j} style={{ color: '#1b6ca8', fontWeight: 800 }}>{part}</span>
                    : part
                )}
              </Text>
              <Text style={{ fontSize: 'clamp(11px, 1.5vw, 1.8vh)', color: '#6b7280', marginBottom: 8 }}>
                {currentSentence.zh}
              </Text>

              {/* 底部操作行 */}
              <Group justify="space-between" align="center" gap={8} mt={6}>
                {/* 左：喇叭 + 激活语音列表 + 系统音 */}
                <Group gap={8} align="center">
                  <IconVolume size={18} stroke={1.8} style={{ color: '#9ca3af', flexShrink: 0 }} />
                  {Object.values(loadVoiceConfigs())
                    .filter(c => c.active)
                    .map(c => {
                      const meta = SLOT_META[c.slot]
                      return (
                        <UnstyledButton
                          key={c.slot}
                          onClick={() => speakWithConfig(currentSentence.en, c)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            padding: '5px 12px', borderRadius: 20,
                            background: `${meta.color}15`,
                            fontSize: 13, color: meta.color,
                            fontFamily: 'Noto Sans SC, sans-serif',
                            fontWeight: 500,
                            transition: 'background 0.12s',
                            minHeight: 30,
                          }}
                        >
                          <img src={meta.avatar} alt={meta.label} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                          {meta.label}
                        </UnstyledButton>
                      )
                    })
                  }
                  {[{ label: '0.5x', rate: 0.5 }, { label: '0.8x', rate: 0.8 }, { label: '1x', rate: 1 }].map(({ label, rate }) => (
                    <UnstyledButton
                      key={label}
                      onClick={() => {
                        if (!('speechSynthesis' in window)) return
                        window.speechSynthesis.cancel()
                        const utter = new SpeechSynthesisUtterance(currentSentence.en)
                        utter.lang = 'en-US'
                        utter.rate = rate
                        window.speechSynthesis.speak(utter)
                      }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '5px 12px', borderRadius: 20,
                        background: 'rgba(100,100,100,0.10)',
                        fontSize: 13, color: '#555',
                        fontFamily: 'Noto Sans SC, sans-serif',
                        fontWeight: 500,
                        minHeight: 30,
                      }}
                    >
                      {label}
                    </UnstyledButton>
                  ))}
                </Group>

                {/* 右：换一句 */}
                <Tooltip label="换一句" withArrow events={{ hover: true, focus: true, touch: true }}>
                  <ActionIcon size={30} variant="subtle" radius="xl"
                    onClick={handleNextSentence}
                    style={{ color: '#9ca3af' }}
                    aria-label="换一句"
                  >
                    <IconRefresh size={18} stroke={1.8} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Box>
          </Tabs.Panel>
        )}
      </Tabs>
    </Stack>
  )

  const SYLLABLE_LEGEND = [
    { color: '#d64045', label: '第1音节' },
    { color: '#1b6ca8', label: '第2音节' },
    { color: '#2d8a4e', label: '第3音节' },
    { color: '#7b3fa0', label: '第4音节' },
  ]

  return (
    <Card
      ref={cardRef}
      radius="xl"
      shadow="lg"
      p={0}
      style={{ overflow: 'hidden', willChange: 'transform', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      {/* ? 音节图例 Popover，左上角 */}
      <Box style={{ position: 'absolute', top: 8, left: 8, zIndex: 10 }}>
        <Popover position="bottom-start" withArrow shadow="md" radius="md">
          <Popover.Target>
            <ActionIcon
              variant="subtle"
              size="sm"
              radius="xl"
              aria-label="音节说明"
              style={{ color: '#9ca3af' }}
            >
              <IconHelpCircle size={16} stroke={1.5} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack gap={6} p={4}>
              <Text size="xs" fw={600} c="dimmed" mb={2}>音节颜色说明</Text>
              {SYLLABLE_LEGEND.map(item => (
                <Group key={item.label} gap={8}>
                  <Box style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <Text size="sm">{item.label}</Text>
                </Group>
              ))}
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Box>

      {/* 横屏：左字右图 / 竖屏：上图下字 */}
      <Box
        style={{
          display: 'grid',
          flex: 1,
          minHeight: 0,
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
          <WordImage entry={entry} pixabayKey={pixabayKey} />
        </Box>
      </Box>
    </Card>
  )
}
