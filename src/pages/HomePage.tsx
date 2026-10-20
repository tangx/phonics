import { useState } from 'react'
import { Carousel } from '@mantine/carousel'
import { Box, Group, SegmentedControl, Text } from '@mantine/core'
import '@mantine/carousel/styles.css'
import { units } from '../data/units'
import WordCard from '../components/WordCard'
import { SettingsButton } from '../components/SettingsModal'
import { useSettings } from '../hooks/useSettings'

const SYLLABLE_LEGEND = [
  { color: '#d64045', label: '第1音节' },
  { color: '#1b6ca8', label: '第2音节' },
  { color: '#2d8a4e', label: '第3音节' },
  { color: '#7b3fa0', label: '第4音节' },
]

export default function HomePage() {
  const [activeUnit, setActiveUnit] = useState(units[0].id)
  const unit = units.find((u) => u.id === activeUnit) ?? units[0]
  const { pixabayKey, setPixabayKey } = useSettings()

  return (
    <Box style={{ height: '100svh', display: 'flex', flexDirection: 'column', background: 'var(--paper)' }}>
      {/* Header */}
      <Box
        component="header"
        style={{
          height: 48,
          flexShrink: 0,
          background: '#fff',
          borderBottom: '1px solid #eef0f8',
          boxShadow: '0 1px 8px rgba(26,26,46,0.05)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 20 }} role="img" aria-label="书">📖</Text>
        <Text fw={800} style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e', fontSize: 18 }}>
          拼读乐园
        </Text>

        <Box style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <SegmentedControl
            value={activeUnit}
            onChange={setActiveUnit}
            data={units.map((u) => ({ value: u.id, label: u.title }))}
            radius="xl"
            size="xs"
          />
          <SettingsButton pixabayKey={pixabayKey} onSave={setPixabayKey} />
        </Box>
      </Box>

      {/* 音节图例 */}
      <Box style={{ flexShrink: 0, padding: '6px 16px', background: '#fff', borderBottom: '1px solid #eef0f8' }}>
        <Group gap={16}>
          {SYLLABLE_LEGEND.map((item) => (
            <Group key={item.label} gap={5}>
              <Box style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
              <Text size="xs" c="dimmed">{item.label}</Text>
            </Group>
          ))}
        </Group>
      </Box>

      {/* Carousel */}
      <Box style={{ flex: 1, minHeight: 0, padding: '12px' }}>
        <Carousel
          key={activeUnit}
          withIndicators
          withKeyboardEvents
          slideSize="100%"
          slideGap="md"
          height="100%"
          emblaOptions={{ loop: false, align: 'center' }}
          controlSize={36}
          styles={{
            root: { height: '100%' },
            viewport: { height: '100%' },
            container: { height: '100%' },
            slide: { height: '100%' },
            control: {
              background: '#fff',
              border: '1px solid #eef0f8',
              boxShadow: '0 2px 8px rgba(26,26,46,0.08)',
              color: '#1a1a2e',
            },
          }}
        >
          {unit.words.map((entry) => (
            <Carousel.Slide key={entry.word}>
              <WordCard entry={entry} pixabayKey={pixabayKey} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </Box>
  )
}
