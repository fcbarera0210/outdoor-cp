'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { sectionView, itemView, itemViewX } from '@/components/ui/animations'
import { getRutaBySlug } from '@/data/rutas'

const dificultadColors: Record<string, string> = {
  fácil: 'bg-green-500/20 text-green-800 dark:text-green-200',
  media: 'bg-yellow-500/20 text-yellow-800 dark:text-yellow-200',
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
      <motion.section
        className="py-20 bg-brand-light dark:bg-gray-900"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div className="mb-12" {...itemView(0)}>
            <img
              src={ruta.imagen}
              alt={ruta.nombre}
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div className="flex flex-wrap gap-4 mb-8" {...itemView(0.05)}>
            <span className={`px-4 py-2 rounded-lg font-heading uppercase text-sm font-bold ${dificultadColors[ruta.dificultad]}`}>
              Dificultad: {ruta.dificultad}
            </span>
            <span className="px-4 py-2 rounded-lg bg-brand-dark/10 text-brand-dark dark:bg-white/10 dark:text-gray-200 font-heading uppercase text-sm font-bold">
              <i className="far fa-clock mr-2"></i> {ruta.duracion}
            </span>
            <span className="px-4 py-2 rounded-lg bg-brand-primary/10 text-brand-primary font-heading uppercase text-sm font-bold">
              <i className="fas fa-map-marker-alt mr-2"></i> {ruta.zona}
            </span>
          </motion.div>
          <motion.p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-12" {...itemView(0.1)}>
            {ruta.descripcion}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <motion.div {...itemView(0.15)}>
              <h3 className="text-2xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6 border-b-2 border-brand-primary pb-2">
                Itinerario
              </h3>
              <ul className="space-y-3">
                {ruta.itinerario.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <i className="fas fa-check text-brand-primary"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...itemView(0.2)}>
              <h3 className="text-2xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6 border-b-2 border-brand-primary pb-2">
                Equipo Recomendado
              </h3>
              <ul className="space-y-3">
                {ruta.equipo.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <i className="fas fa-backpack text-brand-primary"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div className="mb-12" {...itemView(0.25)}>
            <h3 className="text-2xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6 border-b-2 border-brand-primary pb-2">
              Próximas Salidas
            </h3>
            <div className="space-y-4">
              {ruta.proximasSalidas.map((salida, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between bg-brand-light dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-brand-primary rounded-lg p-4 transition"
                  {...itemViewX(i * 0.05)}
                >
                  <span className="font-heading font-bold text-brand-dark dark:text-white">{salida.fecha}</span>
                  <span className="text-sm text-brand-earth dark:text-gray-400">{salida.tipo}</span>
                  <Link
                    href={`/reserva?ruta=${ruta.slug}`}
                    className="rounded-lg bg-brand-primary text-white px-6 py-2 font-heading uppercase text-xs font-bold hover:bg-brand-dark transition"
                  >
                    Reservar
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4" {...itemView(0.3)}>
            <Link
              href={`/reserva?ruta=${ruta.slug}`}
              className="rounded-lg inline-flex justify-center items-center bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase text-sm tracking-widest px-10 py-4 transition duration-300 shadow-lg"
            >
              Reservar esta Ruta
            </Link>
            <Link href="/rutas" className="rounded-lg inline-flex justify-center items-center border-2 border-brand-dark dark:border-gray-300 hover:bg-brand-dark dark:hover:bg-gray-700 hover:text-white text-brand-dark dark:text-white font-heading font-bold uppercase text-sm tracking-widest px-10 py-4 transition duration-300">
              Ver Todas las Rutas
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
