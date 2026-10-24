import { useState, useCallback } from 'react'
import type { UnlockMode } from '../types'

const MASTERED_KEY = 'phonics_sw_mastered'   // { [groupId]: string[] }  已掌握单词列表
const UNLOCKED_KEY = 'phonics_sw_unlocked'   // string[]  已解锁组 id
const MODE_KEY     = 'phonics_sight_words_unlock_mode'

// ── 持久化 ────────────────────────────────────────────────────────────────────

function loadMastered(): Record<string, string[]> {
  try { return JSON.parse(localStorage.getItem(MASTERED_KEY) ?? '{}') } catch { return {} }
}
function saveMastered(m: Record<string, string[]>) {
  try { localStorage.setItem(MASTERED_KEY, JSON.stringify(m)) } catch {}
}

function loadUnlocked(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(UNLOCKED_KEY) ?? '[]') as string[]) } catch { return new Set() }
}
function saveUnlocked(s: Set<string>) {
  try { localStorage.setItem(UNLOCKED_KEY, JSON.stringify([...s])) } catch {}
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useSightWordsProgress() {
  const [mastered, setMastered] = useState<Record<string, string[]>>(loadMastered)
  const [unlocked, setUnlocked] = useState<Set<string>>(loadUnlocked)
  const [unlockMode, setUnlockModeState] = useState<UnlockMode>(() => {
    try { return (localStorage.getItem(MODE_KEY) as UnlockMode) ?? 'auto' } catch { return 'auto' }
  })

  // 某词是否已掌握
  const isMastered = useCallback((groupId: string, word: string): boolean => {
    return mastered[groupId]?.includes(word) ?? false
  }, [mastered])

  // 标记掌握 / 取消掌握
  const toggleMastered = useCallback((groupId: string, word: string, totalInGroup: number, nextGroupId?: string) => {
    setMastered(prev => {
      const list = prev[groupId] ?? []
      const already = list.includes(word)
      const next = already ? list.filter(w => w !== word) : [...list, word]
      const updated = { ...prev, [groupId]: next }
      saveMastered(updated)

      // 全组掌握 → 解锁下一组
      if (!already && next.length === totalInGroup && nextGroupId) {
        setUnlocked(u => {
          if (u.has(nextGroupId)) return u
          const nu = new Set(u)
          nu.add(nextGroupId)
          saveUnlocked(nu)
          return nu
        })
      }
      return updated
    })
  }, [])

  // 某组掌握进度 0~1
  const groupProgress = useCallback((groupId: string, total: number): number => {
    return total === 0 ? 0 : (mastered[groupId]?.length ?? 0) / total
  }, [mastered])

  // 组是否已解锁（第一组始终解锁）
  const isGroupUnlocked = useCallback((_levelId: string, groupId: string, groupIndex: number): boolean => {
    if (groupIndex === 0) return true
    return unlocked.has(groupId)
  }, [unlocked])

  const setUnlockMode = useCallback((mode: UnlockMode) => {
    setUnlockModeState(mode)
    try { localStorage.setItem(MODE_KEY, mode) } catch {}
  }, [])

  const resetProgress = useCallback(() => {
    setMastered({})
    setUnlocked(new Set())
    try {
      localStorage.removeItem(MASTERED_KEY)
      localStorage.removeItem(UNLOCKED_KEY)
    } catch {}
  }, [])

  const getMasteredForGroup = useCallback((groupId: string): string[] => {
    return mastered[groupId] ?? []
  }, [mastered])

  const applyRemoteMastered = useCallback((remote: Record<string, string[]>) => {
    setMastered(prev => {
      // 合并：取并集
      const merged: Record<string, string[]> = { ...prev }
      for (const [gid, words] of Object.entries(remote)) {
        const existing = new Set(merged[gid] ?? [])
        for (const w of words) existing.add(w)
        merged[gid] = [...existing]
      }
      saveMastered(merged)
      return merged
    })
  }, [])

  return {
    mastered,
    unlocked,
    unlockMode,
    isMastered,
    toggleMastered,
    groupProgress,
    isGroupUnlocked,
    setUnlockMode,
    resetProgress,
    getMasteredForGroup,
    applyRemoteMastered,
  }
}
