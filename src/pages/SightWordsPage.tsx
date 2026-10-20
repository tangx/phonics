import { Center, Stack, Text } from '@mantine/core'
import { IconLetterCase } from '@tabler/icons-react'

export default function SightWordsPage() {
  return (
    <Center style={{ height: '60vh' }}>
      <Stack align="center" gap="md">
        <IconLetterCase size={64} color="#d1d5db" stroke={1.2} />
        <Text size="xl" fw={700} c="dimmed">Sight Words</Text>
        <Text size="sm" c="dimmed">Dolch 高频词练习，即将上线</Text>
      </Stack>
    </Center>
  )
}
