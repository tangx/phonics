# 单元选择页

**源文件**：`src/pages/BookUnitsPage.tsx`
**路由**：`/books/:semesterId`

---

## 功能描述

在用户从年级列表页（`/books`）选择年级后展示，以卡片形式列出该年级所有单元，点击卡片进入对应单元的单词轮播页。

---

## UI 结构

```
Box (maxWidth=900, margin=0 auto, p=xl)
└── Stack gap=xl
    ├── 页头
    │   ├── IconBook + 年级标题
    │   └── 副标题「选择单元，开始学习」
    └── SimpleGrid (base:2, sm:3, md:5)
        └── Card × N（每个单元一张）
            └── Stack (align=center)
                ├── 圆形数字 Badge（单元编号）
                ├── 单元标题（Unit N）
                └── 单词数量 Badge（N 词）
```

---

## 单元卡片规格

| 属性 | 值 |
|------|-----|
| `radius` | `xl` |
| `shadow` | `sm` |
| 边框 | `2px solid ${color}22` |
| hover 效果 | `translateY(-3px)` + `box-shadow ${color}30` |
| 点击跳转 | `/books/:semesterId/:unitId` |

圆形数字区域：
- 尺寸 48×48px，`borderRadius: 50%`
- 背景 `${color}18`，文字颜色 `semester.color`
- 内容为单元序号（`unit.id.replace('u', '')`）

---

## 响应式

- 手机（base）：2 列
- 平板（sm）：3 列
- 桌面（md）：5 列（与单元数量对齐）

---

## 数据来源

- `semesterId` 从路由参数取得
- fallback 到 `semesters[0]`（semesterId 不存在时）
- 颜色取 `semester.color ?? '#1b6ca8'`，用于圆点、边框、徽章等所有强调色
