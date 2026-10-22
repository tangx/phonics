import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Box, Group, Modal, Stack, Text, TextInput, UnstyledButton } from '@mantine/core'
import { IconBook, IconLetterCase, IconSearch, IconX } from '@tabler/icons-react'
import { ALL_UNIFIED } from '../data/unifiedDictionary'
import { getSentencesForWord } from '../utils/sentences'
import { getSentencesForSightWord } from '../data/sightWordSentences'
import { sightWordLevels } from '../data/sightWords'
import { findWordLocation } from '../utils/unifiedUtils'
import { SyllableChip } from '../components/SyllableDisplay'
import { playWord } from '../utils/audio'
import { useSettings } from '../hooks/useSettings'
import WordCardFront from '../components/WordCardFront'
import WordCardBack from '../components/WordCardBack'
import type { UnifiedEntry, SightWordSentence, Sentence } from '../types'

// sight word 所在的 levelIndex（供例句过滤用）
const SIGHT_LEVEL_INDEX: Record<string, number> = {}
sightWordLevels.forEach((level, idx) => {
  level.groups.forEach(group => {
    group.words.forEach(sw => {
      if (!(sw.word.toLowerCase() in SIGHT_LEVEL_INDEX)) {
        SIGHT_LEVEL_INDEX[sw.word.toLowerCase()] = idx
      }
    })
  })
})

function getSentences(entry: UnifiedEntry): (Sentence | SightWordSentence)[] {
  if (entry.source === 'dictionary') return getSentencesForWord(entry.word)
  const lvl = SIGHT_LEVEL_INDEX[entry.word.toLowerCase()] ?? 0
  return getSentencesForSightWord(entry.word, lvl)
}

// ── SearchResultCard ───────────────────────────────────────────────────────

function SearchResultCard({ entry, onClick }: { entry: UnifiedEntry; onClick: () => void }) {
  return (
    <Box
      onClick={onClick}
      style={{
        background: '#fff',
        border: '1.5px solid #e9ecef',
        borderRadius: 14,
        padding: '12px 16px',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = '0 4px 16px rgba(27,108,168,0.12)'
        el.style.borderColor = '#1b6ca8'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = 'none'
        el.style.borderColor = '#e9ecef'
      }}
    >
      <Group gap={12} align="center" wrap="nowrap">
        {/* 音节块 or 纯词牌 */}
        {entry.syllables ? (
          <Group gap={4} align="flex-start" wrap="nowrap" style={{ flexShrink: 0 }}>
            {entry.syllables.map((syl, i) => (
              <SyllableChip key={i} syl={syl} size="sm" />
            ))}
          </Group>
        ) : (
          <Text style={{
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 22,
            color: '#1a1a2e', flexShrink: 0, minWidth: 60,
          }}>
            {entry.word}
          </Text>
        )}

        {/* 中文 + 音标 + 来源标 */}
        <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
          {entry.syllables && (
            <Text style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, color: '#1a1a2e', lineHeight: 1.2 }}>
              {entry.word}
            </Text>
          )}
          <Group gap={6} align="center">
            {entry.phonetic && (
              <Text size="xs" c="dimmed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {entry.phonetic}
              </Text>
            )}
            <Text size="sm" c="dark.4">{entry.chinese}</Text>
          </Group>
        </Stack>

        {/* 来源标 */}
        {entry.source === 'sight-word' && (
          <Badge size="xs" variant="light" color="teal" style={{ flexShrink: 0 }}>
            Sight
          </Badge>
        )}
      </Group>
    </Box>
  )
}

