import {
  AppShell, Burger, Group, NavLink, ScrollArea, Text, rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { IconBooks, IconLetterCase } from '@tabler/icons-react'
import { semesters } from '../data/units'
import { SettingsButton } from '../components/SettingsModal'
import { useSettings } from '../hooks/useSettings'

export default function AppShellLayout() {
  const [navOpened, { toggle: toggleNav, close: closeNav }] = useDisclosure()
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

          {/* Books */}
          <NavLink
            label={<Text fw={600} size="sm">Books</Text>}
            leftSection={<IconBooks size={16} stroke={1.8} />}
            active={isBooks}
            defaultOpened
            styles={{
              root: { borderRadius: 8 },
              children: { paddingLeft: rem(8) },
            }}
          >
            {semesters.map((semester) => {
              const isActive = location.pathname === `/books/${semester.id}`
              return (
                <NavLink
                  key={semester.id}
                  label={semester.title}
                  active={isActive}
                  onClick={() => handleNav(`/books/${semester.id}`)}
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
          </NavLink>

        </AppShell.Section>
      </AppShell.Navbar>

      {/* ── Main ───────────────────────────────────────────────── */}
      <AppShell.Main style={{ height: '100svh', display: 'flex', flexDirection: 'column', background: 'var(--paper)', overflow: 'hidden' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
