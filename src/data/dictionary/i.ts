import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictI: Record<string, WordEntry> = {
  idea: { word: 'idea', phonetic: '/aɪˈdiːə/', syllables: [{ text: 'i', phonetic: '/aɪ/', color: C[0] }, { text: 'de', phonetic: '/diː/', color: C[1] }, { text: 'a', phonetic: '/ə/', color: C[2] }], chinese: '想法' },
  interesting: { word: 'interesting', phonetic: '/ˈɪntrɪstɪŋ/', syllables: [{ text: 'in', phonetic: '/ɪn/', color: C[0] }, { text: 'ter', phonetic: '/tər/', color: C[1] }, { text: 'est', phonetic: '/ɪst/', color: C[2] }, { text: 'ing', phonetic: '/ɪŋ/', color: C[3], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }], chinese: '有趣的'  },
  its: { word: 'its', phonetic: '/ɪts/', syllables: [{ text: 'its', phonetic: '/ɪts/', color: C[0] }], chinese: '它的' },
  in: { word: 'in', phonetic: '/ɪn/', syllables: [{ text: 'in', phonetic: '/ɪn/', color: C[0] }], chinese: '在…里' },
  is: { word: 'is', phonetic: '/ɪz/', syllables: [{ text: 'is', phonetic: '/ɪz/', color: C[0] }], chinese: '是（第三人称单数）'  },
  it: { word: 'it', phonetic: '/ɪt/', syllables: [{ text: 'it', phonetic: '/ɪt/', color: C[0] }], chinese: '它'  },
  into: { word: 'into', phonetic: '/ˈɪntuː/', syllables: [{ text: 'in', phonetic: '/ɪn/', color: C[0] }, { text: 'to', phonetic: '/tuː/', color: C[1] }], chinese: '进入；到…里' },
  if: { word: 'if', phonetic: '/ɪf/', syllables: [{ text: 'if', phonetic: '/ɪf/', color: C[0] }], chinese: '如果' },
}
