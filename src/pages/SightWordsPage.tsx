import { useState } from 'react'
import {
  Box, Stack, Group, Text, Title, Button, Progress,
  SimpleGrid, Paper, Center, ActionIcon,
} from '@mantine/core'
import { IconLock, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { sightWordLevels } from '../data/sightWords'
import { useSightWordsProgress } from '../hooks/useSightWordsProgress'
import type { SightWordLevel, SightWordGroup } from '../types'

// ── 翻转词卡 ──────────────────────────────────────────────────────────────────

function FlipCard({ word, chinese, example, exampleZh }: {
  word: string
  chinese: string
  example: string
  exampleZh: string
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <Box
      style={{ perspective: '1000px', cursor: 'pointer', height: 160 }}
      onClick={() => setFlipped(f => !f)}
    >
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.45s cubic-bezier(.4,0,.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 正面 */}
        <Paper
          shadow="xs"
          radius="lg"
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'white',
            border: '2px solid #e9ecef',
          }}
        >
          <Stack align="center" gap={4}>
            <Text size="2.2rem" fw={800} style={{ letterSpacing: '-0.02em', color: '#1a1a2e', fontFamily: "'Nunito', sans-serif" }}>
              {word}
            </Text>
            <Text size="xs" c="dimmed">点击翻转</Text>
          </Stack>
        </Paper>

        {/* 背面 */}
        <Paper
          shadow="xs"
          radius="lg"
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#f8f9fa',
            border: '2px solid #e9ecef',
            padding: '12px 16px',
          }}
        >
          <Stack align="center" gap={6}>
            <Text fw={700} size="lg" c="dark.7">{chinese}</Text>
            <Text size="sm" c="blue.7" ta="center" style={{ lineHeight: 1.5 }}>{example}</Text>
            <Text size="xs" c="dimmed" ta="center">{exampleZh}</Text>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

// ── 单组练习视图 ───────────────────────────────────────────────────────────────

function GroupPractice({
  group,
  onComplete,
  onBack,
}: {
  group: SightWordGroup
  onComplete: () => void
  onBack: () => void
}) {
  const [seen, setSeen] = useState<Set<number>>(new Set())
  const total = group.words.length
  const progress = (seen.size / total) * 100

  function handleCardClick(index: number) {
    setSeen(prev => new Set(prev).add(index))
  }

  return (
    <Stack gap="lg">
      <Group>
        <ActionIcon variant="subtle" onClick={onBack}><IconChevronLeft /></ActionIcon>
        <Box style={{ flex: 1 }}>
          <Progress value={progress} size="sm" radius="xl" color="green" />
        </Box>
        <Text size="sm" c="dimmed">{seen.size}/{total}</Text>
      </Group>

      <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="md">
        {group.words.map((w, i) => (
          <Box key={w.word} onClick={() => handleCardClick(i)}>
            <FlipCard
              word={w.word}
              chinese={w.chinese}
              example={w.example}
              exampleZh={w.exampleZh}
            />
          </Box>
        ))}
      </SimpleGrid>

      {seen.size === total && (
        <Center mt="md">
          <Button
            size="md"
            color="green"
            radius="xl"
            rightSection={<IconChevronRight size={18} />}
            onClick={onComplete}
          >
            完成这组，解锁下一组！
          </Button>
        </Center>
      )}
    </Stack>
  )
}

// ── 等级内分组列表 ─────────────────────────────────────────────────────────────

