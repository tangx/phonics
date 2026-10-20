import { useState } from 'react'
import {
  ActionIcon, Anchor, Box, Button, Group, Modal, PasswordInput,
  Radio, Stack, Tabs, Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSettings, IconPhoto, IconVolume } from '@tabler/icons-react'

// ── 语音预设 ──────────────────────────────────────────────────────────────
const VOICE_PRESETS = [
  {
    name: 'Ava（女）- 美式英语',
    voiceName: 'Microsoft Ava Online (Natural) - English (United States)',
    rate: 1, pitch: 1,
  },
  {
    name: 'Eric（男）- 美式英语',
    voiceName: 'Microsoft Eric Online (Natural) - English (United States)',
    rate: 1, pitch: 1,
  },
  {
    name: '系统默认英语语音',
    voiceName: '',
    rate: 1, pitch: 1,
  },
]

const VOICE_KEY = 'phonics_voice_name'

function loadVoiceName(): string {
  try { return localStorage.getItem(VOICE_KEY) ?? VOICE_PRESETS[0].voiceName } catch { return VOICE_PRESETS[0].voiceName }
}
function saveVoiceName(name: string) {
  try { localStorage.setItem(VOICE_KEY, name) } catch {}
}

interface SettingsModalProps {
  pixabayKey: string
  onSave: (key: string) => void
}

export function SettingsButton({ pixabayKey, onSave }: SettingsModalProps) {
  const [opened, { open, close }] = useDisclosure(false)

  // Pixabay tab
  const [pixabayDraft, setPixabayDraft] = useState(pixabayKey)

  // Voice tab
  const [voiceName, setVoiceName] = useState(loadVoiceName)

  const handleOpen = () => {
    setPixabayDraft(pixabayKey)
    setVoiceName(loadVoiceName())
    open()
  }

  const handleSavePixabay = () => {
    onSave(pixabayDraft.trim())
    close()
  }

  const handleSaveVoice = () => {
    saveVoiceName(voiceName)
    close()
  }

  // 预览朗读
  const handlePreview = () => {
    if (!('speechSynthesis' in window)) return
    const utter = new SpeechSynthesisUtterance('Hello! This is a test sentence.')
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
    <>
      <ActionIcon
        variant="subtle"
        size="lg"
        radius="xl"
        aria-label="设置"
        onClick={handleOpen}
        style={{ color: '#6b7280' }}
      >
        <IconSettings size={20} stroke={1.5} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={700} size="lg">设置</Text>}
        centered
        size="md"
        radius="lg"
      >
        <Tabs defaultValue="voice" radius="md">
          <Tabs.List mb="md">
            <Tabs.Tab value="voice" leftSection={<IconVolume size={14} stroke={1.8} />}>
              语音
            </Tabs.Tab>
            <Tabs.Tab value="image" leftSection={<IconPhoto size={14} stroke={1.8} />}>
              图片
            </Tabs.Tab>
          </Tabs.List>

          {/* ── 语音 tab ── */}
          <Tabs.Panel value="voice">
            <Stack gap="md">
              <Text size="sm" fw={500}>例句朗读语音</Text>
              <Stack gap="xs">
                {VOICE_PRESETS.map(preset => (
                  <Box
                    key={preset.voiceName}
                    onClick={() => setVoiceName(preset.voiceName)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: `2px solid ${voiceName === preset.voiceName ? '#1b6ca8' : '#e9ecef'}`,
                      background: voiceName === preset.voiceName ? '#f0f4ff' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Group justify="space-between">
                      <Text size="sm" fw={voiceName === preset.voiceName ? 600 : 400}>
                        {preset.name}
                      </Text>
                      <Radio
                        checked={voiceName === preset.voiceName}
                        onChange={() => setVoiceName(preset.voiceName)}
                        size="sm"
                      />
                    </Group>
                    {preset.voiceName && (
                      <Text size="xs" c="dimmed" mt={2} style={{ fontFamily: 'monospace' }}>
                        {preset.voiceName}
                      </Text>
                    )}
                  </Box>
                ))}
              </Stack>
              <Group gap="sm">
                <Button
                  variant="default"
                  radius="xl"
                  leftSection={<IconVolume size={14} />}
                  onClick={handlePreview}
                  size="sm"
                >
                  试听
                </Button>
                <Button
                  onClick={handleSaveVoice}
                  radius="xl"
                  style={{ background: '#1a1a2e' }}
                  flex={1}
                >
                  保存
                </Button>
              </Group>
              <Text size="xs" c="dimmed">
                需要在 Microsoft Edge 浏览器中才能使用 Neural 语音。
              </Text>
            </Stack>
          </Tabs.Panel>

          {/* ── 图片 tab ── */}
          <Tabs.Panel value="image">
            <Stack gap="md">
              <PasswordInput
                label="Pixabay API Key"
                description="用于自动获取单词配图，存储在本地浏览器中，不会上传"
                placeholder="请输入你的 Pixabay API Key"
                value={pixabayDraft}
                onChange={(e) => setPixabayDraft(e.currentTarget.value)}
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
                style={{ background: '#1a1a2e' }}
                fullWidth
              >
                保存
              </Button>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  )
}
