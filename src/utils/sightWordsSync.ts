/**
 * Sight Words 进度独立同步
 *
 * S3 路径：phonics/users/{username}/sight-words/{levelId}/{groupId}.json
 * 格式：{ version: 1, masteredWords: string[], updatedAt: number }
 */
import { SignatureV4 } from '@aws-sdk/signature-v4'
import { Sha256 } from '@aws-crypto/sha256-browser'
import { loadSyncConfig, resolveEndpoint, deriveRegion } from '../pages/settings/sync'
import { loadUserProfile } from '../pages/settings/user'

export interface GroupProgress {
  version: 1
  masteredWords: string[]
  updatedAt: number
}

function buildSigner() {
  const config = loadSyncConfig()
  const endpoint = resolveEndpoint(config)
  return {
    signer: new SignatureV4({
      credentials: { accessKeyId: config.accessKey, secretAccessKey: config.secretKey },
      region: config.region || deriveRegion(endpoint),
      service: 's3',
      sha256: Sha256,
    }),
    endpoint,
    bucket: config.bucket,
  }
}

function buildPath(bucket: string, username: string, levelId: string, groupId: string): string {
  return `/${bucket}/phonics/users/${username}/sight-words/${levelId}/${groupId}.json`
}

export async function uploadGroupProgress(
  levelId: string,
  groupId: string,
  masteredWords: string[],
): Promise<void> {
  const { username } = loadUserProfile()
  if (!username) return  // 未设置用户名则跳过

  const { signer, endpoint, bucket } = buildSigner()
  const body = JSON.stringify({ version: 1, masteredWords, updatedAt: Date.now() } satisfies GroupProgress)
  const byteLength = new TextEncoder().encode(body).length
  const path = buildPath(bucket, username, levelId, groupId)
  const url = `https://${endpoint}${path}`

  const signed = await signer.sign({
    method: 'PUT',
    hostname: endpoint,
    path,
    protocol: 'https:',
    headers: {
      host: endpoint,
      'content-type': 'application/json',
      'content-length': String(byteLength),
    },
    body,
  })

  const res = await fetch(url, {
    method: 'PUT',
    headers: signed.headers as Record<string, string>,
    body,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`上传失败: ${res.status} ${text}`)
  }
}

export async function downloadGroupProgress(
  levelId: string,
  groupId: string,
): Promise<GroupProgress | null> {
  const { username } = loadUserProfile()
  if (!username) return null

  const { signer, endpoint, bucket } = buildSigner()
  const path = buildPath(bucket, username, levelId, groupId)
  const url = `https://${endpoint}${path}`

  const signed = await signer.sign({
    method: 'GET',
    hostname: endpoint,
    path,
    protocol: 'https:',
    headers: { host: endpoint },
  })

  const res = await fetch(url, {
    method: 'GET',
    headers: signed.headers as Record<string, string>,
  })

  if (res.status === 404) return null
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`下载失败: ${res.status} ${text}`)
  }

  return res.json() as Promise<GroupProgress>
}

export function canSync(): boolean {
  const config = loadSyncConfig()
  const { username } = loadUserProfile()
  const endpoint = resolveEndpoint(config)
  return !!(username && config.bucket && config.accessKey && config.secretKey && endpoint)
}
