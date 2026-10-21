# 图片设置（ImageTab）

**源文件**：`src/pages/settings/ImageTab.tsx`
**持久化**：`localStorage`

---

## 功能

- 配置 Pixabay API Key（用于联网拉取单词配图）
- 配置图片缓存行为

---

## UI 结构

```
Stack gap="lg"
├── 说明文字区
├── PasswordInput (Pixabay API Key)
├── 注册链接 (pixabay.com)
├── Title "图片缓存" (order=5)
├── NumberInput 每词缓存数量 (1~20, maxWidth=120)
├── Switch 随机轮询
├── NumberInput 轮询间隔秒数 (0~60, maxWidth=120)
└── 保存按钮 (radius="xl", 全宽)
```

---

## 配置项

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `pixabayKey` | `''` | Pixabay API Key，存储在独立 localStorage key (`PIXABAY_KEY_LS`) |
| `cacheSize` | 5 | 每个单词最多缓存多少张图片（缓存满后停止联网） |
| `shuffle` | false | 是否随机轮询缓存图片 |
| `interval` | 0 | 自动切换间隔（秒），0 表示不自动切换 |

图片缓存配置存在 `phonics_image_settings`（见 `src/pages/settings/image.ts`）。

---

## 保存

点击「保存」→ 写入 localStorage（key + 图片设置分别保存）。
保存成功后按钮变绿「已保存 ✓」，2 秒后恢复。
