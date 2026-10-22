import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictL: Record<string, WordEntry> = {
  long: { word: 'long', phonetic: '/lɒŋ/', syllables: [{ text: 'long', phonetic: '/lɒŋ/', color: C[0], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }], chinese: '长的' },
  leg: { word: 'leg', phonetic: '/leɡ/', syllables: [{ text: 'leg', phonetic: '/leɡ/', color: C[0] }], chinese: '腿' },
  list: { word: 'list', phonetic: '/lɪst/', syllables: [{ text: 'list', phonetic: '/lɪst/', color: C[0] }], chinese: '清单' },
  luck: { word: 'luck', phonetic: '/lʌk/', syllables: [{ text: 'luck', phonetic: '/lʌk/', color: C[0], marks: [{ letters: 'ck', type: 'cluster', phonetic: 'k', note: 'ck 组合→/k/，只发一个 k 音' }] }], chinese: '运气' },
  lantern: { word: 'lantern', phonetic: '/ˈlæntərn/', syllables: [{ text: 'lan', phonetic: '/læn/', color: C[0] }, { text: 'tern', phonetic: '/tərn/', color: C[1] }], chinese: '灯笼' },
  lucky: { word: 'lucky', phonetic: '/ˈlʌki/', syllables: [{ text: 'lu', phonetic: '/lʌ/', color: C[0] }, { text: 'cky', phonetic: '/ki/', color: C[1], marks: [{ letters: 'ck', type: 'cluster', phonetic: 'k', note: 'ck 组合→/k/，只发一个 k 音' }] }], chinese: '幸运的' },
  let: { word: 'let', phonetic: '/let/', syllables: [{ text: 'let', phonetic: '/let/', color: C[0] }], chinese: '让'  },
  live: { word: 'live', phonetic: '/lɪv/', syllables: [{ text: 'live', phonetic: '/lɪv/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: 'v 后必须加 e，不改变 i 的发音（不规则）' }] }], chinese: '居住；生活' },
  little: { word: 'little', phonetic: '/ˈlɪtəl/', syllables: [{ text: 'lit', phonetic: '/lɪ/', color: C[0] }, { text: 'tle', phonetic: '/təl/', color: C[1] }], chinese: '小的；少的'  },
  look: { word: 'look', phonetic: '/lʊk/', syllables: [{ text: 'look', phonetic: '/lʊk/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'ʊ', note: 'oo 组合→/ʊ/（短音）' }] }], chinese: '看；看起来'  },
  like: { word: 'like', phonetic: '/laɪk/', syllables: [{ text: 'like', phonetic: '/laɪk/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，i→/aɪ/', affectedVowel: 'i' }] }], chinese: '喜欢；像'  },
  laugh: { word: 'laugh', phonetic: '/læf/', syllables: [{ text: 'laugh', phonetic: '/læf/', color: C[0], marks: [{ letters: 'gh', type: 'changed', note: 'gh 在此发 /f/（不规则）' }] }], chinese: '笑；笑声' },
  light: { word: 'light', phonetic: '/laɪt/', syllables: [{ text: 'light', phonetic: '/laɪt/', color: C[0], marks: [{ letters: 'igh', type: 'cluster', phonetic: 'aɪ', note: 'igh 组合→/aɪ/' }, { letters: 'gh', type: 'silent', note: 'gh 不发音' }] }], chinese: '光；轻的' },
  land: { word: 'land', phonetic: '/lænd/', syllables: [{ text: 'land', phonetic: '/lænd/', color: C[0] }], chinese: '土地；降落' },
  letter: { word: 'letter', phonetic: '/ˈletər/', syllables: [{ text: 'let', phonetic: '/le/', color: C[0] }, { text: 'ter', phonetic: '/tər/', color: C[1], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '字母；信件' },
  line: { word: 'line', phonetic: '/laɪn/', syllables: [{ text: 'line', phonetic: '/laɪn/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，i→/aɪ/', affectedVowel: 'i' }] }], chinese: '线；排队' },
  love: { word: 'love', phonetic: '/lʌv/', syllables: [{ text: 'love', phonetic: '/lʌv/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: '不规则：末尾 e 不发音，o→/ʌ/ 而非 /oʊ/' }] }], chinese: '爱' },
  learn: { word: 'learn', phonetic: '/lɜːrn/', syllables: [{ text: 'learn', phonetic: '/lɜːrn/', color: C[0], marks: [{ letters: 'ear', type: 'cluster', phonetic: 'ɜːr', note: 'ear→/ɜːr/（learn类，不规则）' }] }], chinese: '学习；学会' },
}
