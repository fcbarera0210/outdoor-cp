import Link from 'next/link'
import AdminTable from '@/components/admin/AdminTable'
import AdminButton from '@/components/admin/AdminButton'
import { rutas } from '@/data/rutas'

const dificultadColors: Record<string, string> = {
  fácil: 'bg-green-500/20 text-green-800',
  media: 'bg-yellow-500/20 text-yellow-800',
  alta: 'bg-brand-primary/20 text-brand-primary',
}

export default function AdminRutasPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
            Rutas
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gestiona las rutas y expediciones disponibles
          </p>
        </div>
        <AdminButton href="/admin/rutas/nueva">
          <i className="fas fa-plus"></i>
          Nueva Ruta
        </AdminButton>
      </div>

      <AdminTable
        headers={['Nombre', 'Zona', 'Dificultad', 'Duración', 'Acciones']}
      >
        {rutas.map((ruta) => (
          <tr key={ruta.slug} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-4 py-3 font-medium text-brand-dark dark:text-white">{ruta.nombre}</td>
            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{ruta.zona}</td>
            <td className="px-4 py-3">
              <span
                className={`rounded-lg px-2 py-1 text-xs font-medium ${dificultadColors[ruta.dificultad]}`}
              >
                {ruta.dificultad}
              </span>
            </td>
            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{ruta.duracion}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <Link
                  href={`/admin/rutas/${ruta.slug}/editar`}
                  className="rounded-lg px-3 py-1.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white transition text-xs font-heading uppercase"
                >
                  <i className="fas fa-edit mr-1"></i>
                  Editar
                </Link>
                <button
                  type="button"
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
    </div>
  )
}
