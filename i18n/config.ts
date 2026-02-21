import type { InitOptions } from 'i18next'
import { locales, defaultLocale } from './routing'

export const namespaces = [
  'nav',
  'footer',
  'common',
  'home',
  'rutas',
  'blog',
  'contacto',
  'equipo',
  'reserva',
] as const
export type Namespace = (typeof namespaces)[number]

export const i18nextOptions: InitOptions = {
  fallbackLng: defaultLocale,
  supportedLngs: [...locales],
  ns: [...namespaces],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
}
