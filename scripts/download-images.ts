#!/usr/bin/env bun
/**
 * 从 Pixabay 批量下载单词配图到 public/images/
 *
 * 用法：
 *   bun run images                     # 下载所有缺失图片
 *   bun run images --word=apple        # 只下载 apple
 *   bun run images --word=apple --force  # 强制覆盖 apple
 *   bun run images --force             # 强制重新下载全部
 *   bun run images --word=apple --index=2  # 取搜索结果第 N 张（从1开始）
 */

import { units } from '../src/data/units'
import { join } from 'path'
import { existsSync } from 'fs'

const API_KEY = process.env.PIXABAY_API_KEY
if (!API_KEY) {
  console.error('缺少 PIXABAY_API_KEY，请在 .env.local 中配置')
  process.exit(1)
}

const FORCE = process.argv.includes('--force')
const ONLY = process.argv.find(a => a.startsWith('--word='))?.split('=')[1]
const INDEX = Number(process.argv.find(a => a.startsWith('--index='))?.split('=')[1] ?? '1') - 1

const OUT_DIR = join(import.meta.dir, '../public/images')

const words = units.flatMap((u) => u.words)
  .filter(e => !ONLY || e.word === ONLY)

async function fetchImageUrl(word: string, chinese: string, index: number): Promise<string | null> {
  for (const q of [word, chinese]) {
    const url = new URL('https://pixabay.com/api/')
    url.searchParams.set('key', API_KEY!)
    url.searchParams.set('q', q)
    url.searchParams.set('image_type', 'illustration')
    url.searchParams.set('safesearch', 'true')
    url.searchParams.set('per_page', '10')
    url.searchParams.set('lang', 'en')

    const res = await fetch(url.toString())
    if (!res.ok) continue
    const data = await res.json() as { hits: { webformatURL: string; pageURL: string }[] }
    if (data.hits.length > index) return data.hits[index].webformatURL
    if (data.hits.length > 0) return data.hits[0].webformatURL
  }
  return null
}

async function downloadImage(imageUrl: string, filename: string): Promise<void> {
  const res = await fetch(imageUrl)
  if (!res.ok) throw new Error(`下载失败: ${res.status}`)
  const buf = await res.arrayBuffer()
  await Bun.write(join(OUT_DIR, filename), buf)
}

console.log(`准备下载 ${words.length} 张图片 → ${OUT_DIR}\n`)

for (const entry of words) {
  const filename = entry.image ?? `${entry.word}.png`
  const dest = join(OUT_DIR, filename)

  if (existsSync(dest) && !FORCE) {
    console.log(`  ✓ 已存在，跳过: ${filename}（用 --force 强制覆盖）`)
    continue
  }

  process.stdout.write(`  ↓ ${entry.word} (${entry.chinese}) [第${INDEX + 1}张] ... `)
  try {
    const imgUrl = await fetchImageUrl(entry.word, entry.chinese, INDEX)
    if (!imgUrl) {
      console.log('未找到图片')
      continue
    }
    await downloadImage(imgUrl, filename)
    console.log(`完成 → ${filename}`)
  } catch (e) {
    console.log(`失败: ${(e as Error).message}`)
  }

  await Bun.sleep(300)
}

console.log('\n全部完成。')
