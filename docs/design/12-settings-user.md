# 用户信息设置（UserTab）

**源文件**：`src/pages/settings/UserTab.tsx`
**持久化**：`localStorage`，key 见 `user.ts`

---

## 功能

- 设置头像（4 种预设）
- 设置用户名（不可修改，用于云端同步路径）
- 设置展示名（可随时修改）
- 快捷同步（上传 / 从云端恢复）

---

## UI 结构

```
Stack gap="lg"
├── Title "用户信息" (order=5)
├── 头像选择器
│   ├── Text "头像" (sm fw=600)
│   └── Group: 4个 Avatar 按钮 (带 Tooltip)
│       └── 当前头像文字 (xs dimmed)
├── TextInput 用户名
│   ├── readOnly (一旦设置不可修改)
│   └── rightSection: 「确认」按钮 (未设置时显示)
├── TextInput 展示名 (可随时修改，onChange 立即保存)
├── [有用户名] Alert 同步路径预览 (color="blue")
├── [无用户名] Text 无用户名路径说明
├── Divider
└── 云端同步区
    ├── Text "云端同步" (sm fw=600)
    ├── [无用户名] Alert 提示设置用户名 (color="orange")
    ├── [错误] Alert 错误信息 (color="red")
    └── Group grow
        ├── 上传到云端 (Button, IconCloudUpload)
        └── 从云端恢复 (Button, IconCloudDownload, outline)
```

---

## 头像选择器

4 种头像（`AvatarKey`）：`boy / girl / man / woman`，对应 SVG 文件在 `src/assets/`。

选中态：`border: 2px solid #1a1a2e`，未选中：`border: 2px solid transparent`。
圆形外框，内嵌 `Avatar size=56 radius="xl"`。

---

## 用户名规则

- 一经确认不可修改（`readOnly={!!profile.username}`）
- 未设置时显示输入框 + 右侧「确认」按钮
- 建议英文或拼音（用于云端路径，不含空格和特殊字符）
- 与同步路径挂钩（见 [11-settings-sync.md](11-settings-sync.md)）

---

## 展示名

`onChange` 时立即调用 `saveUserProfile(updated)`，实时保存。

---

## 云端同步区

与 `SyncTab` 复用相同的 `runUpload / runDownload / canSyncNow`。
确认弹窗同 SyncTab，Modal centered + 覆盖本地 `color="red"` 按钮。
