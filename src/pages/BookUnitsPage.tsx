import { useNavigate, useParams } from 'react-router-dom'
import { Box, Text, Stack, Group, Badge } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { semesters } from '../data/units'

export default function BookUnitsPage() {
  const { semesterId } = useParams<{ semesterId: string }>()
  const navigate = useNavigate()

  const semester = semesters.find(s => s.id === semesterId) ?? semesters[0]
  const color = semester.color ?? '#4fa3e8'

  return (
    <Box p="xl" style={{ maxWidth: 680, margin: '0 auto' }}>
      <Stack gap="xl">
        {/* 页头 */}
        <Stack gap={6}>
          <Group gap={10} align="center">
            <Box style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: `linear-gradient(145deg, ${color} 0%, ${color}cc 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `3px 3px 0px ${color}50`,
              border: '2px solid rgba(255,255,255,0.8)',
              flexShrink: 0,
            }}>
              <Text fw={800} style={{ color: '#fff', fontSize: 18, fontFamily: "'Fredoka', sans-serif" }}>
                {semester.title.slice(0, 1)}
              </Text>
            </Box>
            <Stack gap={2}>
              <Text fw={800} style={{
                fontFamily: "'Fredoka', 'Nunito', sans-serif",
                fontSize: 22,
                color: 'var(--ink)',
                lineHeight: 1.2,
              }}>
                {semester.title}
              </Text>
              <Text size="sm" style={{ color: 'var(--ink-muted)' }}>选择单元，开始学习</Text>
            </Stack>
          </Group>
        </Stack>

        <Stack gap={10}>
          {semester.units.map((unit, idx) => (
            <Box
              key={unit.id}
              className="clay-card"
              onClick={() => navigate(`/books/${semester.id}/${unit.id}`)}
              style={{
                padding: '14px 18px',
                borderColor: `${color}35`,
              }}
            >
              <Group gap={14} wrap="nowrap" align="center">
                {/* 序号块 */}
                <Box style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${color}18`,
                  border: `2px solid ${color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Text fw={900} style={{
                    color,
                    fontSize: 20,
                    fontFamily: "'Fredoka', 'Nunito', sans-serif",
                    lineHeight: 1,
                  }}>
                    {idx + 1}
                  </Text>
                </Box>

                <Stack gap={3} style={{ flex: 1, minWidth: 0 }}>
                  <Text fw={700} style={{
                    fontFamily: "'Fredoka', 'Nunito', sans-serif",
                    fontSize: 16,
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                  }}>
                    {unit.title}
                  </Text>
                  <Text size="xs" style={{ color: 'var(--ink-muted)' }}>
                    {unit.wordKeys.length} 个单词
                  </Text>
                </Stack>

                <Badge
                  size="sm"
                  radius="xl"
                  style={{
                    background: `${color}15`,
                    color,
                    border: `1.5px solid ${color}30`,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {unit.wordKeys.length} 词
                </Badge>

                <Box style={{
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  background: `${color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <IconChevronRight size={14} color={color} stroke={2.5} />
                </Box>
              </Group>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
