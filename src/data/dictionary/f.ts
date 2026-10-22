import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictF: Record<string, WordEntry> = {
  face: { word: 'face', phonetic: '/feɪs/', syllables: [{ text: 'face', phonetic: '/feɪs/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，a→/eɪ/', affectedVowel: 'a' }] }], chinese: '脸' },
  fox: { word: 'fox', phonetic: '/fɒks/', syllables: [{ text: 'fox', phonetic: '/fɒks/', color: C[0] }], chinese: '狐狸'  },
  fly: { word: 'fly', phonetic: '/flaɪ/', syllables: [{ text: 'fly', phonetic: '/flaɪ/', color: C[0], marks: [{ letters: 'y', type: 'changed', note: '词尾 y→/aɪ/', affectedVowel: 'y' }] }], chinese: '飞；苍蝇' },
  food: { word: 'food', phonetic: '/fuːd/', syllables: [{ text: 'food', phonetic: '/fuːd/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'uː', note: 'oo 组合→/uː/ 长音' }] }], chinese: '食物'  },
  festival: { word: 'festival', phonetic: '/ˈfestɪvəl/', syllables: [{ text: 'fe', phonetic: '/fe/', color: C[0] }, { text: 'sti', phonetic: '/stɪ/', color: C[1] }, { text: 'val', phonetic: '/vəl/', color: C[2] }], chinese: '节日' },
  from: { word: 'from', phonetic: '/frɒm/', syllables: [{ text: 'from', phonetic: '/frɒm/', color: C[0] }], chinese: '从；来自' },
  fast: { word: 'fast', phonetic: '/fæst/', syllables: [{ text: 'fast', phonetic: '/fæst/', color: C[0] }], chinese: '快的；快速地' },
  first: { word: 'first', phonetic: '/fɜːrst/', syllables: [{ text: 'first', phonetic: '/fɜːrst/', color: C[0], marks: [{ letters: 'ir', type: 'cluster', phonetic: 'ɜːr', note: 'ir r控制元音→/ɜːr/' }] }], chinese: '第一；首先'  },
  five: { word: 'five', phonetic: '/faɪv/', syllables: [{ text: 'five', phonetic: '/faɪv/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: 'v 后必须加 e，i→/aɪ/（魔法e）', affectedVowel: 'i' }] }], chinese: '五' },
  found: { word: 'found', phonetic: '/faʊnd/', syllables: [{ text: 'found', phonetic: '/faʊnd/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }] }], chinese: '找到（过去式）' },
  find: { word: 'find', phonetic: '/faɪnd/', syllables: [{ text: 'find', phonetic: '/faɪnd/', color: C[0] }], chinese: '找到；发现'  },
  for: { word: 'for', phonetic: '/fɔːr/', syllables: [{ text: 'for', phonetic: '/fɔːr/', color: C[0] }], chinese: '为；给'  },
  funny: { word: 'funny', phonetic: '/ˈfʌni/', syllables: [{ text: 'fun', phonetic: '/fʌn/', color: C[0] }, { text: 'ny', phonetic: '/ni/', color: C[1] }], chinese: '有趣的；好笑的'  },
  four: { word: 'four', phonetic: '/fɔːr/', syllables: [{ text: 'four', phonetic: '/fɔːr/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'ɔː', note: 'our 组合→/ɔːr/（不规则）' }] }], chinese: '四' },
  fall: { word: 'fall', phonetic: '/fɔːl/', syllables: [{ text: 'fall', phonetic: '/fɔːl/', color: C[0] }], chinese: '秋天；落下' },
  far: { word: 'far', phonetic: '/fɑːr/', syllables: [{ text: 'far', phonetic: '/fɑːr/', color: C[0], marks: [{ letters: 'ar', type: 'cluster', phonetic: 'ɑːr', note: 'ar r控制元音→/ɑːr/' }] }], chinese: '远的；远地' },
  full: { word: 'full', phonetic: '/fʊl/', syllables: [{ text: 'full', phonetic: '/fʊl/', color: C[0] }], chinese: '满的；饱的' },
  father: { word: 'father', phonetic: '/ˈfɑːðər/', syllables: [{ text: 'fa', phonetic: '/fɑː/', color: C[0] }, { text: 'ther', phonetic: '/ðər/', color: C[1], marks: [{ letters: 'th', type: 'cluster', phonetic: 'ð', note: 'th 组合→/ð/（浊音）' }, { letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '父亲' },
  family: { word: 'family', phonetic: '/ˈfæmɪli/', syllables: [{ text: 'fam', phonetic: '/fæm/', color: C[0] }, { text: 'i', phonetic: '/ɪ/', color: C[1] }, { text: 'ly', phonetic: '/li/', color: C[2] }], chinese: '家庭'  },
  farm: { word: 'farm', phonetic: '/fɑːrm/', syllables: [{ text: 'farm', phonetic: '/fɑːrm/', color: C[0], marks: [{ letters: 'ar', type: 'cluster', phonetic: 'ɑːr', note: 'ar r控制元音→/ɑːr/' }] }], chinese: '农场' },
  feet: { word: 'feet', phonetic: '/fiːt/', syllables: [{ text: 'feet', phonetic: '/fiːt/', color: C[0], marks: [{ letters: 'ee', type: 'cluster', phonetic: 'iː', note: 'ee 组合→/iː/' }] }], chinese: '脚（复数）；英尺' },
  friend: { word: 'friend', phonetic: '/frend/', syllables: [{ text: 'friend', phonetic: '/frend/', color: C[0], marks: [{ letters: 'ie', type: 'cluster', phonetic: 'e', note: 'ie→/e/（不规则，通常 ie→/aɪ/）' }] }], chinese: '朋友' },
  floor: { word: 'floor', phonetic: '/flɔːr/', syllables: [{ text: 'floor', phonetic: '/flɔːr/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'ɔː', note: 'oor→/ɔːr/ r控制（不规则，oo通常→/uː/）' }] }], chinese: '地板；楼层' },
  follow: { word: 'follow', phonetic: '/ˈfɒloʊ/', syllables: [{ text: 'fol', phonetic: '/fɒ/', color: C[0] }, { text: 'low', phonetic: '/loʊ/', color: C[1], marks: [{ letters: 'ow', type: 'cluster', phonetic: 'oʊ', note: 'ow 组合→/oʊ/' }] }], chinese: '跟随' },
  fish: { word: 'fish', phonetic: '/fɪʃ/', syllables: [{ text: 'fish', phonetic: '/fɪʃ/', color: C[0], marks: [{ letters: 'sh', type: 'cluster', phonetic: 'ʃ', note: 'sh 组合→/ʃ/' }] }], chinese: '鱼' },
  football: { word: 'football', phonetic: '/ˈfʊtbɔːl/', syllables: [{ text: 'foot', phonetic: '/fʊt/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'ʊ', note: 'oo 短音→/ʊ/' }] }, { text: 'ball', phonetic: '/bɔːl/', color: C[1] }], chinese: '足球' },
  friday: { word: 'friday', phonetic: '/ˈfraɪdeɪ/', syllables: [{ text: 'fri', phonetic: '/fraɪ/', color: C[0] }, { text: 'day', phonetic: '/deɪ/', color: C[1], marks: [{ letters: 'ay', type: 'cluster', phonetic: 'eɪ', note: 'ay 组合→/eɪ/' }] }], chinese: '星期五' },
}
