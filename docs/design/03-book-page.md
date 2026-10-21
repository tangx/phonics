# 单元学习页

**源文件**：`src/pages/BookPage.tsx`
**路由**：`/books/:semesterId` | `/books/:semesterId/:unitId` | `/books/:semesterId/:unitId/:word`

---

## 整体布局（全高 Flex 列）

```
Box (height=100%, flex column, overflow=hidden)
├── 年级选择器       (flexShrink=0)  ← Select，可切换年级
├── 单元选择器       (flexShrink=0)  ← SegmentedControl
├── 单词折叠栏       (flexShrink=0, borderBottom)
│   ├── 折叠触发行   ← "当前词 · x/n 个单词" + 展开箭头
│   └── Collapse    ← 展开后显示所有单词 chip，默认收起
└── Carousel 区域   (flex=1, minHeight=0)
```

布局策略：最外层容器 `height: 100%`，Carousel 通过 `flex: 1` 填满剩余空间，整体不产生页面滚动。

---

## 年级选择器

- Mantine `Select`，`size="xs"`，`radius="xl"`
- `data` = 所有学期 `[{ value: s.id, label: s.title }]`
- 切换年级时跳转到 `/books/:newSemesterId/:firstUnitId`
- input 颜色使用当前学期的 `semesterColor`
- 若 URL 中 `semesterId` 不存在，fallback 到 `semesters[0]`（不显示报错）

---

## 单元选择器

- Mantine `SegmentedControl`，`radius="xl"`，`size="xs"`
- `data` = 该学期所有单元 `[{ value: unit.id, label: unit.title }]`
- 切换单元时导航到 `/books/:semesterId/:newUnitId`（不带 word，从头开始）

---

## 单词折叠栏

### 折叠触发行

- `Group` 整体可点击，`onClick` 切换 `wordListOpen` 状态
- 左侧：`当前词 · x/n 个单词`（`Text size="xs" c="dimmed"`）
- 右侧：`ActionIcon` variant="subtle" size="xs"，图标随展开/收起切换（`IconChevronUp` / `IconChevronDown`）

### 单词 chip 列表（Collapse 内）

- `Group gap={4} wrap="wrap"`，显示当前单元所有单词
- 每个词渲染为 `UnstyledButton`（自定义 chip 样式）
- 激活态：文字色 `semesterColor`，背景 `${semesterColor}12`，底边 `2px solid ${semesterColor}`，`fontWeight=700`
- 非激活态：`color=#6b7280`，底边透明
- 点击 chip → 更新 URL + Embla scrollTo 对应下标
- 通过 `useEffect + chipRefs + scrollIntoView` 保证当前激活词自动滚入可见区域

---

## Carousel（单词轮播）

- 使用 `@mantine/carousel`（基于 Embla）
- `slideSize="100%"`，`height="100%"`，`withIndicators`，`withKeyboardEvents`
- `loop: false`，`align: 'center'`
- `startIndex` 由 URL 中的 `word` 参数决定
- 滑动时通过 `onSlideChange` 同步更新 URL（`replace: true`），实现可书签/分享
- 控制按钮样式：白底 + `#eef0f8` 边框 + 浅阴影 + `#1a1a2e` 图标色
- 每张 slide 渲染一个 `<WordCard>`

---

## 路由参数处理

| 参数 | 缺省行为 |
|------|---------|
| `semesterId` 不存在 | fallback 到 `semesters[0]` |
| `unitId` 未传 | 使用第一个单元 `semester.units[0]` |
| `word` 未传 | 从第一个单词开始（`startIndex=0`） |
| `word` 不在列表中 | `indexOf` 返回 -1，取 0 |

---

## 状态与副作用

- `wordListOpen`：单词折叠栏展开状态，默认 `false`（收起）
- `emblaRef`：持有 Embla 实例，用于命令式 scrollTo
- `chipRefs`：数组 ref，驱动 chip 自动滚入视口
- `useEffect([currentIndex])`：每次激活词变化时将对应 chip 滚入可见区
