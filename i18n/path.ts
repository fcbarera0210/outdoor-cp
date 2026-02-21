import type { Locale } from './routing'

export function pathWithLocale(path: string, locale: Locale): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${p === '/' ? '' : p}`
}
