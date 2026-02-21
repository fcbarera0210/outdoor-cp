import Link from 'next/link'

const BLOCKS = [
  { type: 'hero', label: 'Hero', description: 'Temporada, título, subtítulo, CTAs e imagen' },
  { type: 'partners', label: 'Partners / Logos', description: 'Lista de partners' },
  { type: 'featuredSection', label: 'Sección Rutas Destacadas', description: 'Títulos de la sección' },
  { type: 'gallerySection', label: 'Sección Galería', description: 'Títulos y enlace' },
  { type: 'gallery', label: 'Galería', description: 'Items de la galería (imagen, título, subtítulo)' },
  { type: 'salidasSection', label: 'Sección Próximas Salidas', description: 'Títulos' },
  { type: 'reserva', label: 'Bloque Reserva', description: 'Título, texto, bullets, labels del formulario' },
]

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
        Configuración Home
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Edita los bloques de contenido de la página de inicio (campos ES/EN).
      </p>

      <Link
        href="/admin/home/secciones"
        className="block p-6 mb-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-brand-primary transition"
      >
        <h2 className="text-lg font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
          Orden y visibilidad de secciones
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Reordena las secciones de la home y muestra u oculta las que quieras (Hero siempre primero).
        </p>
        <span className="inline-block mt-3 text-brand-primary text-sm font-heading uppercase tracking-wider">
          Configurar →
        </span>
      </Link>

      <div className="grid md:grid-cols-2 gap-6">
        {BLOCKS.map((block) => (
          <Link
            key={block.type}
            href={`/admin/home/${block.type}`}
            className="block p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-brand-primary transition"
          >
            <h2 className="text-lg font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
              {block.label}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {block.description}
            </p>
            <span className="inline-block mt-3 text-brand-primary text-sm font-heading uppercase tracking-wider">
              Editar →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
