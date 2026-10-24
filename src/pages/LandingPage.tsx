import { Box, Stack, Text, Group } from '@mantine/core'
import { IconBooks, IconLetterCase, IconSearch } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    id: 'books',
    path: '/books',
    icon: IconBooks,
    label: 'Books',
    sublabel: '课本单元',
    desc: '按教材单元学习，自然拼读规则 + 国际音标双轨',
    bg: 'linear-gradient(145deg, #4fa3e8 0%, #2d8bdc 100%)',
    border: 'rgba(79,163,232,0.5)',
    shadow: '4px 4px 0px rgba(45,139,220,0.35)',
  },
  {
    id: 'sight-words',
    path: '/sight-words',
    icon: IconLetterCase,
    label: 'Sight Words',
    sublabel: '高频词卡片',
    desc: '翻转卡片练习高频词，分级解锁，扎实记忆',
    bg: 'linear-gradient(145deg, #9b8fe8 0%, #7c6fd4 100%)',
    border: 'rgba(155,143,232,0.5)',
    shadow: '4px 4px 0px rgba(124,111,212,0.35)',
  },
  {
    id: 'search',
    path: '/search',
    icon: IconSearch,
    label: '搜索单词',
    sublabel: 'Word Search',
    desc: '输入任意单词，即时查询音节、音标与例句',
    bg: 'linear-gradient(145deg, #52c79d 0%, #38b085 100%)',
    border: 'rgba(82,199,157,0.5)',
    shadow: '4px 4px 0px rgba(56,176,133,0.35)',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <Box
      className="bg-blobs"
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Hero */}
      <Stack align="center" gap={6} mb={40} style={{ width: '100%', maxWidth: 680 }}>
        {/* Big bouncy emoji mascot */}
        <Box style={{
          fontSize: 72,
          lineHeight: 1,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
          marginBottom: 8,
          animation: 'none',
        }}>
          🐣
        </Box>

        <Text
          fw={900}
          style={{
            fontFamily: "'Fredoka', 'Nunito', sans-serif",
            fontSize: 'clamp(32px, 7vw, 52px)',
            color: 'var(--ink)',
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
            textAlign: 'center',
          }}
        >
          拼读乐园
        </Text>

        <Box style={{
          background: 'linear-gradient(135deg, #4fa3e8, #9b8fe8)',
          borderRadius: 50,
          padding: '6px 20px',
          display: 'inline-flex',
        }}>
          <Text
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 15,
              color: '#fff',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            Phonics · 自然拼读 · 国际音标
          </Text>
        </Box>
      </Stack>

      {/* Feature cards */}
      <Stack gap={14} style={{ width: '100%', maxWidth: 560 }}>
        {FEATURES.map((feat) => {
          const Icon = feat.icon
          return (
            <Box
              key={feat.id}
              className="clay-card"
              onClick={() => navigate(feat.path)}
              style={{
                padding: '16px 20px',
                borderColor: feat.border,
              }}
            >
              <Group gap={16} wrap="nowrap" align="center">
                {/* Clay icon */}
                <Box
                  className="clay-icon"
                  style={{
                    width: 60,
                    height: 60,
                    background: feat.bg,
                    boxShadow: feat.shadow,
                    borderColor: 'rgba(255,255,255,0.8)',
                  }}
                >
                  <Icon size={28} color="white" stroke={1.8} />
                </Box>

                {/* Text */}
                <Stack gap={3} style={{ flex: 1, minWidth: 0 }}>
                  <Group gap={8} align="baseline" wrap="nowrap">
                    <Text fw={800} style={{
                      fontFamily: "'Fredoka', 'Nunito', sans-serif",
                      fontSize: 20,
                      color: 'var(--ink)',
                      lineHeight: 1.2,
                    }}>
                      {feat.label}
                    </Text>
                    <Text size="sm" style={{ color: 'var(--ink-muted)', fontWeight: 500 }}>
                      {feat.sublabel}
                    </Text>
                  </Group>
                  <Text size="sm" style={{
                    color: 'var(--ink-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {feat.desc}
                  </Text>
                </Stack>

                {/* Arrow */}
                <Box style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: 'var(--surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 16,
                }}>
                  →
                </Box>
              </Group>
            </Box>
          )
        })}
      </Stack>

      <Text
        size="xs"
        style={{ color: 'var(--ink-muted)', marginTop: 32, opacity: 0.6 }}
      >
        选一个，开始学习吧！
      </Text>
    </Box>
  )
}
