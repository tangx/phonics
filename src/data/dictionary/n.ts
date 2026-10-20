import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictN: Record<string, WordEntry> = {
  nose: { word: 'nose', phonetic: '/noʊz/', syllables: [{ text: 'nose', phonetic: '/noʊz/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，o→/oʊ/' }] }], chinese: '鼻子' },
  now: { word: 'now', phonetic: '/naʊ/', syllables: [{ text: 'now', phonetic: '/naʊ/', color: C[0] }], chinese: '现在' },
  neck: { word: 'neck', phonetic: '/nek/', syllables: [{ text: 'neck', phonetic: '/nek/', color: C[0], marks: [{ letters: 'ck', type: 'cluster', phonetic: 'k', note: 'ck 组合→/k/，只发一个 k 音' }] }], chinese: '脖子' },
  new: { word: 'new', phonetic: '/njuː/', syllables: [{ text: 'new', phonetic: '/njuː/', color: C[0] }], chinese: '新的' },
  not: { word: 'not', phonetic: '/nɒt/', syllables: [{ text: 'not', phonetic: '/nɒt/', color: C[0] }], chinese: '不；没有'  },
  no: { word: 'no', phonetic: '/noʊ/', syllables: [{ text: 'no', phonetic: '/noʊ/', color: C[0] }], chinese: '不；没有' },
  never: { word: 'never', phonetic: '/ˈnevər/', syllables: [{ text: 'nev', phonetic: '/ne/', color: C[0] }, { text: 'er', phonetic: '/vər/', color: C[1], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '从不；绝不'  },
  number: { word: 'number', phonetic: '/ˈnʌmbər/', syllables: [{ text: 'num', phonetic: '/nʌm/', color: C[0] }, { text: 'ber', phonetic: '/bər/', color: C[1], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '数字；号码' },
  nice: { word: 'nice', phonetic: '/naɪs/', syllables: [{ text: 'nice', phonetic: '/naɪs/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，i→/aɪ/' }] }], chinese: '好的；友善的' },
  name: { word: 'name', phonetic: '/neɪm/', syllables: [{ text: 'name', phonetic: '/neɪm/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，a→/eɪ/' }] }], chinese: '名字' },
  nine: { word: 'nine', phonetic: '/naɪn/', syllables: [{ text: 'nine', phonetic: '/naɪn/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，i→/aɪ/' }] }], chinese: '九' },
  need: { word: 'need', phonetic: '/niːd/', syllables: [{ text: 'need', phonetic: '/niːd/', color: C[0], marks: [{ letters: 'ee', type: 'cluster', phonetic: 'iː', note: 'ee 组合→/iː/' }] }], chinese: '需要' },
}
