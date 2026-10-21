import { useState } from 'react'
import { Anchor, Button, NumberInput, PasswordInput, Stack, Switch, Text, Title } from '@mantine/core'
import { PIXABAY_KEY_LS } from './voice'
import { loadImageSettings, saveImageSettings } from './image'

function loadPixabayKey() {
  try { return localStorage.getItem(PIXABAY_KEY_LS) ?? '' } catch { return '' }
}

export default function ImageTab() {
  const [pixabayKey, setPixabayKey] = useState(loadPixabayKey)
  const [settings, setSettings] = useState(loadImageSettings)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    try { localStorage.setItem(PIXABAY_KEY_LS, pixabayKey.trim()) } catch {}
    saveImageSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
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
        没有 Key？
        <Anchor href="https://pixabay.com/api/docs/" target="_blank" size="xs" ml={4}>
          免费注册获取 →
        </Anchor>
      </Text>

      <Title order={5} mt="sm" style={{ color: '#1a1a2e' }}>图片缓存</Title>

      <Stack gap={4}>
        <Text fw={600} size="sm">每个单词缓存数量</Text>
        <Text size="xs" c="dimmed">缓存满后不再联网获取，在本地图片间轮询。</Text>
        <NumberInput
          value={settings.cacheSize}
          onChange={v => setSettings(s => ({ ...s, cacheSize: Number(v) || 5 }))}
          min={1}
          max={20}
          radius="md"
          style={{ maxWidth: 120 }}
        />
      </Stack>

      <Switch
        label="随机轮询"
        description="开启后每次显示随机一张缓存图片，否则按顺序显示"
        checked={settings.shuffle}
        onChange={e => setSettings(s => ({ ...s, shuffle: e.currentTarget.checked }))}
      />

      <Stack gap={4}>
        <Text fw={600} size="sm">轮询间隔（秒）</Text>
        <Text size="xs" c="dimmed">每隔多少秒自动切换到下一张缓存图片，设为 0 关闭自动轮询。</Text>
        <NumberInput
          value={settings.interval}
          onChange={v => setSettings(s => ({ ...s, interval: Number(v) }))}
          min={0}
          max={60}
          step={1}
          radius="md"
          style={{ maxWidth: 120 }}
        />
      </Stack>

      <Button onClick={handleSave} radius="xl"
        style={{ background: saved ? '#2d8a4e' : '#1a1a2e' }} fullWidth>
        {saved ? '已保存 ✓' : '保存'}
      </Button>
    </Stack>
  )
}
