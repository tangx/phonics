const CACHE_PREFIX = 'phonics_img_'
const SKIP_PREFIX = 'phonics_img_skip_'

export function getCachedImage(word: string): string | null {
  try { return localStorage.getItem(CACHE_PREFIX + word) } catch { return null }
}

export function setCachedImage(word: string, url: string): void {
  try { localStorage.setItem(CACHE_PREFIX + word, url) } catch {}
}

export function isImageSkipped(word: string, url: string): boolean {
  try {
    const skipped = JSON.parse(localStorage.getItem(SKIP_PREFIX + word) ?? '[]') as string[]
    return skipped.includes(url)
  } catch { return false }
}

export function skipImage(word: string, url: string): void {
  try {
    const skipped = JSON.parse(localStorage.getItem(SKIP_PREFIX + word) ?? '[]') as string[]
    if (!skipped.includes(url)) {
      skipped.push(url)
      localStorage.setItem(SKIP_PREFIX + word, JSON.stringify(skipped))
    }
    // 清除当前缓存，下次加载会拉新图
    localStorage.removeItem(CACHE_PREFIX + word)
  } catch {}
}

export async function fetchPixabayImage(
  word: string,
  chinese: string,
  apiKey: string,
  skip = 0,
  skippedUrls: string[] = [],
): Promise<string | null> {
  for (const q of [word, chinese]) {
    const url = new URL('https://pixabay.com/api/')
    url.searchParams.set('key', apiKey)
    url.searchParams.set('q', q)
    url.searchParams.set('image_type', 'illustration')
    url.searchParams.set('safesearch', 'true')
    url.searchParams.set('per_page', '10')
    url.searchParams.set('lang', 'en')

    try {
      const res = await fetch(url.toString())
      if (!res.ok) continue
      const data = await res.json() as { hits: { webformatURL: string }[] }
      // 过滤掉已跳过的图片
      const candidates = data.hits.filter(h => !skippedUrls.includes(h.webformatURL))
      const pool = candidates.length > 0 ? candidates : data.hits
      if (pool.length > 0) {
        return pool[skip % pool.length].webformatURL
      }
    } catch {
      continue
    }
  }
  return null
}
