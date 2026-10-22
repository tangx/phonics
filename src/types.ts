export type LetterMarkType = 'silent-e' | 'silent' | 'changed' | 'cluster'

export interface LetterMark {
  letters: string        // 需要标注的字母，如 "e"、"w"、"t"
  type: LetterMarkType
  note: string           // 说明文字，如 "魔法e：让 i 发长音 /aɪ/"
  phonetic?: string      // cluster 对应的音标片段，用于音节块音标点分隔
}

export interface Syllable {
  text: string           // 音节字母
  phonetic: string       // 对应音标
  color: string          // 音节着色
  marks?: LetterMark[]   // 字母级标注（可选）
}

export interface WordEntry {
  word: string
  phonetic: string       // 完整音标，如 /ˈhæpi/
  syllables: Syllable[]
  chinese: string
  image?: string         // 图片文件名（放 public/images/）
}

// ── 例句 ──────────────────────────────────────────────────────────────────

export interface Sentence {
  id: string             // 唯一标识，如 's001'
  en: string             // 英文句子
  zh: string             // 中文翻译
  words: string[]        // 句中涉及的 dictionary key（用于查询）
}

export interface UnitData {
  id: string
  title: string
  wordKeys: string[]    // dictionary.ts 中的 key 列表
}

export interface SemesterData {
  id: string            // 如 "1a"
  title: string         // 如 "一年级（上）"
  units: UnitData[]
  color?: string        // 封面主色，如 '#1b6ca8'
  description?: string  // 简介
}

// ── Sight Words ───────────────────────────────────────────────────────────────

export interface SightWordEntry {
  word: string
  chinese: string
  phonetic?: string     // fallback 音标（dictionary 里无数据时显示）
  isContentWord?: boolean
}

// 句子难度等级：1=Pre-Primer … 5=Grade3
export type SightSentenceLevel = 1 | 2 | 3 | 4 | 5

export interface SightWordSentence {
  id: string                    // 唯一 id，如 'ss001'
  en: string                    // 英文句子
  zh: string                    // 中文翻译
  words: string[]               // 句中包含的 sight words（用于匹配查询）
  level: SightSentenceLevel     // 句子难度（对应 sight word 等级）
}

export interface SightWordGroup {
  id: string            // 如 "pre-primer-1"
  words: SightWordEntry[]
}

export interface SightWordLevel {
  id: string            // 如 "pre-primer"
  title: string         // 如 "Pre-Primer"
  color: string
  groups: SightWordGroup[]
}

// 解锁模式：auto = 看完自动解锁；quiz = 答对才解锁
export type UnlockMode = 'auto' | 'quiz'

// ── UnifiedEntry ──────────────────────────────────────────────────────────────
// 整合词典的统一词条类型，兼容 dictionary（完整）和 sightWords（轻量）两种来源。
// syllables 可选：有则为完整词条，无则为轻量词条。

export type WordSource = 'dictionary' | 'sight-word' | 'custom'

export interface UnifiedEntry {
  word: string
  chinese: string
  phonetic?: string
  syllables?: Syllable[]
  image?: string
  isContentWord?: boolean
  source: WordSource
}
