'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import ImageUploader from '@/components/admin/ImageUploader'
import { createRuta } from '@/services/rutas'
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
    dificultad: 'media' as Dificultad,
    imagen: '',
    destacada: false,
    itinerarioEs: '',
    itinerarioEn: '',
    equipoEs: '',
    equipoEn: '',
    proximasSalidas: '',
  })

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
      const itinerario = formData.itinerarioEs.split('\n').filter(Boolean).map((textoEs, i) => ({
        textoEs,
        textoEn: (formData.itinerarioEn.split('\n').filter(Boolean)[i] ?? ''),
        orden: i,
      }))
      if (formData.itinerarioEn && !itinerario.length) {
        formData.itinerarioEn.split('\n').filter(Boolean).forEach((textoEn, i) => {
          if (!itinerario[i]) itinerario.push({ textoEs: '', textoEn, orden: i })
        })
      }
      const equipo = formData.equipoEs.split('\n').filter(Boolean).map((textoEs, i) => ({
        textoEs,
        textoEn: (formData.equipoEn.split('\n').filter(Boolean)[i] ?? ''),
        orden: i,
      }))
      const proximasSalidas = formData.proximasSalidas.split('\n').filter(Boolean).map((line, i) => {
        const [fecha, tipo] = line.split('|')
        return { fecha: (fecha ?? '').trim(), tipoEs: (tipo ?? '').trim(), tipoEn: (tipo ?? '').trim(), orden: i }
      })
      await createRuta({
        slug: formData.slug,
        nombreEs: formData.nombreEs,
        nombreEn: formData.nombreEn || formData.nombreEs,
        zonaEs: formData.zonaEs,
        zonaEn: formData.zonaEn || formData.zonaEs,
        descripcionEs: formData.descripcionEs,
        descripcionEn: formData.descripcionEn || formData.descripcionEs,
        duracionEs: formData.duracionEs,
        duracionEn: formData.duracionEn || formData.duracionEs,
        dificultad: formData.dificultad,
        imagen: formData.imagen,
        destacada: formData.destacada,
        itinerario,
        equipo,
        proximasSalidas,
      })
      router.push('/admin/rutas')
    } catch (err) {
      console.error(err)
      alert('Error al guardar')
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
            <AdminInput label="Duración (ES)" name="duracionEs" value={formData.duracionEs} onChange={handleChange} placeholder="5 Días / 4 Noches" />
            <AdminInput label="Duración (EN)" name="duracionEn" value={formData.duracionEn} onChange={handleChange} placeholder="5 Days / 4 Nights" />
          </div>
          <AdminInput label="Dificultad" name="dificultad" value={formData.dificultad} onChange={handleChange} as="select" options={[{ value: 'fácil', label: 'Fácil' }, { value: 'media', label: 'Media' }, { value: 'alta', label: 'Alta' }]} />
          <div>
            <AdminInput label="Descripción (ES)" name="descripcionEs" value={formData.descripcionEs} onChange={handleChange} as="textarea" rows={4} placeholder="Descripción..." />
            <AdminInput label="Descripción (EN)" name="descripcionEn" value={formData.descripcionEn} onChange={handleChange} as="textarea" rows={4} placeholder="Description..." className="mt-2" />
          </div>
          <ImageUploader label="Imagen de la ruta" value={formData.imagen} onChange={(url) => setFormData((prev) => ({ ...prev, imagen: url }))} />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="destacada" checked={formData.destacada} onChange={handleChange} className="rounded border-gray-300" />
            <span className="text-sm font-heading uppercase text-brand-dark dark:text-white">Destacada (aparece en home)</span>
          </label>
          <AdminInput label="Itinerario (ES, uno por línea)" name="itinerarioEs" value={formData.itinerarioEs} onChange={handleChange} as="textarea" rows={5} placeholder="Día 1: ..." />
          <AdminInput label="Itinerario (EN, uno por línea)" name="itinerarioEn" value={formData.itinerarioEn} onChange={handleChange} as="textarea" rows={5} placeholder="Day 1: ..." />
          <AdminInput label="Equipo (ES, uno por línea)" name="equipoEs" value={formData.equipoEs} onChange={handleChange} as="textarea" rows={4} placeholder="Mochila 40-50L" />
          <AdminInput label="Equipo (EN, uno por línea)" name="equipoEn" value={formData.equipoEn} onChange={handleChange} as="textarea" rows={4} placeholder="40-50L backpack" />
          <AdminInput label="Próximas salidas (fecha|tipo por línea)" name="proximasSalidas" value={formData.proximasSalidas} onChange={handleChange} as="textarea" rows={3} placeholder="Ene 15 - 20|5 días" />
        </div>
        <div className="flex gap-4">
          <AdminButton type="submit" disabled={saving}>
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
