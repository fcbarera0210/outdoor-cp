import type { Locale } from './routing'

const messagesEs = () => import('@/messages/es.json').then((m) => m.default)
const messagesEn = () => import('@/messages/en.json').then((m) => m.default)

export async function getMessages(locale: Locale): Promise<Record<string, Record<string, string>>> {
  if (locale === 'en') return messagesEn() as Promise<Record<string, Record<string, string>>>
  return messagesEs() as Promise<Record<string, Record<string, string>>>
}
