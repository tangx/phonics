import { semesters } from '../data/units'
import type { WordEntry, UnifiedEntry } from '../types'

// 单词 key → 第一个出现的 { semesterId, unitId }
const WORD_LOCATION: Record<string, { semesterId: string; unitId: string }> = {}
for (const semester of semesters) {
  for (const unit of semester.units) {
    for (const key of unit.wordKeys) {
      if (!WORD_LOCATION[key]) {
        WORD_LOCATION[key] = { semesterId: semester.id, unitId: unit.id }
      }
    }
  }
}

export function findWordLocation(word: string): { semesterId: string; unitId: string } | null {
  return WORD_LOCATION[word.toLowerCase()] ?? null
}

export function wordEntryToUnified(entry: WordEntry): UnifiedEntry {
  return { ...entry, source: 'dictionary' }
}
