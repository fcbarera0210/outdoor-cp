'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import ImageUploader from '@/components/admin/ImageUploader'
import { createPost } from '@/services/blog'

export default function AdminBlogNuevoPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    slug: '',
    titleEs: '',
    titleEn: '',
    excerptEs: '',
    excerptEn: '',
    contentEs: '',
    contentEn: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    authorEs: '',
    authorEn: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createPost({
        slug: formData.slug,
        titleEs: formData.titleEs,
        titleEn: formData.titleEn || formData.titleEs,
        excerptEs: formData.excerptEs,
        excerptEn: formData.excerptEn || formData.excerptEs,
        contentEs: formData.contentEs,
        contentEn: formData.contentEn || formData.contentEs,
        image: formData.image,
        date: formData.date,
        authorEs: formData.authorEs,
        authorEn: formData.authorEn || formData.authorEs,
      })
      router.push('/admin/blog')
    } catch (err) {
      console.error(err)
      alert('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/blog" className="text-brand-primary hover:text-brand-dark dark:hover:text-white transition text-sm font-heading uppercase tracking-wider">
          <i className="fas fa-arrow-left mr-2"></i>
          Volver al Blog
        </Link>
        <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mt-4 mb-2">
          Nuevo Post
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Crea un nuevo artículo para el blog</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 max-w-3xl space-y-8">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} placeholder="mi-nuevo-post" required />
            <AdminInput label="Fecha" name="date" type="date" value={formData.date} onChange={handleChange} required />
          </div>
          <AdminInput label="Título (ES)" name="titleEs" value={formData.titleEs} onChange={handleChange} placeholder="Título del artículo" required />
          <AdminInput label="Título (EN)" name="titleEn" value={formData.titleEn} onChange={handleChange} placeholder="Article title" />
          <AdminInput label="Autor (ES)" name="authorEs" value={formData.authorEs} onChange={handleChange} placeholder="Equipo Cherry" />
          <AdminInput label="Autor (EN)" name="authorEn" value={formData.authorEn} onChange={handleChange} placeholder="Cherry Team" />
          <AdminInput label="Extracto (ES)" name="excerptEs" value={formData.excerptEs} onChange={handleChange} as="textarea" rows={2} placeholder="Breve descripción..." />
          <AdminInput label="Extracto (EN)" name="excerptEn" value={formData.excerptEn} onChange={handleChange} as="textarea" rows={2} placeholder="Short description..." />
          <AdminInput label="Contenido (ES)" name="contentEs" value={formData.contentEs} onChange={handleChange} as="textarea" rows={8} placeholder="Contenido completo..." />
          <AdminInput label="Contenido (EN)" name="contentEn" value={formData.contentEn} onChange={handleChange} as="textarea" rows={8} placeholder="Full content..." />
          <ImageUploader label="Imagen del artículo" value={formData.image} onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))} />
        </div>
        <div className="flex gap-4">
          <AdminButton type="submit" disabled={saving}>
            <i className="fas fa-save"></i>
            {saving ? 'Guardando...' : 'Guardar'}
          </AdminButton>
          <AdminButton href="/admin/blog" variant="secondary">
            Cancelar
          </AdminButton>
        </div>
      </form>
    </div>
  )
}
