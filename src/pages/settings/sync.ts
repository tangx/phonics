export type SyncProvider = 'qiniu'

export interface QiniuRegion {
  label: string
  endpoint: string
}

export const QINIU_REGIONS: QiniuRegion[] = [
  { label: '华东-浙江 (z0)', endpoint: 's3-cn-east-1.qiniucs.com' },
  { label: '华东-浙江2 (cn-east-2)', endpoint: 's3-cn-east-2.qiniucs.com' },
  { label: '华北-河北 (z1)', endpoint: 's3-cn-north-1.qiniucs.com' },
  { label: '华南-广东 (z2)', endpoint: 's3-cn-south-1.qiniucs.com' },
  { label: '北美-洛杉矶 (na0)', endpoint: 's3-us-west-1.qiniucs.com' },
  { label: '亚太-新加坡 (as0)', endpoint: 's3-ap-southeast-1.qiniucs.com' },
  { label: '亚太-河内 (ap-southeast-2)', endpoint: 's3-ap-southeast-2.qiniucs.com' },
  { label: '亚太-首尔 (ap-northeast-1)', endpoint: 's3-ap-northeast-1.qiniucs.com' },
  { label: '自定义', endpoint: '' },
]

export interface SyncConfig {
  provider: SyncProvider
  endpoint: string
  customEndpoint: string
  region: string
  bucket: string
  accessKey: string
  secretKey: string
  lastSyncAt: number | null
}

export const SYNC_CONFIG_KEY = 'phonics_sync_config'

const DEFAULTS: SyncConfig = {
  provider: 'qiniu',
  endpoint: 's3-cn-east-1.qiniucs.com',
  customEndpoint: '',
  region: 'cn-east-1',
  bucket: '',
  accessKey: '',
  secretKey: '',
  lastSyncAt: null,
}

export function loadSyncConfig(): SyncConfig {
  try {
    const raw = localStorage.getItem(SYNC_CONFIG_KEY)
    if (!raw) return { ...DEFAULTS }
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch { return { ...DEFAULTS } }
}

export function saveSyncConfig(c: SyncConfig): void {
  try { localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(c)) } catch {}
}

export function clearSyncConfig(): void {
  try { localStorage.removeItem(SYNC_CONFIG_KEY) } catch {}
}

export function resolveEndpoint(c: SyncConfig): string {
  return c.endpoint === '' ? c.customEndpoint : c.endpoint
}

export function deriveRegion(endpoint: string): string {
  const match = endpoint.match(/^s3-(.+)\.qiniucs\.com$/)
  return match ? match[1] : 'us-east-1'
}
