# 13 - 部署与发布

## 源文件

| 文件 | 说明 |
|------|------|
| `.github/workflows/deploy.yml` | GitHub Actions 自动部署 workflow |
| `vite.config.ts` | Vite 构建配置，含 `base` 路径设置 |

## 部署方式

**GitHub Pages（gh-pages 分支）**

构建产物推送到独立的 `gh-pages` 分支，不污染 `main` 分支。`git pull` 后工作目录只有源码，无编译产物。

访问地址：`https://tangx.github.io/phonics/`

## 触发条件

push 到 `main` 分支时自动触发。

## CI 流程

```
push to main
  └── checkout
  └── setup bun
  └── bun install
  └── bun run build  →  dist/
  └── peaceiris/actions-gh-pages  →  gh-pages 分支
```

## 关键配置

### vite.config.ts — base 路径

```ts
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' ? '/phonics/' : '/',
}))
```

使用 Vite 提供的 `command` 参数判断构建模式：`'build'` 对应 `vite build`，`'serve'` 对应 `vite dev`。比 `process.env.NODE_ENV` 更直接，不依赖外部环境变量。生产构建时所有静态资源路径前缀为 `/phonics/`，匹配 GitHub Pages 子路径；本地开发（`bun run dev`）仍使用 `/`。

### .github/workflows/deploy.yml

```yaml
on:
  push:
    branches:
      - main

permissions:
  contents: write   # 允许 workflow 推送 gh-pages 分支

jobs:
  deploy:
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 首次启用步骤

1. 将代码 push 到 `main`，Actions 自动创建 `gh-pages` 分支
2. GitHub 仓库 → Settings → Pages → Source 选 `gh-pages` 分支 → Save
3. 等待约 1 分钟，访问 `https://tangx.github.io/phonics/`
