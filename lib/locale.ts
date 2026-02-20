export type Locale = 'es' | 'en'

export const locales: Locale[] = ['es', 'en']

export function getLocaleFromRequest(request: Request): Locale {
  const url = new URL(request.url)
  const locale = url.searchParams.get('locale') as Locale | null
  if (locale === 'es' || locale === 'en') return locale
  return 'es'
}

export function pickLocale<T extends Record<string, unknown>>(
  obj: T,
  locale: Locale
): Record<string, string> {
  const result: Record<string, string> = {}
  const suffix = locale === 'es' ? 'Es' : 'En'
  for (const key of Object.keys(obj)) {
    if (key.endsWith('Es') || key.endsWith('En')) {
      if (key.endsWith(suffix)) {
        const base = key.slice(0, -2)
        result[base] = String(obj[key])
      }
    }
  }
  return result
}
