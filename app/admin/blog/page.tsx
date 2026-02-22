'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminTable from '@/components/admin/AdminTable'
import AdminButton from '@/components/admin/AdminButton'
import { sileo } from 'sileo'
import { useConfirm } from '@/components/admin/AdminConfirmContext'
import { getBlogPosts, deletePost } from '@/services/blog'
import type { BlogPost } from '@/services/blog'

export default function AdminBlogPage() {
  const confirm = useConfirm()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts('es')
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (slug: string) => {
    const ok = await confirm({
      title: 'Eliminar post',
      message: '¿Eliminar este post?',
      confirmLabel: 'Eliminar',
    })
    if (!ok) return
    try {
      await deletePost(slug)
      setPosts((prev) => prev.filter((p) => p.slug !== slug))
      sileo.success({ title: 'Post eliminado' })
    } catch (e) {
      console.error(e)
      sileo.error({ title: 'Error al eliminar' })
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
            Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gestiona los artículos del blog
          </p>
        </div>
        <AdminButton href="/admin/blog/nuevo">
          <i className="fas fa-plus"></i>
          Nuevo Post
        </AdminButton>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
      ) : (
        <AdminTable headers={['Título', 'Autor', 'Fecha', 'Acciones']}>
          {posts.map((post) => (
            <tr key={post.slug} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-3 font-medium text-brand-dark dark:text-white">{post.title}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{post.author}</td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{post.date}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link
                    href={`/admin/blog/${post.slug}/editar`}
                    className="rounded-lg px-3 py-1.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white transition text-xs font-heading uppercase"
                  >
                    <i className="fas fa-edit mr-1"></i>
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.slug)}
                    className="rounded-lg px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition text-xs font-heading uppercase"
                  >
                    <i className="fas fa-trash mr-1"></i>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  )
}
