import { useState } from 'react'
import { ActionIcon, Anchor, Button, Modal, PasswordInput, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSettings } from '@tabler/icons-react'

interface SettingsModalProps {
  pixabayKey: string
  onSave: (key: string) => void
}

export function SettingsButton({ pixabayKey, onSave }: SettingsModalProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const [draft, setDraft] = useState(pixabayKey)

  const handleOpen = () => {
    setDraft(pixabayKey)
    open()
  }

  const handleSave = () => {
    onSave(draft.trim())
    close()
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
        size="sm"
        radius="lg"
      >
        <Stack gap="md">
          <PasswordInput
            label="Pixabay API Key"
            description="用于自动获取单词配图，存储在本地浏览器中，不会上传"
            placeholder="请输入你的 Pixabay API Key"
            value={draft}
            onChange={(e) => setDraft(e.currentTarget.value)}
            radius="md"
          />
          <Text size="xs" c="dimmed">
            没有 Key？
            <Anchor
              href="https://pixabay.com/api/docs/"
              target="_blank"
              size="xs"
              ml={4}
            >
              免费注册获取 →
            </Anchor>
          </Text>
          <Button
            onClick={handleSave}
            radius="xl"
            style={{ background: '#1a1a2e' }}
            fullWidth
          >
            保存
          </Button>
        </Stack>
      </Modal>
    </>
  )
}
