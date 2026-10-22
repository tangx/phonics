import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictU: Record<string, WordEntry> = {
  us: { word: 'us', phonetic: '/ʌs/', syllables: [{ text: 'us', phonetic: '/ʌs/', color: C[0] }], chinese: '我们'  },
  upon: { word: 'upon', phonetic: '/əˈpɒn/', syllables: [{ text: 'u', phonetic: '/ə/', color: C[0] }, { text: 'pon', phonetic: '/pɒn/', color: C[1] }], chinese: '在...上' },
  use: { word: 'use', phonetic: '/juːz/', syllables: [{ text: 'use', phonetic: '/juːz/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，u→/juː/', affectedVowel: 'u' }] }], chinese: '使用' },
  up: { word: 'up', phonetic: '/ʌp/', syllables: [{ text: 'up', phonetic: '/ʌp/', color: C[0] }], chinese: '向上'  },
  under: { word: 'under', phonetic: '/ˈʌndər/', syllables: [{ text: 'un', phonetic: '/ʌn/', color: C[0] }, { text: 'der', phonetic: '/dər/', color: C[1], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '在…下面' },
}
