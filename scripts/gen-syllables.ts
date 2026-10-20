#!/usr/bin/env bun
/**
 * 根据单词自动生成 syllables 草稿，输出可直接粘贴到 units.ts 的代码片段
 *
 * 用法：
 *   bun scripts/gen-syllables.ts apple hello potato beautiful
 *   bun scripts/gen-syllables.ts < wordlist.txt   （每行一个单词）
 */

import { hyphenateSync } from 'hyphen/en-us'

const COLORS = ['#d64045', '#1b6ca8', '#2d8a4e', '#7b3fa0']

function genSyllables(word: string): string {
  const hyphenated = hyphenateSync(word.toLowerCase(), { hyphenChar: '·' })
  const parts = hyphenated.split('·')

  const syllables = parts.map((text, i) => {
    const color = COLORS[i % COLORS.length]
    return `          { text: '${text}', phonetic: '???', color: C[${i % COLORS.length}] },`
  })

  return `
      // ${word}  →  ${hyphenated}
      {
        word: '${word}',
        phonetic: '???',
        syllables: [
${syllables.join('\n')}
        ],
        chinese: '???',
      },`
}

// 从命令行参数或 stdin 读取单词
let words: string[] = process.argv.slice(2)

if (words.length === 0) {
  // 从 stdin 读取
  const text = await Bun.stdin.text()
  words = text.split(/\s+/).filter(Boolean)
}

if (words.length === 0) {
  console.error('用法：bun scripts/gen-syllables.ts <word1> <word2> ...')
  process.exit(1)
}

console.log('// ── 自动生成的草稿，请补全 ??? 字段 ──────────────────────────')
for (const word of words) {
  console.log(genSyllables(word))
}
