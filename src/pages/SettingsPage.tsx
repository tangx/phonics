import { Box, Tabs, Title } from '@mantine/core'
import { IconPhoto, IconVolume } from '@tabler/icons-react'
import VoiceTab from './settings/VoiceTab'
import ImageTab from './settings/ImageTab'

export default function SettingsPage() {
  return (
    <Box p="xl" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title order={2} mb="xl" style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e' }}>
        设置
      </Title>

      <Tabs defaultValue="voice" radius="md">
        <Tabs.List mb="xl">
          <Tabs.Tab value="voice" leftSection={<IconVolume size={15} stroke={1.8} />}>语音</Tabs.Tab>
          <Tabs.Tab value="image" leftSection={<IconPhoto size={15} stroke={1.8} />}>图片</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="voice"><VoiceTab /></Tabs.Panel>
        <Tabs.Panel value="image"><ImageTab /></Tabs.Panel>
      </Tabs>
    </Box>
  )
}
