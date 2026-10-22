import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictP: Record<string, WordEntry> = {
  people: { word: 'people', phonetic: '/ˈpiːpəl/', syllables: [{ text: 'peo', phonetic: '/piː/', color: C[0], marks: [{ letters: 'eo', type: 'cluster', phonetic: 'iː', note: 'eo 组合→/iː/（不规则）' }] }, { text: 'ple', phonetic: '/pəl/', color: C[1] }], chinese: '人们' },
  put: { word: 'put', phonetic: '/pʊt/', syllables: [{ text: 'put', phonetic: '/pʊt/', color: C[0] }], chinese: '放' },
  picnic: { word: 'picnic', phonetic: '/ˈpɪknɪk/', syllables: [{ text: 'pic', phonetic: '/pɪk/', color: C[0] }, { text: 'nic', phonetic: '/nɪk/', color: C[1] }], chinese: '野餐' },
  pull: { word: 'pull', phonetic: '/pʊl/', syllables: [{ text: 'pull', phonetic: '/pʊl/', color: C[0] }], chinese: '拉' },
  play: { word: 'play', phonetic: '/pleɪ/', syllables: [{ text: 'play', phonetic: '/pleɪ/', color: C[0], marks: [{ letters: 'ay', type: 'cluster', phonetic: 'eɪ', note: 'ay 词尾→/eɪ/' }] }], chinese: '玩；演奏'  },
  please: { word: 'please', phonetic: '/pliːz/', syllables: [{ text: 'please', phonetic: '/pliːz/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'iː', note: 'ea 组合→/iː/' }, { letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音' }] }], chinese: '请；使高兴'  },
  pretty: { word: 'pretty', phonetic: '/ˈprɪti/', syllables: [{ text: 'pret', phonetic: '/prɪ/', color: C[0] }, { text: 'ty', phonetic: '/ti/', color: C[1] }], chinese: '漂亮的'  },
  pick: { word: 'pick', phonetic: '/pɪk/', syllables: [{ text: 'pick', phonetic: '/pɪk/', color: C[0], marks: [{ letters: 'ck', type: 'cluster', phonetic: 'k', note: 'ck 组合→/k/' }] }], chinese: '摘；挑选' },
  part: { word: 'part', phonetic: '/pɑːrt/', syllables: [{ text: 'part', phonetic: '/pɑːrt/', color: C[0], marks: [{ letters: 'ar', type: 'cluster', phonetic: 'ɑːr', note: 'ar r控制元音→/ɑːr/' }] }], chinese: '部分；角色' },
  place: { word: 'place', phonetic: '/pleɪs/', syllables: [{ text: 'place', phonetic: '/pleɪs/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：a→/eɪ/' }] }], chinese: '地方；放置' },
  picture: { word: 'picture', phonetic: '/ˈpɪktʃər/', syllables: [{ text: 'pic', phonetic: '/pɪk/', color: C[0] }, { text: 'ture', phonetic: '/tʃər/', color: C[1], marks: [{ letters: 'ture', type: 'cluster', phonetic: 'tʃər', note: '-ture 结尾→/tʃər/' }] }], chinese: '图片；图像' },
  page: { word: 'page', phonetic: '/peɪdʒ/', syllables: [{ text: 'page', phonetic: '/peɪdʒ/', color: C[0], marks: [{ letters: 'ge', type: 'cluster', phonetic: 'dʒ', note: 'ge 词尾→/dʒ/' }, { letters: 'e', type: 'silent-e', note: '魔法e：a→/eɪ/' }] }], chinese: '页；网页' },
  paper: { word: 'paper', phonetic: '/ˈpeɪpər/', syllables: [{ text: 'pa', phonetic: '/peɪ/', color: C[0] }, { text: 'per', phonetic: '/pər/', color: C[1], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '纸；报纸' },
  photo: { word: 'photo', phonetic: '/ˈfoʊtoʊ/', syllables: [{ text: 'pho', phonetic: '/foʊ/', color: C[0], marks: [{ letters: 'ph', type: 'cluster', phonetic: 'f', note: 'ph 组合→/f/' }] }, { text: 'to', phonetic: '/toʊ/', color: C[1] }], chinese: '照片' },
  pencil: { word: 'pencil', phonetic: '/ˈpensəl/', syllables: [{ text: 'pen', phonetic: '/pen/', color: C[0] }, { text: 'cil', phonetic: '/səl/', color: C[1] }], chinese: '铅笔' },
  pet: { word: 'pet', phonetic: '/pet/', syllables: [{ text: 'pet', phonetic: '/pet/', color: C[0] }], chinese: '宠物' },
}
