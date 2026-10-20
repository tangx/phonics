import { useState, useEffect } from 'react'

const STORAGE_KEY = 'phonics_pixabay_key'

export function useSettings() {
  const [pixabayKey, setPixabayKey] = useState<string>(() => {
    try { return localStorage.getItem(STORAGE_KEY) ?? '' } catch { return '' }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, pixabayKey) } catch {}
  }, [pixabayKey])

  return { pixabayKey, setPixabayKey }
}
