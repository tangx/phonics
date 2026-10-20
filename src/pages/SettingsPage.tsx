import { useEffect, useState } from 'react'
import {
  Anchor, Box, Button, Collapse, Group, PasswordInput,
  Select, Slider, Stack, Switch, Tabs, Text, Title,
} from '@mantine/core'
import { IconChevronDown, IconChevronUp, IconPhoto, IconVolume } from '@tabler/icons-react'
import womanSvg from '../assets/woman.svg'
import manSvg from '../assets/man.svg'
import girlSvg from '../assets/girl.svg'
import boySvg from '../assets/boy.svg'

// ── 语音槽位定义 ────────────────────────────────────────────────────────
export type VoiceSlot = 'man' | 'woman' | 'boy' | 'girl'

export interface VoiceConfig {
  slot: VoiceSlot
  voiceName: string   // SpeechSynthesisVoice.name，空则系统默认英语
  rate: number        // 0.5 ~ 2，默认 1
  pitch: number       // 0.5 ~ 2，默认 1
  active: boolean     // 是否激活（用于例句阅读）
}

export const SLOT_META: Record<VoiceSlot, { label: string; avatar: string; color: string; defaultVoice: string }> = {
  woman: { label: 'Woman', avatar: womanSvg, color: '#7b3fa0', defaultVoice: 'Microsoft Ava Online (Natural) - English (United States)' },
  man:   { label: 'Man',   avatar: manSvg,   color: '#1b6ca8', defaultVoice: 'Microsoft Eric Online (Natural) - English (United States)' },
  girl:  { label: 'Girl',  avatar: girlSvg,  color: '#d64045', defaultVoice: '' },
  boy:   { label: 'Boy',   avatar: boySvg,   color: '#2d8a4e', defaultVoice: '' },
}

const SLOT_ORDER: VoiceSlot[] = ['man', 'woman', 'boy', 'girl']

const VOICE_CONFIG_KEY = 'phonics_voice_configs'
const PIXABAY_KEY_LS = 'phonics_pixabay_key'

function defaultConfigs(): Record<VoiceSlot, VoiceConfig> {
  return {
    man:    { slot: 'man',    voiceName: SLOT_META.man.defaultVoice,    rate: 1, pitch: 1, active: true },
    woman:  { slot: 'woman',  voiceName: SLOT_META.woman.defaultVoice,  rate: 1, pitch: 1, active: true },
    boy:    { slot: 'boy',    voiceName: SLOT_META.boy.defaultVoice,    rate: 1, pitch: 1, active: false },
    girl:   { slot: 'girl',   voiceName: SLOT_META.girl.defaultVoice,   rate: 1, pitch: 1, active: false },
  }
}

export function loadVoiceConfigs(): Record<VoiceSlot, VoiceConfig> {
  try {
    const raw = localStorage.getItem(VOICE_CONFIG_KEY)
    if (!raw) return defaultConfigs()
    return { ...defaultConfigs(), ...JSON.parse(raw) }
  } catch { return defaultConfigs() }
}

function saveVoiceConfigs(configs: Record<VoiceSlot, VoiceConfig>) {
  try { localStorage.setItem(VOICE_CONFIG_KEY, JSON.stringify(configs)) } catch {}
}

function loadPixabayKey() {
  try { return localStorage.getItem(PIXABAY_KEY_LS) ?? '' } catch { return '' }
}

// ── 朗读函数 ────────────────────────────────────────────────────────────
export function speakWithConfig(text: string, config: VoiceConfig) {
  if (!('speechSynthesis' in window)) return
  const say = (voices: SpeechSynthesisVoice[]) => {
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    utter.rate = config.rate
    utter.pitch = config.pitch
    const voice = config.voiceName
      ? voices.find(v => v.name === config.voiceName)
      : voices.find(v => v.lang.startsWith('en') && !v.localService) ?? voices.find(v => v.lang.startsWith('en'))
    if (voice) utter.voice = voice
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) { say(voices) }
  else { window.speechSynthesis.onvoiceschanged = () => { say(window.speechSynthesis.getVoices()); window.speechSynthesis.onvoiceschanged = null } }
}

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
      {/* 主行 */}
      <Group px="md" py="sm" gap="sm" wrap="nowrap"
        style={{ background: config.active ? `${meta.color}08` : '#fff' }}>
        {/* 头像 */}
        <img src={meta.avatar} alt={meta.label}
          style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }} />

        {/* 名称 + 语音名 */}
        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
          <Text size="sm" fw={600} style={{ color: meta.color }}>{meta.label}</Text>
          <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {config.voiceName || '系统默认英语语音'}
          </Text>
        </Stack>

        {/* 试听 */}
        <Button size="xs" variant="subtle" radius="xl" px={8}
          leftSection={<IconVolume size={12} />}
          color={meta.color}
          onClick={() => speakWithConfig('Hello! Nice to meet you.', config)}>
          试听
        </Button>

        {/* 激活开关 */}
        <Switch
          checked={config.active}
          onChange={e => onChange({ ...config, active: e.currentTarget.checked })}
          color={meta.color}
          size="sm"
        />

        {/* 展开配置 */}
        <Button size="xs" variant="subtle" px={6} color="gray"
          onClick={() => setExpanded(v => !v)}>
          {expanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        </Button>
      </Group>

      {/* 配置面板 */}
      <Collapse expanded={expanded}>
        <Stack gap="md" p="md" style={{ background: '#f8f9fa', borderTop: '1px solid #e9ecef' }}>
          {/* 语音选择 */}
          <Select
            label="语音"
            placeholder="选择 Natural 语音"
            data={[{ value: '', label: '系统默认英语语音' }, ...naturalVoices]}
            value={config.voiceName}
            onChange={v => onChange({ ...config, voiceName: v ?? '' })}
            searchable
            size="sm"
            radius="md"
          />

          {/* 语速 */}
          <Stack gap={4}>
            <Group justify="space-between">
              <Text size="xs" fw={500}>语速</Text>
              <Text size="xs" c="dimmed">{config.rate.toFixed(1)}x</Text>
            </Group>
            <Slider
              value={config.rate}
              onChange={v => onChange({ ...config, rate: v })}
              min={0.5} max={2} step={0.1}
              color={meta.color}
              size="sm"
              marks={[{ value: 0.5, label: '0.5x' }, { value: 1, label: '1x' }, { value: 2, label: '2x' }]}
            />
          </Stack>

          {/* 音调 */}
          <Stack gap={4}>
            <Group justify="space-between">
              <Text size="xs" fw={500}>音调</Text>
              <Text size="xs" c="dimmed">{config.pitch.toFixed(1)}</Text>
            </Group>
            <Slider
              value={config.pitch}
              onChange={v => onChange({ ...config, pitch: v })}
              min={0.5} max={2} step={0.1}
              color={meta.color}
              size="sm"
              marks={[{ value: 0.5, label: '低' }, { value: 1, label: '正常' }, { value: 2, label: '高' }]}
            />
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  )
}

