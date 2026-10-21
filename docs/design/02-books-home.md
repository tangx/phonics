# 课本列表页

**源文件**：`src/pages/BooksHomePage.tsx`
**路由**：`/books`

---

## 页面结构

```
Box (maxWidth=900, margin=0 auto, p="xl")
└── Stack gap="xl"
    ├── 页面标题区
    └── SimpleGrid (学期卡片网格)
```

---

## 标题区

- `IconBooks`(28px, `#1a1a2e`) + 文字「Books」（`Nunito fw=800 xl`）
- 副标题：「选择课本，开始学习单词拼读」（`size="sm" c="dimmed"`）

---

## 学期卡片 (SemesterCard)

每个 `SemesterData` 渲染为一张卡片，点击跳转到 `/books/:semesterId`。

### 布局

```
Card (radius="xl", shadow="sm", padding=0)
├── 封面色块 (h=120)
│   └── IconBooks (48px, white)
└── 信息区 (p="md", background=white)
    ├── 标题 + 徽章行
    │   ├── semester.title (Nunito fw=700 lg)
    │   ├── Badge "N 单元"
    │   └── Badge "N 单词"
    └── [可选] 简介文字 (size="xs" c="dimmed")
```

### 封面色块

- 高度固定 120px
- 背景：`linear-gradient(135deg, {color} 0%, {color}cc 100%)`
- `color` 取自 `semester.color ?? '#1b6ca8'`

### 徽章

- `variant="light"`，`size="sm"`
- 背景色：`${color}15`（主色 + 9% 透明度）
- 文字色：`semester.color`

### 悬停动效

- `transform: translateY(-3px)` + `boxShadow: 0 8px 24px rgba(0,0,0,0.12)`
- 过渡：`0.15s`
- 通过 `onMouseEnter / onMouseLeave` 内联实现

---

## 响应式网格

```
SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg"
```

- 手机：1列；平板：2列；桌面：3列
