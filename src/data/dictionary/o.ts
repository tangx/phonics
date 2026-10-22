import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictO: Record<string, WordEntry> = {
  often: { word: 'often', phonetic: '/ˈɔːfən/', syllables: [{ text: 'o', phonetic: '/ɔː/', color: C[0] }, { text: 'ften', phonetic: '/fən/', color: C[1], marks: [{ letters: 't', type: 'silent', note: 't 不发音' }] }], chinese: '经常' },
  of: { word: 'of', phonetic: '/ɒv/', syllables: [{ text: 'of', phonetic: '/ɒv/', color: C[0], marks: [{ letters: 'f', type: 'changed', note: '不规则：f→/v/' }] }], chinese: '的' },
  old: { word: 'old', phonetic: '/oʊld/', syllables: [{ text: 'old', phonetic: '/oʊld/', color: C[0] }], chinese: '老的；旧的' },
  once: { word: 'once', phonetic: '/wʌns/', syllables: [{ text: 'once', phonetic: '/wʌns/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: '末尾 e 不发音（不规则，o→/ʌ/）' }] }], chinese: '一次；曾经'  },
  open: { word: 'open', phonetic: '/ˈoʊpən/', syllables: [{ text: 'o', phonetic: '/oʊ/', color: C[0] }, { text: 'pen', phonetic: '/pən/', color: C[1] }], chinese: '打开；开着的' },
  over: { word: 'over', phonetic: '/ˈoʊvər/', syllables: [{ text: 'o', phonetic: '/oʊ/', color: C[0] }, { text: 'ver', phonetic: '/vər/', color: C[1] }], chinese: '在...上方；结束' },
  off: { word: 'off', phonetic: '/ɒf/', syllables: [{ text: 'off', phonetic: '/ɒf/', color: C[0] }], chinese: '离开；关闭' },
  or: { word: 'or', phonetic: '/ɔːr/', syllables: [{ text: 'or', phonetic: '/ɔːr/', color: C[0], marks: [{ letters: 'or', type: 'cluster', phonetic: 'ɔːr', note: 'or r控制元音→/ɔːr/' }] }], chinese: '或者' },
  one: { word: 'one', phonetic: '/wʌn/', syllables: [{ text: 'one', phonetic: '/wʌn/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: '末尾 e 不发音（不规则）' }] }], chinese: '一；一个'  },
  on: { word: 'on', phonetic: '/ɒn/', syllables: [{ text: 'on', phonetic: '/ɒn/', color: C[0] }], chinese: '在…上' },
  our: { word: 'our', phonetic: '/aʊər/', syllables: [{ text: 'our', phonetic: '/aʊər/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }] }], chinese: '我们的' },
  out: { word: 'out', phonetic: '/aʊt/', syllables: [{ text: 'out', phonetic: '/aʊt/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }] }], chinese: '出；向外' },
  only: { word: 'only', phonetic: '/ˈoʊnli/', syllables: [{ text: 'o', phonetic: '/oʊ/', color: C[0] }, { text: 'nly', phonetic: '/nli/', color: C[1] }], chinese: '只；仅仅' },
  own: { word: 'own', phonetic: '/oʊn/', syllables: [{ text: 'own', phonetic: '/oʊn/', color: C[0], marks: [{ letters: 'ow', type: 'cluster', phonetic: 'oʊ', note: 'ow 组合→/oʊ/' }] }], chinese: '自己的；拥有'  },
  ok: { word: 'ok', phonetic: '/oʊˈkeɪ/', syllables: [{ text: 'o', phonetic: '/oʊ/', color: C[0] }, { text: 'k', phonetic: '/keɪ/', color: C[1] }], chinese: '好的；可以' },
  orange: { word: 'orange', phonetic: '/ˈɒrɪndʒ/', syllables: [{ text: 'or', phonetic: '/ɒr/', color: C[0], marks: [{ letters: 'or', type: 'cluster', phonetic: 'ɒr', note: 'or r控制元音→/ɒr/' }] }, { text: 'ange', phonetic: '/ɪndʒ/', color: C[1] }], chinese: '橙子；橙色' },
  oh: { word: 'oh', phonetic: '/oʊ/', syllables: [{ text: 'oh', phonetic: '/oʊ/', color: C[0], marks: [{ letters: 'h', type: 'silent', note: 'h 不发音' }] }], chinese: '哦；啊' },
  outside: { word: 'outside', phonetic: '/ˌaʊtˈsaɪd/', syllables: [{ text: 'out', phonetic: '/aʊt/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }] }, { text: 'side', phonetic: '/saɪd/', color: C[1], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：i→/aɪ/' }] }], chinese: '外面；在外面' },
}
