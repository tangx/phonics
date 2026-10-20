import type { UnitData } from '../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0'] // 音节颜色

export const units: UnitData[] = [
  {
    id: 'grade1-unit1',
    title: '一年级上册 Unit 1',
    words: [
      {
        word: 'apple',
        phonetic: '/ˈæp.əl/',
        syllables: [
          { text: 'ap', phonetic: '/æp/', color: C[0] },
          { text: 'ple', phonetic: '/əl/', color: C[1] },
        ],
        chinese: '苹果',
        image: 'apple.png',
      },
      {
        word: 'kite',
        phonetic: '/kaɪt/',
        syllables: [
          {
            text: 'kite',
            phonetic: '/kaɪt/',
            color: C[0],
            marks: [
              { letters: 'e', type: 'silent-e', note: '魔法e：让 i 发长音 /aɪ/' },
            ],
          },
        ],
        chinese: '风筝',
        image: 'kite.png',
      },
      {
        word: 'have',
        phonetic: '/hæv/',
        syllables: [
          {
            text: 'have',
            phonetic: '/hæv/',
            color: C[0],
            marks: [
              { letters: 'e', type: 'silent', note: '末尾 e 不发音，且不改变 a 的发音（不规则）' },
            ],
          },
        ],
        chinese: '有；拥有',
        image: 'have.png',
      },
      {
        word: 'who',
        phonetic: '/huː/',
        syllables: [
          {
            text: 'who',
            phonetic: '/huː/',
            color: C[0],
            marks: [
              { letters: 'w', type: 'silent', note: 'wh 组合中 w 不发音' },
            ],
          },
        ],
        chinese: '谁',
        image: 'who.png',
      },
      {
        word: 'stand',
        phonetic: '/stænd/',
        syllables: [
          {
            text: 'stand',
            phonetic: '/stænd/',
            color: C[0],
            marks: [
              { letters: 't', type: 'changed', note: 's 后的 t 听起来像 /d/' },
            ],
          },
        ],
        chinese: '站立',
        image: 'stand.png',
      },
      {
        word: 'hello',
        phonetic: '/həˈloʊ/',
        syllables: [
          { text: 'hel', phonetic: '/həl/', color: C[0] },
          { text: 'lo', phonetic: '/loʊ/', color: C[1] },
        ],
        chinese: '你好',
        image: 'hello.png',
      },
    ],
  },
]
