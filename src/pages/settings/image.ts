export interface ImageSettings {
  cacheSize: number    // 每个单词缓存图片上限，1–20，默认 5
  shuffle: boolean     // 随机轮询，默认 true
}

export const IMAGE_SETTINGS_KEY = 'phonics_img_settings'

const DEFAULTS: ImageSettings = { cacheSize: 5, shuffle: true }

export function loadImageSettings(): ImageSettings {
  try {
    const raw = localStorage.getItem(IMAGE_SETTINGS_KEY)
    if (!raw) return { ...DEFAULTS }
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch { return { ...DEFAULTS } }
}

export function saveImageSettings(s: ImageSettings): void {
  try { localStorage.setItem(IMAGE_SETTINGS_KEY, JSON.stringify(s)) } catch {}
}
