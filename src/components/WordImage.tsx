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
  padding: '5px 10px', borderRadius: 20,
  background: 'rgba(255,255,255,0.92)',
  boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
  fontSize: 12, color: disabled ? '#c0c0c0' : '#6b7280',
  fontFamily: 'Noto Sans SC, sans-serif',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.6 : 1,
  whiteSpace: 'nowrap',
})

export default function WordImage({ entry, pixabayKey }: WordImageProps) {
  const localSrc = entry.image
    ? `/images/${entry.image}`
    : `https://placehold.co/400x400/e8f4ff/1b6ca8?text=${entry.word}`

  const settings = loadImageSettings()

  const [cacheList, setCacheList] = useState<string[]>(() => getImageCache(entry.word))
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imgLoading, setImgLoading] = useState(false)
  const [cacheIndex, setCacheIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const validCache = cacheList.filter(u => !isBlacklisted(entry.word, u))

  const displayUrl = previewUrl
    ?? (validCache.length > 0 ? validCache[cacheIndex % validCache.length] : null)
    ?? localSrc
  const inCache = cacheList.includes(displayUrl)
  const cacheFull = cacheList.length >= settings.cacheSize

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (settings.interval > 0 && validCache.length > 1 && !previewUrl) {
      intervalRef.current = setInterval(() => {
        setCacheIndex(prev => {
          if (settings.shuffle) {
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

  useEffect(() => {
    const cache = getImageCache(entry.word)
    setCacheList(cache)
    if (cache.length === 0 && pixabayKey) {
      fetchNew()
    }
  }, [entry.word, pixabayKey, fetchNew])

  const handleAddToCache = useCallback(() => {
    if (!previewUrl || cacheFull) return
    addToImageCache(entry.word, previewUrl, settings.cacheSize)
    const updated = getImageCache(entry.word)
    setCacheList(updated)
    setPreviewUrl(null)
  }, [previewUrl, cacheFull, entry.word, settings.cacheSize])

  const handleRemove = useCallback(() => {
    if (!inCache) return
    removeFromImageCache(entry.word, displayUrl)
    const updated = getImageCache(entry.word)
    setCacheList(updated)
  }, [inCache, entry.word, displayUrl])

  const handleRefresh = useCallback(async () => {
    if (imgLoading) return
    if (cacheFull) return
    await fetchNew()
  }, [imgLoading, cacheFull, fetchNew])

  const handleBlacklist = useCallback(() => {
    addToBlacklist(entry.word, displayUrl)
    if (inCache) {
      removeFromImageCache(entry.word, displayUrl)
      setCacheList(getImageCache(entry.word))
    }
    if (previewUrl === displayUrl) setPreviewUrl(null)
    setCacheIndex(prev => prev + 1)
    const remaining = getImageCache(entry.word).filter(u => !isBlacklisted(entry.word, u))
    if (remaining.length === 0 && pixabayKey && !cacheFull) fetchNew()
  }, [entry.word, displayUrl, inCache, previewUrl, pixabayKey, cacheFull, fetchNew])

  return (
    <Stack gap={6} align="center" style={{ height: '100%', justifyContent: 'center' }}>
      {/* 图片 */}
      <Image
        src={displayUrl}
        alt={entry.chinese}
        fit="contain"
        style={{
          width: 'min(28vw, 44vh)',
          height: 'min(28vw, 44vh)',
          borderRadius: 'clamp(8px, 1.5vw, 20px)',
          opacity: imgLoading ? 0.5 : 1,
          transition: 'opacity 0.2s',
          flexShrink: 0,
        }}
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).src =
            `https://placehold.co/400x400/e8f4ff/1b6ca8?text=${entry.word}`
        }}
      />

      {/* 中文释义 */}
      <Text style={{
        fontFamily: "'Noto Sans SC', sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(18px, 3vw, 4.5vh)',
        color: '#1a1a2e',
      }}>
        {entry.chinese}
      </Text>

      {/* 操作按钮行：图片下方，不遮挡 */}
      {pixabayKey && (
        <Group gap={6} justify="center" wrap="wrap">
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
                <IconBookmark size={12} stroke={1.8} />
                存图 ({cacheList.length}/{settings.cacheSize})
              </UnstyledButton>
            </Tooltip>
          )}

          {inCache && (
            <UnstyledButton
              onClick={handleRemove}
              aria-label="从缓存移除"
              style={btnStyle()}
            >
              <IconBookmarkOff size={12} stroke={1.8} />
              移除
            </UnstyledButton>
          )}

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
              <IconRefresh size={12} stroke={1.8} />
              换图
            </UnstyledButton>
          </Tooltip>

          {!isBlacklisted(entry.word, displayUrl) && (
            <UnstyledButton
              onClick={handleBlacklist}
              aria-label="不再显示"
              style={btnStyle()}
            >
              <IconX size={12} stroke={1.8} />
              屏蔽
            </UnstyledButton>
          )}
        </Group>
      )}
    </Stack>
  )
}
