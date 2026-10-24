import { useState } from 'react'
import {
  AppShell, Burger, Collapse, NavLink, ScrollArea, Text, UnstyledButton, Box, Group, rem,
} from '@mantine/core'
import { IconBooks, IconLetterCase, IconChevronDown, IconChevronRight, IconSettings, IconSearch } from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { semesters } from '../data/units'

interface AppNavProps {
  navOpened: boolean
  toggleNav: () => void
  closeNav: () => void
}

const NAV_ITEMS = [
  { path: '/books',       label: 'Books',       icon: IconBooks,       color: '#4fa3e8' },
  { path: '/sight-words', label: 'Sight Words', icon: IconLetterCase,  color: '#9b8fe8' },
  { path: '/search',      label: '搜索单词',     icon: IconSearch,      color: '#52c79d' },
]

export default function AppNav({ navOpened, toggleNav, closeNav }: AppNavProps) {
  const [booksExpanded, setBooksExpanded] = useState(true)
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (path: string) => {
    navigate(path)
    if (navOpened) closeNav()
  }

  const isBooks = location.pathname.startsWith('/books')
  const currentSemesterId = location.pathname.match(/^\/books\/([^/]+)/)?.[1] ?? null

  const toggleSemester = (semesterId: string) => {
    setExpandedSemester(v => v === semesterId ? null : semesterId)
  }

  return (
    <AppShell.Navbar style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>

      {/* Brand */}
      <AppShell.Section
        p="md"
        pb="sm"
        style={{ borderBottom: '2px solid rgba(79,163,232,0.10)' }}
      >
        <Group justify="space-between" align="center">
          <Group
            gap={8}
            style={{ cursor: 'pointer' }}
            onClick={() => handleNav('/')}
          >
            <Text style={{ fontSize: 26, lineHeight: 1 }}>🐣</Text>
            <Text fw={800} style={{
              fontFamily: "'Fredoka', 'Nunito', sans-serif",
              color: 'var(--ink)',
              fontSize: 18,
              letterSpacing: '-0.3px',
            }}>
              拼读乐园
            </Text>
          </Group>
          <Burger opened={navOpened} onClick={toggleNav} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Section>

      {/* Nav items */}
      <AppShell.Section grow component={ScrollArea} p="xs">

        {/* Sight Words & Search */}
        {NAV_ITEMS.filter(n => n.path !== '/books').map((item) => {
          const Icon = item.icon
          const isActive = location.pathname.startsWith(item.path)
          return (
            <UnstyledButton
              key={item.path}
              onClick={() => handleNav(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: `${rem(9)} ${rem(10)}`,
                borderRadius: 12,
                marginBottom: 4,
                background: isActive ? `${item.color}18` : 'transparent',
                transition: 'background 0.12s',
              }}
            >
              <Box style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: isActive ? item.color : `${item.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: isActive ? `2px 2px 0px ${item.color}60` : 'none',
                transition: 'all 0.12s',
              }}>
                <Icon size={16} color={isActive ? '#fff' : item.color} stroke={2} />
              </Box>
              <Text
                fw={isActive ? 700 : 500}
                size="sm"
                style={{ color: isActive ? item.color : 'var(--ink)', flex: 1 }}
              >
                {item.label}
              </Text>
            </UnstyledButton>
          )
        })}

        {/* Books with expand */}
        <UnstyledButton
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: `${rem(9)} ${rem(10)}`,
            borderRadius: 12,
            marginBottom: 4,
            background: isBooks ? '#4fa3e818' : 'transparent',
            transition: 'background 0.12s',
          }}
        >
          <Box
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: isBooks ? '#4fa3e8' : '#4fa3e820',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: isBooks ? '2px 2px 0px #4fa3e860' : 'none',
              transition: 'all 0.12s',
            }}
          >
            <IconBooks size={16} color={isBooks ? '#fff' : '#4fa3e8'} stroke={2} />
          </Box>
          <Text
            fw={isBooks ? 700 : 500}
            size="sm"
            style={{ color: isBooks ? '#4fa3e8' : 'var(--ink)', flex: 1 }}
            onClick={() => handleNav('/books')}
          >
            Books
          </Text>
          <Box
            onClick={(e) => { e.stopPropagation(); setBooksExpanded(v => !v) }}
            style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            {booksExpanded
              ? <IconChevronDown size={13} stroke={2} color="var(--ink-muted)" />
              : <IconChevronRight size={13} stroke={2} color="var(--ink-muted)" />
            }
          </Box>
        </UnstyledButton>

        <Collapse expanded={booksExpanded}>
          <div style={{ paddingLeft: rem(12) }}>
            {semesters.map((semester) => {
              const isSemesterActive = currentSemesterId === semester.id
              const isOpen = expandedSemester === semester.id || isSemesterActive
              const color = semester.color ?? '#4fa3e8'

              return (
                <div key={semester.id}>
                  <UnstyledButton
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: `${rem(6)} ${rem(8)}`,
                      borderRadius: 10,
                      marginBottom: 2,
                      background: isSemesterActive ? `${color}15` : 'transparent',
                    }}
                    onClick={() => {
                      toggleSemester(semester.id)
                      handleNav(`/books/${semester.id}`)
                    }}
                  >
                    <Box style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: isSemesterActive ? color : '#d0d8e4',
                      flexShrink: 0, marginRight: 8,
                    }} />
                    <Text
                      size="sm"
                      fw={isSemesterActive ? 700 : 400}
                      style={{ flex: 1, color: isSemesterActive ? color : 'var(--ink)' }}
                    >
                      {semester.title}
                    </Text>
                    <Box
                      onClick={(e) => { e.stopPropagation(); toggleSemester(semester.id) }}
                      style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                      {isOpen
                        ? <IconChevronDown size={11} stroke={2} color="var(--ink-muted)" />
                        : <IconChevronRight size={11} stroke={2} color="var(--ink-muted)" />
                      }
                    </Box>
                  </UnstyledButton>

                  <Collapse expanded={isOpen}>
                    <div style={{ paddingLeft: rem(16), paddingBottom: rem(4) }}>
                      {semester.units.map((unit) => {
                        const isUnitActive = location.pathname.includes(`/books/${semester.id}/${unit.id}`)
                        return (
                          <NavLink
                            key={unit.id}
                            label={unit.title}
                            active={isUnitActive}
                            onClick={() => handleNav(`/books/${semester.id}/${unit.id}`)}
                            styles={{
                              root: {
                                borderRadius: 8,
                                fontSize: 'var(--mantine-font-size-xs)',
                                paddingTop: rem(4),
                                paddingBottom: rem(4),
                              },
                            }}
                          />
                        )
                      })}
                    </div>
                  </Collapse>
                </div>
              )
            })}
          </div>
        </Collapse>

      </AppShell.Section>

      {/* Settings */}
      <AppShell.Section p="xs" style={{ borderTop: '2px solid rgba(79,163,232,0.10)' }}>
        <NavLink
          label={<Text size="sm" fw={500}>设置</Text>}
          leftSection={<IconSettings size={16} stroke={1.8} />}
          active={location.pathname === '/settings'}
          onClick={() => handleNav('/settings')}
          styles={{ root: { borderRadius: 10 } }}
        />
      </AppShell.Section>
    </AppShell.Navbar>
  )
}
