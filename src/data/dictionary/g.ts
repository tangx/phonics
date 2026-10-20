import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictG: Record<string, WordEntry> = {
  go: { word: 'go', phonetic: '/ɡoʊ/', syllables: [{ text: 'go', phonetic: '/ɡoʊ/', color: C[0] }], chinese: '去'  },
  give: { word: 'give', phonetic: '/ɡɪv/', syllables: [{ text: 'give', phonetic: '/ɡɪv/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: 'v 后必须加 e，不改变 i 的发音（不规则）' }] }], chinese: '给'  },
  going: { word: 'going', phonetic: '/ˈɡoʊɪŋ/', syllables: [{ text: 'go', phonetic: '/ɡoʊ/', color: C[0] }, { text: 'ing', phonetic: '/ɪŋ/', color: C[1], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }], chinese: '去（进行时）' },
  gave: { word: 'gave', phonetic: '/ɡeɪv/', syllables: [{ text: 'gave', phonetic: '/ɡeɪv/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: 'v 后必须加 e，a→/eɪ/（魔法e）' }] }], chinese: '给（过去式）' },
  goes: { word: 'goes', phonetic: '/ɡoʊz/', syllables: [{ text: 'goes', phonetic: '/ɡoʊz/', color: C[0] }], chinese: '去（第三人称）'  },
  green: { word: 'green', phonetic: '/ɡriːn/', syllables: [{ text: 'green', phonetic: '/ɡriːn/', color: C[0], marks: [{ letters: 'ee', type: 'cluster', phonetic: 'iː', note: 'ee 组合→/iː/' }] }], chinese: '绿色'  },
  get: { word: 'get', phonetic: '/ɡet/', syllables: [{ text: 'get', phonetic: '/ɡet/', color: C[0] }], chinese: '得到；变得' },
  good: { word: 'good', phonetic: '/ɡʊd/', syllables: [{ text: 'good', phonetic: '/ɡʊd/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'ʊ', note: 'oo 组合→/ʊ/（短音）' }] }], chinese: '好的'  },
  got: { word: 'got', phonetic: '/ɡɒt/', syllables: [{ text: 'got', phonetic: '/ɡɒt/', color: C[0] }], chinese: '得到（get 过去式）' },
  grow: { word: 'grow', phonetic: '/ɡroʊ/', syllables: [{ text: 'grow', phonetic: '/ɡroʊ/', color: C[0], marks: [{ letters: 'ow', type: 'cluster', phonetic: 'oʊ', note: 'ow 组合→/oʊ/' }] }], chinese: '生长；变大'  },
  group: { word: 'group', phonetic: '/ɡruːp/', syllables: [{ text: 'group', phonetic: '/ɡruːp/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'uː', note: 'ou→/uː/（group类不规则）' }] }], chinese: '群组；小组' },
  grandpa: { word: 'grandpa', phonetic: '/ˈɡrændpɑː/', syllables: [{ text: 'grand', phonetic: '/ɡrænd/', color: C[0] }, { text: 'pa', phonetic: '/pɑː/', color: C[1] }], chinese: '爷爷；外公' },
  grandma: { word: 'grandma', phonetic: '/ˈɡrændmɑː/', syllables: [{ text: 'grand', phonetic: '/ɡrænd/', color: C[0] }, { text: 'ma', phonetic: '/mɑː/', color: C[1] }], chinese: '奶奶；外婆' },
  great: { word: 'great', phonetic: '/ɡreɪt/', syllables: [{ text: 'great', phonetic: '/ɡreɪt/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'eɪ', note: '不规则：ea→/eɪ/（通常 ea→/iː/）' }] }], chinese: '很好的；伟大的' },
}
