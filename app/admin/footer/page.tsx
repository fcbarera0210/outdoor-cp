'use client'

import AdminFooterForm from '@/components/admin/AdminFooterForm'

export default function AdminFooterPage() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
        Configuración del Footer
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Textos del pie de página, derechos reservados, enlaces de privacidad y términos. Puedes mostrar u ocultar cada columna.
      </p>
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-6">
        <AdminFooterForm />
      </div>
    </div>
  )
}
