import type { WordEntry } from '../types'

const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

export const dictionary: Record<string, WordEntry> = {
  // ── 一年级上册 ─────────────────────────────────────────────────────────
  apple: { word: 'apple', phonetic: '/ˈæp.əl/', syllables: [{ text: 'ap', phonetic: '/æp/', color: C[0] }, { text: 'ple', phonetic: '/əl/', color: C[1] }], chinese: '苹果', image: 'apple.png' },
  hello: { word: 'hello', phonetic: '/həˈloʊ/', syllables: [{ text: 'hel', phonetic: '/həl/', color: C[0] }, { text: 'lo', phonetic: '/loʊ/', color: C[1] }], chinese: '你好', image: 'hello.png' },
  kite: { word: 'kite', phonetic: '/kaɪt/', syllables: [{ text: 'kite', phonetic: '/kaɪt/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：让 i 发长音 /aɪ/' }] }], chinese: '风筝', image: 'kite.png' },
  have: { word: 'have', phonetic: '/hæv/', syllables: [{ text: 'have', phonetic: '/hæv/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: '末尾 e 不发音，且不改变 a 的发音（不规则）' }] }], chinese: '有；拥有', image: 'have.png' },

  // ── 一年级下册 ─────────────────────────────────────────────────────────
  who: { word: 'who', phonetic: '/huː/', syllables: [{ text: 'who', phonetic: '/huː/', color: C[0], marks: [{ letters: 'w', type: 'silent', note: 'wh 组合中 w 不发音' }] }], chinese: '谁', image: 'who.png' },
  stand: { word: 'stand', phonetic: '/stænd/', syllables: [{ text: 'stand', phonetic: '/stænd/', color: C[0], marks: [{ letters: 't', type: 'changed', note: 's 后的 t 听起来像 /d/' }] }], chinese: '站立', image: 'stand.png' },

  // ── 二年级上册 Unit 1 ──────────────────────────────────────────────────
  eye: { word: 'eye', phonetic: '/aɪ/', syllables: [{ text: 'eye', phonetic: '/aɪ/', color: C[0] }], chinese: '眼睛' },
  face: { word: 'face', phonetic: '/feɪs/', syllables: [{ text: 'face', phonetic: '/feɪs/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，a→/eɪ/' }] }], chinese: '脸' },
  mouth: { word: 'mouth', phonetic: '/maʊθ/', syllables: [{ text: 'mouth', phonetic: '/maʊθ/', color: C[0], marks: [{ letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' }, { letters: 'th', type: 'cluster', phonetic: 'θ', note: 'th 组合→/θ/' }] }], chinese: '嘴巴' },
  nose: { word: 'nose', phonetic: '/noʊz/', syllables: [{ text: 'nose', phonetic: '/noʊz/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，o→/oʊ/' }] }], chinese: '鼻子' },
  snowman: { word: 'snowman', phonetic: '/ˈsnoʊ.mæn/', syllables: [{ text: 'snow', phonetic: '/snoʊ/', color: C[0], marks: [{ letters: 'ow', type: 'cluster', phonetic: 'oʊ', note: 'ow 组合→/oʊ/' }] }, { text: 'man', phonetic: '/mæn/', color: C[1] }], chinese: '雪人' },
  same: { word: 'same', phonetic: '/seɪm/', syllables: [{ text: 'same', phonetic: '/seɪm/', color: C[0], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，a→/eɪ/' }] }], chinese: '相同的' },
  twin: { word: 'twin', phonetic: '/twɪn/', syllables: [{ text: 'twin', phonetic: '/twɪn/', color: C[0] }], chinese: '双胞胎' },
  big: { word: 'big', phonetic: '/bɪɡ/', syllables: [{ text: 'big', phonetic: '/bɪɡ/', color: C[0] }], chinese: '大的' },
  small: { word: 'small', phonetic: '/smɔːl/', syllables: [{ text: 'small', phonetic: '/smɔːl/', color: C[0] }], chinese: '小的' },
  people: { word: 'people', phonetic: '/ˈpiː.pəl/', syllables: [{ text: 'peo', phonetic: '/piː/', color: C[0] }, { text: 'ple', phonetic: '/pəl/', color: C[1] }], chinese: '人们' },
  often: { word: 'often', phonetic: '/ˈɔː.fən/', syllables: [{ text: 'of', phonetic: '/ɔː/', color: C[0] }, { text: 'ten', phonetic: '/fən/', color: C[1], marks: [{ letters: 't', type: 'silent', note: 't 不发音' }] }], chinese: '经常' },
  us: { word: 'us', phonetic: '/ʌs/', syllables: [{ text: 'us', phonetic: '/ʌs/', color: C[0] }], chinese: '我们' },
  wrong: { word: 'wrong', phonetic: '/rɒŋ/', syllables: [{ text: 'wrong', phonetic: '/rɒŋ/', color: C[0], marks: [{ letters: 'w', type: 'silent', note: 'w 不发音' }] }], chinese: '错误的' },
  can: { word: 'can', phonetic: '/kæn/', syllables: [{ text: 'can', phonetic: '/kæn/', color: C[0] }], chinese: '能；罐头' },
  idea: { word: 'idea', phonetic: '/aɪˈdiː.ə/', syllables: [{ text: 'i', phonetic: '/aɪ/', color: C[0] }, { text: 'de', phonetic: '/diː/', color: C[1] }, { text: 'a', phonetic: '/ə/', color: C[2] }], chinese: '想法' },
  long: { word: 'long', phonetic: '/lɒŋ/', syllables: [{ text: 'long', phonetic: '/lɒŋ/', color: C[0], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }], chinese: '长的' },
  hair: { word: 'hair', phonetic: '/heər/', syllables: [{ text: 'hair', phonetic: '/heər/', color: C[0], marks: [{ letters: 'ai', type: 'cluster', phonetic: 'eə', note: 'ai 组合→/eə/' }] }], chinese: '头发' },
  short: { word: 'short', phonetic: '/ʃɔːrt/', syllables: [{ text: 'short', phonetic: '/ʃɔːrt/', color: C[0], marks: [{ letters: 'sh', type: 'cluster', phonetic: 'ʃ', note: 'sh 组合→/ʃ/' }] }], chinese: '短的' },
  different: { word: 'different', phonetic: '/ˈdɪf.ər.ənt/', syllables: [{ text: 'dif', phonetic: '/dɪf/', color: C[0] }, { text: 'fer', phonetic: '/ər/', color: C[1] }, { text: 'ent', phonetic: '/ənt/', color: C[2] }], chinese: '不同的' },
  now: { word: 'now', phonetic: '/naʊ/', syllables: [{ text: 'now', phonetic: '/naʊ/', color: C[0] }], chinese: '现在' },

  // ── 二年级上册 Unit 2 ──────────────────────────────────────────────────
  put: { word: 'put', phonetic: '/pʊt/', syllables: [{ text: 'put', phonetic: '/pʊt/', color: C[0] }], chinese: '放' },
  head: { word: 'head', phonetic: '/hed/', syllables: [{ text: 'head', phonetic: '/hed/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'e', note: '不规则：ea→/e/（通常 ea→/iː/）' }] }], chinese: '头' },
  neck: { word: 'neck', phonetic: '/nek/', syllables: [{ text: 'neck', phonetic: '/nek/', color: C[0], marks: [{ letters: 'ck', type: 'cluster', phonetic: 'k', note: 'ck 组合→/k/，只发一个 k 音' }] }], chinese: '脖子' },
  arm: { word: 'arm', phonetic: '/ɑːrm/', syllables: [{ text: 'arm', phonetic: '/ɑːrm/', color: C[0] }], chinese: '手臂' },
  body: { word: 'body', phonetic: '/ˈbɒd.i/', syllables: [{ text: 'bod', phonetic: '/bɒd/', color: C[0] }, { text: 'y', phonetic: '/i/', color: C[1] }], chinese: '身体' },
  leg: { word: 'leg', phonetic: '/leɡ/', syllables: [{ text: 'leg', phonetic: '/leɡ/', color: C[0] }], chinese: '腿' },

  // ── 二年级上册 Unit 3 ──────────────────────────────────────────────────
  go: { word: 'go', phonetic: '/ɡoʊ/', syllables: [{ text: 'go', phonetic: '/ɡoʊ/', color: C[0] }], chinese: '去' },
  zoo: { word: 'zoo', phonetic: '/zuː/', syllables: [{ text: 'zoo', phonetic: '/zuː/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'uː', note: 'oo 组合→/uː/ 长音' }] }], chinese: '动物园' },
  tiger: { word: 'tiger', phonetic: '/ˈtaɪ.ɡər/', syllables: [{ text: 'ti', phonetic: '/taɪ/', color: C[0] }, { text: 'ger', phonetic: '/ɡər/', color: C[1] }], chinese: '老虎' },
  fox: { word: 'fox', phonetic: '/fɒks/', syllables: [{ text: 'fox', phonetic: '/fɒks/', color: C[0] }], chinese: '狐狸' },
  monkey: { word: 'monkey', phonetic: '/ˈmʌŋ.ki/', syllables: [{ text: 'mon', phonetic: '/mʌŋ/', color: C[0] }, { text: 'key', phonetic: '/ki/', color: C[1] }], chinese: '猴子' },
  eat: { word: 'eat', phonetic: '/iːt/', syllables: [{ text: 'eat', phonetic: '/iːt/', color: C[0] }], chinese: '吃' },
  king: { word: 'king', phonetic: '/kɪŋ/', syllables: [{ text: 'king', phonetic: '/kɪŋ/', color: C[0], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }], chinese: '国王' },
  of: { word: 'of', phonetic: '/ɒv/', syllables: [{ text: 'of', phonetic: '/ɒv/', color: C[0], marks: [{ letters: 'f', type: 'changed', note: '不规则：f→/v/' }] }], chinese: '的' },
  animal: { word: 'animal', phonetic: '/ˈæn.ɪ.məl/', syllables: [{ text: 'an', phonetic: '/æn/', color: C[0] }, { text: 'i', phonetic: '/ɪ/', color: C[1] }, { text: 'mal', phonetic: '/məl/', color: C[2] }], chinese: '动物' },
  show: { word: 'show', phonetic: '/ʃoʊ/', syllables: [{ text: 'show', phonetic: '/ʃoʊ/', color: C[0], marks: [{ letters: 'sh', type: 'cluster', phonetic: 'ʃ', note: 'sh 组合→/ʃ/' }, { letters: 'ow', type: 'cluster', phonetic: 'oʊ', note: 'ow 组合→/oʊ/' }] }], chinese: '展示' },
  come: { word: 'come', phonetic: '/kʌm/', syllables: [{ text: 'come', phonetic: '/kʌm/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: '魔法e（不规则）：o→/ʌ/ 而非 /oʊ/' }] }], chinese: '来' },
  with: { word: 'with', phonetic: '/wɪð/', syllables: [{ text: 'with', phonetic: '/wɪð/', color: C[0], marks: [{ letters: 'th', type: 'cluster', phonetic: 'ð', note: 'th 组合→/ð/（浊音）' }] }], chinese: '和；用' },
  run: { word: 'run', phonetic: '/rʌn/', syllables: [{ text: 'run', phonetic: '/rʌn/', color: C[0] }], chinese: '跑' },
  deer: { word: 'deer', phonetic: '/dɪər/', syllables: [{ text: 'deer', phonetic: '/dɪər/', color: C[0], marks: [{ letters: 'ee', type: 'cluster', phonetic: 'ɪə', note: 'ee 组合→/ɪə/ 双元音' }] }], chinese: '鹿' },
  fly: { word: 'fly', phonetic: '/flaɪ/', syllables: [{ text: 'fly', phonetic: '/flaɪ/', color: C[0], marks: [{ letters: 'y', type: 'changed', note: '词尾 y→/aɪ/' }] }], chinese: '飞；苍蝇' },

  // ── 二年级上册 Unit 4 ──────────────────────────────────────────────────
  banana: { word: 'banana', phonetic: '/bəˈnɑː.nə/', syllables: [{ text: 'ba', phonetic: '/bə/', color: C[0] }, { text: 'na', phonetic: '/nɑː/', color: C[1] }, { text: 'na', phonetic: '/nə/', color: C[2] }], chinese: '香蕉' },
  milk: { word: 'milk', phonetic: '/mɪlk/', syllables: [{ text: 'milk', phonetic: '/mɪlk/', color: C[0] }], chinese: '牛奶' },
  about: { word: 'about', phonetic: '/əˈbaʊt/', syllables: [{ text: 'a', phonetic: '/ə/', color: C[0] }, { text: 'bout', phonetic: '/baʊt/', color: C[1] }], chinese: '关于' },
  picnic: { word: 'picnic', phonetic: '/ˈpɪk.nɪk/', syllables: [{ text: 'pic', phonetic: '/pɪk/', color: C[0] }, { text: 'nic', phonetic: '/nɪk/', color: C[1] }], chinese: '野餐' },
  day: { word: 'day', phonetic: '/deɪ/', syllables: [{ text: 'day', phonetic: '/deɪ/', color: C[0] }], chinese: '天；白天' },
  bread: { word: 'bread', phonetic: '/bred/', syllables: [{ text: 'bread', phonetic: '/bred/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'e', note: '不规则：ea→/e/（通常 ea→/iː/）' }] }], chinese: '面包' },
  meat: { word: 'meat', phonetic: '/miːt/', syllables: [{ text: 'meat', phonetic: '/miːt/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'iː', note: 'ea 组合→/iː/' }] }], chinese: '肉' },
  food: { word: 'food', phonetic: '/fuːd/', syllables: [{ text: 'food', phonetic: '/fuːd/', color: C[0], marks: [{ letters: 'oo', type: 'cluster', phonetic: 'uː', note: 'oo 组合→/uː/ 长音' }] }], chinese: '食物' },
  shopping: { word: 'shopping', phonetic: '/ˈʃɒp.ɪŋ/', syllables: [{ text: 'shop', phonetic: '/ʃɒp/', color: C[0], marks: [{ letters: 'sh', type: 'cluster', phonetic: 'ʃ', note: 'sh 组合→/ʃ/' }] }, { text: 'ping', phonetic: '/ɪŋ/', color: C[1], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }], chinese: '购物' },
  list: { word: 'list', phonetic: '/lɪst/', syllables: [{ text: 'list', phonetic: '/lɪst/', color: C[0] }], chinese: '清单' },

  // ── 二年级上册 Unit 5 ──────────────────────────────────────────────────
  festival: { word: 'festival', phonetic: '/ˈfes.tɪ.vəl/', syllables: [{ text: 'fes', phonetic: '/fes/', color: C[0] }, { text: 'ti', phonetic: '/tɪ/', color: C[1] }, { text: 'val', phonetic: '/vəl/', color: C[2] }], chinese: '节日' },
  best: { word: 'best', phonetic: '/best/', syllables: [{ text: 'best', phonetic: '/best/', color: C[0] }], chinese: '最好的' },
  wish: { word: 'wish', phonetic: '/wɪʃ/', syllables: [{ text: 'wish', phonetic: '/wɪʃ/', color: C[0], marks: [{ letters: 'sh', type: 'cluster', phonetic: 'ʃ', note: 'sh 组合→/ʃ/' }] }], chinese: '愿望；祝愿' },
  celebrate: { word: 'celebrate', phonetic: '/ˈsel.ɪ.breɪt/', syllables: [{ text: 'cel', phonetic: '/sel/', color: C[0] }, { text: 'e', phonetic: '/ɪ/', color: C[1] }, { text: 'brate', phonetic: '/breɪt/', color: C[2], marks: [{ letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音' }] }], chinese: '庆祝' },
  wear: { word: 'wear', phonetic: '/weər/', syllables: [{ text: 'wear', phonetic: '/weər/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'eə', note: 'ea 组合→/eə/' }] }], chinese: '穿；戴' },
  clothes: { word: 'clothes', phonetic: '/kloʊðz/', syllables: [{ text: 'clothes', phonetic: '/kloʊðz/', color: C[0], marks: [{ letters: 'th', type: 'cluster', phonetic: 'ð', note: 'th 组合→/ð/（浊音）' }, { letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音' }] }], chinese: '衣服' },
  mean: { word: 'mean', phonetic: '/miːn/', syllables: [{ text: 'mean', phonetic: '/miːn/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', phonetic: 'iː', note: 'ea 组合→/iː/' }] }], chinese: '意思；意味着' },
  luck: { word: 'luck', phonetic: '/lʌk/', syllables: [{ text: 'luck', phonetic: '/lʌk/', color: C[0], marks: [{ letters: 'ck', type: 'cluster', phonetic: 'k', note: 'ck 组合→/k/，只发一个 k 音' }] }], chinese: '运气' },
  these: { word: 'these', phonetic: '/ðiːz/', syllables: [{ text: 'these', phonetic: '/ðiːz/', color: C[0], marks: [{ letters: 'th', type: 'cluster', phonetic: 'ð', note: 'th 组合→/ð/（浊音）' }, { letters: 'e', type: 'silent-e', note: '魔法e：末尾 e 不发音，e→/iː/' }] }], chinese: '这些' },
  lantern: { word: 'lantern', phonetic: '/ˈlæn.tərn/', syllables: [{ text: 'lan', phonetic: '/læn/', color: C[0] }, { text: 'tern', phonetic: '/tərn/', color: C[1] }], chinese: '灯笼' },
  they: { word: 'they', phonetic: '/ðeɪ/', syllables: [{ text: 'they', phonetic: '/ðeɪ/', color: C[0], marks: [{ letters: 'th', type: 'cluster', phonetic: 'ð', note: 'th 组合→/ð/（浊音）' }] }], chinese: '他们' },
  beautiful: { word: 'beautiful', phonetic: '/ˈbjuː.tɪ.fəl/', syllables: [{ text: 'beau', phonetic: '/bjuː/', color: C[0], marks: [{ letters: 'eau', type: 'changed', note: '不规则：eau→/juː/' }] }, { text: 'ti', phonetic: '/tɪ/', color: C[1] }, { text: 'ful', phonetic: '/fəl/', color: C[2] }], chinese: '美丽的' },
  also: { word: 'also', phonetic: '/ˈɔːl.soʊ/', syllables: [{ text: 'al', phonetic: '/ɔːl/', color: C[0] }, { text: 'so', phonetic: '/soʊ/', color: C[1] }], chinese: '也；还有' },
  wow: { word: 'wow', phonetic: '/waʊ/', syllables: [{ text: 'wow', phonetic: '/waʊ/', color: C[0] }], chinese: '哇' },
  some: { word: 'some', phonetic: '/sʌm/', syllables: [{ text: 'some', phonetic: '/sʌm/', color: C[0], marks: [{ letters: 'e', type: 'silent', note: '魔法e（不规则）：o→/ʌ/ 而非 /oʊ/' }] }], chinese: '一些' },
  candy: { word: 'candy', phonetic: '/ˈkæn.di/', syllables: [{ text: 'can', phonetic: '/kæn/', color: C[0] }, { text: 'dy', phonetic: '/di/', color: C[1] }], chinese: '糖果' },
  lucky: { word: 'lucky', phonetic: '/ˈlʌk.i/', syllables: [{ text: 'luck', phonetic: '/lʌk/', color: C[0], marks: [{ letters: 'ck', type: 'cluster', phonetic: 'k', note: 'ck 组合→/k/，只发一个 k 音' }] }, { text: 'y', phonetic: '/i/', color: C[1] }], chinese: '幸运的' },
  new: { word: 'new', phonetic: '/njuː/', syllables: [{ text: 'new', phonetic: '/njuː/', color: C[0] }], chinese: '新的' },
  year: { word: 'year', phonetic: '/jɪər/', syllables: [{ text: 'year', phonetic: '/jɪər/', color: C[0], marks: [{ letters: 'ea', type: 'cluster', note: 'ear 组合→/ɪər/' }] }], chinese: '年；岁' },
  interesting: { word: 'interesting', phonetic: '/ˈɪn.trɪ.stɪŋ/', syllables: [{ text: 'in', phonetic: '/ɪn/', color: C[0] }, { text: 'ter', phonetic: '/trɪ/', color: C[1] }, { text: 'est', phonetic: '/ɪst/', color: C[2] }, { text: 'ing', phonetic: '/ɪŋ/', color: C[3] }], chinese: '有趣的' },
}
