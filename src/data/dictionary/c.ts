import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictC: Record<string, WordEntry> = {
  can: { word: 'can', phonetic: '/kæn/', syllables: [{ text: 'can', phonetic: '/kæn/', color: C[0] }], chinese: '能；罐头'  },
  come: { word: 'come', phonetic: '/kʌm/', syllables: [{ text: 'come', phonetic: '/kʌm/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: '魔法e（不规则）：o→/ʌ/ 而非 /oʊ/' }] }], chinese: '来'  },
  celebrate: { word: 'celebrate', phonetic: '/ˈselɪbreɪt/', syllables: [{ text: 'cel', phonetic: '/se/', color: C[0] }, { text: 'e', phonetic: '/lɪ/', color: C[1] }, { text: 'brate', phonetic: '/breɪt/', color: C[2], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音' }] }], chinese: '庆祝' },
  clothes: { word: 'clothes', phonetic: '/kloʊðz/', syllables: [{ text: 'clothes', phonetic: '/kloʊðz/', color: C[0], marks: [{ letters: 'th', type: 'cluster', phonetic: 'ð', note: 'th 组合→/ð/（浊音）' }, { letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音' }] }], chinese: '衣服'  },
  candy: { word: 'candy', phonetic: '/ˈkændi/', syllables: [{ text: 'can', phonetic: '/kæn/', color: C[0] }, { text: 'dy', phonetic: '/di/', color: C[1] }], chinese: '糖果' },
  could: { word: 'could', phonetic: '/kʊd/', syllables: [{ text: 'could', phonetic: '/kʊd/', color: C[0], marks: [{ letters: 'oul', type: 'cluster', phonetic: 'ʊ', note: '-ould 中 oul→/ʊ/' }, { letters: 'd', type: 'silent', note: 'd 不发音（could/would/should）' }] }], chinese: '能；可以（过去式）' },
  call: { word: 'call', phonetic: '/kɔːl/', syllables: [{ text: 'call', phonetic: '/kɔːl/', color: C[0] }], chinese: '叫；打电话' },
  cold: { word: 'cold', phonetic: '/koʊld/', syllables: [{ text: 'cold', phonetic: '/koʊld/', color: C[0] }], chinese: '冷的；感冒' },
  came: { word: 'came', phonetic: '/keɪm/', syllables: [{ text: 'came', phonetic: '/keɪm/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，a→/eɪ/' }] }], chinese: '来了（come 过去式）' },
  carry: { word: 'carry', phonetic: '/ˈkæri/', syllables: [{ text: 'car', phonetic: '/kæ/', color: C[0], marks: [{ letters: 'ar', type: 'cluster', phonetic: 'ær', note: 'ar r控制→/ær/（双写r前短音）' }] }, { text: 'ry', phonetic: '/ri/', color: C[1] }], chinese: '携带；提' },
  clean: { word: 'clean', phonetic: '/kliːn/', syllables: [{ text: 'clean', phonetic: '/kliːn/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'iː', note: 'ea 组合→/iː/' }] }], chinese: '干净的；清洁'  },
  cut: { word: 'cut', phonetic: '/kʌt/', syllables: [{ text: 'cut', phonetic: '/kʌt/', color: C[0] }], chinese: '切；剪' },
  country: { word: 'country', phonetic: '/ˈkʌntri/', syllables: [{ text: 'coun', phonetic: '/kʌn/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'ʌ', note: 'ou→/ʌ/（不规则）' }] }, { text: 'try', phonetic: '/tri/', color: C[1] }], chinese: '国家；乡村' },
  city: { word: 'city', phonetic: '/ˈsɪti/', syllables: [{ text: 'ci', phonetic: '/sɪ/', color: C[0] }, { text: 'ty', phonetic: '/ti/', color: C[1] }], chinese: '城市' },
  children: { word: 'children', phonetic: '/ˈtʃɪldrən/', syllables: [{ text: 'chil', phonetic: '/tʃɪl/', color: C[0], marks: [{ letters: 'ch', type: 'cluster', phonetic: 'tʃ', note: 'ch 组合→/tʃ/' }] }, { text: 'dren', phonetic: '/drən/', color: C[1] }], chinese: '孩子们'  },
  car: { word: 'car', phonetic: '/kɑːr/', syllables: [{ text: 'car', phonetic: '/kɑːr/', color: C[0], marks: [{ letters: 'ar', type: 'cluster', phonetic: 'ɑːr', note: 'ar r控制元音→/ɑːr/' }] }], chinese: '汽车' },
  colourful: { word: 'colourful', phonetic: '/ˈkʌlərfəl/', syllables: [{ text: 'col', phonetic: '/kʌ/', color: C[0] }, { text: 'our', phonetic: '/lər/', color: C[1], marks: [{ letters: 'our', type: 'cluster', phonetic: 'ər', note: 'our→/ər/ r控制（不规则）' }] }, { text: 'ful', phonetic: '/fəl/', color: C[2] }], chinese: '色彩丰富的；多彩的' },
  colour: { word: 'colour', phonetic: '/ˈkʌlər/', syllables: [{ text: 'col', phonetic: '/kʌ/', color: C[0] }, { text: 'our', phonetic: '/lər/', color: C[1], marks: [{ letters: 'our', type: 'cluster', phonetic: 'ər', note: 'our→/ər/ r控制（不规则）' }] }], chinese: '颜色' },
  classroom: { word: 'classroom', phonetic: '/ˈklɑːsruːm/', syllables: [{ text: 'class', phonetic: '/klɑːs/', color: C[0] }, { text: 'room', phonetic: '/ruːm/', color: C[1], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'uː', note: 'oo 组合→/uː/' }] }], chinese: '教室' },
  chair: { word: 'chair', phonetic: '/tʃeər/', syllables: [{ text: 'chair', phonetic: '/tʃeər/', color: C[0], marks: [{ letters: 'ch', type: 'cluster', phonetic: 'tʃ', note: 'ch 组合→/tʃ/' }, { letters: 'air', type: 'cluster', phonetic: 'eər', note: 'air r控制元音→/eər/' }] }], chinese: '椅子' },
  clap: { word: 'clap', phonetic: '/klæp/', syllables: [{ text: 'clap', phonetic: '/klæp/', color: C[0] }], chinese: '鼓掌' },
  cat: { word: 'cat', phonetic: '/kæt/', syllables: [{ text: 'cat', phonetic: '/kæt/', color: C[0] }], chinese: '猫' },
  count: { word: 'count', phonetic: '/kaʊnt/', syllables: [{ text: 'count', phonetic: '/kaʊnt/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }] }], chinese: '数数；计算' },
  cool: { word: 'cool', phonetic: '/kuːl/', syllables: [{ text: 'cool', phonetic: '/kuːl/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'uː', note: 'oo 组合→/uː/' }] }], chinese: '凉爽的；酷' },
  coat: { word: 'coat', phonetic: '/koʊt/', syllables: [{ text: 'coat', phonetic: '/koʊt/', color: C[0], marks: [{ letters: 'oa', type: 'cluster', phonetic: 'oʊ', note: 'oa 组合→/oʊ/' }] }], chinese: '外套；大衣' },
}
