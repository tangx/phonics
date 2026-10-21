# 单词卡片（WordCard）

**源文件**：`src/components/WordCard.tsx`
**使用方**：`BookPage` 的每个 Carousel.Slide

---

## 卡片整体结构

```
Card (radius="xl", shadow="lg", height=100%, flex column)
├── [左上角] 音节图例 Popover (position=absolute)
└── Grid 布局区 (flex=1)
    ├── 左列 (60%) — 单词信息区 (wordEl)
    └── 右列 (40%) — WordImage
```

CSS class `card-layout` 控制竖屏时切换为上图下字布局（定义在 `src/index.css`）。

---

## 音节图例 Popover

- 触发按钮：`ActionIcon variant="subtle" size="sm"` with `IconHelpCircle`，左上角绝对定位
- 弹出内容：4 行颜色说明（第1~4音节对应红/蓝/绿/紫圆点 + 文字）

---

## 左列：单词信息区（wordEl）

```
Stack (flex=1, height=100%, align=center, justify=center)
├── 音节块横排 (Group wrap)
│   └── SyllableChip × N
├── 完整单词 + 音标行
│   ├── 单词大字 (Nunito fw=800, clamp 40~12vh)
│   ├── ActionIcon 发音按钮 (橙黄 #f5a623, 弹跳动效)
│   └── 音标文字 (size clamp 16~3.5vh, color #9ca3af)
└── Tabs (拼读 / 例句)
```

### 发音按钮动效

- 点击时 `scale(1.4)` → 380ms 后恢复 `scale(1)`
- 缓动：`cubic-bezier(0.34, 1.56, 0.64, 1)` (spring)
- 调用 `playWord(entry.word)`（有道词典发音）

### 卡片入场动画

- `useEffect + el.animate`
- 从 `translateY(28px) scale(0.94) opacity=0` → 正常态
- 时长 500ms，同上 spring 缓动

---

## SyllableChip（音节块）

每个音节渲染为一个带色框块：

```
Stack (align=center)
├── 音节字母 (Nunito fw=800, clamp 28~7vh)
│   └── SyllableLetters (处理字母标注)
└── 音标 (clamp 11~2.2vh)
    └── buildPhoneticWithDots (cluster 类型加中点分隔)
```

框样式：
- 背景：`SYLLABLE_BG[color]`（主色 + 12% 透明度）
- 边框：`2px solid {color}`
- 圆角：`1vw`（响应式）

---

## 字母标注系统（LetterBadge / SyllableLetters）

`SyllableLetters` 将音节文字按 `marks` 切成 segments，普通段与标注段之间插入中点 `·`（`0.7em`，`${color}80`）。

| 标注类型 | 视觉表现 |
|----------|---------|
| `silent` / `silent-e` | 灰色删除线 `line-through #9ca3af` |
| `changed` | 橙色波浪下划线 `underline wavy #c2410c` |
| `cluster` | 纯音节颜色，无特殊装饰，hover 有 Tooltip |

所有类型均包裹在 `Tooltip` 中，支持 hover / focus / touch 触发。

---

## Tabs：拼读 / 例句

### 拼读 Tab（marks）

- 无标注时：「规则发音，无特殊标注」提示
- 有标注时：`Stack` 列出每条 `LetterMark`，用图标区分类型：
  - `cluster` → `IconLink`
  - `changed` → `IconWaveSine`
  - `silent*` → `IconVolumeOff`
- 背景 `#f0f4ff`，圆角 10

### 例句 Tab（sentences）

- 有例句时默认激活（无则默认激活拼读 Tab）
- 例句文字：当前单词高亮为 `#1b6ca8 fw=800`（正则分割）
- 中文翻译：`#6b7280`
- 底部操作行：
  - 左：声音图标 + 激活语音按钮（按 `SLOT_META` 渲染头像+标签）+ 系统音速率按钮（0.5x / 0.8x / 1x）
  - 右：换一句按钮（`IconRefresh`）

语音按钮样式：`${meta.color}15` 背景，`13px Noto Sans SC`，圆角胶囊形。
系统音速率按钮：`rgba(100,100,100,0.10)` 背景，`#555`。

---

## 响应式尺寸策略

所有关键尺寸均使用 `clamp(min, preferred, max)` 实现：
- 音节字母：`clamp(28px, 5vw, 7vh)`
- 单词大字：`clamp(40px, 8vw, 12vh)`
- 内边距：`clamp(6px, 1.2vw, 16px)`

这保证在手机、平板、桌面宽屏下卡片内容都有合适的视觉比例。
