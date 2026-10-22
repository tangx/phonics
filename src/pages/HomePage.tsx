import { AppShell, Burger, Group, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import { IconBooks } from '@tabler/icons-react'
import AppNav from '../components/AppNav'

export default function AppShellLayout() {
  const [navOpened, { toggle: toggleNav, close: closeNav }] = useDisclosure()
  const navigate = useNavigate()

  return (
    <AppShell
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !navOpened } }}
      padding={0}
    >
      <AppNav navOpened={navOpened} toggleNav={toggleNav} closeNav={closeNav} />

      <AppShell.Main style={{ display: 'flex', flexDirection: 'column', background: 'var(--paper)', overflow: 'hidden', height: '100svh' }}>
        {/* 手机端顶部栏 */}
        <Group hiddenFrom="sm" px="md" h={48} style={{ flexShrink: 0, borderBottom: '1px solid #eef0f8', background: '#fff' }}>
          <Burger opened={navOpened} onClick={toggleNav} size="sm" />
          <Group gap="sm" style={{ cursor: 'pointer' }} onClick={() => { navigate('/'); if (navOpened) closeNav() }}>
            <IconBooks size={18} color="#1a1a2e" stroke={1.8} />
            <Text fw={800} style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e', fontSize: 16 }}>
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
