import { useCallback, useEffect, useRef, useState } from 'react'
import { Group, Image, Stack, Text, Tooltip, UnstyledButton } from '@mantine/core'
import { IconBookmark, IconBookmarkOff, IconRefresh, IconX } from '@tabler/icons-react'
import type { WordEntry } from '../types'
import {
  addToBlacklist,
  addToImageCache,
  fetchPixabayImage,
  getBlacklist,
  getImageCache,
  isBlacklisted,
  removeFromImageCache,
} from '../utils/pixabay'
import { loadImageSettings } from '../pages/settings/image'

interface WordImageProps {
  entry: WordEntry
  pixabayKey: string
}

const btnStyle = (disabled?: boolean): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 4,
  padding: '4px 8px', borderRadius: 20,
  background: 'rgba(255,255,255,0.92)',
  boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
  fontSize: 12, color: disabled ? '#c0c0c0' : '#6b7280',
  fontFamily: 'Noto Sans SC, sans-serif',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.6 : 1,
})

export default function WordImage({ entry, pixabayKey }: WordImageProps) {
  const localSrc = entry.image
    ? `/images/${entry.image}`
    : `https://placehold.co/400x400/e8f4ff/1b6ca8?text=${entry.word}`

  const settings = loadImageSettings()

  const [cacheList, setCacheList] = useState<string[]>(() => getImageCache(entry.word))
  // previewUrl: 联网拉取但尚未加入缓存的图
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imgLoading, setImgLoading] = useState(false)
  // 当前展示的缓存下标（轮询用）
  const [cacheIndex, setCacheIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 有效缓存（过滤黑名单）
  const validCache = cacheList.filter(u => !isBlacklisted(entry.word, u))

  // 当前展示的图：preview 优先，其次从有效缓存按 index 取，最后 fallback
  const displayUrl = previewUrl
    ?? (validCache.length > 0 ? validCache[cacheIndex % validCache.length] : null)
    ?? localSrc
  const inCache = cacheList.includes(displayUrl)
  const cacheFull = cacheList.length >= settings.cacheSize

  // 定时轮询：有多张有效缓存 且 interval>0 且 无 preview 时启动
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (settings.interval > 0 && validCache.length > 1 && !previewUrl) {
      intervalRef.current = setInterval(() => {
        setCacheIndex(prev => {
          if (settings.shuffle) {
            // 随机选一个不同于当前的下标
            const next = Math.floor(Math.random() * (validCache.length - 1))
            return next >= (prev % validCache.length) ? next + 1 : next
          }
          return prev + 1
        })
      }, settings.interval * 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.interval, settings.shuffle, validCache.length, previewUrl])

  const fetchNew = useCallback(async () => {
    if (!pixabayKey) return
    setImgLoading(true)
    try {
      const exclude = [...getImageCache(entry.word), ...getBlacklist(entry.word)]
      const url = await fetchPixabayImage(entry.word, entry.chinese, pixabayKey, exclude)
      if (url) setPreviewUrl(url)
    } finally {
      setImgLoading(false)
    }
  }, [pixabayKey, entry.word, entry.chinese])

  // mount：缓存为空时自动拉一张 preview
  useEffect(() => {
    const cache = getImageCache(entry.word)
    setCacheList(cache)
    if (cache.length === 0 && pixabayKey) {
      fetchNew()
    }
  }, [entry.word, pixabayKey, fetchNew])

  // 加入缓存
  const handleAddToCache = useCallback(() => {
    if (!previewUrl || cacheFull) return
    addToImageCache(entry.word, previewUrl, settings.cacheSize)
    const updated = getImageCache(entry.word)
    setCacheList(updated)
    setPreviewUrl(null)
  }, [previewUrl, cacheFull, entry.word, settings.cacheSize])

  // 移除（从缓存删除当前图）
  const handleRemove = useCallback(() => {
    if (!inCache) return
    removeFromImageCache(entry.word, displayUrl)
    const updated = getImageCache(entry.word)
    setCacheList(updated)
  }, [inCache, entry.word, displayUrl])

  // 换一张（联网，不入缓存）
  const handleRefresh = useCallback(async () => {
    if (imgLoading) return
    if (cacheFull) return // 缓存满时不联网
    await fetchNew()
  }, [imgLoading, cacheFull, fetchNew])

  // 不再显示（拉黑当前图）
  const handleBlacklist = useCallback(() => {
    addToBlacklist(entry.word, displayUrl)
    if (inCache) {
      removeFromImageCache(entry.word, displayUrl)
      setCacheList(getImageCache(entry.word))
    }
    if (previewUrl === displayUrl) setPreviewUrl(null)
    // 推进 index，定时器会自然切换；若无缓存则联网拉一张
    setCacheIndex(prev => prev + 1)
    const remaining = getImageCache(entry.word).filter(u => !isBlacklisted(entry.word, u))
    if (remaining.length === 0 && pixabayKey && !cacheFull) fetchNew()
  }, [entry.word, displayUrl, inCache, previewUrl, pixabayKey, cacheFull, fetchNew])

  return (
    <Stack gap={0} align="center" style={{ height: '100%', justifyContent: 'center', position: 'relative' }}>
      {pixabayKey && (
        <Group gap={4} style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }} wrap="wrap">
          {/* 加入缓存：当图是 previewUrl 且缓存未满时显示 */}
          {previewUrl && (
            <Tooltip
              label={cacheFull ? `缓存已满（${settings.cacheSize}张），请先移除` : '保存到缓存'}
              withArrow
              events={{ hover: true, focus: true, touch: true }}
            >
              <UnstyledButton
                onClick={handleAddToCache}
                aria-label="加入缓存"
                style={btnStyle(cacheFull)}
              >
                <IconBookmark size={13} stroke={1.8} />
                加入缓存 ({cacheList.length}/{settings.cacheSize})
              </UnstyledButton>
            </Tooltip>
          )}

          {/* 移除：当前图在缓存中时显示 */}
          {inCache && (
            <UnstyledButton
              onClick={handleRemove}
              aria-label="从缓存移除"
              style={btnStyle()}
            >
              <IconBookmarkOff size={13} stroke={1.8} />
              移除 ({cacheList.length}/{settings.cacheSize})
            </UnstyledButton>
          )}

          {/* 换一张：缓存未满时可用 */}
          <Tooltip
            label={cacheFull ? `缓存已满（${settings.cacheSize}张），本地轮询中` : '换一张'}
            withArrow
            disabled={!cacheFull}
            events={{ hover: true, focus: true, touch: true }}
          >
            <UnstyledButton
              onClick={handleRefresh}
              aria-label="换一张"
              style={btnStyle(cacheFull || imgLoading)}
            >
              <IconRefresh size={13} stroke={1.8} />
              换一张
            </UnstyledButton>
          </Tooltip>

          {/* 不再显示：始终显示 */}
          {!isBlacklisted(entry.word, displayUrl) && (
            <UnstyledButton
              onClick={handleBlacklist}
              aria-label="不再显示"
              style={btnStyle()}
            >
              <IconX size={13} stroke={1.8} />
              不再显示
            </UnstyledButton>
          )}
        </Group>
      )}

      <Image
        src={displayUrl}
        alt={entry.chinese}
        fit="contain"
        style={{
          width: 'min(30vw, 50vh)',
          height: 'min(30vw, 50vh)',
          borderRadius: 'clamp(8px, 1.5vw, 20px)',
          opacity: imgLoading ? 0.5 : 1,
          transition: 'opacity 0.2s',
        }}
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).src =
            `https://placehold.co/400x400/e8f4ff/1b6ca8?text=${entry.word}`
        }}
      />
      <Text style={{
        fontFamily: "'Noto Sans SC', sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(18px, 3vw, 4.5vh)',
        color: '#1a1a2e',
        marginTop: 'clamp(6px, 1vw, 14px)',
      }}>
        {entry.chinese}
      </Text>
    </Stack>
  )
}
