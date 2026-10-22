/**
 * 音节展示组件，供 WordCard 和 SightWordCard 共用。
 *
 * 导出：
 *   SyllableChip   — 单个音节块（字母 + 音标）
 *   SyllableRow    — 横排所有音节，含整词完整音标行
 *   PhoneticText   — 纯音标文本（fallback，无音节数据时用）
 */
import { Group, Stack, Text, Tooltip } from '@mantine/core'
import type { LetterMark, Syllable } from '../types'

// ── 常量 ────────────────────────────────────────────────────────────────────

// 音节背景/边框色 → bg（透明度适当加深，让色块更明显）
const SYLLABLE_COLORS: Record<string, { bg: string }> = {
  '#d64045': { bg: 'rgba(214,64,69,0.10)'  },
  '#1b6ca8': { bg: 'rgba(27,108,168,0.10)' },
  '#2d8a4e': { bg: 'rgba(45,138,78,0.10)'  },
  '#7b3fa0': { bg: 'rgba(123,63,160,0.10)' },
}
const FALLBACK_BG = 'rgba(0,0,0,0.06)'

// 全局统一：元音暖红，辅音钢蓝（参考图配色，与音节背景色无关）
const VOWEL_COLOR     = '#c0392b'  // 暖红
const CONSONANT_COLOR = '#5b8db8'  // 钢蓝

// ── Helpers ──────────────────────────────────────────────────────────────────

function isVowelChar(ch: string): boolean {
  return 'aeiou'.includes(ch.toLowerCase())
}

// cluster 首字母是元音（oo, ea, ai, er, ir, or…）→ 元音色；辅音开头（th, sh, ck…）→ 辅音色
function isVowelCluster(letters: string): boolean {
  return letters.length > 0 && 'aeiou'.includes(letters[0].toLowerCase())
}

// y 在音节位置 0 = 辅音（yes, yell）；其他位置 = 元音（happy→py, fly→y）
function charColor(ch: string, posInSyllable: number): string {
  if (ch.toLowerCase() === 'y') return posInSyllable === 0 ? CONSONANT_COLOR : VOWEL_COLOR
  return isVowelChar(ch) ? VOWEL_COLOR : CONSONANT_COLOR
}

// ── LetterBadge ─────────────────────────────────────────────────────────────

function LetterBadge({ text, mark, syllableColor }: {
  text: string
  mark: LetterMark
  syllableColor: string
}) {
  const isCluster = mark.type === 'cluster'
  const isChanged = mark.type === 'changed'
  const isSilent  = mark.type === 'silent' || mark.type === 'silent-e'
  const isSelfAffected = mark.affectedVowel !== undefined && mark.affectedVowel === mark.letters

  if (isCluster) {
    const clusterColor = isVowelCluster(mark.letters) ? VOWEL_COLOR : CONSONANT_COLOR
    return (
      <Tooltip label={mark.note} withArrow multiline maw={220}
        events={{ hover: true, focus: true, touch: true }}>
        <span style={{ color: clusterColor, cursor: 'help' }}>{text}</span>
      </Tooltip>
    )
  }

  // changed + self-affected (e.g. y→/aɪ/): overline AND wavy underline combined
  if (isChanged && isSelfAffected) {
    return (
      <Tooltip label={mark.note} withArrow multiline maw={220}
        events={{ hover: true, focus: true, touch: true }}>
        <span style={{ color: '#c2410c', textDecoration: 'overline', textDecorationThickness: '2px', cursor: 'help' }}>
          <span style={{ textDecoration: 'underline wavy #c2410c', textDecorationThickness: '2px' }}>
            {text}
          </span>
        </span>
      </Tooltip>
    )
  }

  void syllableColor  // kept for Tooltip key identification if needed

  return (
    <Tooltip label={mark.note} withArrow multiline maw={220}
      events={{ hover: true, focus: true, touch: true }}>
      <span style={{
        color: isChanged ? '#c2410c' : '#9ca3af',
        textDecoration: isSilent ? 'line-through #9ca3af' : 'underline wavy #c2410c',
        textDecorationThickness: '2px',
        cursor: 'help',
      }}>
        {text}
      </span>
    </Tooltip>
  )
}

// ── SyllableLetters ─────────────────────────────────────────────────────────

function renderUnmarkedSegment(
  segText: string,
  affectedVowels: Set<string>,
  segStartInSyllable: number,
): React.ReactNode {
  return (
    <>
      {segText.split('').map((ch, idx) => {
        const sylPos = segStartInSyllable + idx
        if (affectedVowels.has(ch)) {
          return (
            <span key={idx} style={{ color: '#c2410c', textDecoration: 'overline', textDecorationThickness: '2px' }}>{ch}</span>
          )
        }
        return (
          <span key={idx} style={{ color: charColor(ch, sylPos) }}>{ch}</span>
        )
      })}
    </>
  )
}

