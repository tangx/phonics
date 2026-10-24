import { useNavigate } from 'react-router-dom'
import { Box, Group, Stack, Text, Badge } from '@mantine/core'
import { IconBooks, IconChevronRight } from '@tabler/icons-react'
import { semesters } from '../data/units'

export default function BooksHomePage() {
  const navigate = useNavigate()

  return (
    <Box p="xl" style={{ maxWidth: 680, margin: '0 auto' }}>
      <Stack gap="xl">
        {/* 页头 */}
        <Stack gap={6}>
          <Group gap={10} align="center">
            <Box style={{ fontSize: 32, lineHeight: 1 }}>📚</Box>
            <Text fw={800} style={{
              fontFamily: "'Fredoka', 'Nunito', sans-serif",
              fontSize: 28,
              color: 'var(--ink)',
              letterSpacing: '-0.3px',
            }}>
              课本单元
            </Text>
          </Group>
          <Text size="sm" style={{ color: 'var(--ink-muted)', marginLeft: 42 }}>
            选择课本，开始学习单词拼读
          </Text>
        </Stack>

        <Stack gap={12}>
          {semesters.map((semester) => {
            const totalWords = new Set(semester.units.flatMap(u => u.wordKeys)).size
            const color = semester.color ?? '#4fa3e8'

            return (
              <Box
                key={semester.id}
                className="clay-card"
                onClick={() => navigate(`/books/${semester.id}`)}
                style={{
                  padding: '16px 20px',
                  borderColor: `${color}40`,
                }}
              >
                <Group gap={16} wrap="nowrap" align="center">
                  {/* 左侧色块图标 */}
                  <Box
                    className="clay-icon"
                    style={{
                      width: 56,
                      height: 56,
                      background: `linear-gradient(145deg, ${color} 0%, ${color}cc 100%)`,
                      boxShadow: `3px 3px 0px ${color}50`,
                      borderColor: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <IconBooks size={26} color="white" stroke={1.8} />
                  </Box>

                  {/* 右侧文字 */}
                  <Stack gap={5} style={{ flex: 1, minWidth: 0 }}>
                    <Text fw={700} style={{
                      fontFamily: "'Fredoka', 'Nunito', sans-serif",
                      fontSize: 18,
                      color: 'var(--ink)',
                      lineHeight: 1.2,
                    }}>
                      {semester.title}
                    </Text>
                    <Group gap={6}>
                      <Badge
                        size="sm"
                        radius="xl"
                        style={{
                          background: `${color}18`,
                          color,
                          fontWeight: 700,
                          border: `1.5px solid ${color}30`,
                        }}
                      >
                        {semester.units.length} 单元
                      </Badge>
                      <Badge
                        size="sm"
                        radius="xl"
                        style={{
                          background: `${color}18`,
                          color,
                          fontWeight: 700,
                          border: `1.5px solid ${color}30`,
                        }}
                      >
                        {totalWords} 单词
                      </Badge>
                    </Group>
                  </Stack>

                  <Box style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: `${color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <IconChevronRight size={16} color={color} stroke={2.5} />
                  </Box>
                </Group>
              </Box>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
}
