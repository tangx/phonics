# SearchPage 设计文档

## 源文件
`src/pages/SearchPage.tsx`

## 功能描述
全局单词快速搜索页，支持按英文单词、中文释义、音标三向模糊匹配。数据来源为整合词典（`unifiedDictionary`），覆盖课本词和 Sight Words。点击结果卡片弹出 Modal 展示完整单词信息，并提供跳转到对应页面的入口。

## UI 结构

```
SearchPage
├── 搜索栏（sticky top）
│   └── TextInput（左 IconSearch，右 × 清空）
└── 结果区域（scrollable）
    ├── 空态（未输入）— 图标 + 提示 + 词库总量
    ├── 无结果提示
    └── 结果列表
        ├── 结果数量 Badge
        └── SearchResultCard × N
            ├── 有 syllables → SyllableChip 横排 + 单词文字
            ├── 无 syllables → 纯单词大字
            ├── 音标 + 中文
            └── Sight Badge（source='sight-word' 时）

Modal（点击词条时弹出）
├── 正面区：WordCardFront size="md"
├── 背面区：WordCardBack 标准模式
└── 底部跳转
    ├── "在课本中查看 →"（source='dictionary' 时）
    └── "在 Sight Words 中查看 →"（source='sight-word' 时）
```

## 关键交互

| 交互 | 行为 |
|---|---|
| 输入框变化 | 实时 useMemo 过滤，最多 50 条 |
| 点击 × | 清空 query |
| 点击结果卡片 | `playWord` 发音 + 打开 Modal |
| Modal 跳转按钮 | 关闭 Modal + navigate |

## 搜索逻辑

```ts
entry.word.toLowerCase().includes(q)
|| entry.chinese.includes(q)
|| entry.phonetic?.includes(q)
```

数据来源：`ALL_UNIFIED`（`src/data/unifiedDictionary.ts`）

## 例句来源

- `source === 'dictionary'` → `getSentencesForWord(word)`
- `source === 'sight-word'` → `getSentencesForSightWord(word, levelIndex)`，`levelIndex` 由 `SIGHT_LEVEL_INDEX` 预计算

## 路由

`/search` — HashRouter，AppShellLayout 嵌套。

## 导航入口

AppNav 中间菜单区，Sight Words 下方，图标 `IconSearch`，标签「搜索单词」。
