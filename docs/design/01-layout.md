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
|------|----|
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
├── Section grow (菜单区)  — ScrollArea，Sight Words + Books 折叠树
└── Section (底部)         — 设置入口
```

### 品牌区

- Logo：`IconBooks`(20px) + 文字「拼读乐园」
- 字体：`Nunito`，`fw=800`，颜色 `#1a1a2e`
- 点击品牌名跳转到 `/books`
- 手机端 Burger：`hiddenFrom="sm"` 在大屏隐藏

### 菜单区（导航项规范）

| 导航项 | 路由 | 图标 |
|--------|------|------|
| Sight Words | `/sight-words` | `IconLetterCase` |
| Books（可展开） | `/books` | `IconBooks` |
| └ 各学期子项 | `/books/:semesterId/:firstUnitId` | 彩色圆点（`semester.color`） |

Books 使用自定义 `UnstyledButton` 而非 `NavLink`，以实现：
- 点击主文本 → 跳转 `/books`
- 点击展开箭头 → 仅折叠/展开，不跳转

展开状态用 `Collapse` 管理；学期子项高亮条件：`location.pathname.startsWith('/books/:semesterId')`。

激活状态样式：
- 背景 `var(--mantine-color-blue-0)`
- 文字 `var(--mantine-color-blue-7)`

圆点颜色：激活时用 `semester.color`，未激活时 `#e9ecef`。

### 底部设置入口

- `NavLink` with `IconSettings(16px)`
- 激活条件：`location.pathname === '/settings'`
- 有 `borderTop: 1px solid #eef0f8` 分隔
