export type AvatarKey = 'man' | 'woman' | 'boy' | 'girl'

export interface UserProfile {
  username: string       // 不可修改，用于云端路径
  displayName: string    // 展示名，可随时更改
  avatar: AvatarKey      // 头像选择，预留扩展
}

export const USER_PROFILE_KEY = 'phonics_user_profile'

const DEFAULTS: UserProfile = { username: '', displayName: '', avatar: 'boy' }

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(USER_PROFILE_KEY)
    if (!raw) return { ...DEFAULTS }
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch { return { ...DEFAULTS } }
}

export function saveUserProfile(p: UserProfile): void {
  try { localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(p)) } catch {}
}
