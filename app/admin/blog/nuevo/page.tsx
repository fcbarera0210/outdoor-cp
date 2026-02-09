'use client'

import { useState } from 'react'
import Link from 'next/link'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'

export default function AdminBlogNuevoPage() {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    author: '',
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
          href="/admin/blog"
          className="text-brand-primary hover:text-brand-dark transition text-sm font-heading uppercase tracking-wider"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Volver al Blog
        </Link>
        <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark mt-4 mb-2">
          Nuevo Post
        </h1>
        <p className="text-gray-600">Crea un nuevo artículo para el blog</p>
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
              placeholder="mi-nuevo-post"
              required
            />
            <AdminInput
              label="Fecha"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <AdminInput
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título del artículo"
            required
          />

          <AdminInput
            label="Autor"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Equipo Cherry"
          />

          <AdminInput
            label="Extracto"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            as="textarea"
            rows={2}
            placeholder="Breve descripción para la vista previa..."
          />

          <AdminInput
            label="Contenido"
            name="content"
            value={formData.content}
            onChange={handleChange}
            as="textarea"
            rows={8}
            placeholder="Contenido completo del artículo..."
          />

          <AdminInput
            label="URL de imagen"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="flex gap-4 mt-8">
          <AdminButton type="submit">
            <i className="fas fa-save"></i>
            Guardar
          </AdminButton>
          <AdminButton href="/admin/blog" variant="secondary">
            Cancelar
          </AdminButton>
        </div>
      </form>
    </div>
  )
}
