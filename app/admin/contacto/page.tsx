'use client'

import { useState } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'

export default function AdminContactoPage() {
  const [formData, setFormData] = useState({
    telefono: '+56 9 1234 5678',
    email: 'contacto@cherryexperience.cl',
    ubicacion: 'Puerto Varas, Región de Los Lagos, Chile',
    instagram: '#',
    facebook: '#',
    whatsapp: '#',
    youtube: '#',
    mapaEmbed: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Maqueta: no persiste
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
          <AdminInput
            label="Teléfono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+56 9 1234 5678"
          />

          <AdminInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="contacto@cherryexperience.cl"
          />

          <AdminInput
            label="Ubicación"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            placeholder="Puerto Varas, Región de Los Lagos, Chile"
          />

          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-heading font-bold uppercase text-brand-dark dark:text-white mb-4">
              Redes Sociales
            </h3>
            <div className="space-y-4">
              <AdminInput
                label="Instagram URL"
                name="instagram"
                type="url"
                value={formData.instagram}
                onChange={handleChange}
              />
              <AdminInput
                label="Facebook URL"
                name="facebook"
                type="url"
                value={formData.facebook}
                onChange={handleChange}
              />
              <AdminInput
                label="WhatsApp URL"
                name="whatsapp"
                type="url"
                value={formData.whatsapp}
                onChange={handleChange}
              />
              <AdminInput
                label="YouTube URL"
                name="youtube"
                type="url"
                value={formData.youtube}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-heading font-bold uppercase text-brand-dark dark:text-white mb-4">
              Mapa
            </h3>
            <AdminInput
              label="URL o iframe del mapa"
              name="mapaEmbed"
              value={formData.mapaEmbed}
              onChange={handleChange}
              placeholder="Embed de Google Maps u otro servicio"
            />
            <div className="mt-4 aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              <p className="text-gray-500 dark:text-gray-400 font-heading uppercase text-sm">
                Vista previa del mapa
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AdminButton type="submit">
            <i className="fas fa-save"></i>
            Guardar
          </AdminButton>
        </div>
      </form>
    </div>
  )
}
