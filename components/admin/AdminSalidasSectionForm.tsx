'use client'

import { useState, useEffect } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import { sileo } from 'sileo'
import { getHomeBlock, updateHomeBlock } from '@/services/home'

export interface SalidasSectionBlock {
  tituloEs?: string
  tituloEn?: string
  tituloDestacadoEs?: string
  tituloDestacadoEn?: string
  subtituloEs?: string
  subtituloEn?: string
}

const defaultSalidas: SalidasSectionBlock = {
  tituloEs: 'Próximas Salidas',
  tituloEn: 'Upcoming Departures',
  tituloDestacadoEs: 'Salidas',
  tituloDestacadoEn: 'Departures',
  subtituloEs: 'Temporada 2024 / 2025',
  subtituloEn: 'Season 2024 / 2025',
}

export default function AdminSalidasSectionForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<SalidasSectionBlock>(defaultSalidas)

  useEffect(() => {
    getHomeBlock('salidasSection')
      .then((raw) => setData({ ...defaultSalidas, ...(raw as SalidasSectionBlock) }))
      .catch(() => setData(defaultSalidas))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateHomeBlock('salidasSection', data)
      sileo.success({ title: 'Guardado correctamente' })
    } catch (err) {
      console.error(err)
      sileo.error({ title: 'Error al guardar' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            El <strong>subtítulo</strong> es el texto del año de temporada (ej. &quot;Temporada 2024 / 2025&quot;). El <strong>título destacado</strong> es la palabra que se resalta dentro del título.
          </p>
        </div>
        <AdminInput
          label="Subtítulo / Año temporada (ES)"
          name="subtituloEs"
          value={data.subtituloEs ?? ''}
          onChange={handleChange}
          placeholder="Temporada 2024 / 2025"
          required
        />
        <AdminInput
          label="Subtítulo / Año temporada (EN)"
          name="subtituloEn"
          value={data.subtituloEn ?? ''}
          onChange={handleChange}
          placeholder="Season 2024 / 2025"
        />
        <AdminInput
          label="Título (ES)"
          name="tituloEs"
          value={data.tituloEs ?? ''}
          onChange={handleChange}
          placeholder="Próximas Salidas"
        />
        <AdminInput
          label="Título (EN)"
          name="tituloEn"
          value={data.tituloEn ?? ''}
          onChange={handleChange}
          placeholder="Upcoming Departures"
        />
        <AdminInput
          label="Palabra a resaltar en título (ES)"
          name="tituloDestacadoEs"
          value={data.tituloDestacadoEs ?? ''}
          onChange={handleChange}
          placeholder="Salidas"
        />
        <AdminInput
          label="Palabra a resaltar en título (EN)"
          name="tituloDestacadoEn"
          value={data.tituloDestacadoEn ?? ''}
          onChange={handleChange}
          placeholder="Departures"
        />
      </div>
      <div className="flex gap-4">
        <AdminButton type="submit" loading={saving}>
          <i className="fas fa-save"></i>
          {saving ? 'Guardando...' : 'Guardar'}
        </AdminButton>
        <AdminButton href="/admin/home" variant="secondary" type="button">
          Cancelar
        </AdminButton>
      </div>
    </form>
  )
}
