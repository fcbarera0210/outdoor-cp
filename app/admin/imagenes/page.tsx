'use client'

import AdminButton from '@/components/admin/AdminButton'

export default function AdminImagenesPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
            Galería de Imágenes
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gestiona las imágenes del sitio
          </p>
        </div>
        <AdminButton>
          <i className="fas fa-plus"></i>
          Agregar Imagen
        </AdminButton>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Placeholder cards */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 hover:border-brand-primary/50 transition cursor-pointer"
          >
            <i className="fas fa-image text-4xl text-gray-400 dark:text-gray-500 mb-2"></i>
            <span className="text-xs font-heading uppercase text-gray-500 dark:text-gray-400">
              Imagen {i}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">placeholder</span>
          </div>
        ))}
        {/* Add new card */}
        <div className="aspect-square border-2 border-dashed border-brand-primary/50 rounded-lg flex flex-col items-center justify-center bg-brand-primary/5 dark:bg-brand-primary/10 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition cursor-pointer">
          <i className="fas fa-plus text-2xl text-brand-primary mb-2"></i>
          <span className="text-xs font-heading uppercase text-brand-primary">
            Subir imagen
          </span>
        </div>
      </div>

      <div className="mt-12 p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          Galería mockup. La funcionalidad de subir y gestionar imágenes se implementará en una fase posterior.
        </p>
      </div>
    </div>
  )
}
