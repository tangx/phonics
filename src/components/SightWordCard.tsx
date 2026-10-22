import { useState, useCallback } from 'react'
import { Box, Text, Group, UnstyledButton, ScrollArea, Badge } from '@mantine/core'
import { IconVolume, IconCheck, IconRefresh } from '@tabler/icons-react'
import type { SightWordEntry, SightSentenceLevel, SightWordSentence } from '../types'
import { playWord } from '../utils/audio'

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

// 难度等级对应的颜色和标签
const LEVEL_META: Record<SightSentenceLevel, { color: string; label: string }> = {
  1: { color: '#2d8a4e', label: 'L1' },
  2: { color: '#1b6ca8', label: 'L2' },
  3: { color: '#d9480f', label: 'L3' },
  4: { color: '#7b3fa0', label: 'L4' },
  5: { color: '#c92a2a', label: 'L5' },
}

interface Props {
  entry: SightWordEntry
  sentences: SightWordSentence[]   // 已按 level 过滤+排序的句子列表
  mastered: boolean
  onToggleMastered: () => void
  color: string
}

export default function SightWordCard({ entry, sentences, mastered, onToggleMastered, color }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [bouncing, setBouncing] = useState(false)

  const handleSpeak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setBouncing(true)
    playWord(entry.word)
    setTimeout(() => setBouncing(false), 380)
  }, [entry.word])

  const handleMastered = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleMastered()
  }, [onToggleMastered])

  // 高亮句子中的目标词
  function highlightWord(text: string) {
    const parts = text.split(new RegExp(`(\\b${entry.word}\\b)`, 'i'))
    return parts.map((part, i) =>
      part.toLowerCase() === entry.word.toLowerCase()
        ? <span key={i} style={{ color, fontWeight: 900, borderBottom: `2px solid ${color}80` }}>{part}</span>
        : part
    )
  }

  return (
    <Box
      style={{ perspective: '1200px', width: '100%', height: '100%' }}
    >
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── 正面 ── */}
        <Box
          onClick={() => setFlipped(true)}
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 24,
            background: 'white',
            boxShadow: '0 8px 32px rgba(26,26,46,0.10)',
            border: `2px solid ${color}25`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Text
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(56px, 12vw, 120px)',
              lineHeight: 1,
              color: '#1a1a2e',
              letterSpacing: '-2px',
              userSelect: 'none',
            }}
          >
            {entry.word}
          </Text>

          <UnstyledButton
            onClick={handleSpeak}
            mt="clamp(16px, 3vh, 32px)"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 'clamp(44px, 6vw, 64px)',
              height: 'clamp(44px, 6vw, 64px)',
              borderRadius: '50%',
              background: '#f5a623',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245,166,35,0.4)',
              transform: bouncing ? 'scale(1.4)' : 'scale(1)',
              transition: `transform 0.22s ${SPRING}`,
            }}
            aria-label={`播放 ${entry.word}`}
          >
            <IconVolume size="45%" stroke={1.8} />
          </UnstyledButton>

          <Text size="xs" c="dimmed" mt="clamp(12px, 2vh, 20px)" style={{ userSelect: 'none' }}>
            点击查看释义与例句
          </Text>

          {mastered && (
            <Box style={{
              position: 'absolute', top: 16, right: 16,
              width: 32, height: 32, borderRadius: '50%',
              background: '#2d8a4e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <IconCheck size={18} color="white" stroke={2.5} />
            </Box>
          )}

          {sentences.length > 0 && (
            <Box style={{
              position: 'absolute', bottom: 14, right: 16,
              fontSize: 11, color: '#9ca3af',
              fontFamily: "'Noto Sans SC', sans-serif",
            }}>
              {sentences.length} 个例句
            </Box>
          )}
        </Box>

        {/* ── 背面 ── */}
        <Box
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 24,
            background: '#f8f9ff',
            boxShadow: '0 8px 32px rgba(26,26,46,0.10)',
            border: `2px solid ${color}40`,
            display: 'flex',
            flexDirection: 'column',
            padding: 'clamp(16px, 3vw, 32px)',
            overflow: 'hidden',
          }}
        >
          {/* 顶部：单词 + 发音 + 中文 */}
          <Group align="flex-end" gap="clamp(8px, 1.5vw, 16px)" mb="clamp(10px, 1.5vh, 16px)" style={{ flexShrink: 0 }}>
            <Text
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(32px, 6vw, 60px)',
                lineHeight: 1,
                color: '#1a1a2e',
              }}
            >
              {entry.word}
            </Text>
            <UnstyledButton
              onClick={handleSpeak}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 'clamp(32px, 4vw, 48px)',
                height: 'clamp(32px, 4vw, 48px)',
                borderRadius: '50%',
                background: '#f5a623',
                color: 'white',
                boxShadow: '0 3px 8px rgba(245,166,35,0.35)',
                transform: bouncing ? 'scale(1.4)' : 'scale(1)',
                transition: `transform 0.22s ${SPRING}`,
                flexShrink: 0,
                marginBottom: 4,
              }}
              aria-label={`播放 ${entry.word}`}
            >
              <IconVolume size="45%" stroke={1.8} />
            </UnstyledButton>
            <Text
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(16px, 2.8vw, 32px)',
                color,
                marginBottom: 4,
              }}
            >
              {entry.chinese}
            </Text>
          </Group>

          {/* 例句列表 */}
          <Box style={{ flex: 1, minHeight: 0 }}>
            {sentences.length === 0 ? (
              <Box style={{
                height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Text size="sm" c="dimmed">暂无例句</Text>
              </Box>
            ) : (
              <ScrollArea h="100%" scrollbarSize={4}>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1vh, 10px)' }}>
                  {sentences.map(s => {
                    const meta = LEVEL_META[s.level]
                    return (
                      <Box
                        key={s.id}
                        style={{
                          background: 'white',
                          borderRadius: 12,
                          padding: 'clamp(8px, 1.2vw, 14px)',
                          border: `1.5px solid ${meta.color}20`,
                          display: 'flex',
                          gap: 10,
                          alignItems: 'flex-start',
                        }}
                      >
                        {/* 难度标 */}
                        <Box style={{ flexShrink: 0, paddingTop: 2 }}>
                          <Badge
                            size="xs"
                            radius="sm"
                            style={{
                              background: `${meta.color}18`,
                              color: meta.color,
                              fontWeight: 700,
                              border: `1px solid ${meta.color}30`,
                            }}
                          >
                            {meta.label}
                          </Badge>
                        </Box>
                        {/* 句子内容 */}
                        <Box style={{ flex: 1, minWidth: 0 }}>
                          <Text
                            style={{
                              fontFamily: "'Nunito', sans-serif",
                              fontSize: 'clamp(13px, 1.8vw, 20px)',
                              fontWeight: 600,
                              color: '#1a1a2e',
                              lineHeight: 1.5,
                              marginBottom: 2,
                            }}
                          >
                            {highlightWord(s.en)}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "'Noto Sans SC', sans-serif",
                              fontSize: 'clamp(11px, 1.4vw, 15px)',
                              color: '#6b7280',
                              lineHeight: 1.4,
                            }}
                          >
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
              onClick={() => setFlipped(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 20,
                background: '#f1f3f5',
                fontSize: 'clamp(12px, 1.4vw, 15px)',
                color: '#6b7280',
                fontFamily: "'Noto Sans SC', sans-serif",
              }}
            >
              <IconRefresh size={14} stroke={1.8} />
              翻回去
            </UnstyledButton>

            <UnstyledButton
              onClick={handleMastered}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: 'clamp(8px, 1.2vh, 12px) clamp(16px, 2.5vw, 28px)',
                borderRadius: 50,
                background: mastered ? '#2d8a4e' : 'white',
                border: `2px solid ${mastered ? '#2d8a4e' : '#d1d5db'}`,
                boxShadow: mastered ? '0 4px 12px rgba(45,138,78,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                fontSize: 'clamp(13px, 1.6vw, 17px)',
                color: mastered ? 'white' : '#374151',
                fontFamily: "'Noto Sans SC', sans-serif",
                fontWeight: 700,
                transition: 'all 0.2s',
              }}
            >
              <IconCheck size="1.1em" stroke={2.5} color={mastered ? 'white' : '#9ca3af'} />
              {mastered ? '已掌握 ✓' : '已掌握'}
            </UnstyledButton>
          </Group>
        </Box>
      </Box>
    </Box>
  )
}
