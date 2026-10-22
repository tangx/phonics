import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictY: Record<string, WordEntry> = {
  year: { word: 'year', phonetic: '/jɪər/', syllables: [{ text: 'year', phonetic: '/jɪər/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'ɪər', note: 'ear 组合→/ɪər/' }] }], chinese: '年；岁' },
  your: { word: 'your', phonetic: '/jɔːr/', syllables: [{ text: 'your', phonetic: '/jɔːr/', color: C[0], marks: [{ letters: 'our', type: 'cluster', phonetic: 'ɔːr', note: 'our→/ɔːr/ r控制元音' }] }], chinese: '你的；你们的'  },
  yellow: { word: 'yellow', phonetic: '/ˈjeloʊ/', syllables: [{ text: 'yel', phonetic: '/je/', color: C[0] }, { text: 'low', phonetic: '/loʊ/', color: C[1], marks: [{ letters: 'ow', type: 'cluster', phonetic: 'oʊ', note: 'ow 组合→/oʊ/' }] }], chinese: '黄色'  },
  you: { word: 'you', phonetic: '/juː/', syllables: [{ text: 'you', phonetic: '/juː/', color: C[0] }], chinese: '你；你们'  },
  yes: { word: 'yes', phonetic: '/jes/', syllables: [{ text: 'yes', phonetic: '/jes/', color: C[0] }], chinese: '是的' },
  yummy: { word: 'yummy', phonetic: '/ˈjʌmi/', syllables: [{ text: 'yum', phonetic: '/jʌ/', color: C[0] }, { text: 'my', phonetic: '/mi/', color: C[1] }], chinese: '好吃的' },
}
