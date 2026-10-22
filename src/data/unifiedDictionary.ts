import { dictionary } from './dictionary'
import { sightWordLevels } from './sightWords'
import type { UnifiedEntry } from '../types'

export const unifiedDictionary: Record<string, UnifiedEntry> = {}

// dictionary 词条（完整，含音节）
for (const [key, entry] of Object.entries(dictionary)) {
  unifiedDictionary[key] = { ...entry, source: 'dictionary' }
}

// sight words 补充（dictionary 已有的不覆盖）
for (const level of sightWordLevels) {
  for (const group of level.groups) {
    for (const sw of group.words) {
      const key = sw.word.toLowerCase()
      if (!unifiedDictionary[key]) {
        unifiedDictionary[key] = {
          word: sw.word,
          chinese: sw.chinese,
          phonetic: sw.phonetic,
          isContentWord: sw.isContentWord,
          source: 'sight-word',
        }
      }
    }
  }
}

export const ALL_UNIFIED = Object.values(unifiedDictionary)
