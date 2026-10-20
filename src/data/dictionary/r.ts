import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictR: Record<string, WordEntry> = {
  run: { word: 'run', phonetic: '/rʌn/', syllables: [{ text: 'run', phonetic: '/rʌn/', color: C[0] }], chinese: '跑'  },
  round: { word: 'round', phonetic: '/raʊnd/', syllables: [{ text: 'round', phonetic: '/raʊnd/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }] }], chinese: '圆的；一圈' },
  read: { word: 'read', phonetic: '/riːd/', syllables: [{ text: 'read', phonetic: '/riːd/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'iː', note: 'ea 组合→/iː/（现在式）' }] }], chinese: '读；阅读'  },
  right: { word: 'right', phonetic: '/raɪt/', syllables: [{ text: 'right', phonetic: '/raɪt/', color: C[0], marks: [{ letters: 'igh', type: 'cluster', phonetic: 'aɪ', note: 'igh 组合→/aɪ/' }, { letters: 'gh', type: 'silent', note: 'gh 不发音' }] }], chinese: '正确的；右边' },
  red: { word: 'red', phonetic: '/red/', syllables: [{ text: 'red', phonetic: '/red/', color: C[0] }], chinese: '红色'  },
  ran: { word: 'ran', phonetic: '/ræn/', syllables: [{ text: 'ran', phonetic: '/ræn/', color: C[0] }], chinese: '跑了（run 过去式）' },
  ride: { word: 'ride', phonetic: '/raɪd/', syllables: [{ text: 'ride', phonetic: '/raɪd/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，i→/aɪ/' }] }], chinese: '骑；乘坐' },
  river: { word: 'river', phonetic: '/ˈrɪvər/', syllables: [{ text: 'riv', phonetic: '/rɪ/', color: C[0] }, { text: 'er', phonetic: '/vər/', color: C[1], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '河流' },
  ruler: { word: 'ruler', phonetic: '/ˈruːlər/', syllables: [{ text: 'ru', phonetic: '/ruː/', color: C[0] }, { text: 'ler', phonetic: '/lər/', color: C[1], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '尺子' },
  rabbit: { word: 'rabbit', phonetic: '/ˈræbɪt/', syllables: [{ text: 'rab', phonetic: '/ræ/', color: C[0] }, { text: 'bit', phonetic: '/bɪt/', color: C[1] }], chinese: '兔子' },
  room: { word: 'room', phonetic: '/ruːm/', syllables: [{ text: 'room', phonetic: '/ruːm/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'uː', note: 'oo 组合→/uː/ 长音' }] }], chinese: '房间' },
  robot: { word: 'robot', phonetic: '/ˈroʊbɒt/', syllables: [{ text: 'ro', phonetic: '/roʊ/', color: C[0] }, { text: 'bot', phonetic: '/bɒt/', color: C[1] }], chinese: '机器人' },
  really: { word: 'really', phonetic: '/ˈrɪəli/', syllables: [{ text: 'rea', phonetic: '/rɪə/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'ɪə', note: 'ea→/ɪə/（r后）' }] }, { text: 'lly', phonetic: '/li/', color: C[1] }], chinese: '真的；确实' },
  rain: { word: 'rain', phonetic: '/reɪn/', syllables: [{ text: 'rain', phonetic: '/reɪn/', color: C[0], marks: [{ letters: 'ai', type: 'cluster', phonetic: 'eɪ', note: 'ai 组合→/eɪ/' }] }], chinese: '雨；下雨' },
}
