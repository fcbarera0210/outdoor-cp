'use client'

import { useState } from 'react'
import Link from 'next/link'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import type { Dificultad } from '@/data/rutas'

export default function AdminRutaNuevaPage() {
  const [formData, setFormData] = useState({
    slug: '',
    nombre: '',
    zona: '',
    descripcion: '',
    duracion: '',
    dificultad: 'media' as Dificultad,
    imagen: '',
    itinerario: '',
    equipo: '',
    proximasSalidas: '',
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
      <div className="mb-8">
        <Link
          href="/admin/rutas"
          className="text-brand-primary hover:text-brand-dark dark:hover:text-white transition text-sm font-heading uppercase tracking-wider"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Volver a Rutas
        </Link>
        <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mt-4 mb-2">
          Nueva Ruta
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Crea una nueva ruta o expedición</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 max-w-3xl"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput
              label="Slug (URL)"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="circuito-w"
              required
            />
            <AdminInput
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Circuito W: El Corazón de Paine"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput
              label="Zona"
              name="zona"
              value={formData.zona}
              onChange={handleChange}
              placeholder="Patagonia"
            />
            <AdminInput
              label="Duración"
              name="duracion"
              value={formData.duracion}
              onChange={handleChange}
              placeholder="5 Días / 4 Noches"
            />
          </div>

          <AdminInput
            label="Dificultad"
            name="dificultad"
            value={formData.dificultad}
            onChange={handleChange}
            as="select"
            options={[
              { value: 'fácil', label: 'Fácil' },
              { value: 'media', label: 'Media' },
              { value: 'alta', label: 'Alta' },
            ]}
          />

          <AdminInput
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            as="textarea"
            rows={4}
            placeholder="Descripción de la ruta..."
          />

          <AdminInput
            label="URL de imagen"
            name="imagen"
            type="url"
            value={formData.imagen}
            onChange={handleChange}
            placeholder="https://..."
          />

          <AdminInput
            label="Itinerario (uno por línea)"
            name="itinerario"
            value={formData.itinerario}
            onChange={handleChange}
            as="textarea"
            rows={5}
            placeholder="Día 1: Torres – Valle Ascencio&#10;Día 2: Base Torres – Cuernos&#10;..."
          />

          <AdminInput
            label="Equipo necesario (uno por línea)"
            name="equipo"
            value={formData.equipo}
            onChange={handleChange}
            as="textarea"
            rows={4}
            placeholder="Mochila 40-50L&#10;Bastones trekking&#10;..."
          />

          <AdminInput
            label="Próximas salidas (fecha|tipo por línea)"
            name="proximasSalidas"
            value={formData.proximasSalidas}
            onChange={handleChange}
            as="textarea"
            rows={3}
            placeholder="Ene 15 - 20|5 días&#10;Feb 05 - 10|Full Experience"
          />
        </div>

        <div className="flex gap-4 mt-8">
          <AdminButton type="submit">
            <i className="fas fa-save"></i>
            Guardar
          </AdminButton>
          <AdminButton href="/admin/rutas" variant="secondary">
            Cancelar
          </AdminButton>
        </div>
      </form>
    </div>
  )
}
