# CLAUDE.md

## 参考文档

- Mantine 组件库：https://mantine.dev/llms.txt（供 LLM 查阅）
- Mantine 完整文档：https://mantine.dev/llms-full.txt

## 包管理器

**必须使用 bun**，禁止使用 npm / yarn / pnpm。

```bash
bun install          # 安装依赖
bun add <pkg>        # 添加依赖
bun remove <pkg>     # 移除依赖
bun run dev          # 启动开发服务器
bun run build        # 构建静态产物
bun run preview      # 预览构建产物
```

## UI 开发规范

**必须使用 Mantine 组件**构建所有 UI，禁止自行实现 Mantine 已提供的组件（按钮、卡片、布局、导航等）。

- 有疑问时直接查阅 Mantine MCP 工具获取组件文档
- 文档速查：https://mantine.dev/llms.txt

## 项目概述

面向中国小学生的英语学习静态网站，核心理念：**自然拼读规则 + 国际音标双轨并行**。

- 技术栈：React + TypeScript + Vite + Tailwind CSS v4
- 构建产物：`dist/` 静态文件，可直接部署到 GitHub Pages 等

## 数据管理

单词数据在 `src/data/units.ts`，按教材单元录入。每个单词支持三种字母级标注：

| type | 含义 | 示例 |
|---|---|---|
| `silent-e` | 魔法e，末尾e让前面元音变长音 | `kite` 的 e |
| `silent` | 字母完全不发音 | `who` 的 w |
| `changed` | 辅音簇变音 | `stand` 的 t |

## 目录结构

```
src/
  components/   # React 组件
  data/         # 单词数据（按单元）
  pages/        # 页面组件
  utils/        # 工具函数（audio.ts 等）
  types.ts      # TypeScript 类型定义
public/
  images/       # 单词配图
```
