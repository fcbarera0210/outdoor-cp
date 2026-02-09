import { notFound } from 'next/navigation'
import Link from 'next/link'
import HeroCompact from '@/components/ui/HeroCompact'
import { getRutaBySlug } from '@/data/rutas'

const dificultadColors: Record<string, string> = {
  fácil: 'bg-green-500/20 text-green-800',
  media: 'bg-yellow-500/20 text-yellow-800',
  alta: 'bg-brand-primary/20 text-brand-primary',
}

export default function RutaDetailPage({ params }: { params: { slug: string } }) {
  const ruta = getRutaBySlug(params.slug)
  if (!ruta) notFound()

  return (
    <div>
      <HeroCompact
        title={ruta.nombre}
        subtitle={`${ruta.zona} • ${ruta.duracion}`}
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Rutas', href: '/rutas' },
          { label: ruta.nombre },
        ]}
      />
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <img
              src={ruta.imagen}
              alt={ruta.nombre}
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-8">
            <span className={`px-4 py-2 rounded font-heading uppercase text-sm font-bold ${dificultadColors[ruta.dificultad]}`}>
              Dificultad: {ruta.dificultad}
            </span>
            <span className="px-4 py-2 bg-brand-dark/10 text-brand-dark rounded font-heading uppercase text-sm font-bold">
              <i className="far fa-clock mr-2"></i> {ruta.duracion}
            </span>
            <span className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded font-heading uppercase text-sm font-bold">
              <i className="fas fa-map-marker-alt mr-2"></i> {ruta.zona}
            </span>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">{ruta.descripcion}</p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-heading font-bold uppercase text-brand-dark mb-6 border-b-2 border-brand-primary pb-2">
                Itinerario
              </h3>
              <ul className="space-y-3">
                {ruta.itinerario.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <i className="fas fa-check text-brand-primary"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold uppercase text-brand-dark mb-6 border-b-2 border-brand-primary pb-2">
                Equipo Recomendado
              </h3>
              <ul className="space-y-3">
                {ruta.equipo.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <i className="fas fa-backpack text-brand-primary"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-heading font-bold uppercase text-brand-dark mb-6 border-b-2 border-brand-primary pb-2">
              Próximas Salidas
            </h3>
            <div className="space-y-4">
              {ruta.proximasSalidas.map((salida, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-brand-light border-2 border-gray-200 hover:border-brand-primary rounded-lg p-4 transition"
                >
                  <span className="font-heading font-bold text-brand-dark">{salida.fecha}</span>
                  <span className="text-sm text-brand-earth">{salida.tipo}</span>
                  <Link
                    href={`/reserva?ruta=${ruta.slug}`}
                    className="bg-brand-primary text-white px-6 py-2 rounded font-heading uppercase text-xs font-bold hover:bg-brand-dark transition"
                  >
                    Reservar
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/reserva?ruta=${ruta.slug}`}
              className="inline-flex justify-center items-center bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase text-sm tracking-widest px-10 py-4 transition duration-300 shadow-lg"
            >
              Reservar esta Ruta
            </Link>
            <Link href="/rutas" className="inline-flex justify-center items-center border-2 border-brand-dark hover:bg-brand-dark hover:text-white text-brand-dark font-heading font-bold uppercase text-sm tracking-widest px-10 py-4 transition duration-300">
              Ver Todas las Rutas
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
