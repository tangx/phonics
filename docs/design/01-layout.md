# 全局布局与导航栏

**源文件**
- `src/pages/HomePage.tsx`（`AppShellLayout`，路由出口）
- `src/components/AppNav.tsx`（侧边栏导航）

---

## 整体结构

```
AppShell
├── AppShell.Navbar (240px, 小屏折叠)
│   └── AppNav
└── AppShell.Main
    ├── [手机端] TopBar (h=48, 仅 hiddenFrom="sm")
    └── <Outlet /> (各页面内容，overflowY: auto)
```

`AppShell` 使用 Mantine 的 `padding={0}`，内容区自行管理内边距。

---

## AppShellLayout (`src/pages/HomePage.tsx`)

### 职责

- 作为所有子路由的 Shell 容器
- 手机端提供 TopBar（汉堡按钮 + 品牌名）
- 将 `navOpened / toggleNav / closeNav` 传给 `AppNav`

### 手机端 TopBar

| 属性 | 值 |
|------|-----|
| 高度 | 48px |
| 背景 | `#fff` |
| 底边 | `1px solid #eef0f8` |
| 显示条件 | `hiddenFrom="sm"`（大屏隐藏） |
| 内容 | Burger + IconBooks + 「拼读乐园」 |

---

## AppNav (`src/components/AppNav.tsx`)

### 三区分层

```
AppShell.Navbar
├── Section (品牌区)       — 品牌 Logo + 手机端 Burger
├── Section grow (菜单区)  — ScrollArea，Sight Words + Books 两级折叠树
└── Section (底部)         — 设置入口
```

### 品牌区

- Logo：`IconBooks`(20px) + 文字「拼读乐园」
- 字体：`Nunito`，`fw=800`，颜色 `#1a1a2e`
- 点击品牌名跳转到 `/books`
- 手机端 Burger：`hiddenFrom="sm"` 在大屏隐藏

### 菜单区（两级折叠树）

Books 展开后呈现两级结构：

```
Books（可展开）
└── 一年级（上）▶   ← 年级行，点击跳转并展开单元
    ├── Unit 1
    ├── Unit 2
    └── ...
└── 一年级（下）▶
    └── ...
```

| 导航项 | 路由 | 图标/标记 |
|--------|------|----------|
| Sight Words | `/sight-words` | `IconLetterCase` |
| Books（可展开） | `/books` | `IconBooks` |
| └ 年级行 | `/books/:semesterId/:firstUnitId` | 彩色圆点 |
| └ └ 单元行 | `/books/:semesterId/:unitId` | NavLink 激活高亮 |

**年级行**：`UnstyledButton`，点击同时导航到年级首单元并展开该年级单元列表。  
右侧小箭头单独 `stopPropagation`，仅控制折叠，不导航。

**单元行**：Mantine `NavLink`，`size="xs"`，激活条件：URL 包含 `:semesterId/:unitId`。

**展开状态逻辑**：
- `booksExpanded`：Books 整体展开状态
- `expandedSemester`：当前展开的年级 ID；`null` = 全收起
- 当 URL 处于某年级时，该年级自动展开（`isSemesterActive || expandedSemester === id`）

激活样式：
- Books 整体激活：背景 `var(--mantine-color-blue-0)`，文字 `var(--mantine-color-blue-7)`
- 年级激活：背景 `${semester.color}15`，文字 `semester.color`，圆点变色

### 底部设置入口

- `NavLink` with `IconSettings(16px)`
- 激活条件：`location.pathname === '/settings'`
- 有 `borderTop: 1px solid #eef0f8` 分隔
