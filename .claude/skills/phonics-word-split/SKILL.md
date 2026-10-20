---
name: phonics-word-split
description: 为中国小学英语教学网站录入新单词时，分析英文单词的音节拆分、音标、中文释义和字母级标注，生成可直接粘贴到 src/data/units.ts 的 TypeScript 数据对象。当用户提供新单词、新单元或新课本内容时，必须使用此 skill。触发词包括：添加单词、录入单词、新单词、新单元、分析单词、拆分音节、add words、new unit。
---

# Phonics 单词拆分 Skill

## 项目背景

面向中国小学生的英语拼读教学网站。核心理念：**自然拼读规则 + 国际音标双轨并行**，帮助孩子建立"字母组合 → 音标 → 发音"的完整映射。

数据文件：`src/data/dictionary.ts`（词典，key=单词字符串），`src/data/units.ts`（单元索引，只存 wordKeys），类型定义：`src/types.ts`。
完整参考文档（需要时读取）：
- `references/phonemes.md` — 44个英语音素、拼写对应、例词
- `references/nessy-phonics-rules.md` — Nessy 76集自然拼读规则，含教学顺序、快速索引

---

## 数据结构

```ts
const C = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0'] // 音节颜色，多音节按序循环

{
  word: 'mouth',
  phonetic: '/maʊθ/',           // 完整 IPA 音标
  syllables: [
    {
      text: 'mouth',            // 音节字母
      phonetic: '/maʊθ/',       // 该音节音标
      color: C[0],              // 单音节用 C[0]，多音节依次 C[0]→C[1]→...
      marks: [                  // 字母级标注（可选）
        { letters: 'ou', type: 'cluster', phonetic: 'aʊ', note: 'ou 组合→/aʊ/' },
        { letters: 'th', type: 'cluster', phonetic: 'θ',  note: 'th 组合→/θ/（清音）' },
      ],
    },
  ],
  chinese: '嘴巴',
  image: 'mouth.png',           // 可选
}
```

---

## 四种字母标注类型

### 1. `cluster`（字母组合）— 最常用

两个或以上字母组合发**一个音素**，是英语正常拼读规则。**必须填写 `phonetic` 字段**（音标片段，不含斜杠），供音节块内点分隔显示。

**辅音 cluster（对应 references/phonemes.md 辅音音素）：**

| 组合 | 音素 | 例词 | 说明 |
|---|---|---|---|
| sh | /ʃ/ | wish, short, show, shopping | |
| th | /θ/ | thin, mouth, bath | 清音，舌尖抵上齿 |
| th | /ð/ | this, with, they, clothes | 浊音，需在 note 区分 |
| ch | /tʃ/ | chin, teach, lunch | 最常见发音 |
| ch | /k/ | school, chorus | 来自希腊语借词（Nessy 12集）|
| ch | /ʃ/ | chef, machine | 来自法语借词（Nessy 12集）|
| tch | /tʃ/ | match, catch, watch | **短元音后**用 tch；长元音/辅音后用 ch（Nessy 55集）|
| ck | /k/ | neck, luck, duck, back | **短元音后**用 ck；长元音/辅音后用 k（Nessy 13集）|
| ng | /ŋ/ | ring, king, long, sing | 词尾鼻音 |
| nk | /ŋk/ | think, drink, bank | ng+k 两个音素 |
| ph | /f/ | phone, photo | |
| wh | /w/ | what, when, where | 多数方言 wh=w |
| kn | /n/ | knee, know, knife | k 不发音→用 silent |
| wr | /r/ | write, wrong, wrap | w 不发音→用 silent |
| dge | /dʒ/ | edge, bridge, fudge | 元音后 |
| ge | /dʒ/ | cage, page, huge | 词尾软音 |

**元音 cluster（对应 references/phonemes.md 元音音素）：**

