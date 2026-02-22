import { fetchApi, apiUrl } from './api'

export type Dificultad = 'fácil' | 'media' | 'alta'

export interface Ruta {
  slug: string
  nombre: string
  zona: string
  descripcion: string
  duracion: string
  dificultad: Dificultad
  imagen: string
  destacada?: boolean
  itinerario: string[]
  equipo: { titulo: string; texto: string; icono?: string }[]
  proximasSalidas: { id?: string; fecha: string; cupos: number; cuposDisponibles?: number }[]
}

export async function getRutas(locale: string = 'es', destacadasOnly?: boolean): Promise<Ruta[]> {
  const params: Record<string, string> = { locale }
  if (destacadasOnly) params.destacadas = 'true'
  const url = apiUrl('/api/rutas', params)
  return fetch(url).then((r) => r.json())
}

export async function getRutaBySlug(slug: string, locale: string = 'es'): Promise<Ruta | null> {
  try {
    return await fetchApi<Ruta>(`/api/rutas/${slug}`, { locale })
  } catch {
    return null
  }
}

/** Raw ruta with both languages for admin edit form */
export interface RutaAdmin {
  slug: string
  nombreEs: string
  nombreEn: string
  zonaEs: string
  zonaEn: string
  descripcionEs: string
  descripcionEn: string
  duracionEs: string
  duracionEn: string
  duracionDias?: number
  duracionNoches?: number
  dificultad: Dificultad
  imagen: string
  destacada?: boolean
  orden?: number
  itinerarios: { textoEs: string; textoEn: string; orden: number }[]
  equipos: { tituloEs: string; tituloEn: string; textoEs: string; textoEn: string; icono?: string; orden: number }[]
  proximasSalidas: { id: string; fecha: string; cupos: number; orden?: number }[]
}

export async function getRutaBySlugForAdmin(slug: string): Promise<RutaAdmin | null> {
  try {
    return await fetchApi<RutaAdmin>(`/api/rutas/${slug}`, { locale: 'all' })
  } catch {
    return null
  }
}

export async function createRuta(body: Record<string, unknown>): Promise<unknown> {
  return fetchApi('/api/rutas', { method: 'POST', body: JSON.stringify(body) })
}

export async function updateRuta(slug: string, body: Record<string, unknown>): Promise<unknown> {
  return fetchApi(`/api/rutas/${slug}`, { method: 'PUT', body: JSON.stringify(body) })
}

export async function deleteRuta(slug: string): Promise<void> {
  await fetchApi(`/api/rutas/${slug}`, { method: 'DELETE' })
}
