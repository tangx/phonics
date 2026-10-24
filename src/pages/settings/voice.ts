// 语音配置相关类型、常量、工具函数
// 供 VoiceTab、WordCard 等模块引用

import womanSvg from '../../assets/woman.svg'
import manSvg from '../../assets/man.svg'
import girlSvg from '../../assets/girl.svg'
import boySvg from '../../assets/boy.svg'
import { isIOS } from '../../utils/platform'

export type VoiceSlot = 'man' | 'woman' | 'boy' | 'girl'

export interface SlotMeta {
  label: string
  avatar: string
  color: string
  defaultVoice: string
}

export interface VoiceConfig {
  slot: VoiceSlot
  voiceName: string   // SpeechSynthesisVoice.name，空则系统默认英语
  rate: number        // 0.5 ~ 2，默认 1
  pitch: number       // 0.5 ~ 2，默认 1
  active: boolean     // 是否激活（用于例句阅读）
}

export const SLOT_META: Record<VoiceSlot, SlotMeta> = {
  woman: { label: 'Woman', avatar: womanSvg, color: '#7b3fa0', defaultVoice: 'Microsoft Ava Online (Natural) - English (United States)' },
  man:   { label: 'Man',   avatar: manSvg,   color: '#1b6ca8', defaultVoice: 'Microsoft Eric Online (Natural) - English (United States)' },
  girl:  { label: 'Girl',  avatar: girlSvg,  color: '#d64045', defaultVoice: '' },
  boy:   { label: 'Boy',   avatar: boySvg,   color: '#2d8a4e', defaultVoice: '' },
}

export const SLOT_ORDER: VoiceSlot[] = ['man', 'woman', 'boy', 'girl']

export const VOICE_CONFIG_KEY = 'phonics_voice_configs'
export const PIXABAY_KEY_LS = 'phonics_pixabay_key'

export function defaultVoiceConfigs(): Record<VoiceSlot, VoiceConfig> {
  return {
    man:   { slot: 'man',   voiceName: SLOT_META.man.defaultVoice,   rate: 1, pitch: 1, active: !isIOS },
    woman: { slot: 'woman', voiceName: SLOT_META.woman.defaultVoice, rate: 1, pitch: 1, active: !isIOS },
    boy:   { slot: 'boy',   voiceName: SLOT_META.boy.defaultVoice,   rate: 1, pitch: 1, active: false },
    girl:  { slot: 'girl',  voiceName: SLOT_META.girl.defaultVoice,  rate: 1, pitch: 1, active: false },
  }
}

export function loadVoiceConfigs(): Record<VoiceSlot, VoiceConfig> {
  try {
    const raw = localStorage.getItem(VOICE_CONFIG_KEY)
    if (!raw) return defaultVoiceConfigs()
    const saved: Record<VoiceSlot, VoiceConfig> = { ...defaultVoiceConfigs(), ...JSON.parse(raw) }
    if (isIOS) {
      for (const slot of SLOT_ORDER) saved[slot] = { ...saved[slot], active: false }
    }
    return saved
  } catch { return defaultVoiceConfigs() }
}

export function saveVoiceConfigs(configs: Record<VoiceSlot, VoiceConfig>) {
  try { localStorage.setItem(VOICE_CONFIG_KEY, JSON.stringify(configs)) } catch {}
}

export function speakWithConfig(text: string, config: VoiceConfig) {
  if (!('speechSynthesis' in window)) return
  const say = (voices: SpeechSynthesisVoice[]) => {
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    utter.rate = config.rate
    utter.pitch = config.pitch
    const voice = config.voiceName
      ? voices.find(v => v.name === config.voiceName)
      : voices.find(v => v.lang.startsWith('en') && !v.localService) ?? voices.find(v => v.lang.startsWith('en'))
    if (voice) utter.voice = voice
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) { say(voices) }
  else { window.speechSynthesis.onvoiceschanged = () => { say(window.speechSynthesis.getVoices()); window.speechSynthesis.onvoiceschanged = null } }
}
