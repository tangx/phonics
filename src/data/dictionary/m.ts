import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictM: Record<string, WordEntry> = {
  mouth: { word: 'mouth', phonetic: '/maʊθ/', syllables: [{ text: 'mouth', phonetic: '/maʊθ/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }, { letters: 'th', type: 'cluster', phonetic: 'θ', note: 'th 组合→/θ/' }] }], chinese: '嘴巴' },
  monkey: { word: 'monkey', phonetic: '/ˈmʌŋki/', syllables: [{ text: 'mon', phonetic: '/mʌŋ/', color: C[0] }, { text: 'key', phonetic: '/ki/', color: C[1] }], chinese: '猴子'  },
  milk: { word: 'milk', phonetic: '/mɪlk/', syllables: [{ text: 'milk', phonetic: '/mɪlk/', color: C[0] }], chinese: '牛奶'  },
  meat: { word: 'meat', phonetic: '/miːt/', syllables: [{ text: 'meat', phonetic: '/miːt/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'iː', note: 'ea 组合→/iː/' }] }], chinese: '肉'  },
  mean: { word: 'mean', phonetic: '/miːn/', syllables: [{ text: 'mean', phonetic: '/miːn/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'iː', note: 'ea 组合→/iː/' }] }], chinese: '意思；意味着' },
  may: { word: 'may', phonetic: '/meɪ/', syllables: [{ text: 'may', phonetic: '/meɪ/', color: C[0], marks: [{ letters: 'ay', type: 'cluster', phonetic: 'eɪ', note: 'ay 词尾→/eɪ/' }] }], chinese: '可以；也许'  },
  made: { word: 'made', phonetic: '/meɪd/', syllables: [{ text: 'made', phonetic: '/meɪd/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，a→/eɪ/' }] }], chinese: '制造（过去式）' },
  many: { word: 'many', phonetic: '/ˈmeni/', syllables: [{ text: 'ma', phonetic: '/me/', color: C[0] }, { text: 'ny', phonetic: '/ni/', color: C[1] }], chinese: '许多' },
  make: { word: 'make', phonetic: '/meɪk/', syllables: [{ text: 'make', phonetic: '/meɪk/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，a→/eɪ/' }] }], chinese: '制作；使' },
  me: { word: 'me', phonetic: '/miː/', syllables: [{ text: 'me', phonetic: '/miː/', color: C[0] }], chinese: '我（宾格）'  },
  my: { word: 'my', phonetic: '/maɪ/', syllables: [{ text: 'my', phonetic: '/maɪ/', color: C[0], marks: [{ letters: 'y', type: 'changed', note: '单音节词尾 y→/aɪ/' }] }], chinese: '我的'  },
  must: { word: 'must', phonetic: '/mʌst/', syllables: [{ text: 'must', phonetic: '/mʌst/', color: C[0] }], chinese: '必须' },
  much: { word: 'much', phonetic: '/mʌtʃ/', syllables: [{ text: 'much', phonetic: '/mʌtʃ/', color: C[0], marks: [{ letters: 'ch', type: 'cluster', phonetic: 'tʃ', note: 'ch 组合→/tʃ/' }] }], chinese: '很多；非常' },
  myself: { word: 'myself', phonetic: '/maɪˈself/', syllables: [{ text: 'my', phonetic: '/maɪ/', color: C[0] }, { text: 'self', phonetic: '/self/', color: C[1] }], chinese: '我自己' },
  man: { word: 'man', phonetic: '/mæn/', syllables: [{ text: 'man', phonetic: '/mæn/', color: C[0] }], chinese: '男人；人类' },
  mother: { word: 'mother', phonetic: '/ˈmʌðər/', syllables: [{ text: 'mo', phonetic: '/mʌ/', color: C[0] }, { text: 'ther', phonetic: '/ðər/', color: C[1], marks: [{ letters: 'th', type: 'cluster', phonetic: 'ð', note: 'th 组合→/ð/（浊音）' }, { letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '母亲' },
  mountain: { word: 'mountain', phonetic: '/ˈmaʊntɪn/', syllables: [{ text: 'moun', phonetic: '/maʊn/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }] }, { text: 'tain', phonetic: '/tɪn/', color: C[1] }], chinese: '山；山脉' },
  mile: { word: 'mile', phonetic: '/maɪl/', syllables: [{ text: 'mile', phonetic: '/maɪl/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：i→/aɪ/' }] }], chinese: '英里' },
  meet: { word: 'meet', phonetic: '/miːt/', syllables: [{ text: 'meet', phonetic: '/miːt/', color: C[0], marks: [{ letters: 'ee', type: 'cluster', phonetic: 'iː', note: 'ee 组合→/iː/' }] }], chinese: '见面；遇见' },
  mum: { word: 'mum', phonetic: '/mʌm/', syllables: [{ text: 'mum', phonetic: '/mʌm/', color: C[0] }], chinese: '妈妈' },
  music: { word: 'music', phonetic: '/ˈmjuːzɪk/', syllables: [{ text: 'mu', phonetic: '/mjuː/', color: C[0] }, { text: 'sic', phonetic: '/zɪk/', color: C[1] }], chinese: '音乐' },
  maths: { word: 'maths', phonetic: '/mæθs/', syllables: [{ text: 'maths', phonetic: '/mæθs/', color: C[0], marks: [{ letters: 'th', type: 'cluster', phonetic: 'θ', note: 'th 组合→/θ/（清音）' }] }], chinese: '数学' },
  monday: { word: 'monday', phonetic: '/ˈmʌndeɪ/', syllables: [{ text: 'mon', phonetic: '/mʌn/', color: C[0] }, { text: 'day', phonetic: '/deɪ/', color: C[1], marks: [{ letters: 'ay', type: 'cluster', phonetic: 'eɪ', note: 'ay 组合→/eɪ/' }] }], chinese: '星期一' },
}
