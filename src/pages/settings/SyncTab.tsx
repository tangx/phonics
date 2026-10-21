import { useState } from 'react'
import {
  Alert,
  Button,
  Group,
  Modal,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { IconCloudDownload, IconCloudUpload, IconInfoCircle } from '@tabler/icons-react'
import {
  QINIU_REGIONS,
  type SyncConfig,
  deriveRegion,
  loadSyncConfig,
  saveSyncConfig,
} from './sync'
import { loadUserProfile } from './user'
import { buildObjectKey } from '../../utils/s3sync'
import { type SyncStatus, canSyncNow, runDownload, runUpload } from '../../utils/syncActions'

export default function SyncTab() {
  const [config, setConfig] = useState<SyncConfig>(loadSyncConfig)
  const [username, setUsername] = useState(() => loadUserProfile().username)
  const [status, setStatus] = useState<SyncStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)

  const isCustomEndpoint = config.endpoint === ''

  const patch = (partial: Partial<SyncConfig>) =>
    setConfig(prev => ({ ...prev, ...partial }))

  const save = (c: SyncConfig) => saveSyncConfig(c)

  const refreshUsername = () => {
    const u = loadUserProfile().username
    setUsername(u)
  }

  const cb = {
    onStatusChange: (s: SyncStatus) => {
      if (s === 'idle') refreshUsername()
      setStatus(s)
    },
    onError: (msg: string) => setErrorMsg(msg),
  }

  const handleUpload = () => { setErrorMsg(''); runUpload(cb) }
  const handleDownloadConfirmed = () => { setConfirmOpen(false); setErrorMsg(''); runDownload(cb) }

  const canSync = canSyncNow()

  return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Title order={5} style={{ color: '#1a1a2e' }}>云存储提供商</Title>
        <Select
          data={[{ value: 'qiniu', label: '七牛云 (Qiniu Cloud)' }]}
          value={config.provider}
          onChange={() => {}}
          disabled
          radius="md"
        />
        <Text size="xs" c="dimmed">目前仅支持七牛云 S3 兼容 API</Text>
      </Stack>

      <Stack gap={4}>
        <Text fw={600} size="sm">存储区域</Text>
        <Select
          data={QINIU_REGIONS.map(r => ({ value: r.endpoint, label: r.label }))}
          value={config.endpoint}
          onChange={v => {
            const ep = v ?? ''
            const updated = { ...config, endpoint: ep, region: ep ? deriveRegion(ep) : config.region }
            setConfig(updated)
            save(updated)
          }}
          radius="md"
        />
      </Stack>

      {isCustomEndpoint && (
        <TextInput
          label="自定义 Endpoint"
          placeholder="e.g. s3-cn-east-1.qiniucs.com"
          value={config.customEndpoint}
          onChange={e => patch({ customEndpoint: e.currentTarget.value })}
          onBlur={() => save(config)}
          radius="md"
        />
      )}

      <TextInput
        label="Bucket 名称"
        placeholder="your-bucket-name"
        value={config.bucket}
        onChange={e => patch({ bucket: e.currentTarget.value })}
        onBlur={() => save(config)}
        radius="md"
      />

      <TextInput
        label="Access Key"
        placeholder="AK..."
        value={config.accessKey}
        onChange={e => patch({ accessKey: e.currentTarget.value })}
        onBlur={() => save(config)}
        radius="md"
      />

      <PasswordInput
        label="Secret Key"
        placeholder="SK..."
        value={config.secretKey}
        onChange={e => patch({ secretKey: e.currentTarget.value })}
        onBlur={() => save(config)}
        radius="md"
      />

      <Alert icon={<IconInfoCircle size={16} />} color="blue" radius="md" variant="light">
        请在七牛云 Bucket 的跨域(CORS)规则中允许来自本站的 PUT / GET 请求，
        否则浏览器会阻止同步操作。建议设置：来源 <code>*</code>，方法 PUT / GET，
        Headers <code>*</code>。
      </Alert>

      {config.bucket && (
        <Text size="xs" c="dimmed">
          同步路径：{config.bucket}/{buildObjectKey(username)}
        </Text>
      )}

      <Text size="xs" c="dimmed">
        上次同步：{config.lastSyncAt
          ? new Date(config.lastSyncAt).toLocaleString('zh-CN')
          : '从未'}
      </Text>

      {!username && (
        <Alert color="orange" radius="md" variant="light">
          请先在「用户」Tab 设置用户名，才能使用同步功能。
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
