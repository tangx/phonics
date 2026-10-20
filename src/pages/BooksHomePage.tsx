import { useNavigate } from 'react-router-dom'
import { Card, SimpleGrid, Group, Stack, Text, Box, Badge } from '@mantine/core'
import { IconBooks, IconChevronRight } from '@tabler/icons-react'
import { semesters } from '../data/units'

export default function BooksHomePage() {
  const navigate = useNavigate()

  return (
    <Box p="xl" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Stack gap="xl">
        <Stack gap={4}>
          <Group gap="sm">
            <IconBooks size={28} color="#1a1a2e" stroke={1.8} />
            <Text fw={800} size="xl" style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e' }}>
              Books
            </Text>
          </Group>
          <Text size="sm" c="dimmed">选择课本，开始学习单词拼读</Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {semesters.map((semester) => {
            const totalWords = new Set(semester.units.flatMap(u => u.wordKeys)).size
            const color = semester.color ?? '#1b6ca8'
            const bgLight = `${color}15`

            return (
              <Box key={semester.id}>
                <Card
                  radius="xl"
                  shadow="sm"
                  padding={0}
                  style={{ cursor: 'pointer', overflow: 'hidden', transition: 'transform 0.15s, box-shadow 0.15s' }}
                  onClick={() => navigate(`/books/${semester.id}`)}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)', e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = '')}
                >
                  {/* 封面色块 */}
                  <Box style={{
                    height: 120,
                    background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <IconBooks size={48} color="white" stroke={1.5} />
                  </Box>

                  {/* 书本信息 */}
                  <Box p="md" style={{ background: 'white' }}>
                    <Group justify="space-between" align="flex-start">
                      <Stack gap={4}>
                        <Text fw={700} size="lg" style={{ color: '#1a1a2e', fontFamily: "'Nunito', sans-serif" }}>
                          {semester.title}
                        </Text>
                        <Group gap={6}>
                          <Badge
                            size="sm"
                            variant="light"
                            style={{ background: bgLight, color }}
                          >
                            {semester.units.length} 单元
                          </Badge>
                          <Badge
                            size="sm"
                            variant="light"
                            style={{ background: bgLight, color }}
                          >
                            {totalWords} 单词
                          </Badge>
                        </Group>
                        {semester.description && (
                          <Text size="xs" c="dimmed" mt={2}>{semester.description}</Text>
                        )}
                      </Stack>
                      <IconChevronRight size={20} color="#9ca3af" stroke={1.5} style={{ marginTop: 4 }} />
                    </Group>
                  </Box>
                </Card>
              </Box>
            )
          })}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}
