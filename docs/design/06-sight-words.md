# 高频词页（SightWordsPage）

**源文件**：`src/pages/SightWordsPage.tsx`  
**卡片组件**：`src/components/SightWordCard.tsx`  
**词数据**：`src/data/sightWords.ts`  
**句子库**：`src/data/sightWordSentences.ts`  
**Hook**：`src/hooks/useSightWordsProgress.ts`  
**S3 同步**：`src/utils/sightWordsSync.ts`  
**路由**：`/sight-words`

---

## 功能概述

Dolch 220 高频词练习，按等级分级、每级每 10 词一组，Carousel 大卡片翻转学习。**翻卡不算过关，必须点"已掌握"**；整组全部掌握才解锁下一组。

---

## 数据结构

```
SightWordEntry
├── word          英文单词
├── chinese       中文释义
└── isContentWord 实词标记（预留配图用）

SightWordSentence
├── id            唯一 id，如 'ss001'
├── en            英文句子
├── zh            中文翻译
├── words         句中包含的 sight words（用于匹配）
└── level         难度 1~5（对应 Pre-Primer~Grade 3）
```

5 个等级：Pre-Primer / Primer / Grade 1 / Grade 2 / Grade 3

---

## 句子库设计

**文件**：`src/data/sightWordSentences.ts`，约 170 句。

- 每句命中多个 sight words，一句贡献多个词的例句
- `level` 字段标注句子难度（1-5），对应 sight word 等级
- 查询函数 `getSentencesForSightWord(word, levelIndex)`：
  - 过滤命中该词的句子
  - 只返回 `level ≤ levelIndex + 2`（当前等级+扩展一级）
  - 按 level 升序排列

---

## UI 结构（3 层导航）

列表模式，无视图切换控件。

```
SightWordsPage（等级列表）
├── Title "Sight Words"
└── Stack gap="sm"（列表）
    └── Card × 5（每个等级一行）
        ├── 左侧色块 (44×44px) + 等级名缩写
        ├── 等级名 + 已掌握进度 + 词数/组数
        ├── Progress bar
        └── 点击 → LevelView

LevelView（分组列表）
├── ← 返回 + 等级标题
└── Stack gap="sm"（列表）
    └── Card × N（每组一行）
        ├── 已解锁：组号 + 掌握进度条 + 已掌握计数
        ├── 已全部掌握：彩色边框 + "✓ 已掌握"
        ├── 未解锁：🔒 图标 + "完成上一组解锁"（opacity 0.45）
        └── 点击 → GroupPractice

GroupPractice（Carousel 练习）
├── 顶栏：← 返回 + 等级/组名 + 掌握进度条
├── Carousel 全屏卡片（SightWordCard × N）
└── 底部：全组掌握时显示解锁/完成提示横幅
```

---

## SightWordCard 卡片设计

```
正面
├── 音节区（dictionary 命中则展示 SyllableRow md，否则 PhoneticText md）
├── 单词大字（有音节时 clamp 40~88px，纯音标时 clamp 56~120px）
├── 橙色圆形发音按钮（点击播放，弹簧动画）
├── "点击查看释义与例句" 提示
├── 右下角例句数量提示（如 "5 个例句"）
└── 已掌握角标（右上角绿色 ✓，条件渲染）

背面（CSS 3D rotateY 翻转）
├── 单词 + 发音按钮 + 中文释义（同行）
├── 例句列表（ScrollArea，可滚动）
│   └── 每条例句
│       ├── 左侧难度徽章（L1~L5，各等级颜色）
│       ├── 英文句子（目标词 level color 高亮+下划线）
│       └── 中文翻译
└── 底部操作栏
    ├── "翻回去" 按钮（左）
    └── "已掌握" 按钮（右，点击变绿 ✓，可反复切换）
```

音节展示复用 `SyllableDisplay.tsx`，详见 [04b-syllable-display.md](04b-syllable-display.md)。

---

## 关键交互

| 动作 | 结果 |
|---|---|
| 点击卡片正面 | CSS 3D 翻转到背面 |
| 背面例句可滚动 | ScrollArea 展示所有命中+符合等级的句子 |
| 点击"已掌握" | 标记该词，触发 S3 异步上传，全组掌握则解锁下一组 |
| 再次点击"已掌握" | 取消掌握标记 |
| 全组掌握 | 底部出现解锁/完成提示横幅 |
| 每级第一组 | 始终解锁，无需前置 |

---

## 进度存储

`localStorage` key：
- `phonics_sw_mastered`：`{ [groupId]: string[] }` 每组已掌握单词列表
- `phonics_sw_unlocked`：`string[]` 已解锁组 id
- `phonics_sight_words_unlock_mode`：`'auto'` 或 `'quiz'`（设置页控制）

---

## S3 云端同步

路径格式：`phonics/users/{username}/sight-words/{levelId}/{groupId}.json`

```json
{ "version": 1, "masteredWords": ["a", "and", ...], "updatedAt": 1700000000000 }
```

- 触发时机：每次点击"已掌握"后异步上传（不阻塞 UI）
- 失败处理：显示 toast 通知，本地数据保留
- 需要设置页配置好 S3 + 用户名才生效（`canSync()` 检查）

---

## 设置页入口

设置页（`src/pages/SettingsPage.tsx`）"高频词" Tab → `src/pages/settings/SightWordsTab.tsx`：
- 解锁方式切换（自动 / 测验，SegmentedControl）
- 重置进度按钮（清除 localStorage 进度）
