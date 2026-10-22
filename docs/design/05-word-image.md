# 单词配图（WordImage）

**源文件**：`src/components/WordImage.tsx`
**使用方**：`WordCard` 右列图片区

---

## 图片来源优先级

```
previewUrl (联网拉取，尚未入缓存)
  ↓ (无时)
validCache[cacheIndex % len] (本地已缓存，过滤黑名单)
  ↓ (无时)
localSrc (entry.image ? /images/{name} : placehold.co 占位图)
```

---

## 状态

| 状态 | 说明 |
|------|------|
| `cacheList` | `localStorage` 中该词的缓存 URL 列表 |
| `previewUrl` | 联网拉取但尚未保存的预览图 URL |
| `imgLoading` | 正在联网拉取时为 true，图片半透明（opacity 0.5） |
| `cacheIndex` | 当前展示的缓存下标，定时器 tick 时递增 |

---

## 定时轮询逻辑

条件：`settings.interval > 0 && validCache.length > 1 && !previewUrl`

- 间隔 `settings.interval` 秒自动递增 `cacheIndex`
- `settings.shuffle=true` 时随机选择不同于当前的下标
- 有 previewUrl 时暂停轮询（关注预览图）

---

## 操作按钮（仅 pixabayKey 存在时显示）

按钮统一样式（`btnStyle`）：白底 + 浅阴影胶囊形，`12px Noto Sans SC`，disabled 时半透明。

| 按钮 | 显示条件 | 行为 |
|------|---------|------|
| 加入缓存 `IconBookmark` | `previewUrl` 存在 | 将 previewUrl 写入 localStorage，缓存满时 tooltip 提示禁用 |
| 移除 `IconBookmarkOff` | 当前图在缓存中 | 从 localStorage 删除 |
| 换一张 `IconRefresh` | 始终显示 | 联网拉取新图作为 previewUrl，缓存满时禁用 |
| 不再显示 `IconX` | 当前图未被拉黑 | 加入黑名单 + 从缓存删除，若缓存空则自动拉一张 |

按钮区：`position=absolute top=0 right=0 zIndex=1`，`Group gap={4} wrap="wrap"`。

---

## 图片渲染

```
Mantine Image
  src={displayUrl}
  fit="contain"
  width/height: min(30vw, 50vh)
  borderRadius: clamp(8px, 1.5vw, 20px)
  onError: 降级到 placehold.co 占位图
```

图片下方显示中文词义（`Noto Sans SC fw=500`，`clamp(18px, 3vw, 4.5vh)`）。

---

## 挂载行为

组件挂载时：
1. 读取 `localStorage` 初始化 `cacheList`
2. 若缓存为空且有 `pixabayKey`，自动调用 `fetchNew()` 拉取第一张预览图

---

## 相关工具函数（`src/utils/pixabay.ts`）

- `fetchPixabayImage(word, chinese, key, exclude)` — 联网搜索，排除已有 URL
  - `key` 为空时立即返回 `null`，不发起请求
  - HTTP 400 / 403 视为 key 无效，立即返回 `null`（不继续尝试中文查询词）
  - 其他非 200 状态（如 429、5xx）继续尝试下一个查询词
- `getImageCache / addToImageCache / removeFromImageCache` — localStorage CRUD
- `getBlacklist / addToBlacklist / isBlacklisted` — 黑名单管理
