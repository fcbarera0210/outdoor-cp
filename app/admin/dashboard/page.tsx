import AdminCard from '@/components/admin/AdminCard'

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
        Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Gestiona el contenido de Cherry Experience
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminCard
          title="Rutas"
          description="Gestiona las rutas y expediciones disponibles"
          href="/admin/rutas"
          icon="fa-route"
        />
        <AdminCard
          title="Blog"
          description="Publica y edita artículos del blog"
          href="/admin/blog"
          icon="fa-newspaper"
        />
        <AdminCard
          title="Configuración Contacto"
          description="Teléfono, email, redes sociales y ubicación"
          href="/admin/contacto"
          icon="fa-address-book"
        />
        <AdminCard
          title="Contenido Equipo"
          description="Instrucciones de trekking y miembros del equipo"
          href="/admin/equipo"
          icon="fa-users"
        />
        <AdminCard
          title="Galería de Imágenes"
          description="Gestiona las imágenes del sitio"
          href="/admin/imagenes"
          icon="fa-images"
        />
      </div>
    </div>
  )
}
