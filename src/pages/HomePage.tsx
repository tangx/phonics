import { AppShell, Burger, Group, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import AppNav from '../components/AppNav'

export default function AppShellLayout() {
  const [navOpened, { toggle: toggleNav, close: closeNav }] = useDisclosure()
  const navigate = useNavigate()

  return (
    <AppShell
      navbar={{ width: 248, breakpoint: 'sm', collapsed: { mobile: !navOpened } }}
      padding={0}
    >
      <AppNav navOpened={navOpened} toggleNav={toggleNav} closeNav={closeNav} />

      <AppShell.Main style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden', height: '100svh' }}>
        {/* 手机端顶部栏 */}
        <Group
          hiddenFrom="sm"
          px="md"
          h={52}
          style={{
            flexShrink: 0,
            borderBottom: '2px solid rgba(79,163,232,0.12)',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(26,39,68,0.06)',
          }}
        >
          <Burger opened={navOpened} onClick={toggleNav} size="sm" />
          <Group
            gap={8}
            style={{ cursor: 'pointer' }}
            onClick={() => { navigate('/'); if (navOpened) closeNav() }}
          >
            <Text style={{ fontSize: 24, lineHeight: 1 }}>🐣</Text>
            <Text fw={800} style={{
              fontFamily: "'Fredoka', 'Nunito', sans-serif",
              color: 'var(--ink)',
              fontSize: 18,
              letterSpacing: '-0.3px',
            }}>
              拼读乐园
            </Text>
          </Group>
        </Group>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  )
}
