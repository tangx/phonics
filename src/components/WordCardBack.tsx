import { useCallback, useState } from 'react'
import {
  ActionIcon, Box, Group, Popover, ScrollArea, Stack,
  Tabs, Text, Tooltip, UnstyledButton,
} from '@mantine/core'
import {
  IconAbc, IconHelpCircle, IconLink, IconMessageCircle,
  IconRefresh, IconVolume, IconVolumeOff, IconWaveSine,
} from '@tabler/icons-react'
import type { Sentence, SightWordSentence, SightSentenceLevel, UnifiedEntry } from '../types'
import { playWord } from '../utils/audio'
import { loadVoiceConfigs, speakWithConfig, SLOT_META } from '../pages/settings/voice'
import WordImage from './WordImage'

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

const LEVEL_META: Record<SightSentenceLevel, { color: string; label: string }> = {
  1: { color: '#2d8a4e', label: 'L1' },
  2: { color: '#1b6ca8', label: 'L2' },
  3: { color: '#d9480f', label: 'L3' },
  4: { color: '#7b3fa0', label: 'L4' },
  5: { color: '#c92a2a', label: 'L5' },
}

const SYLLABLE_LEGEND = [
  { color: '#d64045', label: '第1音节' },
  { color: '#1b6ca8', label: '第2音节' },
  { color: '#2d8a4e', label: '第3音节' },
  { color: '#7b3fa0', label: '第4音节' },
]

// 判断是否为 SightWordSentence（有 level 字段）
function isSightSentence(s: Sentence | SightWordSentence): s is SightWordSentence {
  return 'level' in s
}

export interface WordCardBackProps {
  entry: UnifiedEntry
  sentences?: (Sentence | SightWordSentence)[]
  pixabayKey?: string
  /** 卡片颜色（用于高亮目标词） */
  color?: string
  /** SightWords 背面：显示翻回去按钮和已掌握按钮 */
  onFlipBack?: () => void
  mastered?: boolean
  onToggleMastered?: () => void
}