function SyllableLetters({ syl }: { syl: Syllable }) {
  if (!syl.marks?.length) {
    return (
      <>
        {syl.text.split('').map((ch, idx) => (
          <span key={idx} style={{ color: charColor(ch, idx) }}>{ch}</span>
        ))}
      </>
    )
  }

  const externallyAffectedVowels = new Set(
    (syl.marks ?? [])
      .filter(m => m.affectedVowel && m.affectedVowel !== m.letters)
      .map(m => m.affectedVowel!),
  )

  const sorted = [...syl.marks].sort(
    (a, b) => syl.text.indexOf(a.letters) - syl.text.indexOf(b.letters),
  )
  const segments: { text: string; mark?: LetterMark; startOffset: number }[] = []
  let remaining = syl.text
  let charOffset = 0

  for (const mark of sorted) {
    const idx = remaining.indexOf(mark.letters)
    if (idx === -1) continue
    if (idx > 0) {
      segments.push({ text: remaining.slice(0, idx), startOffset: charOffset })
      charOffset += idx
    }
    segments.push({ text: mark.letters, mark, startOffset: charOffset })
    charOffset += mark.letters.length
    remaining = remaining.slice(idx + mark.letters.length)
  }
  if (remaining) segments.push({ text: remaining, startOffset: charOffset })

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
              <LetterBadge
                text={seg.text}
                mark={seg.mark}
                syllableColor={syl.color}
              />
            </span>
          )
        }
        return (
          <span key={i}>
            {dot}
            {renderUnmarkedSegment(seg.text, externallyAffectedVowels, seg.startOffset)}
          </span>
        )
      })}
    </>
  )
}

// ── buildPhoneticWithDots ───────────────────────────────────────────────────

function buildPhoneticWithDots(syl: Syllable): React.ReactNode {
  const clusters = (syl.marks ?? []).filter(m => m.type === 'cluster' && m.phonetic)
  if (!clusters.length) return syl.phonetic

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
    parts.push(<span key={frag} style={{ color: syl.color }}>{frag}</span>)
    rem = rem.slice(idx + frag.length)
    if (rem.length > 0) parts.push(dot)
  }
  if (rem) parts.push(<span key="tail" style={{ color: syl.color }}>{rem}</span>)

  return <span>/{parts}/</span>
}

// ── SyllableChip ────────────────────────────────────────────────────────────

export type SyllableChipSize = 'lg' | 'md' | 'sm'

const CHIP_SIZES: Record<SyllableChipSize, {
  wordFontSize: string
  phoneticFontSize: string
  padding: string
  minWidth: string
  borderRadius: string
}> = {
  lg: {
    wordFontSize: 'clamp(28px, 5vw, 7vh)',
    phoneticFontSize: 'clamp(11px, 1.6vw, 2.2vh)',
    padding: 'clamp(6px, 1.2vw, 16px) clamp(8px, 1.5vw, 20px)',
    minWidth: 'clamp(40px, 6vw, 80px)',
    borderRadius: '1vw',
  },
  md: {
    wordFontSize: 'clamp(20px, 3.5vw, 42px)',
    phoneticFontSize: 'clamp(10px, 1.3vw, 16px)',
    padding: 'clamp(4px, 0.8vw, 10px) clamp(6px, 1vw, 14px)',
    minWidth: 'clamp(32px, 4.5vw, 56px)',
    borderRadius: '10px',
  },
  sm: {
    wordFontSize: 'clamp(14px, 2.2vw, 26px)',
    phoneticFontSize: 'clamp(9px, 1vw, 13px)',
    padding: '4px 8px',
    minWidth: '28px',
    borderRadius: '8px',
  },
}

export function SyllableChip({ syl, size = 'lg' }: { syl: Syllable; size?: SyllableChipSize }) {
  const bg = (SYLLABLE_COLORS[syl.color] ?? { bg: FALLBACK_BG }).bg
  const s = CHIP_SIZES[size]

  return (
    <Stack gap={2} align="center" style={{
      background: bg,
      border: `2px solid ${syl.color}`,
      borderRadius: s.borderRadius,
      padding: s.padding,
      minWidth: s.minWidth,
    }}>
      <span style={{
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 800,
        fontSize: s.wordFontSize,
        lineHeight: 1.1,
        display: 'block',
      }}>
        <SyllableLetters syl={syl} />
      </span>
      <span style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: s.phoneticFontSize,
        color: syl.color,
        lineHeight: 1.2,
        letterSpacing: '0.2px',
      }}>
        {buildPhoneticWithDots(syl)}
      </span>
    </Stack>
  )
}

// ── SyllableRow ─────────────────────────────────────────────────────────────
// 横排所有音节块 + 下方整词完整音标

export function SyllableRow({ syllables, phonetic, size = 'lg' }: {
  syllables: Syllable[]
  phonetic: string      // 完整音标，如 /ˈhæpi/
  size?: SyllableChipSize
}) {
  return (
    <Stack gap={6} align="center">
      <Group gap="clamp(6px, 1vw, 14px)" align="flex-start" wrap="wrap" justify="center">
        {syllables.map((syl, i) => (
          <SyllableChip key={i} syl={syl} size={size} />
        ))}
      </Group>
      <Text style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: size === 'lg' ? 'clamp(16px, 2.5vw, 3.5vh)' : size === 'md' ? 'clamp(13px, 1.8vw, 22px)' : 'clamp(11px, 1.4vw, 16px)',
        color: '#9ca3af',
        letterSpacing: '0.5px',
      }}>
        {phonetic}
      </Text>
    </Stack>
  )
}

// ── PhoneticText ────────────────────────────────────────────────────────────
// 无音节数据时的纯音标 fallback

export function PhoneticText({ phonetic, size = 'lg' }: {
  phonetic: string
  size?: SyllableChipSize
}) {
  return (
    <Text style={{
      fontFamily: 'Nunito, sans-serif',
      fontSize: size === 'lg' ? 'clamp(22px, 4vw, 52px)' : size === 'md' ? 'clamp(16px, 2.8vw, 32px)' : 'clamp(12px, 1.8vw, 20px)',
      color: '#9ca3af',
      letterSpacing: '1px',
    }}>
      {phonetic}
    </Text>
  )
}
