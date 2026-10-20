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
  phonetic: string       // 完整音标，如 /ˈæp.əl/
  syllables: Syllable[]
  chinese: string
  image?: string         // 图片文件名（放 public/images/）
  sentenceIds?: string[] // sentences.ts 中的模板 id
}

// ── 句型模板 ──────────────────────────────────────────────────────────────

export type DolchLevel = 'pre-primer' | 'primer' | 'grade1' | 'grade2' | 'grade3' | 'fry'

export interface SentenceSlots {
  [slotName: string]: string[]  // slot名 → 可替换的词 key 列表
}

export interface SentenceTemplate {
  id: string            // 唯一标识，如 'i-see-a-color-fruit'
  en: string            // 英文模板，{slotName} 表示替换位置
  zh: string            // 中文模板，{slotName} 对应位置
  slots?: SentenceSlots // 可替换的词分组
  level: DolchLevel     // 适用等级
}

export interface UnitData {
  id: string
  title: string
  wordKeys: string[]    // dictionary.ts 中的 key 列表
}

export interface SemesterData {
  id: string            // 如 "grade1-s1"
  title: string         // 如 "一年级（上）"
  units: UnitData[]
  color?: string        // 封面主色，如 '#1b6ca8'
  description?: string  // 简介，如 "40个基础单词"
}
