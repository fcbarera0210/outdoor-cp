import { fetchApi } from './api'

export interface Instrucciones {
  seguridad: string
  queLlevar: string
  comportamiento: string
  instruccionesBasicas: { titulo: string; texto: string; icono?: string }[]
  dificultadFacil: string
  dificultadMedia: string
  dificultadAlta: string
  equipoNecesario: { titulo: string; texto: string; icono?: string }[]
  senaletica: { titulo: string; texto: string; icono?: string }[]
}

export interface MiembroEquipo {
  id: string
  nombre: string
  rol: string
  imagen: string
  bio: string
}

export async function getInstrucciones(locale: string = 'es'): Promise<Instrucciones | null> {
  try {
    return await fetchApi<Instrucciones>('/api/equipo/instrucciones', { locale })
  } catch {
    return null
  }
}

export interface InstruccionesAdmin {
  seguridadEs: string
  seguridadEn: string
  queLlevarEs: string
  queLlevarEn: string
  comportamientoEs: string
  comportamientoEn: string
  instruccionesBasicas: { tituloEs?: string; tituloEn?: string; textoEs?: string; textoEn?: string; icono?: string }[]
  dificultadFacilEs: string
  dificultadFacilEn: string
  dificultadMediaEs: string
  dificultadMediaEn: string
  dificultadAltaEs: string
  dificultadAltaEn: string
  equipoNecesario: { tituloEs?: string; tituloEn?: string; textoEs?: string; textoEn?: string; icono?: string }[]
  senaletica: { tituloEs?: string; tituloEn?: string; textoEs?: string; textoEn?: string; icono?: string }[]
}

export async function getInstruccionesForAdmin(): Promise<InstruccionesAdmin | null> {
  try {
    return await fetchApi<InstruccionesAdmin>('/api/equipo/instrucciones', { locale: 'all' })
  } catch {
    return null
  }
}

export async function getMiembros(locale: string = 'es'): Promise<MiembroEquipo[]> {
  return fetchApi<MiembroEquipo[]>('/api/equipo/miembros', { locale })
}

export async function updateInstrucciones(body: Record<string, unknown>): Promise<void> {
  await fetchApi('/api/equipo/instrucciones', { method: 'PUT', body: JSON.stringify(body) })
}

export async function createMiembro(body: Record<string, unknown>): Promise<unknown> {
  return fetchApi('/api/equipo/miembros', { method: 'POST', body: JSON.stringify(body) })
}

export async function updateMiembro(id: string, body: Record<string, unknown>): Promise<unknown> {
  return fetchApi(`/api/equipo/miembros/${id}`, { method: 'PUT', body: JSON.stringify(body) })
}

export async function deleteMiembro(id: string): Promise<void> {
  await fetchApi(`/api/equipo/miembros/${id}`, { method: 'DELETE' })
}
