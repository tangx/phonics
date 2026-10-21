# iOS 系统音设置（IosVoiceTab）

**源文件**：`src/pages/settings/IosVoiceTab.tsx`
**持久化**：`localStorage`，key = `phonics_ios_voice_config`

---

## 功能

为 iOS/iPadOS 提供独立的语音配置。不指定语音名称，依赖系统默认 TTS。在 iPad「设置 → 辅助功能 → 语音内容 → 语音」中选择 Ava Enhanced 后，此处发音即使用该语音。

---

## 配置项

| 字段 | 默认值 | 范围 | 说明 |
|------|--------|------|------|
| `rate` | 0.9 | 0.5 ~ 2 | 语速 |
| `pitch` | 1 | 0.5 ~ 2 | 音调 |

---

## UI 结构

```
Stack gap="md"
├── 说明文字 (xs dimmed)
├── Slider 语速 (0.5~2, marks: 0.5x/1x/2x)
├── Slider 音调 (0.5~2, marks: 低/正常/高)
├── 试听按钮 (Button xs light, IconVolume, alignSelf=flex-start)
└── 保存按钮 (Button radius="xl", 全宽)
```

---

## 保存

点击「保存设置」→ `saveIosVoiceConfig(config)` → localStorage。
保存成功后按钮变绿「已保存 ✓」，2 秒后恢复。
