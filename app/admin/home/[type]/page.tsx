'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import AdminButton from '@/components/admin/AdminButton'
import { getHomeBlock, updateHomeBlock } from '@/services/home'

const TYPE_LABELS: Record<string, string> = {
  hero: 'Hero',
  partners: 'Partners',
  featuredSection: 'Rutas Destacadas',
  gallerySection: 'Sección Galería',
  gallery: 'Galería',
  salidasSection: 'Próximas Salidas',
  reserva: 'Bloque Reserva',
}

export default function AdminHomeBlockPage() {
  const params = useParams()
  const type = params.type as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [json, setJson] = useState('{}')
  const [error, setError] = useState('')

  useEffect(() => {
    getHomeBlock(type)
      .then((data) => setJson(JSON.stringify(data, null, 2)))
      .catch(() => setJson('{}'))
      .finally(() => setLoading(false))
  }, [type])

  const handleSave = async () => {
    setError('')
    let parsed: Record<string, unknown>
    try {
      parsed = JSON.parse(json)
    } catch {
      setError('JSON no válido')
      return
    }
    setSaving(true)
    try {
      await updateHomeBlock(type, parsed)
      alert('Guardado correctamente')
    } catch (err) {
      console.error(err)
      setError('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/home"
          className="text-brand-primary hover:text-brand-dark dark:hover:text-white transition text-sm font-heading uppercase tracking-wider"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Volver a Home
        </Link>
        <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mt-4 mb-2">
          {TYPE_LABELS[type] ?? type}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Edita el JSON del bloque. Usa campos con sufijo Es/En para español e inglés.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-6">
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="w-full h-[60vh] font-mono text-sm p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-brand-dark dark:text-white"
          spellCheck={false}
        />
        <div className="flex gap-4 mt-4">
          <AdminButton type="button" onClick={handleSave} disabled={saving}>
            <i className="fas fa-save"></i>
            {saving ? 'Guardando...' : 'Guardar'}
          </AdminButton>
          <AdminButton href="/admin/home" variant="secondary">
            Cancelar
          </AdminButton>
        </div>
      </div>
    </div>
  )
}
