'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import { getPostBySlug } from '@/data/blog'

export default function AdminBlogEditarPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = getPostBySlug(slug)

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    image: '',
    date: '',
    author: '',
  })

  useEffect(() => {
    if (post) {
      setFormData({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        date: post.date,
        author: post.author,
      })
    }
  }, [post])

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

  if (!post) {
    return (
      <div>
        <p className="text-gray-600 dark:text-gray-300">Post no encontrado</p>
        <Link href="/admin/blog" className="text-brand-primary hover:underline dark:hover:text-white mt-4 inline-block">
          Volver al Blog
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/blog"
          className="text-brand-primary hover:text-brand-dark dark:hover:text-white transition text-sm font-heading uppercase tracking-wider"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Volver al Blog
        </Link>
        <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mt-4 mb-2">
          Editar Post
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Editando: {post.title}</p>
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
            required
          />

          <AdminInput
            label="Autor"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />

          <AdminInput
            label="Extracto"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            as="textarea"
            rows={2}
          />

          <AdminInput
            label="Contenido"
            name="content"
            value={formData.content}
            onChange={handleChange}
            as="textarea"
            rows={8}
          />

          <AdminInput
            label="URL de imagen"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
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
