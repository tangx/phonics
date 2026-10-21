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
  for (const q of [word, chinese]) {
    const url = new URL('https://pixabay.com/api/')
    url.searchParams.set('key', apiKey)
    url.searchParams.set('q', q)
    url.searchParams.set('image_type', 'illustration')
    url.searchParams.set('safesearch', 'true')
    url.searchParams.set('per_page', '20')
    url.searchParams.set('lang', 'en')

    try {
      const res = await fetch(url.toString())
      if (!res.ok) continue
      const data = await res.json() as { hits: { webformatURL: string }[] }
      const candidates = data.hits.filter(h => !excludeUrls.includes(h.webformatURL))
      const pool = candidates.length > 0 ? candidates : data.hits
      if (pool.length > 0) {
        return pool[Math.floor(Math.random() * pool.length)].webformatURL
      }
    } catch {
      continue
    }
  }
  return null
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
