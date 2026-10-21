import { useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { IconCloudDownload, IconCloudUpload, IconInfoCircle } from '@tabler/icons-react'
import { type AvatarKey, type UserProfile, loadUserProfile, saveUserProfile } from './user'
import { type SyncStatus, canSyncNow, runDownload, runUpload } from '../../utils/syncActions'

import manSvg from '../../assets/man.svg'
import womanSvg from '../../assets/woman.svg'
import boySvg from '../../assets/boy.svg'
import girlSvg from '../../assets/girl.svg'

const AVATARS: { key: AvatarKey; label: string; src: string }[] = [
  { key: 'boy',   label: '男孩', src: boySvg },
  { key: 'girl',  label: '女孩', src: girlSvg },
  { key: 'man',   label: '男士', src: manSvg },
  { key: 'woman', label: '女士', src: womanSvg },
]

export default function UserTab() {
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile)
  const [usernameInput, setUsernameInput] = useState('')
  const [status, setStatus] = useState<SyncStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)

  const patch = (partial: Partial<UserProfile>) => {
    const updated = { ...profile, ...partial }
    setProfile(updated)
    saveUserProfile(updated)
  }

  const confirmUsername = () => {
    const trimmed = usernameInput.trim()
    if (!trimmed) return
    patch({ username: trimmed })
    setUsernameInput('')
  }

  const selected = AVATARS.find(a => a.key === profile.avatar) ?? AVATARS[0]
  const canSync = canSyncNow()

  const cb = {
    onStatusChange: (s: SyncStatus) => setStatus(s),
    onError: (msg: string) => setErrorMsg(msg),
  }

  const handleUpload = () => { setErrorMsg(''); runUpload(cb) }
  const handleDownloadConfirmed = () => { setConfirmOpen(false); setErrorMsg(''); runDownload(cb) }

  return (
    <Stack gap="lg">
      <Title order={5} style={{ color: '#1a1a2e' }}>用户信息</Title>

      {/* Avatar picker */}
      <Stack gap={8}>
        <Text size="sm" fw={600}>头像</Text>
        <Group gap="md">
          {AVATARS.map(a => (
            <Tooltip key={a.key} label={a.label} withArrow>
              <UnstyledButton onClick={() => patch({ avatar: a.key })}>
                <Box
                  style={{
                    borderRadius: '50%',
                    padding: 3,
                    border: `2px solid ${profile.avatar === a.key ? '#1a1a2e' : 'transparent'}`,
                    transition: 'border-color 0.15s',
                  }}
                >
                  <Avatar src={a.src} size={56} radius="xl" />
                </Box>
              </UnstyledButton>
            </Tooltip>
          ))}
        </Group>
        <Text size="xs" c="dimmed">当前：{selected.label}</Text>
      </Stack>

      {/* Username — read only once set */}
      <TextInput
        label="用户名"
        description="用于云端同步路径，设置后不可修改"
        placeholder="e.g. xiaoming（英文或拼音）"
        value={profile.username ? profile.username : usernameInput}
        onChange={e => { if (!profile.username) setUsernameInput(e.currentTarget.value) }}
        readOnly={!!profile.username}
        radius="md"
        rightSection={
          !profile.username ? (
            <Button
              size="compact-xs"
              radius="md"
              style={{ background: '#1a1a2e' }}
              onClick={confirmUsername}
              disabled={!usernameInput.trim()}
            >
              确认
            </Button>
          ) : undefined
        }
        rightSectionWidth={56}
        styles={profile.username ? {
          input: { cursor: 'not-allowed', opacity: 0.6 },
        } : undefined}
      />

      {/* Display name — editable */}
      <TextInput
        label="展示名"
        placeholder="e.g. 小明"
        description="显示在界面上的名称，可随时修改"
        value={profile.displayName}
        onChange={e => patch({ displayName: e.currentTarget.value })}
        radius="md"
      />

      {profile.username && (
        <Alert icon={<IconInfoCircle size={16} />} color="blue" radius="md" variant="light">
          同步路径：<code>{'<bucket>'}/phonics/{profile.username}/settings.json</code>
        </Alert>
      )}

      {!profile.username && (
        <Text size="xs" c="dimmed">
          未设置用户名时，同步路径为 <code>{'<bucket>'}/phonics/settings.json</code>
        </Text>
      )}

      <Divider />

      {/* Sync actions */}
      <Stack gap={8}>
        <Text size="sm" fw={600}>云端同步</Text>

        {!profile.username && (
          <Alert color="orange" radius="md" variant="light">
            请先设置用户名，才能使用同步功能。
          </Alert>
        )}

        {status === 'error' && (
          <Alert color="red" radius="md">{errorMsg}</Alert>
        )}

        <Group grow>
          <Button
            leftSection={<IconCloudUpload size={16} />}
            loading={status === 'uploading'}
            disabled={!canSync}
            onClick={handleUpload}
            radius="xl"
            style={{ background: '#1a1a2e' }}
          >
            上传到云端
          </Button>
          <Button
            leftSection={<IconCloudDownload size={16} />}
            loading={status === 'downloading'}
            disabled={!canSync}
            onClick={() => setConfirmOpen(true)}
            radius="xl"
            variant="outline"
            color="dark"
          >
            从云端恢复
          </Button>
        </Group>
      </Stack>

      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="确认从云端恢复"
        centered
        radius="md"
      >
        <Stack gap="md">
          <Text size="sm">
            此操作将用云端数据覆盖本地所有 phonics 设置（语音配置、图片缓存、Pixabay Key 等）。确认继续？
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" onClick={() => setConfirmOpen(false)}>取消</Button>
            <Button color="red" onClick={handleDownloadConfirmed}>覆盖本地</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}
