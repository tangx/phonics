import { useState } from 'react'
import type { UnlockMode } from '../types'

const PROGRESS_KEY = 'phonics_sight_words_progress'
const MODE_KEY = 'phonics_sight_words_unlock_mode'

function loadUnlocked(): Set<string> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

function saveUnlocked(unlocked: Set<string>) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...unlocked]))
  } catch {}
}

export function useSightWordsProgress() {
  const [unlocked, setUnlocked] = useState<Set<string>>(loadUnlocked)
  const [unlockMode, setUnlockModeState] = useState<UnlockMode>(() => {
    try {
      return (localStorage.getItem(MODE_KEY) as UnlockMode) ?? 'auto'
    } catch {
      return 'auto'
    }
  })

  function isGroupUnlocked(_levelId: string, groupId: string, groupIndex: number): boolean {
    // 每级第一组始终解锁
    if (groupIndex === 0) return true
    return unlocked.has(groupId)
  }

  function unlockGroup(groupId: string) {
    setUnlocked(prev => {
      const next = new Set(prev)
      next.add(groupId)
      saveUnlocked(next)
      return next
    })
  }

  function setUnlockMode(mode: UnlockMode) {
    setUnlockModeState(mode)
    try { localStorage.setItem(MODE_KEY, mode) } catch {}
  }

  function resetProgress() {
    setUnlocked(new Set())
    try { localStorage.removeItem(PROGRESS_KEY) } catch {}
  }

  return { unlocked, unlockMode, isGroupUnlocked, unlockGroup, setUnlockMode, resetProgress }
}
