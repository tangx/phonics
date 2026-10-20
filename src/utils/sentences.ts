import { sentences } from '../data/sentences'
import type { SentenceTemplate } from '../types'

/**
 * 解析一个句型模板，为指定单词生成所有变体句子
 * - 如果模板含 slots，枚举所有 slot 组合，当前词高亮
 * - 返回 { en: string, zh: string, highlighted: string } 数组
 */
export interface RenderedSentence {
  en: string       // 最终英文句子
  zh: string       // 最终中文句子
  template: SentenceTemplate
}

export function renderSentences(
  wordKey: string,
  sentenceIds: string[],
): RenderedSentence[] {
  const result: RenderedSentence[] = []

  for (const id of sentenceIds) {
    const tpl = sentences[id]
    if (!tpl) continue

    if (!tpl.slots) {
      // 无 slot，直接渲染
      result.push({ en: tpl.en, zh: tpl.zh, template: tpl })
      continue
    }

    // 找出哪些 slot 包含当前词
    const activeSlots = Object.entries(tpl.slots)
      .filter(([, values]) => values.includes(wordKey))

    if (activeSlots.length === 0) {
      // 当前词只在 en 固定部分出现，用其他 slot 的第一个值填充
      const filled = fillSlots(tpl.en, tpl.zh, tpl.slots, {})
      result.push({ ...filled, template: tpl })
      continue
    }

    // 对每个包含当前词的 slot，固定当前词，其他 slot 用第一个值填充
    const seen = new Set<string>()
    for (const [activeSlot] of activeSlots) {
      // 固定当前 slot 为 wordKey，其他 slot 循环几个值
      const otherSlots = Object.entries(tpl.slots)
        .filter(([s]) => s !== activeSlot)

      if (otherSlots.length === 0) {
        const override = { [activeSlot]: wordKey }
        const filled = fillSlots(tpl.en, tpl.zh, tpl.slots, override)
        const key = filled.en
        if (!seen.has(key)) { seen.add(key); result.push({ ...filled, template: tpl }) }
      } else {
        // 其他 slot 各取前3个值
        const combinations = cartesian(otherSlots.map(([s, vals]) => vals.slice(0, 3).map(v => [s, v] as [string, string])))
        for (const combo of combinations.slice(0, 3)) {
          const override: Record<string, string> = { [activeSlot]: wordKey }
          for (const [s, v] of combo) override[s] = v
          const filled = fillSlots(tpl.en, tpl.zh, tpl.slots, override)
          const key = filled.en
          if (!seen.has(key)) { seen.add(key); result.push({ ...filled, template: tpl }) }
          if (result.filter(r => r.template.id === id).length >= 3) break
        }
      }
    }
  }

  // 每个模板最多保留3句，总数最多5句
  return result.slice(0, 5)
}

function fillSlots(
  enTpl: string,
  zhTpl: string,
  slots: Record<string, string[]>,
  overrides: Record<string, string>,
): { en: string; zh: string } {
  let en = enTpl
  let zh = zhTpl
  for (const [slot, values] of Object.entries(slots)) {
    const val = overrides[slot] ?? values[0]
    en = en.replaceAll(`{${slot}}`, val)
    zh = zh.replaceAll(`{${slot}}`, val)
  }
  return { en, zh }
}

function cartesian<T>(arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (acc, arr) => acc.flatMap(a => arr.map(b => [...a, b])),
    [[]]
  )
}
