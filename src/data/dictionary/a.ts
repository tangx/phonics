import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictA: Record<string, WordEntry> = {
  apple: { word: 'apple', phonetic: '/ˈæpəl/', syllables: [{ text: 'ap', phonetic: '/æ/', color: C[0] }, { text: 'ple', phonetic: '/pəl/', color: C[1] }], chinese: '苹果', image: 'apple.png'  },
  arm: { word: 'arm', phonetic: '/ɑːrm/', syllables: [{ text: 'arm', phonetic: '/ɑːrm/', color: C[0] }], chinese: '手臂' },
  animal: { word: 'animal', phonetic: '/ˈænɪməl/', syllables: [{ text: 'an', phonetic: '/æ/', color: C[0] }, { text: 'i', phonetic: '/nɪ/', color: C[1] }, { text: 'mal', phonetic: '/məl/', color: C[2] }], chinese: '动物'  },
  about: { word: 'about', phonetic: '/əˈbaʊt/', syllables: [{ text: 'a', phonetic: '/ə/', color: C[0] }, { text: 'bout', phonetic: '/baʊt/', color: C[1] }], chinese: '关于'  },
  also: { word: 'also', phonetic: '/ˈɔːlsoʊ/', syllables: [{ text: 'al', phonetic: '/ɔːl/', color: C[0] }, { text: 'so', phonetic: '/soʊ/', color: C[1] }], chinese: '也；还有' },
  after: { word: 'after', phonetic: '/ˈæftər/', syllables: [{ text: 'af', phonetic: '/æf/', color: C[0] }, { text: 'ter', phonetic: '/tər/', color: C[1] }], chinese: '在...之后'  },
  again: { word: 'again', phonetic: '/əˈɡen/', syllables: [{ text: 'a', phonetic: '/ə/', color: C[0] }, { text: 'gain', phonetic: '/ɡen/', color: C[1] }], chinese: '再次' },
  an: { word: 'an', phonetic: '/æn/', syllables: [{ text: 'an', phonetic: '/æn/', color: C[0] }], chinese: '一个（元音前）' },
  any: { word: 'any', phonetic: '/ˈeni/', syllables: [{ text: 'an', phonetic: '/en/', color: C[0] }, { text: 'y', phonetic: '/i/', color: C[1] }], chinese: '任何' },
  as: { word: 'as', phonetic: '/æz/', syllables: [{ text: 'as', phonetic: '/æz/', color: C[0] }], chinese: '像；作为' },
  ask: { word: 'ask', phonetic: '/æsk/', syllables: [{ text: 'ask', phonetic: '/æsk/', color: C[0] }], chinese: '问；请求' },
  always: { word: 'always', phonetic: '/ˈɔːlweɪz/', syllables: [{ text: 'al', phonetic: '/ɔːl/', color: C[0] }, { text: 'ways', phonetic: '/weɪz/', color: C[1], marks: [{ letters: 'ay', type: 'cluster', phonetic: 'eɪ', note: 'ay 组合→/eɪ/' }] }], chinese: '总是'  },
  around: { word: 'around', phonetic: '/əˈraʊnd/', syllables: [{ text: 'a', phonetic: '/ə/', color: C[0] }, { text: 'round', phonetic: '/raʊnd/', color: C[1], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }] }], chinese: '在...周围' },
  a: { word: 'a', phonetic: '/ə/', syllables: [{ text: 'a', phonetic: '/ə/', color: C[0] }], chinese: '一（冠词）'  },
  and: { word: 'and', phonetic: '/ænd/', syllables: [{ text: 'and', phonetic: '/ænd/', color: C[0] }], chinese: '和；与'  },
  away: { word: 'away', phonetic: '/əˈweɪ/', syllables: [{ text: 'a', phonetic: '/ə/', color: C[0] }, { text: 'way', phonetic: '/weɪ/', color: C[1], marks: [{ letters: 'ay', type: 'cluster', phonetic: 'eɪ', note: 'ay 词尾→/eɪ/' }] }], chinese: '离开；远离'  },
  all: { word: 'all', phonetic: '/ɔːl/', syllables: [{ text: 'all', phonetic: '/ɔːl/', color: C[0] }], chinese: '全部；所有' },
  am: { word: 'am', phonetic: '/æm/', syllables: [{ text: 'am', phonetic: '/æm/', color: C[0] }], chinese: '是（第一人称单数）' },
  are: { word: 'are', phonetic: '/ɑːr/', syllables: [{ text: 'are', phonetic: '/ɑːr/', color: C[0] }], chinese: '是（复数/第二人称）'  },
  at: { word: 'at', phonetic: '/æt/', syllables: [{ text: 'at', phonetic: '/æt/', color: C[0] }], chinese: '在（时间/地点）'  },
  ate: { word: 'ate', phonetic: '/eɪt/', syllables: [{ text: 'ate', phonetic: '/eɪt/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，a→/eɪ/' }] }], chinese: '吃了（eat 过去式）' },
  answer: { word: 'answer', phonetic: '/ˈænsər/', syllables: [{ text: 'an', phonetic: '/æn/', color: C[0] }, { text: 'swer', phonetic: '/sər/', color: C[1], marks: [{ letters: 'w', type: 'silent', note: 'w 不发音' }, { letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '回答；答案' },
  air: { word: 'air', phonetic: '/eər/', syllables: [{ text: 'air', phonetic: '/eər/', color: C[0], marks: [{ letters: 'air', type: 'cluster', phonetic: 'eər', note: 'air r控制元音→/eər/' }] }], chinese: '空气；空中' },
  afternoon: { word: 'afternoon', phonetic: '/ˌɑːftərˈnuːn/', syllables: [{ text: 'af', phonetic: '/ɑːf/', color: C[0] }, { text: 'ter', phonetic: '/tər/', color: C[1], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }, { text: 'noon', phonetic: '/nuːn/', color: C[2], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'uː', note: 'oo 组合→/uː/' }] }], chinese: '下午' },
  autumn: { word: 'autumn', phonetic: '/ˈɔːtəm/', syllables: [{ text: 'au', phonetic: '/ɔː/', color: C[0], marks: [{ letters: 'au', type: 'cluster', phonetic: 'ɔː', note: 'au 组合→/ɔː/' }] }, { text: 'tumn', phonetic: '/təm/', color: C[1], marks: [{ letters: 'n', type: 'silent', note: '末尾 n 不发音' }] }], chinese: '秋天' },
  art: { word: 'art', phonetic: '/ɑːrt/', syllables: [{ text: 'art', phonetic: '/ɑːrt/', color: C[0], marks: [{ letters: 'ar', type: 'cluster', phonetic: 'ɑːr', note: 'ar r控制元音→/ɑːr/' }] }], chinese: '艺术；美术' },
}
