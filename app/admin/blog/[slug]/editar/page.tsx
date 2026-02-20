'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import ImageUploader from '@/components/admin/ImageUploader'
import { getPostBySlugForAdmin, updatePost } from '@/services/blog'

export default function AdminBlogEditarPage() {
  const params = useParams()
  const slug = params.slug as string
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
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
    date: '',
    authorEs: '',
    authorEn: '',
  })

  useEffect(() => {
    getPostBySlugForAdmin(slug)
      .then((post) => {
        if (!post) {
          setNotFound(true)
          return
        }
        setFormData({
          slug: post.slug,
          titleEs: post.titleEs ?? '',
          titleEn: post.titleEn ?? '',
          excerptEs: post.excerptEs ?? '',
          excerptEn: post.excerptEn ?? '',
          contentEs: post.contentEs ?? '',
          contentEn: post.contentEn ?? '',
          image: post.image ?? '',
          date: post.date ?? '',
          authorEs: post.authorEs ?? '',
          authorEn: post.authorEn ?? '',
        })
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updatePost(formData.slug, {
        slug: formData.slug,
        titleEs: formData.titleEs,
        titleEn: formData.titleEn,
        excerptEs: formData.excerptEs,
        excerptEn: formData.excerptEn,
        contentEs: formData.contentEs,
        contentEn: formData.contentEn,
        image: formData.image,
        date: formData.date,
        authorEs: formData.authorEs,
        authorEn: formData.authorEn,
      })
      if (formData.slug !== slug) {
        window.location.href = `/admin/blog/${formData.slug}/editar`
      }
    } catch (err) {
      console.error(err)
      alert('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
  if (notFound) {
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
        <Link href="/admin/blog" className="text-brand-primary hover:text-brand-dark dark:hover:text-white transition text-sm font-heading uppercase tracking-wider">
          <i className="fas fa-arrow-left mr-2"></i>
          Volver al Blog
        </Link>
        <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mt-4 mb-2">
          Editar Post
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Editando: {formData.titleEs || formData.slug}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 max-w-3xl space-y-8">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <AdminInput label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} required />
            <AdminInput label="Fecha" name="date" type="date" value={formData.date} onChange={handleChange} required />
          </div>
          <AdminInput label="Título (ES)" name="titleEs" value={formData.titleEs} onChange={handleChange} required />
          <AdminInput label="Título (EN)" name="titleEn" value={formData.titleEn} onChange={handleChange} />
          <AdminInput label="Autor (ES)" name="authorEs" value={formData.authorEs} onChange={handleChange} />
          <AdminInput label="Autor (EN)" name="authorEn" value={formData.authorEn} onChange={handleChange} />
          <AdminInput label="Extracto (ES)" name="excerptEs" value={formData.excerptEs} onChange={handleChange} as="textarea" rows={2} />
          <AdminInput label="Extracto (EN)" name="excerptEn" value={formData.excerptEn} onChange={handleChange} as="textarea" rows={2} />
          <AdminInput label="Contenido (ES)" name="contentEs" value={formData.contentEs} onChange={handleChange} as="textarea" rows={8} />
          <AdminInput label="Contenido (EN)" name="contentEn" value={formData.contentEn} onChange={handleChange} as="textarea" rows={8} />
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
