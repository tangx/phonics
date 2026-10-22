import { useState, useCallback } from 'react'
import {
  Box, Stack, Group, Text, Title, Progress,
  ActionIcon, Card,
} from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import { IconLock, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
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

        <Stack gap="sm">
          {level.groups.map((group, idx) => {
            const unlocked = isGroupUnlocked(level.id, group.id, idx)
            const prog = groupProgress(group.id, group.words.length)
            const done = prog === 1

            return (
              <Card
                key={group.id}
                radius="lg"
                shadow="xs"
                padding="sm"
                style={{
                  cursor: unlocked ? 'pointer' : 'default',
                  opacity: unlocked ? 1 : 0.45,
                  border: `1.5px solid ${done ? level.color : unlocked ? level.color + '30' : '#e9ecef'}`,
                  background: done ? `${level.color}08` : 'white',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onClick={() => unlocked && setActiveGroup({ group, index: idx })}
                onMouseEnter={e => {
                  if (unlocked) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 6px 20px ${level.color}20`
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <Group gap="md" wrap="nowrap">
                  <Box
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: unlocked ? `${level.color}18` : '#f1f3f5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {unlocked
                      ? <Text fw={800} size="md" style={{ color: level.color, fontFamily: "'Nunito', sans-serif" }}>{idx + 1}</Text>
                      : <IconLock size={18} color="#adb5bd" />
                    }
                  </Box>
                  <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group justify="space-between" align="baseline">
                      <Text fw={700} size="sm" style={{ color: unlocked ? '#1a1a2e' : '#adb5bd', fontFamily: "'Nunito', sans-serif" }}>
                        第 {idx + 1} 组
                      </Text>
                      {unlocked && (
                        <Text size="xs" c={done ? level.color : 'dimmed'} fw={done ? 700 : 400}>
                          {done ? '✓ 已掌握' : `${Math.round(prog * group.words.length)}/${group.words.length}`}
                        </Text>
                      )}
                    </Group>
                    {unlocked
                      ? <Progress value={prog * 100} size="xs" radius="xl" color={level.color} />
                      : <Text size="xs" c="dimmed">完成上一组解锁</Text>
                    }
                    {unlocked && <Text size="xs" c="dimmed">{group.words.length} 个词</Text>}
                  </Stack>
                  {unlocked && <IconChevronRight size={16} color="#9ca3af" stroke={1.5} style={{ flexShrink: 0 }} />}
                </Group>
              </Card>
            )
          })}
        </Stack>
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

        <Stack gap="sm">
          {sightWordLevels.map((level, levelIdx) => {
            const totalWords = level.groups.reduce((s, g) => s + g.words.length, 0)
            const totalMastered = level.groups.reduce(
              (s, g) => s + Math.round(groupProgress(g.id, g.words.length) * g.words.length),
              0
            )
            const unlockedGroups = level.groups.filter((g, i) => isGroupUnlocked(level.id, g.id, i)).length
            const isLocked = levelIdx > 0 && unlockedGroups === 0
            const pct = totalWords > 0 ? (totalMastered / totalWords) * 100 : 0

            return (
              <Card
                key={level.id}
                radius="lg"
                shadow="xs"
                padding="sm"
                style={{
                  cursor: isLocked ? 'default' : 'pointer',
                  opacity: isLocked ? 0.5 : 1,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onClick={() => !isLocked && setActiveLevel({ level, index: levelIdx })}
                onMouseEnter={e => {
                  if (!isLocked) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <Group gap="md" wrap="nowrap">
                  {/* 左侧色点 */}
                  <Box
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${level.color}18`,
                      border: `2px solid ${level.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isLocked
                      ? <IconLock size={18} color="#adb5bd" />
                      : <Text fw={800} size="sm" style={{ color: level.color, fontFamily: "'Nunito', sans-serif" }}>
                          {level.title.slice(0, 2)}
                        </Text>
                    }
                  </Box>

                  {/* 右侧文字 + 进度条 */}
                  <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group justify="space-between" align="baseline">
                      <Text fw={700} size="sm" style={{ color: level.color, fontFamily: "'Nunito', sans-serif" }}>
                        {level.title}
                      </Text>
                      <Text size="xs" c="dimmed">{totalMastered}/{totalWords}</Text>
                    </Group>
                    <Progress value={pct} size="xs" radius="xl" color={level.color} />
                    <Text size="xs" c="dimmed">{totalWords} 个词 · {level.groups.length} 组</Text>
                  </Stack>

                  <IconChevronRight size={16} color="#9ca3af" stroke={1.5} style={{ flexShrink: 0 }} />
                </Group>
              </Card>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
}
