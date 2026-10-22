# 公共单词卡片组件设计文档

## 源文件

- `src/components/WordCardFront.tsx` — 正面组件
- `src/components/WordCardBack.tsx` — 背面组件

## 功能描述

将原 `WordCard` 和 `SightWordCard` 的重复逻辑提取为可复用的正/背面组件，接受统一的 `UnifiedEntry`，各页面按需组合。

## WordCardFront

### Props

```ts
{
  entry: UnifiedEntry
  size?: 'lg' | 'md'        // lg=BookPage 全屏；md=Modal/SightWords
  onClick?: () => void       // 点击正面回调（翻转等）
  color?: string             // 主题色（SightWords 等级色）
  mastered?: boolean         // 右上角掌握标记
  sentenceCount?: number     // 右下角例句数量角标
}
```

### UI 结构（size=md，竖排）

```
WordCardFront (md)
├── SyllableRow（有 syllables）或 PhoneticText（有 phonetic）或空
├── 单词大字
├── 橙色圆形发音按钮
├── 中文释义（color 着色）
├── 提示文字"点击查看例句"（有 onClick 时）
├── 掌握标记圆（右上，mastered=true 时）
└── 例句数量角标（右下，sentenceCount>0 时）
```

### UI 结构（size=lg，横排）

```
WordCardFront (lg)
├── SyllableChip 横排（有 syllables）
├── 完整单词大字 + ActionIcon 发音按钮（同行）
├── 音标小字
└── 中文释义
```

---

## WordCardBack

### Props

```ts
{
  entry: UnifiedEntry
  sentences?: (Sentence | SightWordSentence)[]
  pixabayKey?: string
  color?: string
  onFlipBack?: () => void          // 有则切换到 SightWords 背面布局
  mastered?: boolean
  onToggleMastered?: () => void
}
```

### 两种布局模式

**SightWords 背面**（`onFlipBack` 存在）：
```
WordCardBack (sight-words mode)
├── 顶部：单词 + 发音按钮 + 中文
├── 例句 ScrollArea（全部列出，带 L1~L5 Badge）
└── 底部操作栏：翻回去 | 已掌握切换按钮
```

**标准模式**（BookPage / Modal）：
```
WordCardBack (standard mode)
├── 单词大字 + 发音按钮 + 音标
├── Tabs
│   ├── 例句 Tab — 一次显示一句 + 换一句 + 多语音播放
│   └── 拼读 Tab — allMarks 列表（cluster/silent/changed 图标）
└── 图片区（pixabayKey 存在时）
```

---

## 使用方对照

| 页面 | Front | Back |
|---|---|---|
| BookPage | `size="lg"` | 标准模式，`pixabayKey` 传入 |
| SightWordsPage | `size="md"` + `onClick={翻转}` | `onFlipBack` + `onToggleMastered` |
| SearchPage Modal | `size="md"` | 标准模式 |

## 共用常量

`SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'` — 弹性动画曲线，正/背面各自定义（一致）。
