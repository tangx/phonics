// 有道词典真人发音，type=1 美音，type=2 英音
export function getAudioUrl(word: string, type: 1 | 2 = 1): string {
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=${type}`
}

export function playWord(word: string): void {
  const url = getAudioUrl(word)
  const audio = new Audio(url)
  audio.play().catch(() => {
    speakText(word)
  })
}

/**
 * 用 Web Speech API 朗读任意文本（句子/单词）。
 * 优先使用 localStorage 中保存的语音名称（phonics_voice_name），
 * 若无则选第一个在线英语语音（Edge Neural），再降级到本地英语语音。
 * 语音选择界面在 Settings 页中扩展。
 */
export function speakText(text: string): void {
  if (!('speechSynthesis' in window)) return

  const say = (voices: SpeechSynthesisVoice[]) => {
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'

    const savedName = (() => {
      try { return localStorage.getItem('phonics_voice_name') } catch { return null }
    })()

    const voice = savedName
      ? (voices.find(v => v.name === savedName) ?? null)
      : (voices.find(v => v.lang.startsWith('en') && !v.localService)  // 在线 Neural（Edge 优先）
        ?? voices.find(v => v.lang.startsWith('en'))
        ?? null)

    if (voice) utter.voice = voice
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }

  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) {
    say(voices)
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      say(window.speechSynthesis.getVoices())
      window.speechSynthesis.onvoiceschanged = null
    }
  }
}
