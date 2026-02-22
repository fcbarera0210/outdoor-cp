'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { createRuta } from '@/services/rutas'
import { getInstruccionesForAdmin } from '@/services/equipo'
import type { Dificultad } from '@/services/rutas'

export default function AdminRutaNuevaPage() {
  const router = useRouter()
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
      const equipo = formData.equipoSelected.map((item) => ({
        tituloEs: item.tituloEs ?? '',
        tituloEn: item.tituloEn ?? '',
        textoEs: item.textoEs ?? '',
        textoEn: item.textoEn ?? '',
        icono: item.icono ?? '',
      }))
      const duracionDias = formData.duracionDias ?? 0
      const duracionNoches = formData.duracionNoches ?? 0
      const duracionEs = duracionDias || duracionNoches ? `${duracionDias} Días / ${duracionNoches} Noches` : formData.duracionEs
      const duracionEn = duracionDias || duracionNoches ? `${duracionDias} Days / ${duracionNoches} Nights` : (formData.duracionEn || formData.duracionEs)
      const proximasSalidas = formData.proximasSalidas.map((s) => ({
        fecha: s.fecha ?? '',
        cupos: typeof s.cupos === 'number' ? s.cupos : Number(s.cupos) || 0,
      }))
      await createRuta({
        slug: formData.slug,
        nombreEs: formData.nombreEs,
        nombreEn: formData.nombreEn || formData.nombreEs,
        zonaEs: formData.zonaEs,
        zonaEn: formData.zonaEn || formData.zonaEs,
        descripcionEs: formData.descripcionEs,
        descripcionEn: formData.descripcionEn || formData.descripcionEs,
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
      sileo.success({ title: 'Ruta creada' })
      router.push('/admin/rutas')
    } catch (err) {
      console.error(err)
      sileo.error({ title: 'Error al guardar' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/rutas" className="text-brand-primary hover:text-brand-dark dark:hover:text-white transition text-sm font-heading uppercase tracking-wider">
          <i className="fas fa-arrow-left mr-2"></i>
          Volver a Rutas
        </Link>
        <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mt-4 mb-2">
          Nueva Ruta
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Crea una nueva ruta o expedición</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 max-w-3xl space-y-8">
        <div className="space-y-6">
          <AdminInput label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} placeholder="circuito-w" required />
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput label="Nombre (ES)" name="nombreEs" value={formData.nombreEs} onChange={handleChange} placeholder="Circuito W: El Corazón de Paine" required />
            <AdminInput label="Nombre (EN)" name="nombreEn" value={formData.nombreEn} onChange={handleChange} placeholder="Circuit W: Heart of Paine" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput label="Zona (ES)" name="zonaEs" value={formData.zonaEs} onChange={handleChange} placeholder="Patagonia" />
            <AdminInput label="Zona (EN)" name="zonaEn" value={formData.zonaEn} onChange={handleChange} placeholder="Patagonia" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput
              label="Duración días (número)"
              name="duracionDias"
              type="number"
              value={String(formData.duracionDias ?? 0)}
              onChange={(e) => setFormData((prev) => ({ ...prev, duracionDias: Number((e.target as HTMLInputElement).value) || 0 }))}
            />
            <AdminInput
              label="Duración noches (número)"
              name="duracionNoches"
              type="number"
              value={String(formData.duracionNoches ?? 0)}
              onChange={(e) => setFormData((prev) => ({ ...prev, duracionNoches: Number((e.target as HTMLInputElement).value) || 0 }))}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Se mostrará como &quot;X Días / Y Noches&quot;. Sirve para calcular la fecha de término en próximas salidas.
          </p>
          <AdminInput label="Dificultad" name="dificultad" value={formData.dificultad} onChange={handleChange} as="select" options={[{ value: 'fácil', label: 'Fácil' }, { value: 'media', label: 'Media' }, { value: 'alta', label: 'Alta' }]} />
          <div>
            <AdminInput label="Descripción (ES)" name="descripcionEs" value={formData.descripcionEs} onChange={handleChange} as="textarea" rows={4} placeholder="Descripción..." />
            <AdminInput label="Descripción (EN)" name="descripcionEn" value={formData.descripcionEn} onChange={handleChange} as="textarea" rows={4} placeholder="Description..." className="mt-2" />
          </div>
          <ImageUploader label="Imagen de la ruta" value={formData.imagen} onChange={(url) => setFormData((prev) => ({ ...prev, imagen: url }))} />
          <AdminItinerarioList
            items={formData.itinerarios}
            onChange={(itinerarios) => setFormData((prev) => ({ ...prev, itinerarios }))}
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="destacada" checked={formData.destacada} onChange={handleChange} className="rounded border-gray-300" />
            <span className="text-sm font-heading uppercase text-brand-dark dark:text-white">Destacada (aparece en home)</span>
          </label>
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
