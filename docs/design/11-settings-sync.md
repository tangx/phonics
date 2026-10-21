# 云端同步设置（SyncTab）

**源文件**：`src/pages/settings/SyncTab.tsx`
**持久化**：`localStorage`，key 见 `sync.ts`

---

## 功能

将本地所有 phonics 设置（语音配置、图片缓存、Pixabay Key 等）上传到七牛云 S3 兼容存储，或从云端恢复到本地。

---

## UI 结构

```
Stack gap="lg"
├── 云存储提供商 (Select, 仅七牛云, disabled)
├── 存储区域 (Select, QINIU_REGIONS)
├── [条件] 自定义 Endpoint (TextInput, 仅选择「自定义」时显示)
├── Bucket 名称 (TextInput)
├── Access Key (TextInput)
├── Secret Key (PasswordInput)
├── Alert 跨域提示 (color="blue")
├── [有bucket时] 同步路径预览 (Text xs dimmed)
├── 上次同步时间 (Text xs dimmed)
├── [无用户名时] Alert 提示先设置用户名 (color="orange")
├── [错误时] Alert 错误信息 (color="red")
├── Group grow
│   ├── 上传到云端 (Button, IconCloudUpload, loading=uploading)
│   └── 从云端恢复 (Button, IconCloudDownload, outline, loading=downloading)
└── Modal 确认覆盖对话框
```

---

## 存储区域

选项来自 `QINIU_REGIONS`，每项包含 `endpoint` 和 `label`。选择后自动推导 `region`（`deriveRegion(endpoint)`）。

---

## 同步路径

`{bucket}/{buildObjectKey(username)}`

- 无用户名时：`phonics/settings.json`
- 有用户名时：`phonics/{username}/settings.json`

---

## 同步状态（SyncStatus）

`'idle' | 'uploading' | 'downloading' | 'error'`

- `canSyncNow()`：检查配置是否足以触发同步
- 上传 / 下载按钮在对应状态下显示 loading spinner

---

## 从云端恢复确认弹窗

使用 Mantine `Modal`（centered, radius="md"），包含：
- 风险说明文字
- 取消按钮（subtle）
- 覆盖本地按钮（color="red"）

---

## 字段自动保存

`TextInput / PasswordInput` 的 `onBlur` 时立即调用 `save(config)` 写入 localStorage，无需手动点保存。`Select` 变更时也立即保存。
