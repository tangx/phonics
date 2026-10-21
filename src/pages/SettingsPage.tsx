import { Box, Tabs, Title } from '@mantine/core'
import { IconCloud, IconDeviceMobile, IconLetterCase, IconPhoto, IconUser, IconVolume } from '@tabler/icons-react'
import EdgeVoiceTab from './settings/EdgeVoiceTab'
import IosVoiceTab from './settings/IosVoiceTab'
import ImageTab from './settings/ImageTab'
import SyncTab from './settings/SyncTab'
import UserTab from './settings/UserTab'
import SightWordsTab from './settings/SightWordsTab'

export default function SettingsPage() {
  return (
    <Box p="xl" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title order={2} mb="xl" style={{ fontFamily: "'Nunito', sans-serif", color: '#1a1a2e' }}>
        设置
      </Title>

      <Tabs defaultValue="edge-voice" radius="md">
        <Tabs.List mb="xl">
          <Tabs.Tab value="edge-voice" leftSection={<IconVolume size={15} stroke={1.8} />}>Edge 语音</Tabs.Tab>
          <Tabs.Tab value="ios-voice" leftSection={<IconDeviceMobile size={15} stroke={1.8} />}>iOS 系统音</Tabs.Tab>
          <Tabs.Tab value="image" leftSection={<IconPhoto size={15} stroke={1.8} />}>图片</Tabs.Tab>
          <Tabs.Tab value="sight-words" leftSection={<IconLetterCase size={15} stroke={1.8} />}>高频词</Tabs.Tab>
          <Tabs.Tab value="sync" leftSection={<IconCloud size={15} stroke={1.8} />}>同步</Tabs.Tab>
          <Tabs.Tab value="user" leftSection={<IconUser size={15} stroke={1.8} />}>用户</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="edge-voice"><EdgeVoiceTab /></Tabs.Panel>
        <Tabs.Panel value="ios-voice"><IosVoiceTab /></Tabs.Panel>
        <Tabs.Panel value="image"><ImageTab /></Tabs.Panel>
        <Tabs.Panel value="sight-words"><SightWordsTab /></Tabs.Panel>
        <Tabs.Panel value="sync"><SyncTab /></Tabs.Panel>
        <Tabs.Panel value="user"><UserTab /></Tabs.Panel>
      </Tabs>
    </Box>
  )
}
