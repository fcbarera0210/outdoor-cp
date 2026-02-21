'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminButton from '@/components/admin/AdminButton'
import { sileo } from 'sileo'
import { getSettingRaw, updateSetting } from '@/services/settings'
import type { HomeSectionsSettings } from '@/services/settings'

const SECTION_TYPES = [
  { id: 'partners', label: 'Partners / Logos' },
  { id: 'featuredSection', label: 'Rutas Destacadas' },
  { id: 'gallery', label: 'Galería' },
  { id: 'salidasSection', label: 'Próximas Salidas' },
  { id: 'reserva', label: 'Bloque Reserva' },
] as const

const DEFAULT_ORDER = SECTION_TYPES.map((s) => s.id)
const DEFAULT_VISIBILITY = Object.fromEntries(SECTION_TYPES.map((s) => [s.id, true])) as Record<string, boolean>

export default function AdminHomeSeccionesPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER)
  const [visibility, setVisibility] = useState<Record<string, boolean>>(DEFAULT_VISIBILITY)

  useEffect(() => {
    getSettingRaw('homeSections')
      .then((raw) => {
        const data = raw as HomeSectionsSettings
        if (Array.isArray(data?.order) && data.order.length > 0) {
          setOrder(data.order.filter((id) => SECTION_TYPES.some((s) => s.id === id)))
        }
        if (data?.visibility && typeof data.visibility === 'object') {
          setVisibility((prev) => ({ ...prev, ...data.visibility }))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const moveUp = (index: number) => {
    if (index <= 0) return
    setOrder((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  const moveDown = (index: number) => {
    if (index >= order.length - 1) return
    setOrder((prev) => {
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }

  const toggleVisibility = (id: string) => {
    setVisibility((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateSetting('homeSections', { order, visibility })
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

  const labelById = Object.fromEntries(SECTION_TYPES.map((s) => [s.id, s.label]))

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
          Orden y visibilidad de secciones
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          El Hero siempre aparece primero. Reordena el resto y marca qué secciones mostrar u ocultar.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-6 space-y-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <strong>Hero</strong> (siempre primero) — no se puede reordenar.
        </div>
        {order.map((id, index) => (
          <div
            key={id}
            className="flex flex-wrap items-center justify-between gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-heading font-bold text-brand-dark dark:text-white">
                {index + 1}.
              </span>
              <span className="font-heading uppercase tracking-wider text-brand-dark dark:text-gray-200">
                {labelById[id] ?? id}
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibility[id] !== false}
                  onChange={() => toggleVisibility(id)}
                  className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Visible</span>
              </label>
            </div>
            <div className="flex gap-2">
              <AdminButton
                type="button"
                variant="secondary"
                onClick={() => moveUp(index)}
                disabled={index === 0}
              >
                <i className="fas fa-arrow-up"></i>
              </AdminButton>
              <AdminButton
                type="button"
                variant="secondary"
                onClick={() => moveDown(index)}
                disabled={index === order.length - 1}
              >
                <i className="fas fa-arrow-down"></i>
              </AdminButton>
            </div>
          </div>
        ))}
        <div className="flex gap-4 pt-4">
          <AdminButton type="button" onClick={handleSave} loading={saving}>
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
