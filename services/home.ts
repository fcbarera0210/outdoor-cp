import { fetchApi } from './api'

export interface HomeData {
  hero?: Record<string, string>
  partners?: Record<string, string>[]
  featuredSection?: Record<string, string>
  gallery?: Record<string, string>[]
  gallerySection?: Record<string, string>
  salidasSection?: Record<string, string>
  reserva?: Record<string, string>
}

export async function getHomeData(locale: string = 'es'): Promise<HomeData> {
  return fetchApi<HomeData>('/api/home', { locale })
}

export async function getHomeBlock(type: string): Promise<Record<string, unknown>> {
  return fetchApi<Record<string, unknown>>(`/api/home/${type}`)
}

export async function updateHomeBlock(type: string, value: Record<string, unknown>): Promise<void> {
  await fetchApi(`/api/home/${type}`, { method: 'PUT', body: JSON.stringify(value) })
}
