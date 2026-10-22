import { useLocalStorage } from '@mantine/hooks'

type ViewMode = 'grid' | 'list'

const GLOBAL_KEY = 'phonics_view_mode'

function getSmartDefault(): ViewMode {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return 'list'
  return 'grid'
}

// 全局单一视图偏好，所有页面共用
export function useViewMode(): [ViewMode, (m: ViewMode) => void] {
  const [stored, setStored] = useLocalStorage<ViewMode | null>({ key: GLOBAL_KEY, defaultValue: null })
  const mode: ViewMode = stored ?? getSmartDefault()
  return [mode, (m) => setStored(m)]
}
