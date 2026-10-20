import { useState } from 'react'
import {
  Anchor, Box, Button, Group, PasswordInput,
  Radio, Stack, Tabs, Text, Title,
} from '@mantine/core'
import { IconPhoto, IconVolume } from '@tabler/icons-react'

// ── 共享常量（与 SettingsModal 保持一致）────────────────────────────────
const VOICE_PRESETS = [
  {
    name: 'Ava（女）- 美式英语',
    voiceName: 'Microsoft Ava Online (Natural) - English (United States)',
  },
  {
    name: 'Eric（男）- 美式英语',
    voiceName: 'Microsoft Eric Online (Natural) - English (United States)',
  },
  {
    name: '系统默认英语语音',
    voiceName: '',
  },
]

const VOICE_KEY = 'phonics_voice_name'
const PIXABAY_KEY_LS = 'phonics_pixabay_key'

function loadVoiceName() {
  try { return localStorage.getItem(VOICE_KEY) ?? VOICE_PRESETS[0].voiceName } catch { return VOICE_PRESETS[0].voiceName }
}
function loadPixabayKey() {
  try { return localStorage.getItem(PIXABAY_KEY_LS) ?? '' } catch { return '' }
}

export default function SettingsPage() {
  const [voiceName, setVoiceName] = useState(loadVoiceName)
  const [pixabayKey, setPixabayKey] = useState(loadPixabayKey)
  const [voiceSaved, setVoiceSaved] = useState(false)
  const [pixabaySaved, setPixabaySaved] = useState(false)

  const handleSaveVoice = () => {
    try { localStorage.setItem(VOICE_KEY, voiceName) } catch {}
    setVoiceSaved(true)
    setTimeout(() => setVoiceSaved(false), 2000)
  }

  const handleSavePixabay = () => {
    try { localStorage.setItem(PIXABAY_KEY_LS, pixabayKey.trim()) } catch {}
    setPixabaySaved(true)
    setTimeout(() => setPixabaySaved(false), 2000)
  }

  const handlePreview = () => {
    if (!('speechSynthesis' in window)) return
    const utter = new SpeechSynthesisUtterance('Hello! This is a test sentence for the phonics app.')
    utter.lang = 'en-US'
    const voices = window.speechSynthesis.getVoices()
    const voice = voiceName
      ? voices.find(v => v.name === voiceName)
      : voices.find(v => v.lang.startsWith('en') && !v.localService) ?? voices.find(v => v.lang.startsWith('en'))
    if (voice) utter.voice = voice
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }

  return (
    <Box p="xl" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title order={2} mb="xl" style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e' }}>
        设置
      </Title>

      <Tabs defaultValue="voice" radius="md">
        <Tabs.List mb="xl">
          <Tabs.Tab value="voice" leftSection={<IconVolume size={15} stroke={1.8} />}>
            语音
          </Tabs.Tab>
          <Tabs.Tab value="image" leftSection={<IconPhoto size={15} stroke={1.8} />}>
            图片
          </Tabs.Tab>
        </Tabs.List>

        {/* ── 语音 tab ── */}
        <Tabs.Panel value="voice">
          <Stack gap="lg">
            <Stack gap={4}>
              <Text fw={600} size="sm">例句朗读语音</Text>
              <Text size="xs" c="dimmed">
                在 Microsoft Edge 浏览器中可使用高质量 Neural 语音。
              </Text>
            </Stack>

            <Stack gap="sm">
              {VOICE_PRESETS.map(preset => (
                <Box
                  key={preset.voiceName}
                  onClick={() => setVoiceName(preset.voiceName)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 12,
                    border: `2px solid ${voiceName === preset.voiceName ? '#1b6ca8' : '#e9ecef'}`,
                    background: voiceName === preset.voiceName ? '#f0f4ff' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <Group justify="space-between">
                    <Stack gap={2}>
                      <Text size="sm" fw={voiceName === preset.voiceName ? 600 : 400}>
                        {preset.name}
                      </Text>
                      {preset.voiceName && (
                        <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                          {preset.voiceName}
                        </Text>
                      )}
                    </Stack>
                    <Radio
                      checked={voiceName === preset.voiceName}
                      onChange={() => setVoiceName(preset.voiceName)}
                      size="sm"
                    />
                  </Group>
                </Box>
              ))}
            </Stack>

            <Group gap="sm">
              <Button
                variant="default"
                radius="xl"
                leftSection={<IconVolume size={14} />}
                onClick={handlePreview}
              >
                试听
              </Button>
              <Button
                onClick={handleSaveVoice}
                radius="xl"
                style={{ background: voiceSaved ? '#2d8a4e' : '#1a1a2e' }}
                flex={1}
              >
                {voiceSaved ? '已保存 ✓' : '保存'}
              </Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        {/* ── 图片 tab ── */}
        <Tabs.Panel value="image">
          <Stack gap="lg">
            <Stack gap={4}>
              <Text fw={600} size="sm">Pixabay API Key</Text>
              <Text size="xs" c="dimmed">
                用于自动获取单词配图，存储在本地浏览器中，不会上传。
              </Text>
            </Stack>

            <PasswordInput
              placeholder="请输入你的 Pixabay API Key"
              value={pixabayKey}
              onChange={(e) => setPixabayKey(e.currentTarget.value)}
              radius="md"
            />

            <Text size="xs" c="dimmed">
              没有 Key？
              <Anchor href="https://pixabay.com/api/docs/" target="_blank" size="xs" ml={4}>
                免费注册获取 →
              </Anchor>
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
