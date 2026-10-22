import { useState, useCallback } from 'react'
import {
  Box, Stack, Group, Text, Title, Progress,
  SimpleGrid, Paper, ActionIcon,
} from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import { IconLock, IconChevronLeft } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { sightWordLevels } from '../data/sightWords'
import { getSentencesForSightWord } from '../data/sightWordSentences'
import { dictionary } from '../data/dictionary'
import { useSightWordsProgress } from '../hooks/useSightWordsProgress'
import { uploadGroupProgress, canSync } from '../utils/sightWordsSync'
import SightWordCard from '../components/SightWordCard'
import type { SightWordLevel, SightWordGroup } from '../types'

// ── 组内练习（Carousel） ───────────────────────────────────────────────────────

function GroupPractice({
  level,
  levelIndex,
  group,
  groupIndex,
  onBack,
}: {
  level: SightWordLevel
  levelIndex: number
  group: SightWordGroup
  groupIndex: number
  onBack: () => void
}) {
  const { isMastered, toggleMastered, groupProgress, getMasteredForGroup } = useSightWordsProgress()
  const total = group.words.length
  const progress = groupProgress(group.id, total)

  // 找下一组 id
  const nextGroup = level.groups[groupIndex + 1] ?? null

  const handleToggle = useCallback((word: string) => {
    toggleMastered(group.id, word, total, nextGroup?.id)

    // 异步同步到 S3（静默，不阻塞 UI）
    if (canSync()) {
      const masteredNow = getMasteredForGroup(group.id)
      // toggleMastered 是 setState，这里取最新值需要在下一 tick
      setTimeout(() => {
        uploadGroupProgress(level.id, group.id, masteredNow)
          .catch(() => {
            notifications.show({
              title: '同步失败',
              message: '掌握进度保存到云端失败，本地数据已保留',
              color: 'orange',
            })
          })
      }, 0)
    }
  }, [group.id, level.id, total, nextGroup?.id, toggleMastered, getMasteredForGroup])

  const allMastered = progress === 1

  return (
    <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* 顶栏 */}
      <Box style={{ flexShrink: 0, padding: '8px 12px 0' }}>
        <Group align="center" gap={8} mb={6}>
          <ActionIcon variant="subtle" onClick={onBack} aria-label="返回">
            <IconChevronLeft size={20} />
          </ActionIcon>
          <Box style={{ flex: 1 }}>
            <Group justify="space-between" mb={4}>
              <Text size="sm" fw={600} style={{ color: level.color }}>
                {level.title} · 第 {groupIndex + 1} 组
              </Text>
              <Text size="sm" c="dimmed">
                {Math.round(progress * total)}/{total} 已掌握
              </Text>
            </Group>
            <Progress value={progress * 100} size="sm" radius="xl" color={level.color} />
          </Box>
        </Group>
      </Box>

      {/* Carousel */}
      <Box style={{ flex: 1, minHeight: 0, padding: '8px 12px 12px' }}>
        <Carousel
          withIndicators
          withKeyboardEvents
          slideSize="100%"
          slideGap="md"
          height="100%"
          emblaOptions={{ loop: false, align: 'center' }}
          controlSize={36}
          styles={{
            root: { height: '100%' },
            viewport: { height: '100%' },
            container: { height: '100%' },
            slide: { height: '100%', padding: '4px 0 8px' },
            control: {
              background: '#fff',
              border: '1px solid #eef0f8',
              boxShadow: '0 2px 8px rgba(26,26,46,0.08)',
              color: '#1a1a2e',
            },
          }}
        >
          {group.words.map((wordEntry) => (
            <Carousel.Slide key={wordEntry.word}>
              <SightWordCard
                entry={wordEntry}
                dictEntry={dictionary[wordEntry.word.toLowerCase()]}
                sentences={getSentencesForSightWord(wordEntry.word, levelIndex)}
                mastered={isMastered(group.id, wordEntry.word)}
                onToggleMastered={() => handleToggle(wordEntry.word)}
                color={level.color}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>

      {/* 全组完成提示 */}
      {allMastered && nextGroup && (
        <Box style={{ flexShrink: 0, padding: '0 16px 16px' }}>
          <Box
            style={{
              background: `${level.color}12`,
              border: `1.5px solid ${level.color}40`,
              borderRadius: 16,
              padding: '12px 16px',
              textAlign: 'center',
            }}
          >
            <Text fw={700} style={{ color: level.color, marginBottom: 4 }}>
              🎉 这组全部掌握了！
            </Text>
            <Text size="sm" c="dimmed">第 {groupIndex + 2} 组已解锁，继续加油！</Text>
          </Box>
        </Box>
      )}
      {allMastered && !nextGroup && (
        <Box style={{ flexShrink: 0, padding: '0 16px 16px' }}>
          <Box
            style={{
              background: `${level.color}12`,
              border: `1.5px solid ${level.color}40`,
              borderRadius: 16,
              padding: '12px 16px',
              textAlign: 'center',
            }}
          >
            <Text fw={700} style={{ color: level.color }}>
              🏆 {level.title} 全部掌握！太棒了！
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  )
}

// ── 等级内分组列表 ─────────────────────────────────────────────────────────────

function LevelView({
  level,
  levelIndex,
  onBack,
}: {
  level: SightWordLevel
  levelIndex: number
  onBack: () => void
}) {
  const { isGroupUnlocked, groupProgress } = useSightWordsProgress()
  const [activeGroup, setActiveGroup] = useState<{ group: SightWordGroup; index: number } | null>(null)

  if (activeGroup) {
    return (
      <GroupPractice
        level={level}
        levelIndex={levelIndex}
        group={activeGroup.group}
        groupIndex={activeGroup.index}
        onBack={() => setActiveGroup(null)}
      />
    )
  }

  const totalWords = level.groups.reduce((s, g) => s + g.words.length, 0)

  return (
    <Box p="md" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Stack gap="lg">
        <Group>
          <ActionIcon variant="subtle" onClick={onBack}><IconChevronLeft /></ActionIcon>
          <Box>
            <Title order={3} style={{ fontFamily: "'Nunito', sans-serif", color: level.color }}>
              {level.title}
            </Title>
            <Text size="sm" c="dimmed">{totalWords} 个高频词 · {level.groups.length} 组</Text>
          </Box>
        </Group>

        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
          {level.groups.map((group, idx) => {
            const unlocked = isGroupUnlocked(level.id, group.id, idx)
            const prog = groupProgress(group.id, group.words.length)
            const done = prog === 1

            return (
              <Paper
                key={group.id}
                shadow="xs"
                radius="xl"
                p="lg"
                style={{
                  cursor: unlocked ? 'pointer' : 'default',
                  opacity: unlocked ? 1 : 0.45,
                  border: `2px solid ${done ? level.color : unlocked ? level.color + '30' : '#e9ecef'}`,
                  background: done ? `${level.color}08` : 'white',
                  transition: 'box-shadow 0.2s',
                }}
                onClick={() => unlocked && setActiveGroup({ group, index: idx })}
              >
                <Stack align="center" gap="sm">
                  {unlocked ? (
                    <>
                      <Text size="xl" fw={800} style={{ color: level.color, fontFamily: "'Nunito', sans-serif" }}>
                        {idx + 1}
                      </Text>
                      <Text size="xs" c="dimmed">{group.words.length} 词</Text>
                      <Progress value={prog * 100} size="xs" radius="xl" color={level.color} w="100%" />
                      <Text size="xs" c={done ? level.color : 'dimmed'} fw={done ? 700 : 400}>
                        {done ? '✓ 已全部掌握' : `${Math.round(prog * group.words.length)}/${group.words.length}`}
                      </Text>
                    </>
                  ) : (
                    <>
                      <IconLock size={24} color="#adb5bd" />
                      <Text size="xs" c="dimmed" ta="center">完成上一组解锁</Text>
                    </>
                  )}
                </Stack>
              </Paper>
            )
          })}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}

// ── 顶层：等级选择 ─────────────────────────────────────────────────────────────

export default function SightWordsPage() {
  const [activeLevel, setActiveLevel] = useState<{ level: SightWordLevel; index: number } | null>(null)
  const { isGroupUnlocked, groupProgress } = useSightWordsProgress()

  if (activeLevel) {
    return (
      <Box style={{ height: '100%' }}>
        <LevelView level={activeLevel.level} levelIndex={activeLevel.index} onBack={() => setActiveLevel(null)} />
      </Box>
    )
  }

  return (
    <Box p="md" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Stack gap="xl">
        <Box>
          <Title order={2} style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e' }}>
            Sight Words
          </Title>
          <Text size="sm" c="dimmed" mt={4}>Dolch 高频词 · 分级解锁 · 已掌握才算过关</Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {sightWordLevels.map((level, levelIdx) => {
            const totalWords = level.groups.reduce((s, g) => s + g.words.length, 0)
            const totalMastered = level.groups.reduce(
              (s, g) => s + Math.round(groupProgress(g.id, g.words.length) * g.words.length),
              0
            )
            const unlockedGroups = level.groups.filter((g, i) => isGroupUnlocked(level.id, g.id, i)).length
            const isLocked = levelIdx > 0 && unlockedGroups === 0

            return (
              <Paper
                key={level.id}
                shadow="sm"
                radius="xl"
                p="xl"
                style={{
                  cursor: isLocked ? 'default' : 'pointer',
                  opacity: isLocked ? 0.5 : 1,
                  border: `2px solid ${level.color}25`,
                  transition: 'box-shadow 0.2s, transform 0.15s',
                }}
                onClick={() => !isLocked && setActiveLevel({ level, index: levelIdx })}
              >
                <Stack gap="sm">
                  <Group justify="space-between" align="center">
                    <Box
                      style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: level.color,
                      }}
                    />
                    {isLocked && <IconLock size={16} color="#adb5bd" />}
                  </Group>
                  <Text fw={800} size="lg" style={{ color: level.color, fontFamily: "'Nunito', sans-serif" }}>
                    {level.title}
                  </Text>
                  <Text size="sm" c="dimmed">{totalWords} 个词 · {level.groups.length} 组</Text>
                  <Progress
                    value={(totalMastered / totalWords) * 100}
                    size="xs"
                    radius="xl"
                    color={level.color}
                  />
                  <Text size="xs" c="dimmed">
                    已掌握 {totalMastered}/{totalWords}
                  </Text>
                </Stack>
              </Paper>
            )
          })}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}