// ── SearchPage ─────────────────────────────────────────────────────────────

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<UnifiedEntry | null>(null)
  const navigate = useNavigate()
  const { pixabayKey } = useSettings()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_UNIFIED.filter(
      entry =>
        entry.word.toLowerCase().includes(q) ||
        entry.chinese.includes(q) ||
        (entry.phonetic?.includes(q) ?? false),
    ).slice(0, 50)
  }, [query])

  const isEmpty = query.trim().length === 0

  const handleSelect = (entry: UnifiedEntry) => {
    playWord(entry.word)
    setSelected(entry)
  }

  const sentences = selected ? getSentences(selected) : []

  const bookLocation = selected?.source === 'dictionary' ? findWordLocation(selected.word) : null

  return (
    <Stack gap={0} style={{ height: '100%' }}>
      {/* 搜索框 */}
      <Box p="md" style={{ borderBottom: '1px solid #eef0f8', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
        <TextInput
          placeholder="搜英文单词、中文释义或音标…"
          leftSection={<IconSearch size={16} stroke={1.8} />}
          rightSection={
            query ? (
              <IconX size={14} stroke={1.8} style={{ cursor: 'pointer', color: '#9ca3af' }} onClick={() => setQuery('')} />
            ) : null
          }
          value={query}
          onChange={e => setQuery(e.currentTarget.value)}
          autoFocus
          radius="xl"
          size="md"
          styles={{ input: { fontFamily: 'Nunito, sans-serif', fontSize: 15 } }}
        />
      </Box>

      {/* 结果区域 */}
      <Box style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {isEmpty && (
          <Stack align="center" gap={8} pt={48}>
            <IconSearch size={40} stroke={1.2} color="#d1d5db" />
            <Text size="sm" c="dimmed">输入单词、中文或音标开始搜索</Text>
            <Text size="xs" c="dimmed">共收录 {ALL_UNIFIED.length} 个单词</Text>
          </Stack>
        )}

        {!isEmpty && results.length === 0 && (
          <Stack align="center" gap={8} pt={48}>
            <Text size="sm" c="dimmed">没有找到「{query}」相关的单词</Text>
          </Stack>
        )}

        {results.length > 0 && (
          <Stack gap={8}>
            <Group gap={6} mb={4}>
              <Text size="xs" c="dimmed">找到</Text>
              <Badge size="xs" variant="light" color="blue">
                {results.length}{results.length === 50 ? '+' : ''}
              </Badge>
              <Text size="xs" c="dimmed">个结果，点击查看详情</Text>
            </Group>
            {results.map(entry => (
              <SearchResultCard key={entry.word} entry={entry} onClick={() => handleSelect(entry)} />
            ))}
          </Stack>
        )}
      </Box>

      {/* 单词详情 Modal */}
      <Modal
        opened={!!selected}
        onClose={() => setSelected(null)}
        title={null}
        size="lg"
        radius="xl"
        padding="xl"
        styles={{
          body: { padding: 0 },
          content: { overflow: 'hidden' },
        }}
      >
        {selected && (
          <Stack gap={0}>
            {/* 正面 */}
            <Box style={{
              padding: '28px 28px 16px',
              borderBottom: '1px solid #eef0f8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200,
            }}>
              <WordCardFront
                entry={selected}
                size="md"
                color={selected.source === 'sight-word' ? '#2d8a4e' : undefined}
              />
            </Box>

            {/* 背面：例句 + 拼读 */}
            <Box style={{ padding: '16px 28px 20px' }}>
              <WordCardBack
                entry={selected}
                sentences={sentences}
                pixabayKey={pixabayKey}
                color="#1b6ca8"
              />
            </Box>

            {/* 底部跳转链接 */}
            <Box style={{ padding: '0 28px 20px' }}>
              {bookLocation && (
                <UnstyledButton
                  onClick={() => {
                    setSelected(null)
                    navigate(`/books/${bookLocation.semesterId}/${bookLocation.unitId}/${selected.word}`)
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 20,
                    background: '#f0f4ff', color: '#1b6ca8',
                    fontFamily: 'Noto Sans SC, sans-serif', fontSize: 13, fontWeight: 600,
                    border: '1.5px solid #1b6ca820',
                    transition: 'background 0.12s',
                  }}
                >
                  <IconBook size={14} stroke={1.8} />
                  在课本中查看
                </UnstyledButton>
              )}
              {selected.source === 'sight-word' && (
                <UnstyledButton
                  onClick={() => { setSelected(null); navigate('/sight-words') }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 20,
                    background: '#f0fdf4', color: '#2d8a4e',
                    fontFamily: 'Noto Sans SC, sans-serif', fontSize: 13, fontWeight: 600,
                    border: '1.5px solid #2d8a4e20',
                    transition: 'background 0.12s',
                  }}
                >
                  <IconLetterCase size={14} stroke={1.8} />
                  在 Sight Words 中查看
                </UnstyledButton>
              )}
            </Box>
          </Stack>
        )}
      </Modal>
    </Stack>
  )
}
