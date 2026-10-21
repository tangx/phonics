import { useNavigate, useParams } from 'react-router-dom'
import { Box, Card, SimpleGrid, Text, Stack, Group, Badge } from '@mantine/core'
import { IconBook } from '@tabler/icons-react'
import { semesters } from '../data/units'

export default function BookUnitsPage() {
  const { semesterId } = useParams<{ semesterId: string }>()
  const navigate = useNavigate()

  const semester = semesters.find(s => s.id === semesterId) ?? semesters[0]
  const color = semester.color ?? '#1b6ca8'

  return (
    <Box p="xl" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Stack gap="xl">
        <Stack gap={4}>
          <Group gap="sm">
            <IconBook size={24} color={color} stroke={1.8} />
            <Text fw={800} size="xl" style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e' }}>
              {semester.title}
            </Text>
          </Group>
          <Text size="sm" c="dimmed">选择单元，开始学习</Text>
        </Stack>

        <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="md">
          {semester.units.map((unit) => (
            <Card
              key={unit.id}
              radius="xl"
              shadow="sm"
              padding="lg"
              style={{
                cursor: 'pointer',
                border: `2px solid ${color}22`,
                transition: 'transform 0.15s, box-shadow 0.15s',
                textAlign: 'center',
              }}
              onClick={() => navigate(`/books/${semester.id}/${unit.id}`)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 8px 24px ${color}30`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <Stack gap={8} align="center">
                <Box
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: `${color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text fw={800} size="lg" style={{ color, fontFamily: "'Nunito', sans-serif" }}>
                    {unit.id.replace('u', '')}
                  </Text>
                </Box>
                <Text fw={700} size="sm" style={{ color: '#1a1a2e', fontFamily: "'Nunito', sans-serif" }}>
                  {unit.title}
                </Text>
                <Badge size="xs" variant="light" style={{ background: `${color}15`, color }}>
                  {unit.wordKeys.length} 词
                </Badge>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}
