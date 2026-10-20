---
name: phonics-word-split
description: 为中国小学英语教学网站录入新单词时，分析英文单词的音节拆分、音标、中文释义和字母级标注，生成可直接粘贴到 src/data/units.ts 的 TypeScript 数据对象。当用户提供新单词、新单元或新课本内容时，必须使用此 skill。触发词包括：添加单词、录入单词、新单词、新单元、分析单词、拆分音节、add words、new unit。
---

# Phonics 单词拆分 Skill

## 项目背景

面向中国小学生的英语拼读教学网站。核心理念：**自然拼读规则 + 国际音标双轨并行**，帮助孩子建立"字母组合 → 音标 → 发音"的完整映射。

数据文件：`src/data/units.ts`，类型定义：`src/types.ts`。
音素完整参考：读取 `references/phonemes.md`（44个英语音素、拼写对应、例词）。

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
| ch | /tʃ/ | chin, teach, lunch | |
| tch | /tʃ/ | match, catch, watch | 元音后用 tch |
| ck | /k/ | neck, luck, duck, back | 短元音后用 ck |
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
| ai | /eɪ/ | rain, tail, wait | 长音 a |
| ay | /eɪ/ | day, say, play | 词尾长音 a |
| ee | /i/ | tree, see, need | 长音 e |
| ea | /i/ | sea, meat, mean, eat | 长音 e（常规） |
| ea | /ɛ/ | head, bread, dead | **不规则**，需在 note 说明 |
| ea | /ɛr/ | wear, bear, pear | r控制元音 |
| oa | /oʊ/ | boat, coat, road | 长音 o |
| ow | /oʊ/ | snow, show, bowl | 词尾/辅音前 |
| ow | /aʊ/ | now, cow, down, wow | 感叹/词尾 |
| oo | /u/ | moon, food, zoo, school | 长音（多数情况） |
| oo | /ʊ/ | book, good, look, foot | 短音，需在 note 说明 |
| ou | /aʊ/ | mouth, out, cloud | |
| ou | /ʌ/ | young, country | **不规则** |
| oi | /ɔɪ/ | coin, oil, boil | |
| oy | /ɔɪ/ | boy, toy, joy | 词尾 |
| aw | /ɔ/ | saw, draw, claw | |
| au | /ɔ/ | haul, because | |
| igh | /aɪ/ | night, right, high | |
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
- 词首 w：`wrong`（w）、`who`（w）
- kn 组合：`knee`、`knife`（k → silent，n 才是音素）
- wr 组合：`write`、`wrap`（w → silent）
- `often` 的 t、`lamb` 的 b、`comb` 的 b
- 不规则魔法e：`have`、`come`、`some` 的末尾 e

### 4. `changed`（变音）

字母发音与通常规则明显不符，且不属于已知 cluster：
- `of` 的 f → /v/（f 通常发 /f/）
- `stand`/`spin` 中 s 后的清辅音弱化（t→/d/，p→/b/）
- `beautiful` 的 eau → /ju/（极不规则）

---

## 音节拆分原则

1. **按发音自然断点**拆分，以说话停顿为准
2. **单音节词**整体作一个 syllable，不拆
3. **多音节词**颜色依次 `C[0]→C[1]→C[2]→C[3]`
4. **cluster 跨越音节边界时**，cluster 归入它主要影响的那个音节
5. **同一字母多标注**时优先顺序：cluster > silent-e > silent > changed
6. **不规则发音**必须在 note 中说明"不规则"，并对比常规规则

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

**Step 3**：输出 TypeScript 代码

```ts
{ word: 'wish', phonetic: '/wɪʃ/', syllables: [{ text: 'wish', phonetic: '/wɪʃ/', color: C[0], marks: [{ letters: 'sh', type: 'cluster', phonetic: 'ʃ', note: 'sh 组合→/ʃ/' }] }], chinese: '愿望；祝愿' },
{ word: 'apple', phonetic: '/ˈæp.əl/', syllables: [{ text: 'ap', phonetic: '/æp/', color: C[0] }, { text: 'ple', phonetic: '/əl/', color: C[1] }], chinese: '苹果' },
```

**Step 4**：标记疑问点，不确定的发音或音节划分单独说明。

---

## 标注图例

- 🔗 **cluster**：字母组合发一个音素
- ✨ **silent-e**：魔法e，前面元音变长音
- 🔇 **silent**：完全不发音
- 〰️ **changed**：不规则变音
