import { Group, Text } from '@mantine/core'
import { IconLayoutGrid, IconList } from '@tabler/icons-react'

interface ViewToggleProps {
  mode: 'grid' | 'list'
  onChange: (m: 'grid' | 'list') => void
}

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <Group justify="space-between" px={8} py={6} style={{ borderRadius: 8 }}>
      <Group gap={8}>
        {mode === 'grid'
          ? <IconLayoutGrid size={16} stroke={1.8} color="var(--mantine-color-blue-6)" />
          : <IconList size={16} stroke={1.8} color="var(--mantine-color-blue-6)" />
        }
        <Text size="sm" fw={500}>
          {mode === 'grid' ? '网格视图' : '列表视图'}
        </Text>
      </Group>
      <Group
        gap={2}
        style={{
          background: 'var(--mantine-color-gray-1)',
          borderRadius: 6,
          padding: 2,
        }}
      >
        {(['grid', 'list'] as const).map((m) => {
          const Icon = m === 'grid' ? IconLayoutGrid : IconList
          const active = mode === m
          return (
            <Group
              key={m}
              justify="center"
              align="center"
              style={{
                width: 26,
                height: 26,
                borderRadius: 4,
                cursor: 'pointer',
                background: active ? 'var(--mantine-color-blue-6)' : 'transparent',
                transition: 'background 0.15s',
              }}
              onClick={() => onChange(m)}
              aria-label={m === 'grid' ? '网格视图' : '列表视图'}
            >
              <Icon size={13} stroke={1.8} color={active ? '#fff' : 'var(--mantine-color-gray-5)'} />
            </Group>
          )
        })}
      </Group>
    </Group>
  )
}
