# 整合词典设计文档

## 源文件

- `src/data/unifiedDictionary.ts` — 运行时 merge，导出 `unifiedDictionary` 和 `ALL_UNIFIED`
- `src/utils/unifiedUtils.ts` — 辅助函数
- `src/types.ts` — `UnifiedEntry`、`WordSource` 类型定义

## 功能描述

将 `dictionary`（课本完整词条）和 `sightWords`（Dolch 高频词轻量词条）在运行时合并为统一词典，作为搜索、自定义词等功能的统一数据入口。未来可扩展 `'custom'` 来源。

## 数据结构

```ts
type WordSource = 'dictionary' | 'sight-word' | 'custom'

interface UnifiedEntry {
  word: string
  chinese: string
  phonetic?: string       // sight-word 可选；dictionary 必填
  syllables?: Syllable[]  // 有则为完整词条；无则为轻量词条
  image?: string
  isContentWord?: boolean // 来自 SightWordEntry
  source: WordSource
}
```

## 合并规则

1. 先将 `dictionary` 所有词条写入，`source: 'dictionary'`
2. 再遍历 `sightWordLevels`，key = `word.toLowerCase()`，**dictionary 已有的不覆盖**
3. sight-word 词条：`source: 'sight-word'`，无 `syllables`

```
unifiedDictionary
  ├── 'apple'   → { ...WordEntry, source: 'dictionary' }   ← 完整词条
  ├── 'the'     → { word, chinese, phonetic?, source: 'sight-word' } ← 轻量
  └── ...
```

## 辅助函数（unifiedUtils.ts）

| 函数 | 说明 |
|---|---|
| `findWordLocation(word)` | 单词 → `{ semesterId, unitId }` 或 `null`，供搜索跳转用 |
| `wordEntryToUnified(entry)` | `WordEntry → UnifiedEntry`（source: 'dictionary'） |

## 使用方

- `SearchPage` — 搜索数据源
- `WordCardFront` / `WordCardBack` — 接受 `UnifiedEntry` 展示
