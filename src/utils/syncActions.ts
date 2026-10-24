import { notifications } from '@mantine/notifications'
import { loadSyncConfig, resolveEndpoint, saveSyncConfig, deriveRegion } from '../pages/settings/sync'
import { loadUserProfile } from '../pages/settings/user'
import { applySnapshot, collectSnapshot, downloadSnapshot, uploadSnapshot, type S3ClientConfig } from './s3sync'

export type SyncStatus = 'idle' | 'uploading' | 'downloading' | 'error'

export interface SyncActionCallbacks {
  onStatusChange: (s: SyncStatus) => void
  onError: (msg: string) => void
}

function buildCfg(): S3ClientConfig {
  const config = loadSyncConfig()
  const { username } = loadUserProfile()
  const endpoint = resolveEndpoint(config)
  return {
    endpoint,
    bucket: config.bucket,
    region: config.region || deriveRegion(endpoint),
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    username,
  }
}

export async function runUpload(cb: SyncActionCallbacks): Promise<void> {
  cb.onStatusChange('uploading')
  try {
    const cfg = buildCfg()
    const snapshot = collectSnapshot()
    await uploadSnapshot(cfg, snapshot)
    const config = loadSyncConfig()
    saveSyncConfig({ ...config, lastSyncAt: Date.now() })
    cb.onStatusChange('idle')
    notifications.show({ title: '上传成功', message: '设置已同步到云端', color: 'green' })
  } catch (e) {
    cb.onStatusChange('error')
    cb.onError(e instanceof Error ? e.message : String(e))
  }
}

export async function runDownload(cb: SyncActionCallbacks): Promise<void> {
  cb.onStatusChange('downloading')
  try {
    const cfg = buildCfg()
    const snapshot = await downloadSnapshot(cfg)
    applySnapshot(snapshot)
    const config = loadSyncConfig()
    saveSyncConfig({ ...config, lastSyncAt: Date.now() })
    cb.onStatusChange('idle')
    notifications.show({
      title: '下载成功',
      message: '云端设置已恢复到本地，请刷新页面生效',
      color: 'blue',
    })
  } catch (e) {
    cb.onStatusChange('error')
    cb.onError(e instanceof Error ? e.message : String(e))
  }
}

// Returns true if all required fields for syncing are present
export function canSyncNow(): boolean {
  const config = loadSyncConfig()
  const { username } = loadUserProfile()
  const endpoint = resolveEndpoint(config)
  return !!(username && config.bucket && config.accessKey && config.secretKey && endpoint)
}
