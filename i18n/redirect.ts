import { redirect as nextRedirect } from 'next/navigation'
import type { Locale } from './routing'
import { defaultLocale } from './routing'
import { pathWithLocale } from './path'

export function redirect(path: string, locale?: Locale): never {
  nextRedirect(pathWithLocale(path, locale ?? defaultLocale))
}
