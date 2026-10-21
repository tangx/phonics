# Edge Neural 语音设置（EdgeVoiceTab）

**源文件**：`src/pages/settings/EdgeVoiceTab.tsx`
**持久化**：`localStorage`，key 见 `voice.ts`

---

## 功能

配置多个「语音角色」（slot），每个角色可独立设置：
- 是否激活（激活后在例句面板显示对应按钮）
- 语音名称（从 Edge 浏览器的 Natural 语音列表中选择）
- 语速（0.5x ~ 2x）
- 音调（0.5 ~ 2）

---

## iOS 提示

在 iOS/iPadOS 上显示 `Alert color="orange"`，提示 Edge Neural 语音不可用，并自动禁用所有角色的 Switch（`disabled={isIOS}`）。

---

## VoiceRow（语音角色行）

```
Box (borderRadius=12, border=#e9ecef)
├── 主行 (Group, 激活时背景 ${meta.color}08)
│   ├── Avatar (40×40, meta.avatar)
│   ├── Stack: 角色名 (meta.color fw=600) + 语音名 (monospace dimmed)
│   ├── 试听按钮 (Button xs subtle, IconVolume)
│   ├── Switch (激活/停用, color=meta.color)
│   └── 展开/折叠按钮 (IconChevronDown/Up)
└── Collapse (展开时)
    └── Stack: Select语音 + Slider语速 + Slider音调
```

### 语音选择器

- `Select` searchable，数据从 `window.speechSynthesis.getVoices()` 中过滤：
  `v.lang.startsWith('en') && v.name.toLowerCase().includes('natural')`
- 第一项始终为「系统默认英语语音」（`value=''`）

### Slider

- 语速：0.5 ~ 2，step=0.1，marks: 0.5x / 1x / 2x
- 音调：0.5 ~ 2，step=0.1，marks: 低 / 正常 / 高
- 颜色跟随 `meta.color`

---

## 槽位元数据（SLOT_META）

定义在 `src/pages/settings/voice.ts`，每个 slot 包含：
- `label`：显示名（如「男孩」「女孩」）
- `color`：主题色
- `avatar`：头像图片路径（来自 `src/assets/`）

---

## 保存

点击「保存设置」→ `saveVoiceConfigs(configs)` → localStorage。
保存成功后按钮变绿「已保存 ✓」，2 秒后恢复。
iOS 端隐藏保存按钮（设置无效，无需保存）。
