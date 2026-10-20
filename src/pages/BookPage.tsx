import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import type { EmblaCarouselType } from 'embla-carousel'
import {
  Box, Group, SegmentedControl, Text, ActionIcon, Breadcrumbs, Anchor,
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { semesters } from '../data/units'
import { dictionary } from '../data/dictionary'
import WordCard from '../components/WordCard'
import { useSettings } from '../hooks/useSettings'

export default function BookPage() {
  const { semesterId, unitId, word } = useParams<{
    semesterId: string
    unitId: string
    word: string
  }>()
  const navigate = useNavigate()
  const { pixabayKey } = useSettings()
  const emblaRef = useRef<EmblaCarouselType | null>(null)

  const semester = semesters.find(s => s.id === semesterId)
  if (!semester) {
    return <Box p="xl"><Text c="dimmed">找不到课本：{semesterId}</Text></Box>
  }

  // 当前单元：URL 有 unitId 就用，否则第一个
  const activeUnit = (unitId ? semester.units.find(u => u.id === unitId) : null)
    ?? semester.units[0]

  const wordKeys = activeUnit?.wordKeys ?? []

  // 当前单词的 slide index
  const startIndex = word ? Math.max(0, wordKeys.indexOf(word)) : 0

  // 切换单元 → navigate 到新 URL，word 重置
  const handleUnitChange = (newUnitId: string) => {
    navigate(`/books/${semesterId}/${newUnitId}`)
  }

  // Carousel 滑动时更新 URL 中的 word
  const handleSlideChange = (index: number) => {
    const newWord = wordKeys[index]
    if (!newWord) return
    const newUnitId = activeUnit?.id ?? semester.units[0].id
    navigate(`/books/${semesterId}/${newUnitId}/${newWord}`, { replace: true })
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
            <Anchor size="xs" c="dimmed" onClick={() => navigate('/books')} style={{ cursor: 'pointer' }}>
              Books
            </Anchor>
            <Anchor size="xs" c="dimmed" onClick={() => navigate(`/books/${semesterId}`)} style={{ cursor: 'pointer' }}>
              {semester.title}
            </Anchor>
            <Text size="xs" c="dark">{activeUnit?.title}</Text>
          </Breadcrumbs>
        </Group>
      </Box>

      {/* 单元选择 */}
      <Box px="md" py="xs" style={{ flexShrink: 0 }}>
        <SegmentedControl
          value={activeUnit?.id ?? ''}
          onChange={handleUnitChange}
          data={semester.units.map(u => ({ value: u.id, label: u.title }))}
          radius="xl"
          size="xs"
        />
      </Box>

      {/* Carousel */}
      <Box style={{ flex: 1, minHeight: 0, padding: '0 12px 12px' }}>
        <Carousel
          key={`${activeUnit?.id}-${startIndex}`}
          withIndicators
          withKeyboardEvents
          slideSize="100%"
          slideGap="md"
          height="100%"
          emblaOptions={{ loop: false, align: 'center', startIndex }}
          getEmblaApi={(api) => { emblaRef.current = api }}
          onSlideChange={handleSlideChange}
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
          {wordKeys.map((key) => {
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
