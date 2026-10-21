import { SignatureV4 } from '@aws-sdk/signature-v4'
import { Sha256 } from '@aws-crypto/sha256-browser'

// localStorage keys that go into entries.settings (parsed as JSON objects)
const SETTINGS_KEYS = [
  'phonics_pixabay_key',
  'phonics_voice_configs',
  'phonics_ios_voice_config',
  'phonics_img_settings',
  'phonics_sync_config',
]

const IMAGE_CACHE_PREFIX = 'phonics_imgcache_'
const IMAGE_BLACK_PREFIX = 'phonics_imgblack_'

export interface SnapshotEntries {
  // Parsed settings objects keyed by their localStorage key name
  settings: Record<string, unknown>
  cache: {
    // word → list of image URLs
    images: Record<string, string[]>
    // word → list of blacklisted image URLs
    blacklist: Record<string, string[]>
  }
}

export interface SyncSnapshot {
  version: number
  createdAt: number
  entries: SnapshotEntries
}

function tryParseJson(raw: string): unknown {
  try { return JSON.parse(raw) } catch { return raw }
}

export function collectSnapshot(): SyncSnapshot {
  const settings: Record<string, unknown> = {}
  const images: Record<string, string[]> = {}
  const blacklist: Record<string, string[]> = {}

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)!
    const raw = localStorage.getItem(key)
    if (raw === null) continue

    if (SETTINGS_KEYS.includes(key)) {
      settings[key] = tryParseJson(raw)
    } else if (key.startsWith(IMAGE_CACHE_PREFIX)) {
      const word = key.slice(IMAGE_CACHE_PREFIX.length)
      try { images[word] = JSON.parse(raw) } catch {}
    } else if (key.startsWith(IMAGE_BLACK_PREFIX)) {
      const word = key.slice(IMAGE_BLACK_PREFIX.length)
      try { blacklist[word] = JSON.parse(raw) } catch {}
    }
  }

  return {
    version: 2,
    createdAt: Date.now(),
    entries: { settings, cache: { images, blacklist } },
  }
}

export function applySnapshot(snapshot: SyncSnapshot): void {
  const { entries } = snapshot

  // v2 structured format
  if (snapshot.version >= 2 && entries.settings && entries.cache) {
    for (const [key, value] of Object.entries(entries.settings)) {
      try {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
      } catch {}
    }
    for (const [word, urls] of Object.entries(entries.cache.images ?? {})) {
      try { localStorage.setItem(`${IMAGE_CACHE_PREFIX}${word}`, JSON.stringify(urls)) } catch {}
    }
    for (const [word, urls] of Object.entries(entries.cache.blacklist ?? {})) {
      try { localStorage.setItem(`${IMAGE_BLACK_PREFIX}${word}`, JSON.stringify(urls)) } catch {}
    }
    return
  }

  // v1 legacy flat format — entries was Record<string, string>
  const legacy = entries as unknown as Record<string, string>
  for (const [key, value] of Object.entries(legacy)) {
    try { localStorage.setItem(key, value) } catch {}
  }
}

// Build the S3 object key: phonics/{username}/settings.json or phonics/settings.json
export function buildObjectKey(username?: string): string {
  const name = username?.trim()
  return name ? `phonics/${name}/settings.json` : 'phonics/settings.json'
}

export interface S3ClientConfig {
  endpoint: string
  bucket: string
  region: string
  accessKey: string
  secretKey: string
  username?: string
}

function buildSigner(cfg: S3ClientConfig): SignatureV4 {
  return new SignatureV4({
    credentials: { accessKeyId: cfg.accessKey, secretAccessKey: cfg.secretKey },
    region: cfg.region,
    service: 's3',
    sha256: Sha256,
  })
}

export async function uploadSnapshot(cfg: S3ClientConfig, snapshot: SyncSnapshot): Promise<void> {
  const body = JSON.stringify(snapshot)
  const byteLength = new TextEncoder().encode(body).length
  const path = `/${cfg.bucket}/${buildObjectKey(cfg.username)}`
  const url = `https://${cfg.endpoint}${path}`

  const signer = buildSigner(cfg)
  const signed = await signer.sign({
    method: 'PUT',
    hostname: cfg.endpoint,
    path,
    protocol: 'https:',
    headers: {
      host: cfg.endpoint,
      'content-type': 'application/json',
      'content-length': String(byteLength),
    },
    body,
  })

  const response = await fetch(url, {
    method: 'PUT',
    headers: signed.headers as Record<string, string>,
    body,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`上传失败: ${response.status} ${text}`)
  }
}

export async function downloadSnapshot(cfg: S3ClientConfig): Promise<SyncSnapshot> {
  const path = `/${cfg.bucket}/${buildObjectKey(cfg.username)}`
  const url = `https://${cfg.endpoint}${path}`

  const signer = buildSigner(cfg)
  const signed = await signer.sign({
    method: 'GET',
    hostname: cfg.endpoint,
    path,
    protocol: 'https:',
    headers: { host: cfg.endpoint },
  })

  const response = await fetch(url, {
    method: 'GET',
    headers: signed.headers as Record<string, string>,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`下载失败: ${response.status} ${text}`)
  }

  const data = await response.json() as SyncSnapshot
  if (!data.version || !data.entries) throw new Error('云端数据格式无效')
  return data
}
