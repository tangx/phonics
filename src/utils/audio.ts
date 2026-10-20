// 有道词典真人发音，type=1 美音，type=2 英音
export function getAudioUrl(word: string, type: 1 | 2 = 1): string {
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=${type}`
}

export function playWord(word: string): void {
  const url = getAudioUrl(word)
  const audio = new Audio(url)
  audio.play().catch(() => {
    // 有道 URL 被浏览器拦截时降级到 Web Speech API
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(word)
      utter.lang = 'en-US'
      window.speechSynthesis.speak(utter)
    }
  })
}
