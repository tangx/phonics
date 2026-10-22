import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictH: Record<string, WordEntry> = {
  hello: { word: 'hello', phonetic: '/həˈloʊ/', syllables: [{ text: 'hel', phonetic: '/hə/', color: C[0] }, { text: 'lo', phonetic: '/loʊ/', color: C[1] }], chinese: '你好', image: 'hello.png' },
  have: { word: 'have', phonetic: '/hæv/', syllables: [{ text: 'have', phonetic: '/hæv/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: '末尾 e 不发音，且不改变 a 的发音（不规则）' }] }], chinese: '有；拥有', image: 'have.png'  },
  hair: { word: 'hair', phonetic: '/heər/', syllables: [{ text: 'hair', phonetic: '/heər/', color: C[0], marks: [{ letters: 'ai', type: 'cluster', phonetic: 'eə', note: 'ai 组合→/eə/' }] }], chinese: '头发' },
  head: { word: 'head', phonetic: '/hed/', syllables: [{ text: 'head', phonetic: '/hed/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'e', note: '不规则：ea→/e/（通常 ea→/iː/）' }] }], chinese: '头' },
  had: { word: 'had', phonetic: '/hæd/', syllables: [{ text: 'had', phonetic: '/hæd/', color: C[0] }], chinese: '有（过去式）' },
  has: { word: 'has', phonetic: '/hæz/', syllables: [{ text: 'has', phonetic: '/hæz/', color: C[0] }], chinese: '有（第三人称）' },
  her: { word: 'her', phonetic: '/hɜːr/', syllables: [{ text: 'her', phonetic: '/hɜːr/', color: C[0], marks: [{ letters: 'er', type: 'cluster', phonetic: 'ɜːr', note: 'er r控制元音→/ɜːr/' }] }], chinese: '她的；她'  },
  him: { word: 'him', phonetic: '/hɪm/', syllables: [{ text: 'him', phonetic: '/hɪm/', color: C[0] }], chinese: '他（宾格）'  },
  his: { word: 'his', phonetic: '/hɪz/', syllables: [{ text: 'his', phonetic: '/hɪz/', color: C[0] }], chinese: '他的' },
  how: { word: 'how', phonetic: '/haʊ/', syllables: [{ text: 'how', phonetic: '/haʊ/', color: C[0], marks: [{ letters: 'ow', type: 'cluster', phonetic: 'aʊ', note: 'ow 组合→/aʊ/' }] }], chinese: '怎么；如何' },
  help: { word: 'help', phonetic: '/help/', syllables: [{ text: 'help', phonetic: '/help/', color: C[0] }], chinese: '帮助'  },
  here: { word: 'here', phonetic: '/hɪər/', syllables: [{ text: 'here', phonetic: '/hɪər/', color: C[0], marks: [{ letters: 'ere', type: 'cluster', phonetic: 'ɪər', note: 'ere 组合→/ɪər/' }] }], chinese: '这里' },
  he: { word: 'he', phonetic: '/hiː/', syllables: [{ text: 'he', phonetic: '/hiː/', color: C[0] }], chinese: '他'  },
  hold: { word: 'hold', phonetic: '/hoʊld/', syllables: [{ text: 'hold', phonetic: '/hoʊld/', color: C[0] }], chinese: '握住；持有' },
  hot: { word: 'hot', phonetic: '/hɒt/', syllables: [{ text: 'hot', phonetic: '/hɒt/', color: C[0] }], chinese: '热的' },
  hurt: { word: 'hurt', phonetic: '/hɜːrt/', syllables: [{ text: 'hurt', phonetic: '/hɜːrt/', color: C[0], marks: [{ letters: 'ur', type: 'cluster', phonetic: 'ɜːr', note: 'ur r控制元音→/ɜːr/' }] }], chinese: '受伤；疼痛' },
  home: { word: 'home', phonetic: '/hoʊm/', syllables: [{ text: 'home', phonetic: '/hoʊm/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：o→/oʊ/' }] }], chinese: '家；家乡'  },
  house: { word: 'house', phonetic: '/haʊs/', syllables: [{ text: 'house', phonetic: '/haʊs/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }, { letters: 'e', type: 'silent-e', note: '末尾 e 不发音' }] }], chinese: '房子；家' },
  hi: { word: 'hi', phonetic: '/haɪ/', syllables: [{ text: 'hi', phonetic: '/haɪ/', color: C[0] }], chinese: '嗨' },
  hooray: { word: 'hooray', phonetic: '/hʊˈreɪ/', syllables: [{ text: 'hoo', phonetic: '/hʊ/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'ʊ', note: 'oo→/ʊ/ 短音' }] }, { text: 'ray', phonetic: '/reɪ/', color: C[1], marks: [{ letters: 'ay', type: 'cluster', phonetic: 'eɪ', note: 'ay 词尾→/eɪ/' }] }], chinese: '好哇！万岁！' },
  happy: { word: 'happy', phonetic: '/ˈhæpi/', syllables: [{ text: 'hap', phonetic: '/hæ/', color: C[0] }, { text: 'py', phonetic: '/pi/', color: C[1] }], chinese: '快乐的' },
  hand: { word: 'hand', phonetic: '/hænd/', syllables: [{ text: 'hand', phonetic: '/hænd/', color: C[0] }], chinese: '手' },
  hungry: { word: 'hungry', phonetic: '/ˈhʌŋɡri/', syllables: [{ text: 'hun', phonetic: '/hʌŋ/', color: C[0], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }, { text: 'gry', phonetic: '/ɡri/', color: C[1] }], chinese: '饿的' },
  hard: { word: 'hard', phonetic: '/hɑːrd/', syllables: [{ text: 'hard', phonetic: '/hɑːrd/', color: C[0], marks: [{ letters: 'ar', type: 'cluster', phonetic: 'ɑːr', note: 'ar r控制元音→/ɑːr/' }] }], chinese: '难的；努力地' },
}
