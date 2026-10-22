import { Box, SimpleGrid, Stack, Text, Group, Card } from '@mantine/core'
import { IconBooks, IconLetterCase, IconSearch, IconStarFilled, IconChevronRight } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useViewMode } from '../hooks/useViewMode'

const FEATURES = [
  {
    id: 'search',
    path: '/search',
    icon: IconSearch,
    label: '搜索单词',
    sublabel: 'Word Search',
    desc: '输入任意单词，即时查询音节、音标与例句',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    emoji: '🔍',
  },
  {
    id: 'sight-words',
    path: '/sight-words',
    icon: IconLetterCase,
    label: 'Sight Words',
    sublabel: '高频词卡片',
    desc: '翻转卡片练习高频词，分级解锁，扎实记忆',
    color: '#0369a1',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #38bdf8 100%)',
    emoji: '🃏',
  },
  {
    id: 'books',
    path: '/books',
    icon: IconBooks,
    label: 'Books',
    sublabel: '课本单元',
    desc: '按教材单元学习，自然拼读规则 + 国际音标双轨',
    color: '#0f766e',
    gradient: 'linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)',
    emoji: '📚',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [viewMode] = useViewMode()

  return (
    <Box
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      {/* 品牌区 */}
      <Stack align="center" gap={8} mb={48} style={{ width: '100%', maxWidth: 760 }}>
        <Group gap={10} align="center">
          <IconStarFilled size={22} color="#f59e0b" />
          <Text
            fw={900}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: 'clamp(26px, 6vw, 36px)',
              color: '#1a1a2e',
              letterSpacing: '-0.5px',
            }}
          >
            拼读乐园
          </Text>
          <IconStarFilled size={22} color="#f59e0b" />
        </Group>
        <Text
          size="sm"
          c="dimmed"
          style={{ fontFamily: "'Nunito', sans-serif", letterSpacing: '0.02em' }}
        >
          Phonics · 自然拼读 · 国际音标
        </Text>
      </Stack>

      {/* 网格模式 */}
      {viewMode === 'grid' && (
        <SimpleGrid
          cols={{ base: 1, sm: 3 }}
          spacing="lg"
          style={{ width: '100%', maxWidth: 760 }}
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon
            return (
              <Box
                key={feat.id}
                onClick={() => navigate(feat.path)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  background: '#fff',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.14)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'
                }}
              >
                <Box
                  style={{
                    height: 100,
                    background: feat.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40,
                  }}
                >
                  <span role="img" aria-label={feat.label}>{feat.emoji}</span>
                </Box>
                <Box p="md" style={{ background: '#fff' }}>
                  <Group justify="space-between" align="flex-start">
                    <Stack gap={2}>
                      <Group gap={6} align="baseline">
                        <Text fw={800} size="lg" style={{ color: '#1a1a2e', fontFamily: "'Nunito', sans-serif" }}>
                          {feat.label}
                        </Text>
                        <Text size="xs" c="dimmed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                          {feat.sublabel}
                        </Text>
                      </Group>
                      <Text size="xs" c="dimmed" mt={2} style={{ lineHeight: 1.5 }}>
                        {feat.desc}
                      </Text>
                    </Stack>
                    <Icon size={18} color={feat.color} stroke={1.8} style={{ flexShrink: 0, marginTop: 2 }} />
                  </Group>
                </Box>
              </Box>
            )
          })}
        </SimpleGrid>
      )}

      {/* 列表模式 */}
      {viewMode === 'list' && (
        <Stack gap="sm" style={{ width: '100%', maxWidth: 760 }}>
          {FEATURES.map((feat) => (
            <Card
              key={feat.id}
              radius="lg"
              shadow="xs"
              padding="sm"
              style={{ cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onClick={() => navigate(feat.path)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <Group gap="md" wrap="nowrap">
                {/* 左侧小色块 */}
                <Box
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: feat.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  <span role="img" aria-label={feat.label}>{feat.emoji}</span>
                </Box>

                {/* 右侧文字 */}
                <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                  <Group gap={6} align="baseline">
                    <Text fw={800} size="md" style={{ color: '#1a1a2e', fontFamily: "'Nunito', sans-serif" }}>
                      {feat.label}
                    </Text>
                    <Text size="xs" c="dimmed">{feat.sublabel}</Text>
                  </Group>
                  <Text
                    size="xs"
                    c="dimmed"
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {feat.desc}
                  </Text>
                </Stack>

                <IconChevronRight size={16} color="#9ca3af" stroke={1.5} style={{ flexShrink: 0 }} />
              </Group>
            </Card>
          ))}
        </Stack>
      )}

      {/* 底部提示 */}
      <Text size="xs" c="dimmed" mt={40} style={{ opacity: 0.5 }}>
        点击卡片开始学习 →
      </Text>
    </Box>
  )
}
