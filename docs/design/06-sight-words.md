# 高频词页（SightWordsPage）

**源文件**：`src/pages/SightWordsPage.tsx`  
**数据**：`src/data/sightWords.ts`  
**Hook**：`src/hooks/useSightWordsProgress.ts`  
**路由**：`/sight-words`

---

## 功能概述

Dolch 220 高频词练习，按等级分级、每级每 10 词一组，翻转词卡形式学习。小朋友翻完一组所有词卡后自动解锁下一组，提供持续的成就感反馈。

---

## 数据结构

```
sightWordLevels: SightWordLevel[]
├── id, title, color
└── groups: SightWordGroup[]
    ├── id
    └── words: SightWordEntry[]
        ├── word          英文
        ├── chinese       中文
        ├── example       例句（英文）
        ├── exampleZh     例句（中文）
        └── isContentWord 实词标记（预留配图用）
```

5 个等级：Pre-Primer / Primer / Grade 1 / Grade 2 / Grade 3

---

## UI 结构（3 层导航）

```
SightWordsPage（等级列表）
├── Title "Sight Words"
└── SimpleGrid（1-3列）
    └── LevelCard × 5
        ├── 等级名、词数、组数
        ├── 已解锁进度条
        └── 点击 → LevelView

LevelView（分组列表）
├── ← 返回 + 等级标题
└── SimpleGrid（2-4列）
    └── GroupCard × N
        ├── 已解锁：组号 + 词数，可点击
        ├── 未解锁：🔒 图标 + "完成上一组解锁"
        └── 点击 → GroupPractice

GroupPractice（练习视图）
├── ← 返回 + 进度条（已翻/总数）
├── SimpleGrid 翻转词卡
│   ├── 正面：单词大字 + "点击翻转"
│   └── 背面：中文 + 例句（英/中）
└── 翻完全部 → "完成这组，解锁下一组！" 按钮
```

---

## 关键交互

| 动作 | 结果 |
|---|---|
| 翻转词卡 | CSS 3D rotateY(180deg) 动画，显示中文+例句 |
| 翻完 10 张 | 解锁按钮出现 |
| 点击解锁按钮 | 下一组 groupId 写入 localStorage，返回分组列表 |
| 每级第一组 | 始终解锁，无需前置 |

---

## 进度存储

`localStorage` key：
- `phonics_sight_words_progress`：已解锁 groupId 的 JSON 数组
- `phonics_sight_words_unlock_mode`：`'auto'` 或 `'quiz'`（设置页控制）

---

## 设置页入口

设置页（`src/pages/SettingsPage.tsx`）新增"高频词" Tab，对应 `src/pages/settings/SightWordsTab.tsx`：
- 解锁方式切换（自动 / 测验，SegmentedControl）
- 重置进度按钮（清除 localStorage 进度）
