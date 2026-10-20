import { useState } from 'react'
import {
  Anchor, Box, Button, Group, PasswordInput,
  Stack, Tabs, Text, Title, UnstyledButton,
} from '@mantine/core'
import { IconCheck, IconPhoto, IconVolume } from '@tabler/icons-react'
import womanSvg from '../assets/woman.svg'
import manSvg from '../assets/man.svg'
import girlSvg from '../assets/girl.svg'
import boySvg from '../assets/boy.svg'

// ── 语音预设 ──────────────────────────────────────────────────────────────
export const VOICE_PRESETS = [
  {
    key: 'ava',
    name: 'Ava',
    label: '美式英语・女',
    voiceName: 'Microsoft Ava Online (Natural) - English (United States)',
    avatar: womanSvg,
    color: '#7b3fa0',
  },
  {
    key: 'eric',
    name: 'Eric',
    label: '美式英语・男',
    voiceName: 'Microsoft Eric Online (Natural) - English (United States)',
    avatar: manSvg,
    color: '#1b6ca8',
  },
  {
    key: 'girl',
    name: 'Girl',
    label: '系统语音・女孩',
    voiceName: '',
    avatar: girlSvg,
    color: '#d64045',
  },
  {
    key: 'boy',
    name: 'Boy',
    label: '系统语音・男孩',
    voiceName: '',
    avatar: boySvg,
    color: '#2d8a4e',
  },
]

export const VOICE_KEY = 'phonics_voice_name'
export const ACTIVE_VOICE_KEY = 'phonics_active_voice'   // 激活的语音 key（用于例句阅读）
const PIXABAY_KEY_LS = 'phonics_pixabay_key'

export function loadVoiceName() {
  try { return localStorage.getItem(VOICE_KEY) ?? VOICE_PRESETS[0].voiceName } catch { return VOICE_PRESETS[0].voiceName }
}
export function loadActiveVoiceKey() {
  try { return localStorage.getItem(ACTIVE_VOICE_KEY) ?? VOICE_PRESETS[0].key } catch { return VOICE_PRESETS[0].key }
}
function loadPixabayKey() {
  try { return localStorage.getItem(PIXABAY_KEY_LS) ?? '' } catch { return '' }
}

// ── 朗读函数（供外部复用）────────────────────────────────────────────────
export function speakWithVoiceName(text: string, vName: string) {
  if (!('speechSynthesis' in window)) return
  const say = (voices: SpeechSynthesisVoice[]) => {
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    const voice = vName
      ? voices.find(v => v.name === vName)
      : voices.find(v => v.lang.startsWith('en') && !v.localService) ?? voices.find(v => v.lang.startsWith('en'))
    if (voice) utter.voice = voice
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) { say(voices) }
  else { window.speechSynthesis.onvoiceschanged = () => { say(window.speechSynthesis.getVoices()); window.speechSynthesis.onvoiceschanged = null } }
}

// ── SettingsPage ──────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [selectedVoice, setSelectedVoice] = useState(loadVoiceName)
  const [activeVoiceKey, setActiveVoiceKey] = useState(loadActiveVoiceKey)
  const [pixabayKey, setPixabayKey] = useState(loadPixabayKey)
  const [voiceSaved, setVoiceSaved] = useState(false)
  const [pixabaySaved, setPixabaySaved] = useState(false)

  const handleSaveVoice = () => {
    try {
      localStorage.setItem(VOICE_KEY, selectedVoice)
      localStorage.setItem(ACTIVE_VOICE_KEY, activeVoiceKey)
    } catch {}
    setVoiceSaved(true)
    setTimeout(() => setVoiceSaved(false), 2000)
  }

  const handleSavePixabay = () => {
    try { localStorage.setItem(PIXABAY_KEY_LS, pixabayKey.trim()) } catch {}
    setPixabaySaved(true)
    setTimeout(() => setPixabaySaved(false), 2000)
  }

  const handlePreview = (vName: string) => {
    speakWithVoiceName('Hello! Nice to meet you. Let\'s learn English together!', vName)
  }

  return (
    <Box p="xl" style={{ maxWidth: 640, margin: '0 auto' }}>
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
          <Stack gap="xl">
            <Stack gap="xs">
              <Text fw={600} size="sm">选择语音</Text>
              <Text size="xs" c="dimmed">在 Microsoft Edge 中可使用高质量 Neural 语音。</Text>
            </Stack>

            {/* 语音卡片网格 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {VOICE_PRESETS.map(preset => {
                const isSelected = selectedVoice === preset.voiceName
                const isActive = activeVoiceKey === preset.key
                return (
                  <UnstyledButton
                    key={preset.key}
                    onClick={() => setSelectedVoice(preset.voiceName)}
                    style={{
                      borderRadius: 16,
                      border: `2px solid ${isSelected ? preset.color : '#e9ecef'}`,
                      background: isSelected ? `${preset.color}10` : '#fff',
                      padding: '16px 14px',
                      transition: 'all 0.15s',
                      position: 'relative',
                    }}
                  >
                    {/* 激活标记 */}
                    {isActive && (
                      <Box style={{
                        position: 'absolute', top: 8, right: 8,
                        width: 18, height: 18, borderRadius: '50%',
                        background: preset.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <IconCheck size={11} color="white" stroke={2.5} />
                      </Box>
                    )}

                    <Stack gap={8} align="center">
                      {/* 头像 */}
                      <img
                        src={preset.avatar}
                        alt={preset.name}
                        style={{ width: 56, height: 56, objectFit: 'contain' }}
                      />

                      {/* 名字 */}
                      <Stack gap={2} align="center">
                        <Text fw={700} size="sm" style={{ color: isSelected ? preset.color : '#1a1a2e' }}>
                          {preset.name}
                        </Text>
                        <Text size="xs" c="dimmed">{preset.label}</Text>
                      </Stack>

                      {/* 操作按钮 */}
                      <Group gap={6} onClick={e => e.stopPropagation()}>
                        {/* 试听 */}
                        <Button
                          size="xs"
                          variant="light"
                          radius="xl"
                          leftSection={<IconVolume size={12} />}
                          color={preset.color}
                          onClick={() => handlePreview(preset.voiceName)}
                          style={{ fontSize: 11 }}
                        >
                          试听
                        </Button>
                        {/* 激活 */}
                        <Button
                          size="xs"
                          radius="xl"
                          variant={isActive ? 'filled' : 'outline'}
                          color={preset.color}
                          leftSection={isActive ? <IconCheck size={11} stroke={2.5} /> : undefined}
                          onClick={() => setActiveVoiceKey(preset.key)}
                          style={{ fontSize: 11 }}
                        >
                          {isActive ? '已激活' : '激活'}
                        </Button>
                      </Group>
                    </Stack>
                  </UnstyledButton>
                )
              })}
            </div>

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
            <Button
              onClick={handleSavePixabay}
              radius="xl"
              style={{ background: pixabaySaved ? '#2d8a4e' : '#1a1a2e' }}
              fullWidth
            >
              {pixabaySaved ? '已保存 ✓' : '保存'}
            </Button>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
