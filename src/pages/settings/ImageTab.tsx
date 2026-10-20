import { useState } from 'react'
import { Anchor, Button, PasswordInput, Stack, Text } from '@mantine/core'
import { PIXABAY_KEY_LS } from './voice'

function loadPixabayKey() {
  try { return localStorage.getItem(PIXABAY_KEY_LS) ?? '' } catch { return '' }
}

export default function ImageTab() {
  const [pixabayKey, setPixabayKey] = useState(loadPixabayKey)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    try { localStorage.setItem(PIXABAY_KEY_LS, pixabayKey.trim()) } catch {}
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
      <Button onClick={handleSave} radius="xl"
        style={{ background: saved ? '#2d8a4e' : '#1a1a2e' }} fullWidth>
        {saved ? '已保存 ✓' : '保存'}
      </Button>
    </Stack>
  )
}
