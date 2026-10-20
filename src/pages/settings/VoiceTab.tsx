import { useEffect, useState } from 'react'
import {
  Box, Button, Collapse, Group, Select, Slider, Stack, Switch, Text,
} from '@mantine/core'
import { IconChevronDown, IconChevronUp, IconVolume } from '@tabler/icons-react'
import {
  type VoiceConfig, type VoiceSlot,
  SLOT_META, SLOT_ORDER,
  loadVoiceConfigs, saveVoiceConfigs, speakWithConfig,
} from './voice'

// ── VoiceRow ────────────────────────────────────────────────────────────
function VoiceRow({
  config, naturalVoices, onChange,
}: {
  config: VoiceConfig
  naturalVoices: { value: string; label: string }[]
  onChange: (c: VoiceConfig) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const meta = SLOT_META[config.slot]

  return (
    <Box style={{ borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden' }}>
      <Group px="md" py="sm" gap="sm" wrap="nowrap"
        style={{ background: config.active ? `${meta.color}08` : '#fff' }}>
        <img src={meta.avatar} alt={meta.label}
          style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }} />

        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
          <Text size="sm" fw={600} style={{ color: meta.color }}>{meta.label}</Text>
          <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {config.voiceName || '系统默认英语语音'}
          </Text>
        </Stack>

        <Button size="xs" variant="subtle" radius="xl" px={8}
          leftSection={<IconVolume size={12} />}
          color={meta.color}
          onClick={() => speakWithConfig('Hello! Nice to meet you.', config)}>
          试听
        </Button>

        <Switch
          checked={config.active}
          onChange={e => onChange({ ...config, active: e.currentTarget.checked })}
          color={meta.color}
          size="sm"
        />

        <Button size="xs" variant="subtle" px={6} color="gray"
          onClick={() => setExpanded(v => !v)}>
          {expanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        </Button>
      </Group>

      <Collapse expanded={expanded}>
        <Stack gap="md" p="md" style={{ background: '#f8f9fa', borderTop: '1px solid #e9ecef' }}>
          <Select
            label="语音"
            placeholder="选择 Natural 语音"
            data={[{ value: '', label: '系统默认英语语音' }, ...naturalVoices]}
            value={config.voiceName}
            onChange={v => onChange({ ...config, voiceName: v ?? '' })}
            searchable size="sm" radius="md"
          />

          <Stack gap={4}>
            <Group justify="space-between">
              <Text size="xs" fw={500}>语速</Text>
              <Text size="xs" c="dimmed">{config.rate.toFixed(1)}x</Text>
            </Group>
            <Slider value={config.rate} onChange={v => onChange({ ...config, rate: v })}
              min={0.5} max={2} step={0.1} color={meta.color} size="sm"
              marks={[{ value: 0.5, label: '0.5x' }, { value: 1, label: '1x' }, { value: 2, label: '2x' }]}
            />
          </Stack>

          <Stack gap={4}>
            <Group justify="space-between">
              <Text size="xs" fw={500}>音调</Text>
              <Text size="xs" c="dimmed">{config.pitch.toFixed(1)}</Text>
            </Group>
            <Slider value={config.pitch} onChange={v => onChange({ ...config, pitch: v })}
              min={0.5} max={2} step={0.1} color={meta.color} size="sm"
              marks={[{ value: 0.5, label: '低' }, { value: 1, label: '正常' }, { value: 2, label: '高' }]}
            />
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  )
}

// ── VoiceTab ────────────────────────────────────────────────────────────
export default function VoiceTab() {
  const [configs, setConfigs] = useState<Record<VoiceSlot, VoiceConfig>>(loadVoiceConfigs)
  const [naturalVoices, setNaturalVoices] = useState<{ value: string; label: string }[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = () => {
      const voices = window.speechSynthesis.getVoices()
      const natural = voices
        .filter(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('natural'))
        .map(v => ({ value: v.name, label: v.name }))
      if (natural.length > 0) setNaturalVoices(natural)
    }
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const handleSave = () => {
    saveVoiceConfigs(configs)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Stack gap="md">
      <Text size="xs" c="dimmed">
        激活的语音将用于例句朗读。在 Microsoft Edge 中可获取 Natural 语音列表。
      </Text>
      {SLOT_ORDER.map(slot => (
        <VoiceRow
          key={slot}
          config={configs[slot]}
          naturalVoices={naturalVoices}
          onChange={c => setConfigs(prev => ({ ...prev, [slot]: c }))}
        />
      ))}
      <Button onClick={handleSave} radius="xl"
        style={{ background: saved ? '#2d8a4e' : '#1a1a2e' }} fullWidth>
        {saved ? '已保存 ✓' : '保存设置'}
      </Button>
    </Stack>
  )
}
