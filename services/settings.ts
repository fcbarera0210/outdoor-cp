import { fetchApi } from './api'

export interface ContactoSettings {
  telefono: string
  email: string
  ubicacion?: string
  ubicacionEs?: string
  ubicacionEn?: string
  instagram?: string
  facebook?: string
  whatsapp?: string
  youtube?: string
  mapaEmbed?: string
}

export interface SiteSettings {
  metaTitleEs?: string
  metaTitleEn?: string
  metaDescriptionEs?: string
  metaDescriptionEn?: string
}

/** Footer: tagline, copyright, privacy/terms texts and URLs, column visibility */
export interface FooterSettings {
  taglineEs?: string
  taglineEn?: string
  copyrightEs?: string
  copyrightEn?: string
  privacyTextEs?: string
  privacyTextEn?: string
  termsTextEs?: string
  termsTextEn?: string
  privacyUrl?: string
  termsUrl?: string
  showTagline?: boolean
  showRecentBlog?: boolean
  showUsefulInfo?: boolean
  showInstagram?: boolean
}

/** Home sections: order (array of block types) and visibility per section. Hero is always first. */
export interface HomeSectionsSettings {
  order?: string[]
  visibility?: Record<string, boolean>
}

export async function getContactoSettings(locale: string = 'es'): Promise<ContactoSettings> {
  return fetchApi<ContactoSettings>(`/api/settings/contacto`, { locale })
}

/** Raw setting value for admin (both languages) */
export async function getSettingRaw(key: string): Promise<Record<string, unknown>> {
  return fetchApi<Record<string, unknown>>(`/api/settings/${key}`, { locale: 'all' })
}

/** Get a setting by key; returns null on 404 (e.g. not yet configured). */
export async function getSetting<T = Record<string, unknown>>(key: string): Promise<T | null> {
  try {
    return await fetchApi<T>(`/api/settings/${key}`)
  } catch {
    return null
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchApi<SiteSettings>('/api/settings/site')
}

export async function getFooterSettings(): Promise<FooterSettings | null> {
  return getSetting<FooterSettings>('footer')
}

export async function getHomeSectionsSettings(): Promise<HomeSectionsSettings | null> {
  return getSetting<HomeSectionsSettings>('homeSections')
}

export async function updateSetting(key: string, value: Record<string, unknown>): Promise<void> {
  await fetchApi(`/api/settings/${key}`, { method: 'PUT', body: JSON.stringify(value) })
}
