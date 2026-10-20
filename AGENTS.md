# AGENTS.md

## 参考文档

- Mantine 组件库（LLM 友好）：https://mantine.dev/llms.txt
- Mantine 完整文档：https://mantine.dev/llms-full.txt

## 包管理器

**必须使用 bun**，禁止使用 npm / yarn / pnpm。

## 项目背景

面向中国小学生的英语拼读学习网站。核心设计理念：自然拼读规则（phonics）与国际音标（IPA）双轨并行，帮助孩子建立"字母组合 → 音标 → 发音"的完整映射，避免纯自然拼读导致的死记硬背问题。

## UI 开发规范

**必须使用 Mantine 组件**构建所有 UI，禁止自行实现 Mantine 已提供的功能。有组件用法疑问时，优先调用 Mantine MCP 工具查询，而不是猜测 API。

## 技术栈

- React 19 + TypeScript + Vite 8 + Tailwind CSS v4 + **Mantine 9**
- 发音：有道词典音频 URL（无需 API key），降级到 Web Speech API
- 构建产物为纯静态文件

## 关键设计决策

### 字母标注系统

每个音节可以携带 `marks`，精确标注到字母级别：

```ts
type LetterMarkType = 'silent-e' | 'silent' | 'changed'
```

- `silent-e`：魔法e，删除线 + ✨，并说明对前面元音的影响
- `silent`：不发音字母，删除线 + 🔇
- `changed`：变音字母（如辅音簇中的清辅音浊化），波浪下划线 + 〰️

### 音节着色

四色系统区分音节（红/蓝/绿/紫），让孩子直观看到单词如何切分。

### 数据录入原则

- 按学校教材单元录入，文件：`src/data/units.ts`
- 不规则发音**不强行套自然拼读规则**，直接用 `marks` 标注 + `note` 说明
- 每个单词必须有 `chinese`（中文），`image` 可选

## 常用命令

```bash
bun run dev      # 开发
bun run build    # 构建
bun run preview  # 预览
```
