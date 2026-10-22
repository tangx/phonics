import { useCallback, useState } from 'react'
import { ActionIcon, Box, Group, Stack, Text, UnstyledButton } from '@mantine/core'
import { IconVolume } from '@tabler/icons-react'
import type { UnifiedEntry } from '../types'
import { playWord } from '../utils/audio'
import { SyllableChip, SyllableRow, PhoneticText } from './SyllableDisplay'

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

export interface WordCardFrontProps {
  entry: UnifiedEntry
  /** lg = BookPage 全屏卡；md = Modal / SightWords */
  size?: 'lg' | 'md'
  /** 点击卡片正面时的回调（如翻转） */
  onClick?: () => void
  /** 卡片颜色主题（用于 SightWords 等级色） */
  color?: string
  /** 已掌握标记（SightWords 专用） */
  mastered?: boolean
  /** 例句数量角标（SightWords 专用） */
  sentenceCount?: number
}

export default function WordCardFront({
  entry,
  size = 'lg',
  onClick,
  color,
  mastered,
  sentenceCount,
}: WordCardFrontProps) {
  const [bouncing, setBouncing] = useState(false)

  const handleSpeak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setBouncing(true)
    playWord(entry.word)
    setTimeout(() => setBouncing(false), 380)
  }, [entry.word])

  const wordFontSize = size === 'lg'
    ? 'clamp(40px, 8vw, 12vh)'
    : entry.syllables ? 'clamp(40px, 8vw, 88px)' : 'clamp(56px, 12vw, 120px)'

  const speakSize = size === 'lg' ? 'clamp(28px, 3.5vw, 5vh)' : 'clamp(44px, 6vw, 64px)'

  // md 尺寸用圆形按钮样式（SightWords 风格）
  const speakBtn = size === 'md' ? (
    <UnstyledButton
      onClick={handleSpeak}
      mt="clamp(16px, 3vh, 32px)"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: speakSize, height: speakSize,
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
  ) : (
    <ActionIcon
      size={speakSize}
      radius="xl"
      variant="filled"
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
  )

  if (size === 'md') {
    // SightWords / Modal 竖排布局
    return (
      <Box
        onClick={onClick}
        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: onClick ? 'pointer' : 'default' }}
      >
        {entry.syllables ? (
          <Box mb="clamp(8px, 1.5vh, 16px)" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <SyllableRow syllables={entry.syllables} phonetic={entry.phonetic ?? ''} size="md" />
          </Box>
        ) : entry.phonetic ? (
          <Box mb="clamp(8px, 1.5vh, 16px)">
            <PhoneticText phonetic={entry.phonetic} size="md" />
          </Box>
        ) : null}

        <Text style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 900,
          fontSize: wordFontSize,
          lineHeight: 1,
          color: '#1a1a2e',
          letterSpacing: '-2px',
          userSelect: 'none',
        }}>
          {entry.word}
        </Text>

        {speakBtn}

        {entry.chinese && (
          <Text
            mt="clamp(12px, 2vh, 20px)"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(14px, 2vw, 22px)',
              color: color ?? '#6b7280',
              userSelect: 'none',
            }}
          >
            {entry.chinese}
          </Text>
        )}

        {onClick && (
          <Text size="xs" c="dimmed" mt="clamp(8px, 1.5vh, 14px)" style={{ userSelect: 'none' }}>
            点击查看例句
          </Text>
        )}

        {/* 掌握标记角标 */}
        {mastered && (
          <Box style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: '50%',
            background: '#2d8a4e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </Box>
        )}

        {/* 例句数量角标 */}
        {sentenceCount !== undefined && sentenceCount > 0 && (
          <Box style={{
            position: 'absolute', bottom: 14, right: 16,
            fontSize: 11, color: '#9ca3af',
            fontFamily: "'Noto Sans SC', sans-serif",
          }}>
            {sentenceCount} 个例句
          </Box>
        )}
      </Box>
    )
  }

  // lg：BookPage 横排布局（音节块 + 大字 + 音标 + 中文）
  return (
    <Stack gap={0} align="center" justify="center" style={{ flex: 1, minWidth: 0, height: '100%' }}>
      <Group gap="clamp(6px, 1vw, 14px)" align="flex-start" wrap="wrap" mb="clamp(8px,1.5vh,20px)">
        {entry.syllables?.map((syl, i) => (
          <SyllableChip key={i} syl={syl} />
        ))}
      </Group>

      <Group gap="clamp(8px, 1.5vw, 20px)" align="flex-end" wrap="nowrap" mb="clamp(4px,0.8vh,10px)">
        <Stack gap={2} style={{ minWidth: 0 }}>
          <Group gap="clamp(4px, 0.8vw, 10px)" align="flex-end" wrap="nowrap">
            <Text style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: wordFontSize,
              lineHeight: 1,
              color: '#1a1a2e',
              letterSpacing: '-1px',
              whiteSpace: 'nowrap',
            }}>
              {entry.word}
            </Text>
            {speakBtn}
          </Group>
          {entry.phonetic && (
            <Text style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 'clamp(16px, 2.5vw, 3.5vh)',
              color: '#9ca3af',
              letterSpacing: '0.5px',
            }}>
              {entry.phonetic}
            </Text>
          )}
        </Stack>
      </Group>

      {entry.chinese && (
        <Text style={{
          fontFamily: "'Noto Sans SC', sans-serif",
          fontSize: 'clamp(14px, 2vw, 24px)',
          color: '#6b7280',
          marginTop: 2,
        }}>
          {entry.chinese}
        </Text>
      )}
    </Stack>
  )
}
