import { useState } from 'react'
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import { semesters } from '../data/units'
import type { UnitData } from '../types'
import WordCard from '../components/WordCard'
import { SettingsButton } from '../components/SettingsModal'
import { useSettings } from '../hooks/useSettings'

const SYLLABLE_LEGEND = [
  { color: '#d64045', label: '第1音节' },
  { color: '#1b6ca8', label: '第2音节' },
  { color: '#2d8a4e', label: '第3音节' },
  { color: '#7b3fa0', label: '第4音节' },
]

export default function HomePage() {
  const [navOpened, { toggle: toggleNav }] = useDisclosure()
  const { pixabayKey, setPixabayKey } = useSettings()

  // 默认选中第一个单元
  const firstUnit = semesters[0].units[0]
  const [activeUnit, setActiveUnit] = useState<UnitData>(firstUnit)

  const handleSelectUnit = (unit: UnitData) => {
    setActiveUnit(unit)
    // 手机上选完自动关闭 navbar
    if (navOpened) toggleNav()
  }

  return (
    <AppShell
      header={{ height: 48 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !navOpened } }}
      padding={0}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger opened={navOpened} onClick={toggleNav} hiddenFrom="sm" size="sm" />
            <Text fw={800} style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e', fontSize: 18 }}>
              📖 拼读乐园
            </Text>
          </Group>

          <Group gap={8}>
            {/* 音节图例 */}
            <Group gap={12} visibleFrom="sm">
              {SYLLABLE_LEGEND.map((item) => (
                <Group key={item.label} gap={5}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <Text size="xs" c="dimmed">{item.label}</Text>
                </Group>
              ))}
            </Group>
            <SettingsButton pixabayKey={pixabayKey} onSave={setPixabayKey} />
          </Group>
        </Group>
      </AppShell.Header>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <AppShell.Navbar>
        <AppShell.Section p="md" pb="xs">
          <Text size="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.5px' }}>
            教材目录
          </Text>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea}>
          {semesters.map((semester) => (
            <NavLink
              key={semester.id}
              label={
                <Text fw={600} size="sm">{semester.title}</Text>
              }
              defaultOpened
              styles={{
                root: { borderRadius: 8 },
                children: { paddingLeft: rem(8) },
              }}
            >
              {semester.units.map((unit) => (
                <UnstyledButton
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: `${rem(7)} ${rem(12)}`,
                    borderRadius: 8,
                    fontSize: 'var(--mantine-font-size-sm)',
                    color: activeUnit.id === unit.id
                      ? 'var(--mantine-color-blue-7)'
                      : 'var(--mantine-color-gray-7)',
                    background: activeUnit.id === unit.id
                      ? 'var(--mantine-color-blue-0)'
                      : 'transparent',
                    fontWeight: activeUnit.id === unit.id ? 600 : 400,
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  <Text
                    size="xs"
                    fw={500}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: activeUnit.id === unit.id ? '#1b6ca8' : '#e9ecef',
                      color: activeUnit.id === unit.id ? '#fff' : '#868e96',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginRight: 8,
                      fontSize: 10,
                    }}
                    component="span"
                  >
                    {unit.title.replace(/\D/g, '') || '·'}
                  </Text>
                  {unit.title}
                </UnstyledButton>
              ))}
            </NavLink>
          ))}
        </AppShell.Section>
      </AppShell.Navbar>

      {/* ── Main ───────────────────────────────────────────────── */}
      <AppShell.Main style={{ height: '100svh', display: 'flex', flexDirection: 'column', background: 'var(--paper)' }}>
        <div style={{ flex: 1, minHeight: 0, padding: 12 }}>
          <Carousel
            key={activeUnit.id}
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
              slide: { height: '100%' },
              control: {
                background: '#fff',
                border: '1px solid #eef0f8',
                boxShadow: '0 2px 8px rgba(26,26,46,0.08)',
                color: '#1a1a2e',
              },
            }}
          >
            {activeUnit.words.map((entry) => (
              <Carousel.Slide key={entry.word}>
                <WordCard entry={entry} pixabayKey={pixabayKey} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </AppShell.Main>
    </AppShell>
  )
}
