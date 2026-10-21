export function getPixabayApiKey(): string {
  try {
    return localStorage.getItem('phonics_pixabay_key') ?? ''
  } catch {
    return ''
  }
}
