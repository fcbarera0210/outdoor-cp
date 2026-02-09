'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import { getRutaBySlug } from '@/data/rutas'
import type { Dificultad } from '@/data/rutas'

export default function AdminRutaEditarPage() {
  const params = useParams()
  const slug = params.slug as string
  const ruta = getRutaBySlug(slug)

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

  useEffect(() => {
    if (ruta) {
      setFormData({
        slug: ruta.slug,
        nombre: ruta.nombre,
        zona: ruta.zona,
        descripcion: ruta.descripcion,
        duracion: ruta.duracion,
        dificultad: ruta.dificultad,
        imagen: ruta.imagen,
        itinerario: ruta.itinerario.join('\n'),
        equipo: ruta.equipo.join('\n'),
        proximasSalidas: ruta.proximasSalidas.map((s) => `${s.fecha}|${s.tipo}`).join('\n'),
      })
    }
  }, [ruta])

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

  if (!ruta) {
    return (
      <div>
        <p className="text-gray-600">Ruta no encontrada</p>
        <Link href="/admin/rutas" className="text-brand-primary hover:underline mt-4 inline-block">
          Volver a Rutas
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/rutas"
          className="text-brand-primary hover:text-brand-dark transition text-sm font-heading uppercase tracking-wider"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Volver a Rutas
        </Link>
        <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark mt-4 mb-2">
          Editar Ruta
        </h1>
        <p className="text-gray-600">Editando: {ruta.nombre}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-gray-200 rounded-lg p-8 max-w-3xl"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput
              label="Slug (URL)"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
            <AdminInput
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput
              label="Zona"
              name="zona"
              value={formData.zona}
              onChange={handleChange}
            />
            <AdminInput
              label="Duración"
              name="duracion"
              value={formData.duracion}
              onChange={handleChange}
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
          />

          <AdminInput
            label="URL de imagen"
            name="imagen"
            type="url"
            value={formData.imagen}
            onChange={handleChange}
          />

          <AdminInput
            label="Itinerario (uno por línea)"
            name="itinerario"
            value={formData.itinerario}
            onChange={handleChange}
            as="textarea"
            rows={5}
          />

          <AdminInput
            label="Equipo necesario (uno por línea)"
            name="equipo"
            value={formData.equipo}
            onChange={handleChange}
            as="textarea"
            rows={4}
          />

          <AdminInput
            label="Próximas salidas (fecha|tipo por línea)"
            name="proximasSalidas"
            value={formData.proximasSalidas}
            onChange={handleChange}
            as="textarea"
            rows={3}
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