| 组合 | 音素 | 例词 | 说明 |
|---|---|---|---|
| ai | /eɪ/ | rain, tail, wait | **单词中间**用 ai（Nessy 31集） |
| ay | /eɪ/ | day, say, play | **单词末尾**用 ay（Nessy 31集） |
| ee | /i/ | tree, see, need | 长音 e |
| ea | /i/ | sea, meat, mean, eat | 长音 e（常规） |
| ea | /ɛ/ | head, bread, dead | **不规则**，需在 note 说明 |
| ea | /ɛr/ | wear, bear, pear | r控制元音 |
| oa | /oʊ/ | boat, coat, road | 长音 o |
| ow | /oʊ/ | snow, show, bowl | 辅音前或词尾（如 -ow 静止义）|
| ow | /aʊ/ | now, cow, down, wow | 动态/感叹义词尾，需在 note 区分 |
| oo | /u/ | moon, food, zoo, school | 长音（多数情况） |
| oo | /ʊ/ | book, good, look, foot | 短音，需在 note 说明 |
| ou | /aʊ/ | mouth, out, cloud | |
| ou | /ʌ/ | young, country | **不规则** |
| oi | /ɔɪ/ | coin, oil, boil | |
| oy | /ɔɪ/ | boy, toy, joy | 词尾 |
| aw | /ɔ/ | saw, draw, claw | |
| au | /ɔ/ | haul, because | |
| igh | /aɪ/ | night, right, high | gh 不发音（Nessy 76集）→ gh 标 `silent` |
| ie | /aɪ/ | pie, tie, lie | 词尾 |
| ue | /u/ | blue, clue, true | |
| ew | /u/ | flew, drew, new | |
| ew | /ju/ | few, dew | |
| ar | /ɑr/ | car, star, park | r控制 |
| or | /ɔr/ | fork, corn, more | r控制 |
| er | /ɝ/ | her, fern, term | r控制 |
| ir | /ɝ/ | bird, sir, girl | r控制 |
| ur | /ɝ/ | burn, hurt, turn | r控制 |
| ear | /ɪr/ | hear, near, deer | r控制 |
| air | /ɛr/ | hair, chair, fair | r控制 |
| are | /ɛr/ | care, share, bare | r控制魔法e |

### 2. `silent-e`（魔法e）

末尾 `e` 不发音，同时让前面元音变为长音（CVCe 结构）：
- a_e → /eɪ/：face, same, cake, name
- i_e → /aɪ/：kite, bike, time, five
- o_e → /oʊ/：nose, home, bone, hope
- u_e → /ju/ 或 /u/：cube, tune, rule

**不规则**（末尾 e 不发音但元音不变长）→ 用 `silent`：`have`、`come`、`some`、`give`、`live`

### 3. `silent`（不发音字母）

字母完全不发音，对周围字母无影响：
- 词首 `w`：`wrong`、`who`、`write`、`wrap`（wr 组合）
- 词首 `k`：`knee`、`knife`、`know`（kn 组合）
- 词中 `gh`：`night`、`light`、`right`、`eight`（igh 组合中 gh 不发音）
- 词尾 `b`：`lamb`、`comb`、`climb`（-mb 组合）
- `often` 的 `t`
- 不规则魔法e：`have`、`come`、`some`、`give` 的末尾 e（v 后必须加 e，Nessy 15集）

### 4. `changed`（变音）

字母发音与通常规则明显不符，且不属于已知 cluster：
- `of` 的 f → /v/（f 通常发 /f/）
- `stand`/`spin` 中 s 后的清辅音弱化（t→/d/，p→/b/）
- `beautiful` 的 eau → /ju/（极不规则）

---

## 音节拆分原则

1. **按发音自然断点**拆分，以说话停顿为准
2. **开音节**（元音结尾）→ 元音发长音（he, go, ba·by）；**闭音节**（辅音结尾）→ 元音发短音（cat, hop, nap·kin）（Nessy 02集）
3. **单音节词**整体作一个 syllable，不拆
4. **多音节词**颜色依次 `C[0]→C[1]→C[2]→C[3]`
5. **cluster 跨越音节边界时**，cluster 归入它主要影响的那个音节
6. **同一字母多标注**时优先顺序：cluster > silent-e > silent > changed
7. **不规则发音**必须在 note 中说明"不规则"，并对比常规规则
8. **y 的发音**：词首发 /j/（yes）；短词末尾发 /aɪ/（fly、by）；长词末尾发 /iː/（happy、baby）（Nessy 33集）
9. **-ould 结尾**：could、would、should 中 oul→/ʊ/，标 cluster（Nessy 75集）