// ── SettingsPage ────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [configs, setConfigs] = useState<Record<VoiceSlot, VoiceConfig>>(loadVoiceConfigs)
  const [naturalVoices, setNaturalVoices] = useState<{ value: string; label: string }[]>([])
  const [pixabayKey, setPixabayKey] = useState(loadPixabayKey)
  const [voiceSaved, setVoiceSaved] = useState(false)
  const [pixabaySaved, setPixabaySaved] = useState(false)

  // 加载 Edge Natural 语音列表
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

  const handleChange = (slot: VoiceSlot, c: VoiceConfig) => {
    setConfigs(prev => ({ ...prev, [slot]: c }))
  }

  const handleSaveVoice = () => {
    saveVoiceConfigs(configs)
    setVoiceSaved(true)
    setTimeout(() => setVoiceSaved(false), 2000)
  }

  const handleSavePixabay = () => {
    try { localStorage.setItem(PIXABAY_KEY_LS, pixabayKey.trim()) } catch {}
    setPixabaySaved(true)
    setTimeout(() => setPixabaySaved(false), 2000)
  }

  return (
    <Box p="xl" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title order={2} mb="xl" style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e' }}>
        设置
      </Title>

      <Tabs defaultValue="voice" radius="md">
        <Tabs.List mb="xl">
          <Tabs.Tab value="voice" leftSection={<IconVolume size={15} stroke={1.8} />}>语音</Tabs.Tab>
          <Tabs.Tab value="image" leftSection={<IconPhoto size={15} stroke={1.8} />}>图片</Tabs.Tab>
        </Tabs.List>

        {/* ── 语音 tab ── */}
        <Tabs.Panel value="voice">
          <Stack gap="md">
            <Text size="xs" c="dimmed">
              激活的语音将用于例句朗读。在 Microsoft Edge 中可获取 Natural 语音列表。
            </Text>

            {SLOT_ORDER.map(slot => (
              <VoiceRow
                key={slot}
                config={configs[slot]}
                naturalVoices={naturalVoices}
                onChange={c => handleChange(slot, c)}
              />
            ))}

            <Button
              onClick={handleSaveVoice}
              radius="xl"
              style={{ background: voiceSaved ? '#2d8a4e' : '#1a1a2e' }}
              fullWidth
            >
              {voiceSaved ? '已保存 ✓' : '保存设置'}
            </Button>
          </Stack>
        </Tabs.Panel>

        {/* ── 图片 tab ── */}
        <Tabs.Panel value="image">
          <Stack gap="lg">
            <Stack gap={4}>
              <Text fw={600} size="sm">Pixabay API Key</Text>
              <Text size="xs" c="dimmed">用于自动获取单词配图，存储在本地浏览器中，不会上传。</Text>
            </Stack>
            <PasswordInput
              placeholder="请输入你的 Pixabay API Key"
              value={pixabayKey}
              onChange={e => setPixabayKey(e.currentTarget.value)}
              radius="md"
            />
            <Text size="xs" c="dimmed">
              没有 Key？<Anchor href="https://pixabay.com/api/docs/" target="_blank" size="xs" ml={4}>免费注册获取 →</Anchor>
            </Text>
            <Button onClick={handleSavePixabay} radius="xl"
              style={{ background: pixabaySaved ? '#2d8a4e' : '#1a1a2e' }} fullWidth>
              {pixabaySaved ? '已保存 ✓' : '保存'}
            </Button>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
