import { useState } from 'react'
import {
  AppShell, Burger, Collapse, Group, NavLink, ScrollArea, Text, UnstyledButton, rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { IconBooks, IconLetterCase, IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { semesters } from '../data/units'
import { SettingsButton } from '../components/SettingsModal'
import { useSettings } from '../hooks/useSettings'

export default function AppShellLayout() {
  const [navOpened, { toggle: toggleNav, close: closeNav }] = useDisclosure()
  const [booksExpanded, setBooksExpanded] = useState(true)
  const { pixabayKey, setPixabayKey } = useSettings()
  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (path: string) => {
    navigate(path)
    if (navOpened) closeNav()
  }

  const isBooks = location.pathname.startsWith('/books')
  const isSightWords = location.pathname.startsWith('/sight-words')

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
            <IconBooks size={22} color="#1a1a2e" stroke={1.8} />
            <Text fw={800} style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e', fontSize: 18 }}>
              拼读乐园
            </Text>
          </Group>
          <SettingsButton pixabayKey={pixabayKey} onSave={setPixabayKey} />
        </Group>
      </AppShell.Header>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea} p="xs">

          {/* Sight Words */}
          <NavLink
            label={<Text fw={600} size="sm">Sight Words</Text>}
            leftSection={<IconLetterCase size={16} stroke={1.8} />}
            active={isSightWords}
            onClick={() => handleNav('/sight-words')}
            styles={{ root: { borderRadius: 8 } }}
          />

          {/* Books — 标题点击导航首页，箭头独立控制展开 */}
          <UnstyledButton
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: `${rem(7)} ${rem(8)}`,
              borderRadius: 8,
              background: isBooks ? 'var(--mantine-color-blue-0)' : 'transparent',
              color: isBooks ? 'var(--mantine-color-blue-7)' : 'var(--mantine-color-gray-7)',
            }}
          >
            {/* 左侧：icon + 文字，点击导航 /books */}
            <Group
              gap={8}
              style={{ flex: 1 }}
              onClick={() => handleNav('/books')}
            >
              <IconBooks size={16} stroke={1.8} />
              <Text fw={600} size="sm">Books</Text>
            </Group>
            {/* 右侧：展开箭头，独立控制 */}
            <span
              onClick={(e) => { e.stopPropagation(); setBooksExpanded(v => !v) }}
              style={{ padding: '2px 4px', borderRadius: 4, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              {booksExpanded
                ? <IconChevronDown size={14} stroke={1.8} />
                : <IconChevronRight size={14} stroke={1.8} />
              }
            </span>
          </UnstyledButton>

          <Collapse expanded={booksExpanded}>
            <div style={{ paddingLeft: rem(8) }}>
              {semesters.map((semester) => {
                const isActive = location.pathname.startsWith(`/books/${semester.id}`)
                return (
                  <NavLink
                    key={semester.id}
                    label={semester.title}
                    active={isActive}
                    onClick={() => handleNav(`/books/${semester.id}/${semester.units[0].id}`)}
                    styles={{ root: { borderRadius: 8, fontSize: 'var(--mantine-font-size-sm)' } }}
                    leftSection={
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: isActive ? (semester.color ?? '#1b6ca8') : '#e9ecef',
                        display: 'inline-block', flexShrink: 0,
                      }} />
                    }
                  />
                )
              })}
            </div>
          </Collapse>

        </AppShell.Section>
      </AppShell.Navbar>

      {/* ── Main ───────────────────────────────────────────────── */}
      <AppShell.Main style={{ height: '100svh', display: 'flex', flexDirection: 'column', background: 'var(--paper)', overflow: 'hidden' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
