'use client'

import { useState, useEffect } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import ImageUploader from '@/components/admin/ImageUploader'
import { sileo } from 'sileo'
import { getHomeBlock, updateHomeBlock } from '@/services/home'

export interface PartnerItem {
  nombreEs?: string
  nombreEn?: string
  logo?: string
}

export default function AdminPartnersForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [items, setItems] = useState<PartnerItem[]>([])

  useEffect(() => {
    getHomeBlock('partners')
      .then((raw) => {
        const data = raw as PartnerItem[] | Record<string, unknown>
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.map((p) => ({ nombreEs: (p as PartnerItem).nombreEs ?? '', nombreEn: (p as PartnerItem).nombreEn ?? '', logo: (p as PartnerItem).logo ?? '' })))
        } else {
          setItems([])
        }
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const updateItem = (index: number, patch: Partial<PartnerItem>) => {
    setItems((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], ...patch }
      return next
    })
  }

  const addItem = () => {
    setItems((prev) => [...prev, { nombreEs: '', nombreEn: '', logo: '' }])
  }

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateHomeBlock(
        'partners',
        items.map((p) => ({ nombreEs: p.nombreEs ?? '', nombreEn: p.nombreEn ?? '', logo: p.logo ?? '' }))
      )
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
      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/50 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="font-heading uppercase tracking-widest text-sm text-brand-dark dark:text-gray-300">
                Partner {index + 1}
              </span>
              <AdminButton
                type="button"
                variant="danger"
                onClick={() => removeItem(index)}
              >
                <i className="fas fa-trash"></i>
                Quitar
              </AdminButton>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <AdminInput
                label="Nombre (ES)"
                name={`nombreEs-${index}`}
                value={item.nombreEs ?? ''}
                onChange={(e) => updateItem(index, { nombreEs: e.target.value })}
                placeholder="Nombre de la marca"
              />
              <AdminInput
                label="Nombre (EN)"
                name={`nombreEn-${index}`}
                value={item.nombreEn ?? ''}
                onChange={(e) => updateItem(index, { nombreEn: e.target.value })}
                placeholder="Brand name"
              />
            </div>
            <ImageUploader
              label="Logo"
              value={item.logo ?? ''}
              onChange={(url) => updateItem(index, { logo: url })}
              showSaveReminder
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        <AdminButton type="button" variant="secondary" onClick={addItem}>
          <i className="fas fa-plus"></i>
          Agregar partner
        </AdminButton>
        <AdminButton type="submit" loading={saving}>
          <i className="fas fa-save"></i>
          {saving ? 'Guardando...' : 'Guardar'}
        </AdminButton>
        <AdminButton href="/admin/home" variant="secondary">
          Cancelar
        </AdminButton>
      </div>
    </form>
  )
}
