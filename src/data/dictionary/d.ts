import type { WordEntry } from '../../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictD: Record<string, WordEntry> = {
  different: { word: 'different', phonetic: '/ˈdɪfərənt/', syllables: [{ text: 'dif', phonetic: '/dɪ/', color: C[0] }, { text: 'fer', phonetic: '/fər/', color: C[1] }, { text: 'ent', phonetic: '/ənt/', color: C[2] }], chinese: '不同的' },
  deer: { word: 'deer', phonetic: '/dɪər/', syllables: [{ text: 'deer', phonetic: '/dɪər/', color: C[0], marks: [{ letters: 'ee', type: 'cluster', phonetic: 'ɪə', note: 'ee 组合→/ɪə/ 双元音' }] }], chinese: '鹿'  },
  day: { word: 'day', phonetic: '/deɪ/', syllables: [{ text: 'day', phonetic: '/deɪ/', color: C[0] }], chinese: '天；白天'  },
  does: { word: 'does', phonetic: '/dʌz/', syllables: [{ text: 'does', phonetic: '/dʌz/', color: C[0], marks: [{ letters: 'oe', type: 'changed', note: '不规则：oe→/ʌ/（通常 o→/oʊ/）' }] }], chinese: '做（第三人称）' },
  dont: { word: "don't", phonetic: '/doʊnt/', syllables: [{ text: "don't", phonetic: '/doʊnt/', color: C[0] }], chinese: '不要（do not 缩写）' },
  down: { word: 'down', phonetic: '/daʊn/', syllables: [{ text: 'down', phonetic: '/daʊn/', color: C[0], marks: [{ letters: 'ow', type: 'cluster', phonetic: 'aʊ', note: 'ow 组合→/aʊ/' }] }], chinese: '向下'  },
  did: { word: 'did', phonetic: '/dɪd/', syllables: [{ text: 'did', phonetic: '/dɪd/', color: C[0] }], chinese: '做了（do 过去式）' },
  do: { word: 'do', phonetic: '/duː/', syllables: [{ text: 'do', phonetic: '/duː/', color: C[0] }], chinese: '做；干'  },
  done: { word: 'done', phonetic: '/dʌn/', syllables: [{ text: 'done', phonetic: '/dʌn/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: '末尾 e 不发音（不规则：o→/ʌ/）' }] }], chinese: '完成的' },
  draw: { word: 'draw', phonetic: '/drɔː/', syllables: [{ text: 'draw', phonetic: '/drɔː/', color: C[0], marks: [{ letters: 'aw', type: 'cluster', phonetic: 'ɔː', note: 'aw 组合→/ɔː/' }] }], chinese: '画；拖' },
  drink: { word: 'drink', phonetic: '/drɪŋk/', syllables: [{ text: 'drink', phonetic: '/drɪŋk/', color: C[0], marks: [{ letters: 'nk', type: 'cluster', phonetic: 'ŋk', note: 'nk 组合→/ŋk/' }] }], chinese: '喝；饮料' },
  desk: { word: 'desk', phonetic: '/desk/', syllables: [{ text: 'desk', phonetic: '/desk/', color: C[0] }], chinese: '书桌' },
  door: { word: 'door', phonetic: '/dɔːr/', syllables: [{ text: 'door', phonetic: '/dɔːr/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'ɔː', note: 'oor→/ɔːr/ r控制（不规则，oo通常→/uː/）' }] }], chinese: '门' },
  dear: { word: 'dear', phonetic: '/dɪər/', syllables: [{ text: 'dear', phonetic: '/dɪər/', color: C[0], marks: [{ letters: 'ear', type: 'cluster', phonetic: 'ɪər', note: 'ear 组合→/ɪər/' }] }], chinese: '亲爱的' },
  dad: { word: 'dad', phonetic: '/dæd/', syllables: [{ text: 'dad', phonetic: '/dæd/', color: C[0] }], chinese: '爸爸' },
  dog: { word: 'dog', phonetic: '/dɒɡ/', syllables: [{ text: 'dog', phonetic: '/dɒɡ/', color: C[0] }], chinese: '狗' },
  dance: { word: 'dance', phonetic: '/dæns/', syllables: [{ text: 'dance', phonetic: '/dæns/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音（不规则，a不变长音）' }] }], chinese: '跳舞' },
  dress: { word: 'dress', phonetic: '/dres/', syllables: [{ text: 'dress', phonetic: '/dres/', color: C[0] }], chinese: '连衣裙；穿衣' },
}
