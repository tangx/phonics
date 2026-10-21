# 设置页（SettingsPage）

**源文件**：`src/pages/SettingsPage.tsx`
**路由**：`/settings`

---

## 页面结构

```
Box (maxWidth=600, margin=0 auto, p="xl")
├── Title "设置" (order=2, Nunito #1a1a2e)
└── Tabs (defaultValue="edge-voice", radius="md")
    ├── Tabs.List
    │   ├── Edge 语音 (IconVolume)
    │   ├── iOS 系统音 (IconDeviceMobile)
    │   ├── 图片 (IconPhoto)
    │   ├── 高频词 (IconLetterCase)
    │   ├── 同步 (IconCloud)
    │   └── 用户 (IconUser)
    └── Tabs.Panel × 6
```

---

## Tab 列表

| Tab value | 组件 | 文档 |
|-----------|------|------|
| `edge-voice` | `EdgeVoiceTab` | [08-settings-edge-voice.md](08-settings-edge-voice.md) |
| `ios-voice` | `IosVoiceTab` | [09-settings-ios-voice.md](09-settings-ios-voice.md) |
| `image` | `ImageTab` | [10-settings-image.md](10-settings-image.md) |
| `sight-words` | `SightWordsTab` | [06-sight-words.md](06-sight-words.md) |
| `sync` | `SyncTab` | [11-settings-sync.md](11-settings-sync.md) |
| `user` | `UserTab` | [12-settings-user.md](12-settings-user.md) |

默认激活 `edge-voice`。
