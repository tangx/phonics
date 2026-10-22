# 高频词页（SightWordsPage）

**源文件**：`src/pages/SightWordsPage.tsx`  
**卡片组件**：`src/components/SightWordCard.tsx`  
**数据**：`src/data/sightWords.ts`  
**Hook**：`src/hooks/useSightWordsProgress.ts`  
**S3 同步**：`src/utils/sightWordsSync.ts`  
**路由**：`/sight-words`

---

## 功能概述

Dolch 220 高频词练习，按等级分级、每级每 10 词一组，Carousel 大卡片翻转学习。**翻卡不算过关，必须点"已掌握"**；整组全部掌握才解锁下一组。

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
        ├── 已掌握进度条（mastered/total）
        └── 点击 → LevelView

LevelView（分组列表）
├── ← 返回 + 等级标题
└── SimpleGrid（2-4列）
    └── GroupCard × N
        ├── 已解锁：组号 + 掌握进度条 + 已掌握计数
        ├── 已全部掌握：绿色边框 + "✓ 已全部掌握"
        ├── 未解锁：🔒 图标 + "完成上一组解锁"
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
├── 超大单词（clamp 56~120px，Nunito 900）
├── 橙色圆形发音按钮（点击播放，弹簧动画）
├── "点击查看释义" 提示文字
└── 已掌握角标（右上角绿色 ✓，条件渲染）

背面（CSS 3D rotateY 翻转）
├── 单词 + 发音按钮（较小）
├── 中文释义（level color，粗体）
├── 例句卡片
│   ├── 英文（目标词 level color 高亮 + 下划线）
│   └── 中文翻译
└── 底部操作栏
    ├── "翻回去" 按钮（左）
    └── "已掌握" 按钮（右，点击变绿 ✓，可反复切换）
```

---

## 关键交互

| 动作 | 结果 |
|---|---|
| 点击卡片正面 | CSS 3D 翻转到背面 |
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
