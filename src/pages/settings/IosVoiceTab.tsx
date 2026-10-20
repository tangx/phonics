import { useState } from 'react'
import { Button, Group, Slider, Stack, Text } from '@mantine/core'
import { IconVolume } from '@tabler/icons-react'

export const IOS_VOICE_CONFIG_KEY = 'phonics_ios_voice_config'

export interface IosVoiceConfig {
  rate: number
  pitch: number
}

export function defaultIosVoiceConfig(): IosVoiceConfig {
  return { rate: 0.9, pitch: 1 }
}

export function loadIosVoiceConfig(): IosVoiceConfig {
  try {
    const raw = localStorage.getItem(IOS_VOICE_CONFIG_KEY)
    if (!raw) return defaultIosVoiceConfig()
    return { ...defaultIosVoiceConfig(), ...JSON.parse(raw) }
  } catch { return defaultIosVoiceConfig() }
}

export function saveIosVoiceConfig(config: IosVoiceConfig) {
  try { localStorage.setItem(IOS_VOICE_CONFIG_KEY, JSON.stringify(config)) } catch {}
}

export function speakWithIosConfig(text: string, config?: IosVoiceConfig) {
  if (!('speechSynthesis' in window)) return
  const c = config ?? loadIosVoiceConfig()
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'en-US'
  utter.rate = c.rate
  utter.pitch = c.pitch
  window.speechSynthesis.speak(utter)
}

// ── IosVoiceTab ────────────────────────────────────────────────────────────
export default function IosVoiceTab() {
  const [config, setConfig] = useState<IosVoiceConfig>(loadIosVoiceConfig)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveIosVoiceConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Stack gap="md">
      <Text size="xs" c="dimmed">
        直接使用系统默认 TTS，不指定语音名称。在 iPad 系统设置中选择 Ava Enhanced 后，此处朗读即可触发该语音。
      </Text>

      <Stack gap={4}>
        <Group justify="space-between">
          <Text size="xs" fw={500}>语速</Text>
          <Text size="xs" c="dimmed">{config.rate.toFixed(1)}x</Text>
        </Group>
        <Slider
          value={config.rate}
          onChange={v => setConfig(c => ({ ...c, rate: v }))}
          min={0.5} max={2} step={0.1} size="sm"
          marks={[{ value: 0.5, label: '0.5x' }, { value: 1, label: '1x' }, { value: 2, label: '2x' }]}
        />
      </Stack>

      <Stack gap={4}>
        <Group justify="space-between">
          <Text size="xs" fw={500}>音调</Text>
          <Text size="xs" c="dimmed">{config.pitch.toFixed(1)}</Text>
        </Group>
        <Slider
          value={config.pitch}
          onChange={v => setConfig(c => ({ ...c, pitch: v }))}
          min={0.5} max={2} step={0.1} size="sm"
          marks={[{ value: 0.5, label: '低' }, { value: 1, label: '正常' }, { value: 2, label: '高' }]}
        />
      </Stack>

      <Button
        size="xs" variant="light" radius="xl"
        leftSection={<IconVolume size={14} />}
        onClick={() => speakWithIosConfig('Hello! Nice to meet you.', config)}
        style={{ alignSelf: 'flex-start' }}
      >
        试听
      </Button>

      <Button onClick={handleSave} radius="xl"
        style={{ background: saved ? '#2d8a4e' : '#1a1a2e' }} fullWidth>
        {saved ? '已保存 ✓' : '保存设置'}
      </Button>
    </Stack>
  )
}