### ⚠️ 音节音标归属规则（onset 原则）

两个音节之间的辅音，**归属于后面那个音节**（最大音节开头 Maximum Onset Principle）。
音节的 `phonetic` 字段只写**该音节自己发出的音**，不包含下一音节的辅音。

**正确示例：**

| 单词 | ❌ 错误 | ✅ 正确 |
|---|---|---|
| happy | `hæp` / `i` | `hæ` / `pi` |
| apple | `æp` / `əl` | `æ` / `pəl` |
| rabbit | `ræb` / `ɪt` | `ræ` / `bɪt` |
| different | `dɪf` / `ər` / `ənt` | `dɪ` / `fər` / `ənt` |
| animal | `æn` / `ɪ` / `məl` | `æ` / `nɪ` / `məl` |
| tiger | `taɪ` / `ɡər` | `taɪ` / `ɡər` ✓（辅音 g 已在第二音节）|
| monkey | `mʌŋ` / `ki` | `mʌŋ` / `ki` ✓（ng 不可分，已正确）|

**规则细化：**
- 单个辅音夹在两元音之间 → 归后面音节：ha**p**·py → hæ / **p**i
- 辅音簇夹在两元音之间 → 按发音可行性分割：ra**bb**it → ræ / **b**ɪt（双写只发一音，留一个给后节）
- cluster 组合不可分割 → 整体归入所在音节：mon·**key** → mʌŋ / **k**i

**代码格式：**
```ts
// happy: hap-py，p 归后节
{ text: 'hap', phonetic: '/hæ/', color: C[0] },
{ text: 'py',  phonetic: '/pi/', color: C[1] },

// apple: ap-ple，p 归后节
{ text: 'ap',  phonetic: '/æ/',  color: C[0] },
{ text: 'ple', phonetic: '/pəl/', color: C[1] },
```

---

## 操作流程

收到单词列表后：

**Step 1**：逐词分析
- 确定音节数量和切分点
- 对照 cluster 速查表，找出所有字母组合
- 检查是否有 silent-e、silent、changed 情况
- 查 `references/phonemes.md` 确认音标准确性

**Step 2**：输出分析表格（供人工核对）

| 单词 | 音节 | 音标 | 中文 | 标注 |
|---|---|---|---|---|
| wish | wish | /wɪʃ/ | 愿望 | 🔗 sh→/ʃ/ |
| kite | kite | /kaɪt/ | 风筝 | ✨ e（i→/aɪ/） |
| wrong | wrong | /rɒŋ/ | 错误 | 🔇 w |

**Step 3**：写入 `src/data/dictionary.ts`

读取 `src/data/dictionary.ts` 当前内容，在文件末尾合适的注释分组下追加新单词条目：

```ts
// ── 二年级下册 ─────────────────────────────────────────────────────────
  spring: { word: 'spring', phonetic: '/sprɪŋ/', syllables: [{ text: 'spring', phonetic: '/sprɪŋ/', color: C[0], marks: [{ letters: 'ng', type: 'cluster', phonetic: 'ŋ', note: 'ng 组合→/ŋ/' }] }], chinese: '春天' },
```

**Step 4**：更新 `src/data/units.ts`

在对应学期/单元的 `wordKeys` 数组中追加新单词的 key：

```ts
{ id: 'grade2-s2-u1', title: 'Unit 1', wordKeys: ['spring', 'summer', ...] },
```

**Step 5**：标记疑问点，不确定的发音或音节划分单独说明。

---

## 标注图例

- 🔗 **cluster**：字母组合发一个音素
- ✨ **silent-e**：魔法e，前面元音变长音
- 🔇 **silent**：完全不发音
- 〰️ **changed**：不规则变音