function LevelView({
  level,
  onBack,
}: {
  level: SightWordLevel
  onBack: () => void
}) {
  const { isGroupUnlocked, unlockGroup } = useSightWordsProgress()
  const [activeGroup, setActiveGroup] = useState<SightWordGroup | null>(null)

  if (activeGroup) {
    const idx = level.groups.findIndex(g => g.id === activeGroup.id)
    const nextGroup = level.groups[idx + 1] ?? null

    function handleComplete() {
      if (nextGroup) unlockGroup(nextGroup.id)
      setActiveGroup(null)
    }

    return (
      <GroupPractice
        group={activeGroup}
        onComplete={handleComplete}
        onBack={() => setActiveGroup(null)}
      />
    )
  }

  const totalWords = level.groups.reduce((s, g) => s + g.words.length, 0)

  return (
    <Stack gap="lg">
      <Group>
        <ActionIcon variant="subtle" onClick={onBack}><IconChevronLeft /></ActionIcon>
        <Box>
          <Title order={3} style={{ fontFamily: "'Nunito', sans-serif" }}>{level.title}</Title>
          <Text size="sm" c="dimmed">{totalWords} 个高频词 · {level.groups.length} 组</Text>
        </Box>
      </Group>

      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
        {level.groups.map((group, idx) => {
          const unlocked = isGroupUnlocked(level.id, group.id, idx)
          const groupNum = idx + 1

          return (
            <Paper
              key={group.id}
              shadow="xs"
              radius="lg"
              p="lg"
              style={{
                cursor: unlocked ? 'pointer' : 'default',
                opacity: unlocked ? 1 : 0.5,
                border: `2px solid ${unlocked ? level.color + '40' : '#e9ecef'}`,
                transition: 'box-shadow 0.2s',
              }}
              onClick={() => unlocked && setActiveGroup(group)}
            >
              <Stack align="center" gap="xs">
                {unlocked ? (
                  <>
                    <Text size="xl" fw={800} style={{ color: level.color }}>
                      {groupNum}
                    </Text>
                    <Text size="xs" c="dimmed">第 {groupNum} 组</Text>
                    <Text size="xs" c="dimmed">{group.words.length} 词</Text>
                  </>
                ) : (
                  <>
                    <IconLock size={24} color="#adb5bd" />
                    <Text size="xs" c="dimmed">完成上一组解锁</Text>
                  </>
                )}
              </Stack>
            </Paper>
          )
        })}
      </SimpleGrid>
    </Stack>
  )
}

// ── 顶层：等级选择 ─────────────────────────────────────────────────────────────

export default function SightWordsPage() {
  const [activeLevel, setActiveLevel] = useState<SightWordLevel | null>(null)
  const { isGroupUnlocked } = useSightWordsProgress()

  if (activeLevel) {
    return (
      <Box p="md" style={{ maxWidth: 800, margin: '0 auto' }}>
        <LevelView level={activeLevel} onBack={() => setActiveLevel(null)} />
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
          <Text size="sm" c="dimmed" mt={4}>Dolch 高频词 · 分级解锁</Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {sightWordLevels.map((level, levelIdx) => {
            const totalWords = level.groups.reduce((s, g) => s + g.words.length, 0)
            const unlockedGroups = level.groups.filter((g, i) => isGroupUnlocked(level.id, g.id, i)).length
            const isLevelLocked = levelIdx > 0 && unlockedGroups === 0

            return (
              <Paper
                key={level.id}
                shadow="sm"
                radius="xl"
                p="xl"
                style={{
                  cursor: isLevelLocked ? 'default' : 'pointer',
                  opacity: isLevelLocked ? 0.5 : 1,
                  border: `2px solid ${level.color}30`,
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                onClick={() => !isLevelLocked && setActiveLevel(level)}
              >
                <Stack gap="sm">
                  <Group justify="space-between" align="flex-start">
                    <Box
                      style={{
                        width: 12, height: 12, borderRadius: '50%',
                        background: level.color, marginTop: 4,
                      }}
                    />
                    {isLevelLocked && <IconLock size={16} color="#adb5bd" />}
                  </Group>
                  <Text fw={800} size="lg" style={{ color: level.color, fontFamily: "'Nunito', sans-serif" }}>
                    {level.title}
                  </Text>
                  <Text size="sm" c="dimmed">{totalWords} 个词 · {level.groups.length} 组</Text>
                  <Progress
                    value={(unlockedGroups / level.groups.length) * 100}
                    size="xs"
                    radius="xl"
                    color={level.color}
                  />
                  <Text size="xs" c="dimmed">已解锁 {unlockedGroups}/{level.groups.length} 组</Text>
                </Stack>
              </Paper>
            )
          })}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}
