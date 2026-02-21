'use client'

import { useState, useEffect } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import { sileo } from 'sileo'
import { getSettingRaw, updateSetting } from '@/services/settings'

export default function AdminContactoPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    telefono: '+56 9 1234 5678',
    email: 'contacto@cherryexperience.cl',
    ubicacionEs: 'Puerto Varas, Región de Los Lagos, Chile',
    ubicacionEn: 'Puerto Varas, Los Lagos Region, Chile',
    instagram: '',
    facebook: '',
    whatsapp: '',
    youtube: '',
    mapaEmbed: '',
  })

  useEffect(() => {
    getSettingRaw('contacto')
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          telefono: String(data.telefono ?? prev.telefono),
          email: String(data.email ?? prev.email),
          ubicacionEs: String(data.ubicacionEs ?? data.ubicacion ?? prev.ubicacionEs),
          ubicacionEn: String(data.ubicacionEn ?? prev.ubicacionEn),
          instagram: String(data.instagram ?? ''),
          facebook: String(data.facebook ?? ''),
          whatsapp: String(data.whatsapp ?? ''),
          youtube: String(data.youtube ?? ''),
          mapaEmbed: String(data.mapaEmbed ?? ''),
        }))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSetting('contacto', formData)
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
    <div>
      <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
        Configuración de Contacto
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Datos de contacto, ubicación y redes sociales
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 max-w-2xl"
      >
        <div className="space-y-6">
          <AdminInput label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} placeholder="+56 9 1234 5678" />
          <AdminInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contacto@cherryexperience.cl" />
          <AdminInput label="Ubicación (ES)" name="ubicacionEs" value={formData.ubicacionEs} onChange={handleChange} placeholder="Puerto Varas, Región de Los Lagos, Chile" />
          <AdminInput label="Ubicación (EN)" name="ubicacionEn" value={formData.ubicacionEn} onChange={handleChange} placeholder="Puerto Varas, Los Lagos Region, Chile" />

          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-heading font-bold uppercase text-brand-dark dark:text-white mb-4">
              Redes Sociales
            </h3>
            <div className="space-y-4">
              <AdminInput label="Instagram URL" name="instagram" type="url" value={formData.instagram} onChange={handleChange} />
              <AdminInput label="Facebook URL" name="facebook" type="url" value={formData.facebook} onChange={handleChange} />
              <AdminInput label="WhatsApp URL" name="whatsapp" type="url" value={formData.whatsapp} onChange={handleChange} />
              <AdminInput label="YouTube URL" name="youtube" type="url" value={formData.youtube} onChange={handleChange} />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-heading font-bold uppercase text-brand-dark dark:text-white mb-4">
              Mapa
            </h3>
            <AdminInput label="URL o iframe del mapa" name="mapaEmbed" value={formData.mapaEmbed} onChange={handleChange} placeholder="Embed de Google Maps u otro servicio" />
          </div>
        </div>

        <div className="mt-8">
          <AdminButton type="submit" loading={saving}>
            <i className="fas fa-save"></i>
            {saving ? 'Guardando...' : 'Guardar'}
          </AdminButton>
        </div>
      </form>
    </div>
  )
}
