const ua = navigator.userAgent

export const isIPhone = /iPhone/.test(ua)
export const isIPad = /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
export const isIOS = isIPhone || isIPad
export const isAndroid = /Android/.test(ua)
export const isMobile = isIOS || isAndroid
export const isDesktop = !isMobile
