import { useState, useCallback, useRef } from 'react'
import { Box, Text, Group, UnstyledButton } from '@mantine/core'
import { IconVolume, IconCheck, IconRefresh } from '@tabler/icons-react'
import type { SightWordEntry } from '../types'
import { playWord } from '../utils/audio'

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

interface Props {
  entry: SightWordEntry
  mastered: boolean
  onToggleMastered: () => void
  color: string  // level color
}

export default function SightWordCard({ entry, mastered, onToggleMastered, color }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [bouncing, setBouncing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleSpeak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setBouncing(true)
    playWord(entry.word)
    setTimeout(() => setBouncing(false), 380)
  }, [entry.word])

  const handleFlip = useCallback(() => {
    setFlipped(f => !f)
  }, [])

  const handleMastered = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleMastered()
  }, [onToggleMastered])

  return (
    <Box
      ref={cardRef}
      style={{ perspective: '1200px', width: '100%', height: '100%', cursor: 'pointer' }}
      onClick={handleFlip}
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
            gap: 0,
          }}
        >
          {/* 单词 */}
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

          {/* 发音按钮 */}
          <UnstyledButton
            onClick={handleSpeak}
            mt="clamp(16px, 3vh, 32px)"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'clamp(44px, 6vw, 64px)',
              height: 'clamp(44px, 6vw, 64px)',
              borderRadius: '50%',
              background: '#f5a623',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245,166,35,0.4)',
              transform: bouncing ? `scale(1.4)` : 'scale(1)',
              transition: `transform 0.22s ${SPRING}`,
            }}
            aria-label={`播放 ${entry.word}`}
          >
            <IconVolume size="45%" stroke={1.8} />
          </UnstyledButton>

          {/* 翻转提示 */}
          <Text size="xs" c="dimmed" mt="clamp(12px, 2vh, 20px)" style={{ userSelect: 'none' }}>
            点击查看释义
          </Text>

          {/* 已掌握角标 */}
          {mastered && (
            <Box
              style={{
                position: 'absolute',
                top: 16, right: 16,
                width: 32, height: 32,
                borderRadius: '50%',
                background: '#2d8a4e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <IconCheck size={18} color="white" stroke={2.5} />
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
            padding: 'clamp(24px, 4vw, 48px)',
          }}
        >
          {/* 顶部：单词 + 音标 + 发音 */}
          <Group align="flex-end" gap="clamp(8px, 1.5vw, 16px)" mb="clamp(16px, 3vh, 28px)">
            <Text
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(36px, 7vw, 72px)',
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
                width: 'clamp(36px, 4.5vw, 52px)',
                height: 'clamp(36px, 4.5vw, 52px)',
                borderRadius: '50%',
                background: '#f5a623',
                color: 'white',
                boxShadow: '0 3px 8px rgba(245,166,35,0.35)',
                transform: bouncing ? `scale(1.4)` : 'scale(1)',
                transition: `transform 0.22s ${SPRING}`,
                flexShrink: 0,
                marginBottom: 6,
              }}
              aria-label={`播放 ${entry.word}`}
            >
              <IconVolume size="45%" stroke={1.8} />
            </UnstyledButton>
          </Group>

          {/* 中文 */}
          <Text
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(20px, 3.5vw, 40px)',
              color: color,
              marginBottom: 'clamp(12px, 2vh, 20px)',
            }}
          >
            {entry.chinese}
          </Text>

          {/* 例句 */}
          <Box
            style={{
              background: 'white',
              borderRadius: 16,
              padding: 'clamp(12px, 2vw, 20px)',
              border: `1.5px solid ${color}20`,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {/* 英文例句，高亮目标词 */}
            <Text
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 'clamp(15px, 2.2vw, 26px)',
                fontWeight: 600,
                color: '#1a1a2e',
                lineHeight: 1.6,
              }}
            >
              {entry.example.split(new RegExp(`(\\b${entry.word}\\b)`, 'i')).map((part, i) =>
                part.toLowerCase() === entry.word.toLowerCase()
                  ? <span key={i} style={{ color, fontWeight: 900, borderBottom: `2px solid ${color}` }}>{part}</span>
                  : part
              )}
            </Text>
            <Text
              style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontSize: 'clamp(12px, 1.6vw, 18px)',
                color: '#6b7280',
                lineHeight: 1.5,
              }}
            >
              {entry.exampleZh}
            </Text>
          </Box>

          {/* 底部操作栏 */}
          <Group justify="space-between" align="center" mt="clamp(12px, 2vh, 20px)">
            {/* 返回正面 */}
            <UnstyledButton
              onClick={handleFlip}
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

            {/* 已掌握按钮 */}
            <UnstyledButton
              onClick={handleMastered}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: 'clamp(10px, 1.5vh, 14px) clamp(20px, 3vw, 32px)',
                borderRadius: 50,
                background: mastered ? '#2d8a4e' : 'white',
                border: `2px solid ${mastered ? '#2d8a4e' : '#d1d5db'}`,
                boxShadow: mastered ? '0 4px 12px rgba(45,138,78,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                fontSize: 'clamp(14px, 1.8vw, 18px)',
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
