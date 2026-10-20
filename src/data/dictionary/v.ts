import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictV: Record<string, WordEntry> = {
  very: { word: 'very', phonetic: '/ˈveri/', syllables: [{ text: 'ver', phonetic: '/ver/', color: C[0] }, { text: 'y', phonetic: '/i/', color: C[1] }], chinese: '非常' },
}
