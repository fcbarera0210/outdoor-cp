'use client'

import AdminButton from '@/components/admin/AdminButton'

export default function AdminImagenesPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark mb-2">
            Galería de Imágenes
          </h1>
          <p className="text-gray-600">
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
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:border-brand-primary/50 transition cursor-pointer"
          >
            <i className="fas fa-image text-4xl text-gray-400 mb-2"></i>
            <span className="text-xs font-heading uppercase text-gray-500">
              Imagen {i}
            </span>
            <span className="text-[10px] text-gray-400 mt-1">placeholder</span>
          </div>
        ))}
        {/* Add new card */}
        <div className="aspect-square border-2 border-dashed border-brand-primary/50 rounded-lg flex flex-col items-center justify-center bg-brand-primary/5 hover:bg-brand-primary/10 transition cursor-pointer">
          <i className="fas fa-plus text-2xl text-brand-primary mb-2"></i>
          <span className="text-xs font-heading uppercase text-brand-primary">
            Subir imagen
          </span>
        </div>
      </div>

      <div className="mt-12 p-6 bg-white border-2 border-gray-200 rounded-lg">
        <p className="text-gray-500 text-sm text-center">
          Galería mockup. La funcionalidad de subir y gestionar imágenes se implementará en una fase posterior.
        </p>
      </div>
    </div>
  )
}
