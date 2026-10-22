# 音节展示组件（SyllableDisplay）

**源文件**：`src/components/SyllableDisplay.tsx`  
**使用方**：`WordCard`（books 单词卡）、`SightWordCard`（sight words 卡片）

---

## 概述

将原本内嵌在 `WordCard.tsx` 中的音节展示逻辑提取为独立组件，供两处复用，避免重复维护。

---

## 导出的组件

### SyllableChip

单个音节块（字母 + 音标），支持三档尺寸：

| size | 字母字号 | 音标字号 | 用途 |
|------|---------|---------|------|
| `lg`（默认）| clamp(28px, 5vw, 7vh) | clamp(11px, 1.6vw, 2.2vh) | BookPage WordCard |
| `md` | clamp(20px, 3.5vw, 42px) | clamp(10px, 1.3vw, 16px) | SightWordCard 正面 |
| `sm` | clamp(14px, 2.2vw, 26px) | clamp(9px, 1vw, 13px) | 预留（小空间场景）|

```
Stack (align=center)
├── 音节字母（SyllableLetters 处理标注）
└── 音节音标（buildPhoneticWithDots 处理 cluster 点分隔）
```

框样式：彩色边框 + 主色 12% 透明背景，圆角随 size 变化。

---

### SyllableRow

横排展示所有音节块 + 整词完整音标，一行搞定：

```tsx
<SyllableRow syllables={entry.syllables} phonetic={entry.phonetic} size="md" />
```

```
Stack (align=center, gap=6)
├── Group（SyllableChip × N，wrap，居中）
└── Text 整词音标（#9ca3af，随 size 缩放）
```

---

### PhoneticText

无音节数据时的纯音标 fallback，用于 sight words 中 dictionary 未收录的词：

```tsx
<PhoneticText phonetic="/ðə/" size="md" />
```

字号随 size 响应式缩放（lg: clamp 22~52px，md: clamp 16~32px，sm: clamp 12~20px）。

---

## 内部函数（不导出）

| 函数 | 职责 |
|------|------|
| `LetterBadge` | 单个字母标注（cluster/silent/changed），包裹 Tooltip；当 `affectedVowel === mark.letters` 时叠加顶线 |
| `renderUnmarkedSegment` | 渲染无 mark 的字符段；逐字符检测 `externallyAffectedVowels`，命中则橙色顶线高亮 |
| `SyllableLetters` | 将音节文字按 marks 切段，逐段渲染，段间插中点 `·` |
| `buildPhoneticWithDots` | 对 cluster 类型音标按 phonetic 片段加中点分隔 |

---

## 字母标注视觉规则

| 类型 | 视觉表现 |
|------|---------|
| `cluster` | 纯音节颜色，hover/touch 触发 Tooltip |
| `silent` / `silent-e` | 灰色删除线 `line-through #9ca3af` + Tooltip |
| `changed` | 橙色波浪下划线 `underline wavy #c2410c` + Tooltip |
| `changed` + `affectedVowel: 'y'`（自身即受影响元音） | 橙色顶线 + 波浪下划线叠加（嵌套 span 实现）|
| 无 mark 的 `affectedVowel` 字母（如 `nice` 的 `i`） | 橙色顶线 `overline #c2410c`，无 Tooltip |

### affectedVowel 渲染逻辑

`LetterMark.affectedVowel` 标记哪个元音被 silent-e 或 `y→/aɪ/` 规则激活，渲染时用橙色顶线高亮。

- **外部受影响元音**（`affectedVowel ≠ mark.letters`，如 `nice` 的 `i`）：`SyllableLetters` 收集到 `externallyAffectedVowels` Set，在无 mark 的字符段内逐字符匹配
- **自身即受影响元音**（`affectedVowel === mark.letters`，如 `my` 的 `y`）：`LetterBadge` 检测 `isSelfAffected`，嵌套 span 同时应用顶线和波浪下划线
- **无 `affectedVowel`**（`have`、`house` 等不规则词）：保持原有样式，不加顶线
