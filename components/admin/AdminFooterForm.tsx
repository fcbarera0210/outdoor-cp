'use client'

import { useState, useEffect } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import { sileo } from 'sileo'
import { getSettingRaw, updateSetting } from '@/services/settings'
import type { FooterSettings } from '@/services/settings'

const defaultFooter: FooterSettings = {
  taglineEs: 'Expertos en turismo de montaña y conservación.',
  taglineEn: 'Experts in mountain tourism and conservation.',
  copyrightEs: '© 2024 Cherry Experience. Todos los derechos reservados.',
  copyrightEn: '© 2024 Cherry Experience. All rights reserved.',
  privacyTextEs: 'Privacidad',
  privacyTextEn: 'Privacy',
  termsTextEs: 'Términos',
  termsTextEn: 'Terms',
  privacyUrl: '#',
  termsUrl: '#',
  showTagline: true,
  showRecentBlog: true,
  showUsefulInfo: true,
  showInstagram: true,
}

export default function AdminFooterForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<FooterSettings>(defaultFooter)

  useEffect(() => {
    getSettingRaw('footer')
      .then((raw) => setData({ ...defaultFooter, ...raw } as FooterSettings))
      .catch(() => setData(defaultFooter))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSetting('footer', data as unknown as Record<string, unknown>)
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
          <h3 className="text-sm font-heading uppercase tracking-widest text-brand-primary mb-2">
            Textos (ES / EN)
          </h3>
        </div>
        <div className="md:col-span-2">
          <AdminInput
            label="Tagline (ES)"
            name="taglineEs"
            as="textarea"
            rows={2}
            value={data.taglineEs ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <AdminInput
            label="Tagline (EN)"
            name="taglineEn"
            as="textarea"
            rows={2}
            value={data.taglineEn ?? ''}
            onChange={handleChange}
          />
        </div>
        <AdminInput
          label="Derechos reservados (ES)"
          name="copyrightEs"
          value={data.copyrightEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Derechos reservados (EN)"
          name="copyrightEn"
          value={data.copyrightEn ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Texto enlace Privacidad (ES)"
          name="privacyTextEs"
          value={data.privacyTextEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Texto enlace Privacidad (EN)"
          name="privacyTextEn"
          value={data.privacyTextEn ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Texto enlace Términos (ES)"
          name="termsTextEs"
          value={data.termsTextEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Texto enlace Términos (EN)"
          name="termsTextEn"
          value={data.termsTextEn ?? ''}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <h3 className="text-sm font-heading uppercase tracking-widest text-brand-primary mt-6 mb-2">
            URLs
          </h3>
        </div>
        <AdminInput
          label="URL Privacidad"
          name="privacyUrl"
          type="text"
          value={data.privacyUrl ?? ''}
          onChange={handleChange}
          placeholder="# o https://..."
        />
        <AdminInput
          label="URL Términos y condiciones"
          name="termsUrl"
          type="text"
          value={data.termsUrl ?? ''}
          onChange={handleChange}
          placeholder="# o https://..."
        />
        <div className="md:col-span-2">
          <h3 className="text-sm font-heading uppercase tracking-widest text-brand-primary mt-6 mb-2">
            Mostrar u ocultar columnas del footer
          </h3>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="showTagline"
            checked={data.showTagline !== false}
            onChange={handleChange}
            className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm text-brand-dark dark:text-gray-200">Columna 1: Logo + tagline + redes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="showRecentBlog"
            checked={data.showRecentBlog !== false}
            onChange={handleChange}
            className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm text-brand-dark dark:text-gray-200">Blog reciente</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="showUsefulInfo"
            checked={data.showUsefulInfo !== false}
            onChange={handleChange}
            className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm text-brand-dark dark:text-gray-200">Info útil</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="showInstagram"
            checked={data.showInstagram !== false}
            onChange={handleChange}
            className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm text-brand-dark dark:text-gray-200">Instagram (grid fotos)</span>
        </label>
      </div>
      <div className="flex gap-4">
        <AdminButton type="submit" loading={saving}>
          <i className="fas fa-save"></i>
          {saving ? 'Guardando...' : 'Guardar'}
        </AdminButton>
        <AdminButton href="/admin/dashboard" variant="secondary">
          Volver
        </AdminButton>
      </div>
    </form>
  )
}
