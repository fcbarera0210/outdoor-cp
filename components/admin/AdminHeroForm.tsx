'use client'

import { useState, useEffect } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import ImageUploader from '@/components/admin/ImageUploader'
import { sileo } from 'sileo'
import { getHomeBlock, updateHomeBlock } from '@/services/home'

export interface HeroBlock {
  temporadaEs?: string
  temporadaEn?: string
  tituloEs?: string
  tituloEn?: string
  subtituloEs?: string
  subtituloEn?: string
  cta1Es?: string
  cta1En?: string
  cta2Es?: string
  cta2En?: string
  imagenHero?: string
}

const defaultHero: HeroBlock = {
  temporadaEs: 'Temporada 2024 / 2025',
  temporadaEn: 'Season 2024 / 2025',
  tituloEs: 'Patagonia Sin Límites',
  tituloEn: 'Patagonia Without Limits',
  subtituloEs: 'Descubre los senderos más prístinos del sur del mundo.',
  subtituloEn: 'Discover the most pristine trails in the southern world.',
  cta1Es: 'Ver Expediciones',
  cta1En: 'View Expeditions',
  cta2Es: 'Nuestro Equipo',
  cta2En: 'Our Team',
  imagenHero: '',
}

export default function AdminHeroForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<HeroBlock>(defaultHero)

  useEffect(() => {
    getHomeBlock('hero')
      .then((raw) => setData({ ...defaultHero, ...(raw as HeroBlock) }))
      .catch(() => setData(defaultHero))
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
      await updateHomeBlock('hero', data as Record<string, unknown>)
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
          <h3 className="text-sm font-heading uppercase tracking-widest text-brand-primary mb-4">
            Español
          </h3>
        </div>
        <AdminInput
          label="Temporada (ES)"
          name="temporadaEs"
          value={data.temporadaEs ?? ''}
          onChange={handleChange}
          placeholder="Temporada 2024 / 2025"
          required
        />
        <AdminInput
          label="Temporada (EN)"
          name="temporadaEn"
          value={data.temporadaEn ?? ''}
          onChange={handleChange}
          placeholder="Season 2024 / 2025"
        />
        <AdminInput
          label="Título (ES)"
          name="tituloEs"
          value={data.tituloEs ?? ''}
          onChange={handleChange}
          placeholder="Patagonia Sin Límites"
          required
        />
        <AdminInput
          label="Título (EN)"
          name="tituloEn"
          value={data.tituloEn ?? ''}
          onChange={handleChange}
          placeholder="Patagonia Without Limits"
        />
        <div className="md:col-span-2">
          <AdminInput
            label="Bajada / Subtítulo (ES)"
            name="subtituloEs"
            as="textarea"
            rows={3}
            value={data.subtituloEs ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <AdminInput
            label="Bajada / Subtítulo (EN)"
            name="subtituloEn"
            as="textarea"
            rows={3}
            value={data.subtituloEn ?? ''}
            onChange={handleChange}
          />
        </div>
        <AdminInput
          label="Botón principal (ES)"
          name="cta1Es"
          value={data.cta1Es ?? ''}
          onChange={handleChange}
          placeholder="Ver Expediciones"
        />
        <AdminInput
          label="Botón principal (EN)"
          name="cta1En"
          value={data.cta1En ?? ''}
          onChange={handleChange}
          placeholder="View Expeditions"
        />
        <AdminInput
          label="Botón secundario (ES)"
          name="cta2Es"
          value={data.cta2Es ?? ''}
          onChange={handleChange}
          placeholder="Nuestro Equipo"
        />
        <AdminInput
          label="Botón secundario (EN)"
          name="cta2En"
          value={data.cta2En ?? ''}
          onChange={handleChange}
          placeholder="Our Team"
        />
        <div className="md:col-span-2">
          <ImageUploader
            label="Imagen de fondo del hero"
            value={data.imagenHero ?? ''}
            onChange={(url) => setData((prev) => ({ ...prev, imagenHero: url }))}
            showSaveReminder
          />
        </div>
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
