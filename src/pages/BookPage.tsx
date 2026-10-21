import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import type { EmblaCarouselType } from 'embla-carousel'
import {
  Box, Group, Text, UnstyledButton, Collapse, ActionIcon,
} from '@mantine/core'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
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
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [wordListOpen, setWordListOpen] = useState(false)

  const semester = semesters.find(s => s.id === semesterId) ?? semesters[0]
  const activeUnit = (unitId ? semester.units.find(u => u.id === unitId) : null)
    ?? semester.units[0]

  const wordKeys = activeUnit?.wordKeys ?? []
  const startIndex = word ? Math.max(0, wordKeys.indexOf(word)) : 0
  const currentWord = word ?? wordKeys[0]
  const currentIndex = wordKeys.indexOf(currentWord)

  const handleSlideChange = (index: number) => {
    const newWord = wordKeys[index]
    if (!newWord) return
    navigate(`/books/${semester.id}/${activeUnit?.id}/${newWord}`, { replace: true })
  }

  const handleWordChip = (key: string, index: number) => {
    navigate(`/books/${semester.id}/${activeUnit?.id}/${key}`, { replace: true })
    emblaRef.current?.scrollTo(index)
  }

  useEffect(() => {
    chipRefs.current[currentIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [currentIndex])

  const semesterColor = semester.color ?? '#1b6ca8'

  return (
    <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* 单词折叠栏 */}
      <Box style={{ flexShrink: 0, borderBottom: '1px solid #eef0f8' }}>
        <Group
          px="md"
          py={6}
          gap={6}
          style={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setWordListOpen(v => !v)}
        >
          <Text size="xs" c="dimmed" style={{ flex: 1 }}>
            {currentWord} · {currentIndex + 1}/{wordKeys.length} 个单词
          </Text>
          <ActionIcon variant="subtle" size="xs" color="gray">
            {wordListOpen ? <IconChevronUp size={12} /> : <IconChevronDown size={12} />}
          </ActionIcon>
        </Group>
        <Collapse expanded={wordListOpen}>
          <Box style={{ padding: '0 16px 8px' }}>
            <Group gap={4} wrap="wrap">
              {wordKeys.map((key, idx) => {
                const isActive = key === currentWord
                const entry = dictionary[key]
                return (
                  <UnstyledButton
                    key={key}
                    ref={(el) => { chipRefs.current[idx] = el }}
                    onClick={() => handleWordChip(key, idx)}
                    style={{
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontSize: 13,
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? semesterColor : '#6b7280',
                      background: isActive ? `${semesterColor}12` : 'transparent',
                      borderBottom: isActive ? `2px solid ${semesterColor}` : '2px solid transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    {entry?.word ?? key}
                  </UnstyledButton>
                )
              })}
            </Group>
          </Box>
        </Collapse>
      </Box>

      {/* Carousel */}
      <Box style={{ flex: 1, minHeight: 0, padding: '0 12px' }}>
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
