import { Stack, Text, Title, SegmentedControl, Button, Divider } from '@mantine/core'
import { useSightWordsProgress } from '../../hooks/useSightWordsProgress'

export default function SightWordsTab() {
  const { unlockMode, setUnlockMode, resetProgress } = useSightWordsProgress()

  return (
    <Stack gap="lg">
      <Title order={5} style={{ color: '#1a1a2e' }}>Sight Words 设置</Title>

      <Stack gap={8}>
        <Text size="sm" fw={600}>解锁方式</Text>
        <Text size="xs" c="dimmed">控制每组 10 词学完后，如何解锁下一组</Text>
        <SegmentedControl
          value={unlockMode}
          onChange={v => setUnlockMode(v as 'auto' | 'quiz')}
          data={[
            { label: '看完自动解锁', value: 'auto' },
            { label: '答对才解锁', value: 'quiz' },
          ]}
          radius="md"
        />
        {unlockMode === 'quiz' && (
          <Text size="xs" c="orange.6">
            测验模式开发中，暂时等同自动解锁。
          </Text>
        )}
      </Stack>

      <Divider />

      <Stack gap={8}>
        <Text size="sm" fw={600}>重置进度</Text>
        <Text size="xs" c="dimmed">清除所有已解锁的分组记录，重新从第一组开始</Text>
        <Button
          variant="outline"
          color="red"
          radius="md"
          w="fit-content"
          onClick={() => {
            if (confirm('确定重置所有 Sight Words 进度？此操作不可撤销。')) {
              resetProgress()
            }
          }}
        >
          重置进度
        </Button>
      </Stack>
    </Stack>
  )
}
