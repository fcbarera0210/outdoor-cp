import Link from 'next/link'
import AdminTable from '@/components/admin/AdminTable'
import AdminButton from '@/components/admin/AdminButton'
import { blogPosts } from '@/data/blog'

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark mb-2">
            Blog
          </h1>
          <p className="text-gray-600">
            Gestiona los artículos del blog
          </p>
        </div>
        <AdminButton href="/admin/blog/nuevo">
          <i className="fas fa-plus"></i>
          Nuevo Post
        </AdminButton>
      </div>

      <AdminTable
        headers={['Título', 'Autor', 'Fecha', 'Acciones']}
      >
        {blogPosts.map((post) => (
          <tr key={post.slug} className="border-t border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-3 font-medium text-brand-dark">{post.title}</td>
            <td className="px-4 py-3 text-gray-600">{post.author}</td>
            <td className="px-4 py-3 text-gray-600">{post.date}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <Link
                  href={`/admin/blog/${post.slug}/editar`}
                  className="px-3 py-1.5 bg-brand-primary/10 text-brand-primary rounded hover:bg-brand-primary hover:text-white transition text-xs font-heading uppercase"
                >
                  <i className="fas fa-edit mr-1"></i>
                  Editar
                </Link>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition text-xs font-heading uppercase"
                >
                  <i className="fas fa-trash mr-1"></i>
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}
