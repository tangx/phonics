# 课本列表页

**源文件**：`src/pages/BooksHomePage.tsx`
**路由**：`/books`

---

## 页面结构

```
Box (maxWidth=900, margin=0 auto, p="xl")
└── Stack gap="xl"
    ├── 页面标题区
    └── Stack gap="sm"（学期列表）
        └── Card × N（每个学期一行）
```

---

## 标题区

- `IconBooks`(28px, `#1a1a2e`) + 文字「Books」（`Nunito fw=800 xl`）
- 副标题：「选择课本，开始学习单词拼读」（`size="sm" c="dimmed"`）

---

## 学期列表项（列表模式，唯一模式）

每个 `SemesterData` 渲染为一行卡片，点击跳转到 `/books/:semesterId`。

### 布局

```
Card (radius="lg", shadow="xs", padding="sm")
└── Group gap="md" wrap="nowrap"
    ├── 左侧色块图标 (44×44px, borderRadius=12)
    │   └── IconBooks (22px, white)
    ├── Stack gap={4} (flex=1)
    │   ├── semester.title (Nunito fw=700 sm)
    │   └── Group: Badge "N 单元" + Badge "N 单词"
    └── IconChevronRight (16px, #9ca3af)
```

### 色块图标

- 尺寸：44×44px，`borderRadius: 12`
- 背景：`linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`
- `color` 取自 `semester.color ?? '#1b6ca8'`

### 徽章

- `variant="light"`，`size="xs"`
- 背景色：`${color}15`，文字色：`semester.color`

### 悬停动效

- `transform: translateY(-2px)` + `boxShadow: 0 6px 20px rgba(0,0,0,0.1)`
- 过渡：`0.15s`

---

## 视图约定

只有列表模式，无视图切换控件。
