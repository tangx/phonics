const CACHE_LIST_PREFIX = 'phonics_imgcache_'
const BLACK_LIST_PREFIX = 'phonics_imgblack_'

// ── 图片缓存池 ──────────────────────────────────────────────────────────

export function getImageCache(word: string): string[] {
  try { return JSON.parse(localStorage.getItem(CACHE_LIST_PREFIX + word) ?? '[]') } catch { return [] }
}

export function addToImageCache(word: string, url: string, limit: number): void {
  try {
    const list = getImageCache(word)
    if (list.includes(url)) return
    if (list.length >= limit) list.shift()
    list.push(url)
    localStorage.setItem(CACHE_LIST_PREFIX + word, JSON.stringify(list))
  } catch {}
}

export function removeFromImageCache(word: string, url: string): void {
  try {
    const list = getImageCache(word).filter(u => u !== url)
    localStorage.setItem(CACHE_LIST_PREFIX + word, JSON.stringify(list))
  } catch {}
}

export function isCacheFull(word: string, limit: number): boolean {
  return getImageCache(word).length >= limit
}

// ── 黑名单 ──────────────────────────────────────────────────────────────

export function getBlacklist(word: string): string[] {
  try { return JSON.parse(localStorage.getItem(BLACK_LIST_PREFIX + word) ?? '[]') } catch { return [] }
}

export function addToBlacklist(word: string, url: string): void {
  try {
    const list = getBlacklist(word)
    if (!list.includes(url)) {
      list.push(url)
      localStorage.setItem(BLACK_LIST_PREFIX + word, JSON.stringify(list))
    }
  } catch {}
}

export function isBlacklisted(word: string, url: string): boolean {
  return getBlacklist(word).includes(url)
}

// ── 从缓存选一张（过滤黑名单）────────────────────────────────────────────

export function pickFromCache(word: string, random: boolean, exclude?: string): string | null {
  const blacklist = getBlacklist(word)
  const available = getImageCache(word).filter(u => !blacklist.includes(u) && u !== exclude)
  if (!available.length) return null
  if (random) return available[Math.floor(Math.random() * available.length)]
  return available[0]
}

// ── 网络拉取 ────────────────────────────────────────────────────────────

export async function fetchPixabayImage(
  word: string,
  chinese: string,
  apiKey: string,
  excludeUrls: string[] = [],
): Promise<string | null> {
  if (!apiKey) return null
  for (const q of [word, chinese]) {
    const url = new URL('https://pixabay.com/api/')
    url.searchParams.set('key', apiKey)
    url.searchParams.set('q', q)
    url.searchParams.set('image_type', 'illustration')
    url.searchParams.set('safesearch', 'true')
    url.searchParams.set('per_page', '10')   // 减少传输量，够用即可
    url.searchParams.set('lang', 'en')
    url.searchParams.set('order', 'popular')  // 热门图质量更好

    try {
      const res = await fetch(url.toString())
      if (res.status === 400 || res.status === 403) return null
      if (!res.ok) continue
      const data = await res.json() as { hits: { webformatURL: string }[] }
      const candidates = data.hits.filter(h => !excludeUrls.includes(toSmallUrl(h.webformatURL)))
      const pool = candidates.length > 0 ? candidates : data.hits
      if (pool.length > 0) {
        const hit = pool[Math.floor(Math.random() * pool.length)]
        // 将 _640 替换为 _340 获取更小尺寸（约减少 70% 体积），加速显示
        return toSmallUrl(hit.webformatURL)
      }
    } catch {
      continue
    }
  }
  return null
}

/** 将 Pixabay webformatURL 的 _640 替换为 _340 以获取小尺寸版本 */
function toSmallUrl(url: string): string {
  return url.replace(/_640(\.\w+)$/, '_340$1')
}

// ── 旧 API 兼容（已废弃，仅供迁移期过渡）──────────────────────────────────
/** @deprecated 使用 getImageCache */
export function getCachedImage(word: string): string | null {
  const list = getImageCache(word)
  return list.length > 0 ? list[0] : null
}
/** @deprecated 使用 addToImageCache */
export function setCachedImage(word: string, url: string): void {
  addToImageCache(word, url, 5)
}
/** @deprecated 使用 isBlacklisted */
export function isImageSkipped(word: string, url: string): boolean {
  return isBlacklisted(word, url)
}
/** @deprecated 使用 addToBlacklist */
export function skipImage(word: string, url: string): void {
  addToBlacklist(word, url)
  removeFromImageCache(word, url)
}
