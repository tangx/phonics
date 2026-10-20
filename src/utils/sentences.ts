import { sentences } from '../data/sentences'
import type { Sentence } from '../types'

/** 返回包含指定词的所有句子 */
export function getSentencesForWord(wordKey: string): Sentence[] {
  return sentences.filter(s => s.words.includes(wordKey))
}

/**
 * 用时间种子从句子列表中随机取一句。
 * seed 相同时返回相同结果，seed 不同时结果不同。
 */
export function pickSentence(list: Sentence[], seed: number): Sentence | null {
  if (list.length === 0) return null
  const idx = seed % list.length
  return list[idx]
}

/**
 * 取下一句（排除 currentId）。
 * 若只有一句则还是返回那句。
 */
export function nextSentence(list: Sentence[], currentId: string, seed: number): Sentence | null {
  if (list.length === 0) return null
  if (list.length === 1) return list[0]
  const others = list.filter(s => s.id !== currentId)
  return pickSentence(others, seed)
}
