export type LetterMarkType = 'silent-e' | 'silent' | 'changed'

export interface LetterMark {
  letters: string        // 需要标注的字母，如 "e"、"w"、"t"
  type: LetterMarkType
  note: string           // 说明文字，如 "魔法e：让 i 发长音 /aɪ/"
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
}

export interface UnitData {
  id: string
  title: string
  words: WordEntry[]
}
