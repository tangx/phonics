# 设计文档总览

> **规则**：修改任何页面或组件代码时，必须同步更新对应的设计文档。

## 文档索引

| 文档 | 对应源文件 | 说明 |
|------|-----------|------|
| [01-layout.md](01-layout.md) | `src/pages/HomePage.tsx`、`src/components/AppNav.tsx` | 全局布局与导航栏 |
| [02-books-home.md](02-books-home.md) | `src/pages/BooksHomePage.tsx` | 课本列表页（年级卡片） |
| [02b-book-units.md](02b-book-units.md) | `src/pages/BookUnitsPage.tsx` | 单元选择页（单元卡片） |
| [03-book-page.md](03-book-page.md) | `src/pages/BookPage.tsx` | 单元学习页（单词轮播） |
| [04-word-card.md](04-word-card.md) | `src/components/WordCard.tsx` | 单词卡片（核心展示组件） |
| [05-word-image.md](05-word-image.md) | `src/components/WordImage.tsx` | 单词配图（Pixabay 联网 + 本地缓存） |
| [06-sight-words.md](06-sight-words.md) | `src/pages/SightWordsPage.tsx` | 高频词页（占位） |
| [07-settings.md](07-settings.md) | `src/pages/SettingsPage.tsx` | 设置页（Tab 容器） |
| [08-settings-edge-voice.md](08-settings-edge-voice.md) | `src/pages/settings/EdgeVoiceTab.tsx` | Edge Neural 语音设置 |
| [09-settings-ios-voice.md](09-settings-ios-voice.md) | `src/pages/settings/IosVoiceTab.tsx` | iOS 系统音设置 |
| [10-settings-image.md](10-settings-image.md) | `src/pages/settings/ImageTab.tsx` | 图片 / Pixabay 设置 |
| [11-settings-sync.md](11-settings-sync.md) | `src/pages/settings/SyncTab.tsx` | 云端同步设置 |
| [12-settings-user.md](12-settings-user.md) | `src/pages/settings/UserTab.tsx` | 用户信息设置 |

## 设计语言约定

### 颜色

| Token | 值 | 用途 |
|-------|-----|------|
| `#1a1a2e` | 深蓝黑 | 主要文字、按钮背景、品牌色 |
| `#f5a623` | 橙黄 | 发音按钮 |
| `#eef0f8` | 浅蓝灰 | 分割线、边框 |
| `#f0f4ff` | 极浅蓝 | 卡片内容区背景、标注块背景 |
| `#9ca3af` | 灰 | 次要文字、图标 |

### 音节颜色

| 颜色 | 值 | 含义 |
|------|-----|------|
| 红 | `#d64045` | 第1音节 |
| 蓝 | `#1b6ca8` | 第2音节 |
| 绿 | `#2d8a4e` | 第3音节 |
| 紫 | `#7b3fa0` | 第4音节 |

### 字体

- 英文 / 数字：`Nunito, sans-serif`（圆角、儿童友好）
- 中文：`Noto Sans SC, sans-serif`

### 圆角风格

- 卡片：`radius="xl"`（大圆角，活泼感）
- 按钮、输入框：`radius="md"` 或 `radius="xl"`
- 导航项：`borderRadius: 8`

### 响应式

- 侧边栏宽度 240px，`breakpoint: 'sm'`（小屏收起）
- 手机端顶部显示汉堡菜单栏（高度 48px）
- 单词卡内图文布局：桌面横向 60/40 分栏，竖屏切换为上图下字（通过 CSS class `card-layout`）
