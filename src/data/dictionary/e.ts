import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictE: Record<string, WordEntry> = {
  eye: { word: 'eye', phonetic: '/aɪ/', syllables: [{ text: 'eye', phonetic: '/aɪ/', color: C[0] }], chinese: '眼睛' },
  eat: { word: 'eat', phonetic: '/iːt/', syllables: [{ text: 'eat', phonetic: '/iːt/', color: C[0] }], chinese: '吃'  },
  every: { word: 'every', phonetic: '/ˈevri/', syllables: [{ text: 'e', phonetic: '/e/', color: C[0] }, { text: 'very', phonetic: '/vri/', color: C[1] }], chinese: '每个'  },
  eight: { word: 'eight', phonetic: '/eɪt/', syllables: [{ text: 'eight', phonetic: '/eɪt/', color: C[0], marks: [{ letters: 'eigh', type: 'cluster', phonetic: 'eɪ', note: 'eigh 组合→/eɪ/' }, { letters: 'gh', type: 'silent', note: 'gh 不发音' }] }], chinese: '八' },
  earth: { word: 'earth', phonetic: '/ɜːrθ/', syllables: [{ text: 'earth', phonetic: '/ɜːrθ/', color: C[0], marks: [{ letters: 'ear', type: 'cluster', phonetic: 'ɜːr', note: 'ear→/ɜːr/ r控制元音' }, { letters: 'th', type: 'cluster', phonetic: 'θ', note: 'th 组合→/θ/（清音）' }] }], chinese: '地球；土地' },
  example: { word: 'example', phonetic: '/ɪɡˈzæmpəl/', syllables: [{ text: 'ex', phonetic: '/ɪɡz/', color: C[0] }, { text: 'am', phonetic: '/æm/', color: C[1] }, { text: 'ple', phonetic: '/pəl/', color: C[2] }], chinese: '例子；示例' },
  eraser: { word: 'eraser', phonetic: '/ɪˈreɪzər/', syllables: [{ text: 'e', phonetic: '/ɪ/', color: C[0] }, { text: 'ra', phonetic: '/reɪ/', color: C[1] }, { text: 'ser', phonetic: '/zər/', color: C[2], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ər', note: 'er r控制元音→/ər/' }] }], chinese: '橡皮擦' },
  english: { word: 'english', phonetic: '/ˈɪŋɡlɪʃ/', syllables: [{ text: 'eng', phonetic: '/ɪŋ/', color: C[0], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }, { text: 'lish', phonetic: '/lɪʃ/', color: C[1], marks: [{ letters: 'sh', type: 'cluster', phonetic: 'ʃ', note: 'sh 组合→/ʃ/' }] }], chinese: '英语；英文' },
  each: { word: 'each', phonetic: '/iːtʃ/', syllables: [{ text: 'each', phonetic: '/iːtʃ/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'iː', note: 'ea 组合→/iː/' }, { letters: 'ch', type: 'cluster', phonetic: 'tʃ', note: 'ch 组合→/tʃ/' }] }], chinese: '每个' },
  eleven: { word: 'eleven', phonetic: '/ɪˈlevən/', syllables: [{ text: 'e', phonetic: '/ɪ/', color: C[0] }, { text: 'lev', phonetic: '/lev/', color: C[1] }, { text: 'en', phonetic: '/ən/', color: C[2] }], chinese: '十一' },
  easy: { word: 'easy', phonetic: '/ˈiːzi/', syllables: [{ text: 'ea', phonetic: '/iː/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'iː', note: 'ea 组合→/iː/' }] }, { text: 'sy', phonetic: '/zi/', color: C[1] }], chinese: '容易的' },
}
