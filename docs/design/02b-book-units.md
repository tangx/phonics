# 单元选择页

**源文件**：`src/pages/BookUnitsPage.tsx`
**路由**：`/books/:semesterId`

---

## 功能描述

在用户从年级列表页（`/books`）选择年级后展示，以列表形式列出该年级所有单元，点击跳转到对应单元的单词轮播页。

---

## UI 结构

```
Box (maxWidth=900, margin=0 auto, p=xl)
└── Stack gap=xl
    ├── 页头
    │   ├── IconBook + 年级标题
    │   └── 副标题「选择单元，开始学习」
    └── Stack gap="sm"（单元列表）
        └── Card × N（每个单元一行）
            └── Group gap="md" wrap="nowrap"
                ├── 左侧数字色块 (44×44px, borderRadius=12)
                ├── Stack (flex=1)
                │   ├── 单元标题
                │   └── 「N 个单词」副标题
                ├── Badge（N 词）
                └── IconChevronRight
```

---

## 单元列表项规格

| 属性 | 值 |
|------|-----|
| `radius` | `lg` |
| `shadow` | `xs` |
| 边框 | `1.5px solid ${color}18` |
| hover 效果 | `translateY(-2px)` + `box-shadow ${color}20` |
| 点击跳转 | `/books/:semesterId/:unitId` |

左侧数字区域：
- 尺寸 44×44px，`borderRadius: 12`
- 背景 `${color}18`，文字颜色 `semester.color`
- 内容为单元序号（`unit.id.replace('u', '')`）

---

## 数据来源

- `semesterId` 从路由参数取得
- fallback 到 `semesters[0]`（semesterId 不存在时）
- 颜色取 `semester.color ?? '#1b6ca8'`，用于数字色块、边框、徽章等所有强调色

---

## 视图约定

只有列表模式，无视图切换控件。
