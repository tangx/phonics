import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictK: Record<string, WordEntry> = {
  kite: { word: 'kite', phonetic: '/kaɪt/', syllables: [{ text: 'kite', phonetic: '/kaɪt/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：让 i 发长音 /aɪ/', affectedVowel: 'i' }] }], chinese: '风筝', image: 'kite.png' },
  king: { word: 'king', phonetic: '/kɪŋ/', syllables: [{ text: 'king', phonetic: '/kɪŋ/', color: C[0], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }], chinese: '国王' },
  know: { word: 'know', phonetic: '/noʊ/', syllables: [{ text: 'know', phonetic: '/noʊ/', color: C[0], marks: [{ letters: 'k', type: 'silent', note: 'kn 组合中 k 不发音' }, { letters: 'ow', type: 'cluster', phonetic: 'oʊ', note: 'ow 组合→/oʊ/' }] }], chinese: '知道'  },
  keep: { word: 'keep', phonetic: '/kiːp/', syllables: [{ text: 'keep', phonetic: '/kiːp/', color: C[0], marks: [{ letters: 'ee', type: 'cluster', phonetic: 'iː', note: 'ee 组合→/iː/' }] }], chinese: '保持；保留'  },
  kind: { word: 'kind', phonetic: '/kaɪnd/', syllables: [{ text: 'kind', phonetic: '/kaɪnd/', color: C[0] }], chinese: '善良的；种类' },
}
