'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import ImageUploader from '@/components/admin/ImageUploader'
import AdminEquipoSelector from '@/components/admin/AdminEquipoSelector'
import type { EquipoItem } from '@/components/admin/AdminEquipoSelector'
import AdminItinerarioList from '@/components/admin/AdminItinerarioList'
import type { ItinerarioItem } from '@/components/admin/AdminItinerarioList'
import AdminProximasSalidasList from '@/components/admin/AdminProximasSalidasList'
import type { ProximaSalidaItem } from '@/components/admin/AdminProximasSalidasList'
import { sileo } from 'sileo'
import { getRutaBySlugForAdmin, updateRuta } from '@/services/rutas'
import { getInstruccionesForAdmin } from '@/services/equipo'
import type { Dificultad } from '@/services/rutas'

export default function AdminRutaEditarPage() {
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    slug: '',
    nombreEs: '',
    nombreEn: '',
    zonaEs: '',
    zonaEn: '',
    descripcionEs: '',
    descripcionEn: '',
    duracionEs: '',
    duracionEn: '',
    duracionDias: 0,
    duracionNoches: 0,
    dificultad: 'media' as Dificultad,
    imagen: '',
    destacada: false,
    itinerarios: [] as ItinerarioItem[],
    equipoSelected: [] as EquipoItem[],
    proximasSalidas: [] as ProximaSalidaItem[],
  })
  const [equipoDisponible, setEquipoDisponible] = useState<EquipoItem[]>([])

  useEffect(() => {
    getInstruccionesForAdmin()
      .then((data) => setEquipoDisponible(data?.equipoNecesario ?? []))
      .catch(() => setEquipoDisponible([]))
  }, [])

  useEffect(() => {
    getRutaBySlugForAdmin(slug)
      .then((ruta) => {
        if (!ruta) {
          setNotFound(true)
          return
        }
        setFormData({
          slug: ruta.slug,
          nombreEs: ruta.nombreEs ?? '',
          nombreEn: ruta.nombreEn ?? '',
          zonaEs: ruta.zonaEs ?? '',
          zonaEn: ruta.zonaEn ?? '',
          descripcionEs: ruta.descripcionEs ?? '',
          descripcionEn: ruta.descripcionEn ?? '',
          duracionEs: ruta.duracionEs ?? '',
          duracionEn: ruta.duracionEn ?? '',
          dificultad: ruta.dificultad ?? 'media',
          imagen: ruta.imagen ?? '',
          destacada: Boolean(ruta.destacada),
          itinerarios: (ruta.itinerarios ?? []).map((i) => ({
            textoEs: i.textoEs ?? '',
            textoEn: i.textoEn ?? '',
          })),
          equipoSelected: (ruta.equipos ?? []).map((e) => ({
            tituloEs: e.tituloEs ?? '',
            tituloEn: e.tituloEn ?? '',
            textoEs: e.textoEs ?? '',
            textoEn: e.textoEn ?? '',
            icono: e.icono ?? undefined,
          })),
          duracionDias: ruta.duracionDias ?? 0,
          duracionNoches: ruta.duracionNoches ?? 0,
          proximasSalidas: (ruta.proximasSalidas ?? []).map((s) => ({
            fecha: s.fecha ?? '',
            cupos: s.cupos ?? 0,
          })),
        })
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const itinerario = formData.itinerarios.map((item, i) => ({
        textoEs: item.textoEs ?? '',
        textoEn: item.textoEn ?? '',
        orden: i,
      }))
      const equipo = formData.equipoSelected.map((item, i) => ({
        tituloEs: item.tituloEs ?? '',
        tituloEn: item.tituloEn ?? '',
        textoEs: item.textoEs ?? '',
        textoEn: item.textoEn ?? '',
        icono: item.icono ?? '',
      }))
      const duracionDias = formData.duracionDias ?? 0
      const duracionNoches = formData.duracionNoches ?? 0
      const duracionEs = duracionDias || duracionNoches ? `${duracionDias} Días / ${duracionNoches} Noches` : formData.duracionEs
      const duracionEn = duracionDias || duracionNoches ? `${duracionDias} Days / ${duracionNoches} Nights` : formData.duracionEn
      const proximasSalidas = formData.proximasSalidas.map((s, i) => ({
        fecha: s.fecha ?? '',
        cupos: typeof s.cupos === 'number' ? s.cupos : Number(s.cupos) || 0,
      }))
      await updateRuta(slug, {
        slug: formData.slug,
        nombreEs: formData.nombreEs,
        nombreEn: formData.nombreEn,
        zonaEs: formData.zonaEs,
        zonaEn: formData.zonaEn,
        descripcionEs: formData.descripcionEs,
        descripcionEn: formData.descripcionEn,
        duracionEs,
        duracionEn,
        duracionDias,
        duracionNoches,
        dificultad: formData.dificultad,
        imagen: formData.imagen,
        destacada: formData.destacada,
        itinerario,
        equipo,
        proximasSalidas,
      })
      sileo.success({ title: 'Guardado correctamente' })
      if (formData.slug !== slug) {
        window.location.href = `/admin/rutas/${formData.slug}/editar`
      }
    } catch (err) {
      console.error(err)
      sileo.error({ title: 'Error al guardar' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
      </div>
    )
  }

  if (notFound) {
    return (
      <div>
        <p className="text-gray-600 dark:text-gray-300">Ruta no encontrada</p>
        <Link href="/admin/rutas" className="text-brand-primary hover:underline dark:hover:text-white mt-4 inline-block">
          Volver a Rutas
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/rutas" className="text-brand-primary hover:text-brand-dark dark:hover:text-white transition text-sm font-heading uppercase tracking-wider">
          <i className="fas fa-arrow-left mr-2"></i>
          Volver a Rutas
        </Link>
        <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mt-4 mb-2">
          Editar Ruta
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Editando: {formData.nombreEs || formData.slug}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 max-w-3xl space-y-8">
        <div className="space-y-6">
          <AdminInput label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} required />
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput label="Nombre (ES)" name="nombreEs" value={formData.nombreEs} onChange={handleChange} required />
            <AdminInput label="Nombre (EN)" name="nombreEn" value={formData.nombreEn} onChange={handleChange} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput label="Zona (ES)" name="zonaEs" value={formData.zonaEs} onChange={handleChange} />
            <AdminInput label="Zona (EN)" name="zonaEn" value={formData.zonaEn} onChange={handleChange} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput
              label="Duración días (número)"
              name="duracionDias"
              type="number"
              min={0}
              value={String(formData.duracionDias ?? 0)}
              onChange={(e) => setFormData((prev) => ({ ...prev, duracionDias: Number((e.target as HTMLInputElement).value) || 0 }))}
            />
            <AdminInput
              label="Duración noches (número)"
              name="duracionNoches"
              type="number"
              min={0}
              value={String(formData.duracionNoches ?? 0)}
              onChange={(e) => setFormData((prev) => ({ ...prev, duracionNoches: Number((e.target as HTMLInputElement).value) || 0 }))}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Se mostrará como &quot;X Días / Y Noches&quot; según el idioma. Sirve para calcular la fecha de término en próximas salidas.
          </p>
          <AdminInput label="Dificultad" name="dificultad" value={formData.dificultad} onChange={handleChange} as="select" options={[{ value: 'fácil', label: 'Fácil' }, { value: 'media', label: 'Media' }, { value: 'alta', label: 'Alta' }]} />
          <AdminInput label="Descripción (ES)" name="descripcionEs" value={formData.descripcionEs} onChange={handleChange} as="textarea" rows={4} />
          <AdminInput label="Descripción (EN)" name="descripcionEn" value={formData.descripcionEn} onChange={handleChange} as="textarea" rows={4} />
          <ImageUploader label="Imagen de la ruta" value={formData.imagen} onChange={(url) => setFormData((prev) => ({ ...prev, imagen: url }))} tourSlug={slug} />
          <AdminItinerarioList
            items={formData.itinerarios}
            onChange={(itinerarios) => setFormData((prev) => ({ ...prev, itinerarios }))}
          />
          <AdminEquipoSelector
            available={equipoDisponible}
            selected={formData.equipoSelected}
            onChange={(equipoSelected) => setFormData((prev) => ({ ...prev, equipoSelected }))}
          />
          <AdminProximasSalidasList
            items={formData.proximasSalidas}
            onChange={(proximasSalidas) => setFormData((prev) => ({ ...prev, proximasSalidas }))}
            duracionDias={formData.duracionDias}
          />
        </div>
        <div className="flex gap-4">
          <AdminButton type="submit" loading={saving}>
            <i className="fas fa-save"></i>
            {saving ? 'Guardando...' : 'Guardar'}
          </AdminButton>
          <AdminButton href="/admin/rutas" variant="secondary">
            Cancelar
          </AdminButton>
        </div>
      </form>
    </div>
  )
}
