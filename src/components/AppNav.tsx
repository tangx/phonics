import { useState } from 'react'
import {
  AppShell, Burger, Collapse, Group, NavLink, ScrollArea, Text, UnstyledButton, rem,
} from '@mantine/core'
import { IconBooks, IconLetterCase, IconChevronDown, IconChevronRight, IconSettings, IconSearch } from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { semesters } from '../data/units'

interface AppNavProps {
  navOpened: boolean
  toggleNav: () => void
  closeNav: () => void
}

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
  const isSightWords = location.pathname.startsWith('/sight-words')
  const isSearch = location.pathname.startsWith('/search')

  const currentSemesterId = location.pathname.match(/^\/books\/([^/]+)/)?.[1] ?? null

  const toggleSemester = (semesterId: string) => {
    setExpandedSemester(v => v === semesterId ? null : semesterId)
  }

  return (
    <AppShell.Navbar style={{ display: 'flex', flexDirection: 'column' }}>

      {/* 顶部：品牌 + 手机端 Burger */}
      <AppShell.Section p="md" pb="xs" style={{ borderBottom: '1px solid #eef0f8' }}>
        <Group justify="space-between">
          <Group gap="sm" style={{ cursor: 'pointer' }} onClick={() => handleNav('/books')}>
            <IconBooks size={20} color="#1a1a2e" stroke={1.8} />
            <Text fw={800} style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e', fontSize: 17 }}>
              拼读乐园
            </Text>
          </Group>
          <Burger opened={navOpened} onClick={toggleNav} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Section>

      {/* 中间：导航菜单 */}
      <AppShell.Section grow component={ScrollArea} p="xs">

        <NavLink
          label={<Text fw={600} size="sm">Sight Words</Text>}
          leftSection={<IconLetterCase size={16} stroke={1.8} />}
          active={isSightWords}
          onClick={() => handleNav('/sight-words')}
          styles={{ root: { borderRadius: 8 } }}
        />

        <NavLink
          label={<Text fw={600} size="sm">搜索单词</Text>}
          leftSection={<IconSearch size={16} stroke={1.8} />}
          active={isSearch}
          onClick={() => handleNav('/search')}
          styles={{ root: { borderRadius: 8 } }}
        />

        {/* Books 顶层展开 */}
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
          <Group gap={8} style={{ flex: 1 }} onClick={() => handleNav('/books')}>
            <IconBooks size={16} stroke={1.8} />
            <Text fw={600} size="sm">Books</Text>
          </Group>
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
              const isSemesterActive = currentSemesterId === semester.id
              const isOpen = expandedSemester === semester.id || isSemesterActive

              return (
                <div key={semester.id}>
                  {/* 年级行 */}
                  <UnstyledButton
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: `${rem(6)} ${rem(8)}`,
                      borderRadius: 8,
                      background: isSemesterActive ? `${semester.color ?? '#1b6ca8'}15` : 'transparent',
                    }}
                    onClick={() => {
                      toggleSemester(semester.id)
                      handleNav(`/books/${semester.id}`)
                    }}
                  >
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: isSemesterActive ? (semester.color ?? '#1b6ca8') : '#e9ecef',
                      display: 'inline-block', flexShrink: 0, marginRight: 8,
                    }} />
                    <Text size="sm" fw={isSemesterActive ? 600 : 400} style={{ flex: 1, color: isSemesterActive ? (semester.color ?? '#1b6ca8') : 'var(--mantine-color-gray-7)' }}>
                      {semester.title}
                    </Text>
                    <span
                      onClick={(e) => { e.stopPropagation(); toggleSemester(semester.id) }}
                      style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                      {isOpen
                        ? <IconChevronDown size={12} stroke={1.8} color="#9ca3af" />
                        : <IconChevronRight size={12} stroke={1.8} color="#9ca3af" />
                      }
                    </span>
                  </UnstyledButton>

                  {/* 单元列表 */}
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
                              root: { borderRadius: 6, fontSize: 'var(--mantine-font-size-xs)', paddingTop: rem(4), paddingBottom: rem(4) },
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

      {/* 底部：Settings 导航 */}
      <AppShell.Section p="xs" style={{ borderTop: '1px solid #eef0f8' }}>
        <NavLink
          label={<Text size="sm" fw={500}>设置</Text>}
          leftSection={<IconSettings size={16} stroke={1.8} />}
          active={location.pathname === '/settings'}
          onClick={() => handleNav('/settings')}
          styles={{ root: { borderRadius: 8 } }}
        />
      </AppShell.Section>
    </AppShell.Navbar>
  )
}
