/**
 * Locale utilities for API and server-side code.
 *
 * CONVENTION (content bilingüe en BD):
 * - Los modelos Prisma guardan textos en español e inglés con sufijos "Es" y "En".
 * - Ejemplos: nombreEs/nombreEn, titleEs/titleEn, textoEs/textoEn, tipoEs/tipoEn.
 * - Las APIs reciben ?locale=es|en y devuelven un objeto "aplanado" con la clave sin sufijo
 *   (ej. "nombre") según el locale. Para admin se usa ?locale=all y se devuelve el modelo crudo.
 */

import type { Locale } from '@/i18n/routing'

export type { Locale }
export { locales } from '@/i18n/routing'

/** Sufijo del campo según idioma (para construir nombreEs / nombreEn) */
export function localeSuffix(locale: Locale): 'Es' | 'En' {
  return locale === 'es' ? 'Es' : 'En'
}

/**
 * Devuelve el valor localizado de un par de campos *Es/*En.
 * Uso: getLocalized(ruta, 'nombre', locale) => ruta.nombreEs | ruta.nombreEn
 */
export function getLocalized<T extends Record<string, unknown>>(
  obj: T,
  baseKey: string,
  locale: Locale
): string {
  const suffix = localeSuffix(locale)
  const key = `${baseKey}${suffix}` as keyof T
  const value = obj[key]
  return typeof value === 'string' ? value : ''
}

export function getLocaleFromRequest(request: Request): Locale {
  const url = new URL(request.url)
  const locale = url.searchParams.get('locale') as Locale | null
  if (locale === 'es' || locale === 'en') return locale
  return 'es'
}

/**
 * Convierte un objeto con claves *Es/*En en un objeto con claves sin sufijo,
 * tomando solo los valores del locale indicado.
 */
export function pickLocale<T extends Record<string, unknown>>(
  obj: T,
  locale: Locale
): Record<string, string> {
  const result: Record<string, string> = {}
  const suffix = localeSuffix(locale)
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
