import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictZ: Record<string, WordEntry> = {
  zoo: { word: 'zoo', phonetic: '/zuː/', syllables: [{ text: 'zoo', phonetic: '/zuː/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'uː', note: 'oo 组合→/uː/ 长音' }] }], chinese: '动物园' },
}
