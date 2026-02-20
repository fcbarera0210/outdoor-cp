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

export async function getContactoSettings(locale: string = 'es'): Promise<ContactoSettings> {
  return fetchApi<ContactoSettings>(`/api/settings/contacto`, { locale })
}

/** Raw setting value for admin (both languages) */
export async function getSettingRaw(key: string): Promise<Record<string, unknown>> {
  return fetchApi<Record<string, unknown>>(`/api/settings/${key}`, { locale: 'all' })
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchApi<SiteSettings>('/api/settings/site')
}

export async function updateSetting(key: string, value: Record<string, unknown>): Promise<void> {
  await fetchApi(`/api/settings/${key}`, { method: 'PUT', body: JSON.stringify(value) })
}
