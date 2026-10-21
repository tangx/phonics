# 云端同步设置（SyncTab）

**源文件**：`src/pages/settings/SyncTab.tsx`
**持久化**：`localStorage`，key 为 `phonics_sync_config`（见 `sync.ts`）

---

## 功能

配置七牛云 S3 兼容存储的连接参数，供上传/下载功能使用。配置完成后手动点击「保存配置」写入 localStorage；「销毁配置」仅删除 `phonics_sync_config` 这一个 key，不影响其他本地数据。

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
├── [无用户名时] Alert 提示先设置用户名 (color="orange")
├── Group justify="space-between"
│   ├── 保存配置 (Button, background=#1a1a2e)
│   └── 销毁配置 (Button, color="red", variant="outline", IconTrash)
└── Modal 销毁确认对话框
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

## 保存与销毁

| 操作 | 行为 |
|------|------|
| 保存配置 | 调用 `saveSyncConfig(config)`，将当前表单写入 `phonics_sync_config` |
| 销毁配置 | 弹出确认 Modal，确认后调用 `clearSyncConfig()`，仅删除 `phonics_sync_config`，表单重置为默认空值 |

字段编辑时**不再自动保存**（已移除 `onBlur` 保存逻辑），必须点击「保存配置」才生效。

---

## 销毁确认弹窗

使用 Mantine `Modal`（centered, radius="md"），包含：
- 风险说明文字（说明只清除七牛配置）
- 取消按钮（subtle）
- 确认销毁按钮（color="red"）