export default function WordCardBack({
  entry,
  sentences = [],
  pixabayKey,
  color = '#1b6ca8',
  onFlipBack,
  mastered,
  onToggleMastered,
}: WordCardBackProps) {
  const [bouncing, setBouncing] = useState(false)
  const [sentenceSeed, setSentenceSeed] = useState(0)

  const currentSentence = sentences.length ? sentences[sentenceSeed % sentences.length] : null

  const handleSpeak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setBouncing(true)
    playWord(entry.word)
    setTimeout(() => setBouncing(false), 380)
  }, [entry.word])

  const handleNextSentence = useCallback(() => {
    setSentenceSeed(s => s + 1)
  }, [])

  function highlightWord(text: string) {
    const parts = text.split(new RegExp(`(\\b${entry.word}\\b)`, 'i'))
    return parts.map((part, i) =>
      part.toLowerCase() === entry.word.toLowerCase()
        ? <span key={i} style={{ color, fontWeight: 800 }}>{part}</span>
        : part
    )
  }

  const allMarks = (entry.syllables ?? []).flatMap(s => s.marks ?? [])

  // ── SightWords 背面（onFlipBack 存在时使用此布局） ───────────────────
  if (onFlipBack) {
    return (
      <Box style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        padding: 'clamp(16px, 3vw, 32px)', overflow: 'hidden',
      }}>
        {/* 顶部：单词 + 发音 + 中文 */}
        <Group align="flex-end" gap="clamp(8px, 1.5vw, 16px)" mb="clamp(10px, 1.5vh, 16px)" style={{ flexShrink: 0 }}>
          <Text style={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 900,
            fontSize: 'clamp(32px, 6vw, 60px)', lineHeight: 1, color: '#1a1a2e',
          }}>
            {entry.word}
          </Text>
          <UnstyledButton
            onClick={handleSpeak}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 'clamp(32px, 4vw, 48px)', height: 'clamp(32px, 4vw, 48px)',
              borderRadius: '50%', background: '#f5a623', color: 'white',
              boxShadow: '0 3px 8px rgba(245,166,35,0.35)',
              transform: bouncing ? 'scale(1.4)' : 'scale(1)',
              transition: `transform 0.22s ${SPRING}`, flexShrink: 0, marginBottom: 4,
            }}
            aria-label={`播放 ${entry.word}`}
          >
            <IconVolume size="45%" stroke={1.8} />
          </UnstyledButton>
          <Text style={{
            fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 700,
            fontSize: 'clamp(16px, 2.8vw, 32px)', color, marginBottom: 4,
          }}>
            {entry.chinese}
          </Text>
        </Group>

        {/* 例句列表 */}
        <Box style={{ flex: 1, minHeight: 0 }}>
          {sentences.length === 0 ? (
            <Box style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text size="sm" c="dimmed">暂无例句</Text>
            </Box>
          ) : (
            <ScrollArea h="100%" scrollbarSize={4}>
              <Box style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)' }}>
                {sentences.map(s => {
                  const levelColor = isSightSentence(s) ? LEVEL_META[s.level].color : color
                  const levelLabel = isSightSentence(s) ? LEVEL_META[s.level].label : null
                  return (
                    <Box key={s.id} style={{
                      background: 'white', borderRadius: 12,
                      padding: 'clamp(8px, 1.2vw, 14px)',
                      border: `1.5px solid ${levelColor}20`,
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                    }}>
                      {levelLabel && (
                        <Box style={{ flexShrink: 0, paddingTop: 2 }}>
                          <Box style={{
                            display: 'inline-block', padding: '1px 6px', borderRadius: 4,
                            background: `${levelColor}18`, color: levelColor,
                            fontWeight: 700, fontSize: 11, border: `1px solid ${levelColor}30`,
                          }}>
                            {levelLabel}
                          </Box>
                        </Box>
                      )}
                      <Box style={{ flex: 1, minWidth: 0 }}>
                        <Text style={{
                          fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(13px, 1.8vw, 20px)',
                          fontWeight: 600, color: '#1a1a2e', lineHeight: 1.5, marginBottom: 2,
                        }}>
                          {highlightWord(s.en)}
                        </Text>
                        <Text style={{
                          fontFamily: "'Noto Sans SC', sans-serif", fontSize: 'clamp(11px, 1.4vw, 15px)',
                          color: '#6b7280', lineHeight: 1.4,
                        }}>
                          {s.zh}
                        </Text>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </ScrollArea>
          )}
        </Box>

        {/* 底部操作栏 */}
        <Group justify="space-between" align="center" mt="clamp(10px, 1.5vh, 16px)" style={{ flexShrink: 0 }}>
          <UnstyledButton
            onClick={onFlipBack}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 20, background: '#f1f3f5',
              fontSize: 'clamp(12px, 1.4vw, 15px)', color: '#6b7280',
              fontFamily: "'Noto Sans SC', sans-serif",
            }}
          >
            <IconRefresh size={14} stroke={1.8} />
            翻回去
          </UnstyledButton>
          {onToggleMastered && (
            <UnstyledButton
              onClick={e => { e.stopPropagation(); onToggleMastered() }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: 'clamp(8px, 1.2vh, 12px) clamp(16px, 2.5vw, 28px)',
                borderRadius: 50,
                background: mastered ? '#2d8a4e' : 'white',
                border: `2px solid ${mastered ? '#2d8a4e' : '#d1d5db'}`,
                boxShadow: mastered ? '0 4px 12px rgba(45,138,78,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                fontSize: 'clamp(13px, 1.6vw, 17px)',
                color: mastered ? 'white' : '#374151',
                fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 700,
                transition: 'all 0.2s',
              }}
            >
              <svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="none"
                stroke={mastered ? 'white' : '#9ca3af'} strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {mastered ? '已掌握 ✓' : '已掌握'}
            </UnstyledButton>
          )}
        </Group>
      </Box>
    )
  }

  // ── BookPage / Modal 标准布局（Tabs：例句 + 拼读） ───────────────────
  return (
    <Stack gap={0} align="center" justify="center" style={{ flex: 1, minWidth: 0, height: '100%' }}>
      {/* 完整单词 + 音标 + 发音按钮 */}
      <Group gap="clamp(8px, 1.5vw, 20px)" align="flex-end" wrap="nowrap" mb="clamp(4px,0.8vh,10px)">
        <Stack gap={2} style={{ minWidth: 0 }}>
          <Group gap="clamp(4px, 0.8vw, 10px)" align="flex-end" wrap="nowrap">
            <Text style={{
              fontFamily: 'Nunito, sans-serif', fontWeight: 800,
              fontSize: 'clamp(40px, 8vw, 12vh)', lineHeight: 1, color: '#1a1a2e',
              letterSpacing: '-1px', whiteSpace: 'nowrap',
            }}>
              {entry.word}
            </Text>
            <ActionIcon
              size="clamp(28px, 3.5vw, 5vh)" radius="xl" variant="filled" mb="0.4em"
              aria-label={`播放 ${entry.word} 发音`} onClick={handleSpeak}
              style={{
                background: '#f5a623', color: '#fff',
                transform: bouncing ? 'scale(1.4)' : 'scale(1)',
                transition: `transform 0.22s ${SPRING}`, flexShrink: 0,
              }}
            >
              <IconVolume size="60%" stroke={1.8} />
            </ActionIcon>
          </Group>
          {entry.phonetic && (
            <Text style={{
              fontFamily: 'Nunito, sans-serif', fontSize: 'clamp(16px, 2.5vw, 3.5vh)',
              color: '#9ca3af', letterSpacing: '0.5px',
            }}>
              {entry.phonetic}
            </Text>
          )}
        </Stack>
      </Group>

      {/* 音节图例 Popover */}
      {entry.syllables && entry.syllables.length > 1 && (
        <Box style={{ alignSelf: 'flex-start', marginBottom: 4 }}>
          <Popover position="bottom-start" withArrow shadow="md" radius="md">
            <Popover.Target>
              <ActionIcon variant="subtle" size="sm" radius="xl" aria-label="音节说明" style={{ color: '#9ca3af' }}>
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
      )}

      {/* Tabs：例句 / 拼读 */}
      <Tabs defaultValue={sentences.length > 0 ? 'sentences' : 'marks'} radius="md" style={{ width: '100%' }}>
        <Tabs.List>
          {sentences.length > 0 && (
            <Tabs.Tab value="sentences" leftSection={<IconMessageCircle size={14} stroke={1.8} />}
              style={{ fontSize: 'clamp(11px, 1.4vw, 2vh)' }}>例句</Tabs.Tab>
          )}
          <Tabs.Tab value="marks" leftSection={<IconAbc size={14} stroke={1.8} />}
            style={{ fontSize: 'clamp(11px, 1.4vw, 2vh)' }}>拼读</Tabs.Tab>
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

        {sentences.length > 0 && currentSentence && (
          <Tabs.Panel value="sentences" pt="xs">
            <Box px="clamp(8px,1vw,14px)" py="clamp(6px,0.8vw,10px)"
              style={{ background: '#f0f4ff', borderRadius: 10 }}>
              <Text style={{ fontSize: 'clamp(12px, 1.8vw, 2.2vh)', fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#1a1a2e', marginBottom: 4 }}>
                {highlightWord(currentSentence.en)}
              </Text>
              <Text style={{ fontSize: 'clamp(11px, 1.5vw, 1.8vh)', color: '#6b7280', marginBottom: 8 }}>
                {currentSentence.zh}
              </Text>
              <Group justify="space-between" align="center" gap={8} mt={6}>
                <Group gap={8} align="center">
                  <IconVolume size={18} stroke={1.8} style={{ color: '#9ca3af', flexShrink: 0 }} />
                  {Object.values(loadVoiceConfigs())
                    .filter(c => c.active)
                    .map(c => {
                      const meta = SLOT_META[c.slot]
                      return (
                        <UnstyledButton key={c.slot} onClick={() => speakWithConfig(currentSentence.en, c)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            padding: '5px 12px', borderRadius: 20, background: `${meta.color}15`,
                            fontSize: 13, color: meta.color,
                            fontFamily: 'Noto Sans SC, sans-serif', fontWeight: 500,
                            transition: 'background 0.12s', minHeight: 30,
                          }}
                        >
                          <img src={meta.avatar} alt={meta.label} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                          {meta.label}
                        </UnstyledButton>
                      )
                    })}
                  {[{ label: '0.5x', rate: 0.5 }, { label: '0.8x', rate: 0.8 }, { label: '1x', rate: 1 }].map(({ label, rate }) => (
                    <UnstyledButton key={label}
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
                        padding: '5px 12px', borderRadius: 20, background: 'rgba(100,100,100,0.10)',
                        fontSize: 13, color: '#555',
                        fontFamily: 'Noto Sans SC, sans-serif', fontWeight: 500, minHeight: 30,
                      }}
                    >
                      {label}
                    </UnstyledButton>
                  ))}
                </Group>
                <Tooltip label="换一句" withArrow events={{ hover: true, focus: true, touch: true }}>
                  <ActionIcon size={30} variant="subtle" radius="xl"
                    onClick={handleNextSentence} style={{ color: '#9ca3af' }} aria-label="换一句">
                    <IconRefresh size={18} stroke={1.8} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Box>
          </Tabs.Panel>
        )}
      </Tabs>

      {/* 图片区（pixabayKey 存在时） */}
      {pixabayKey && (
        <Box style={{
          width: '100%', maxWidth: 200, maxHeight: 160, marginTop: 12,
          background: '#f0f4ff', borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8,
        }}>
          <WordImage entry={entry as never} pixabayKey={pixabayKey} />
        </Box>
      )}
    </Stack>
  )
}
