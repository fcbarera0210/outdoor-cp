'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import { getRutaBySlugForAdmin, updateRuta } from '@/services/rutas'
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
    dificultad: 'media' as Dificultad,
    imagen: '',
    destacada: false,
    itinerarioEs: '',
    itinerarioEn: '',
    equipoEs: '',
    equipoEn: '',
    proximasSalidas: '',
  })

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
          itinerarioEs: (ruta.itinerarios ?? []).map((i) => i.textoEs).join('\n'),
          itinerarioEn: (ruta.itinerarios ?? []).map((i) => i.textoEn).join('\n'),
          equipoEs: (ruta.equipos ?? []).map((e) => e.textoEs).join('\n'),
          equipoEn: (ruta.equipos ?? []).map((e) => e.textoEn).join('\n'),
          proximasSalidas: (ruta.proximasSalidas ?? []).map((s) => `${s.fecha}|${s.tipoEs ?? s.tipoEn ?? ''}`).join('\n'),
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
      const linesEs = formData.itinerarioEs.split('\n').filter(Boolean)
      const linesEn = formData.itinerarioEn.split('\n').filter(Boolean)
      const maxIt = Math.max(linesEs.length, linesEn.length)
      const itinerario = Array.from({ length: maxIt }, (_, i) => ({
        textoEs: linesEs[i] ?? '',
        textoEn: linesEn[i] ?? '',
        orden: i,
      }))
      const eqEs = formData.equipoEs.split('\n').filter(Boolean)
      const eqEn = formData.equipoEn.split('\n').filter(Boolean)
      const maxEq = Math.max(eqEs.length, eqEn.length)
      const equipo = Array.from({ length: maxEq }, (_, i) => ({
        textoEs: eqEs[i] ?? '',
        textoEn: eqEn[i] ?? '',
        orden: i,
      }))
      const proximasSalidas = formData.proximasSalidas.split('\n').filter(Boolean).map((line, i) => {
        const [fecha, tipo] = line.split('|')
        return { fecha: (fecha ?? '').trim(), tipoEs: (tipo ?? '').trim(), tipoEn: (tipo ?? '').trim(), orden: i }
      })
      await updateRuta(formData.slug, {
        slug: formData.slug,
        nombreEs: formData.nombreEs,
        nombreEn: formData.nombreEn,
        zonaEs: formData.zonaEs,
        zonaEn: formData.zonaEn,
        descripcionEs: formData.descripcionEs,
        descripcionEn: formData.descripcionEn,
        duracionEs: formData.duracionEs,
        duracionEn: formData.duracionEn,
        dificultad: formData.dificultad,
        imagen: formData.imagen,
        destacada: formData.destacada,
        itinerario,
        equipo,
        proximasSalidas,
      })
      if (formData.slug !== slug) {
        window.location.href = `/admin/rutas/${formData.slug}/editar`
      }
    } catch (err) {
      console.error(err)
      alert('Error al guardar')
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
            <AdminInput label="Duración (ES)" name="duracionEs" value={formData.duracionEs} onChange={handleChange} />
            <AdminInput label="Duración (EN)" name="duracionEn" value={formData.duracionEn} onChange={handleChange} />
          </div>
          <AdminInput label="Dificultad" name="dificultad" value={formData.dificultad} onChange={handleChange} as="select" options={[{ value: 'fácil', label: 'Fácil' }, { value: 'media', label: 'Media' }, { value: 'alta', label: 'Alta' }]} />
          <AdminInput label="Descripción (ES)" name="descripcionEs" value={formData.descripcionEs} onChange={handleChange} as="textarea" rows={4} />
          <AdminInput label="Descripción (EN)" name="descripcionEn" value={formData.descripcionEn} onChange={handleChange} as="textarea" rows={4} />
          <AdminInput label="URL de imagen" name="imagen" type="url" value={formData.imagen} onChange={handleChange} />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="destacada" checked={formData.destacada} onChange={handleChange} className="rounded border-gray-300" />
            <span className="text-sm font-heading uppercase text-brand-dark dark:text-white">Destacada</span>
          </label>
          <AdminInput label="Itinerario (ES, uno por línea)" name="itinerarioEs" value={formData.itinerarioEs} onChange={handleChange} as="textarea" rows={5} />
          <AdminInput label="Itinerario (EN, uno por línea)" name="itinerarioEn" value={formData.itinerarioEn} onChange={handleChange} as="textarea" rows={5} />
          <AdminInput label="Equipo (ES, uno por línea)" name="equipoEs" value={formData.equipoEs} onChange={handleChange} as="textarea" rows={4} />
          <AdminInput label="Equipo (EN, uno por línea)" name="equipoEn" value={formData.equipoEn} onChange={handleChange} as="textarea" rows={4} />
          <AdminInput label="Próximas salidas (fecha|tipo por línea)" name="proximasSalidas" value={formData.proximasSalidas} onChange={handleChange} as="textarea" rows={3} />
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
