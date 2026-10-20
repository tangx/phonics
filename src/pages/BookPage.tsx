import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import type { EmblaCarouselType } from 'embla-carousel'
import {
  Box, Group, SegmentedControl, Text, ActionIcon, Breadcrumbs, Anchor,
} from '@mantine/core'
import '@mantine/carousel/styles.css'
import { IconArrowLeft } from '@tabler/icons-react'
import { semesters } from '../data/units'
import { dictionary } from '../data/dictionary'
import WordCard from '../components/WordCard'
import { useSettings } from '../hooks/useSettings'

const SYLLABLE_LEGEND = [
  { color: '#d64045', label: '第1音节' },
  { color: '#1b6ca8', label: '第2音节' },
  { color: '#2d8a4e', label: '第3音节' },
  { color: '#7b3fa0', label: '第4音节' },
]

export default function BookPage() {
  const { semesterId } = useParams<{ semesterId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pixabayKey } = useSettings()

  const semester = semesters.find(s => s.id === semesterId)

  const [activeUnitId, setActiveUnitId] = useState(() => semester?.units[0]?.id ?? '')
  const activeUnit = semester?.units.find(u => u.id === activeUnitId) ?? semester?.units[0]

  const emblaRef = useRef<EmblaCarouselType | null>(null)

  // 所有单词（去重）用于 ?word= 定位
  const allWordKeys = useMemo(
    () => activeUnit?.wordKeys ?? [],
    [activeUnit]
  )

  // ?word= 定位：找到 slide index
  const startIndex = useMemo(() => {
    const word = searchParams.get('word')
    if (!word) return 0
    const idx = allWordKeys.indexOf(word)
    return idx >= 0 ? idx : 0
  }, [allWordKeys, searchParams])

  // 当 unit 切换时，若有 ?word= 则滚动到对应位置
  useEffect(() => {
    const word = searchParams.get('word')
    if (!word || !emblaRef.current) return
    const idx = allWordKeys.indexOf(word)
    if (idx >= 0) emblaRef.current.scrollTo(idx)
  }, [activeUnitId, allWordKeys, searchParams])

  if (!semester) {
    return (
      <Box p="xl">
        <Text c="dimmed">找不到该课本：{semesterId}</Text>
      </Box>
    )
  }

  return (
    <Box style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 面包屑 + 返回 */}
      <Box px="md" pt="sm" pb={0} style={{ flexShrink: 0 }}>
        <Group gap={8} align="center">
          <ActionIcon variant="subtle" size="sm" onClick={() => navigate('/books')} aria-label="返回">
            <IconArrowLeft size={16} stroke={1.8} />
          </ActionIcon>
          <Breadcrumbs separatorMargin={4} styles={{ separator: { color: '#d1d5db' } }}>
            <Anchor size="xs" c="dimmed" onClick={() => navigate('/books')} style={{ cursor: 'pointer' }}>Books</Anchor>
            <Text size="xs" c="dark">{semester.title}</Text>
          </Breadcrumbs>
        </Group>
      </Box>

      {/* 单元选择 + 音节图例 */}
      <Box px="md" py="xs" style={{ flexShrink: 0 }}>
        <Group justify="space-between" wrap="wrap" gap={8}>
          <SegmentedControl
            value={activeUnitId}
            onChange={setActiveUnitId}
            data={semester.units.map(u => ({ value: u.id, label: u.title }))}
            radius="xl"
            size="xs"
          />
          <Group gap={12}>
            {SYLLABLE_LEGEND.map(item => (
              <Group key={item.label} gap={5}>
                <Box style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <Text size="xs" c="dimmed">{item.label}</Text>
              </Group>
            ))}
          </Group>
        </Group>
      </Box>

      {/* Carousel */}
      <Box style={{ flex: 1, minHeight: 0, padding: '0 12px 12px' }}>
        <Carousel
          key={`${activeUnitId}-${startIndex}`}
          withIndicators
          withKeyboardEvents
          slideSize="100%"
          slideGap="md"
          height="100%"
          emblaOptions={{ loop: false, align: 'center', startIndex }}
          getEmblaApi={(api) => { emblaRef.current = api }}
          controlSize={36}
          styles={{
            root: { height: '100%' },
            viewport: { height: '100%' },
            container: { height: '100%' },
            slide: { height: '100%' },
            control: {
              background: '#fff',
              border: '1px solid #eef0f8',
              boxShadow: '0 2px 8px rgba(26,26,46,0.08)',
              color: '#1a1a2e',
            },
          }}
        >
          {allWordKeys.map((key) => {
            const entry = dictionary[key]
            if (!entry) return null
            return (
              <Carousel.Slide key={key}>
                <WordCard entry={entry} pixabayKey={pixabayKey} />
              </Carousel.Slide>
            )
          })}
        </Carousel>
      </Box>
    </Box>
  )
}
