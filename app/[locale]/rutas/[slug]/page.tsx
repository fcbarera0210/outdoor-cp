'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import HeroCompact from '@/components/ui/HeroCompact'
import { Skeleton, SkeletonLine, SkeletonImage } from '@/components/ui/Skeleton'
import { sectionView, itemView, itemViewX } from '@/components/ui/animations'
import { getRutaBySlug } from '@/services/rutas'
import type { Ruta } from '@/services/rutas'
import { useTranslation } from 'react-i18next'
import { useLocale, Link as I18nLink } from '@/i18n/navigation'

const VALID_ICON = /^[a-z0-9-]+:[a-z0-9-]+$/i
function isValidIcon(id?: string) {
  return id && VALID_ICON.test(id)
}

function formatFechaDisplay(fecha: string, locale: string): string {
  if (!fecha) return fecha
  const d = new Date(fecha)
  if (Number.isNaN(d.getTime())) return fecha
  return d.toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', { day: 'numeric', month: 'short', year: 'numeric' })
}

function EquipoIconTooltip({
  titulo,
  texto,
  icono,
  showTooltip,
}: {
  titulo: string
  texto: string
  icono?: string
  showTooltip: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => showTooltip && setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => showTooltip && setOpen((o) => !o)}
        className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-brand-primary/50 text-brand-primary transition focus:outline-none focus:ring-2 focus:ring-brand-primary"
        aria-label={titulo || 'Equipo'}
      >
        {isValidIcon(icono) ? (
          <Icon icon={icono!} className="text-2xl" />
        ) : (
          <Icon icon="mdi:backpack" className="text-2xl" />
        )}
      </button>
      {showTooltip && open && (
        <div
          className="absolute z-20 left-0 top-full mt-2 min-w-[200px] max-w-[280px] p-3 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 shadow-xl"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {titulo && <p className="font-heading font-bold text-brand-dark dark:text-white uppercase text-sm mb-1">{titulo}</p>}
          {texto && <p className="text-sm text-gray-600 dark:text-gray-300">{texto}</p>}
        </div>
      )}
    </div>
  )
}

const dificultadColors: Record<string, string> = {
  fácil: 'bg-green-500/20 text-green-800 dark:text-green-200',
  media: 'bg-yellow-500/20 text-yellow-800 dark:text-yellow-200',
  alta: 'bg-brand-primary/20 text-brand-primary',
}

const dificultadLabelKey: Record<string, string> = {
  fácil: 'easy',
  media: 'medium',
  alta: 'hard',
}

export default function RutaDetailPage({ params }: { params: { slug: string } }) {
  const locale = useLocale()
  const [ruta, setRuta] = useState<Ruta | null>(null)
  const [loading, setLoading] = useState(true)
  const { t: tCommon } = useTranslation('common')
  const { t: tEquipo } = useTranslation('equipo')
  const { t: tHome } = useTranslation('home')

  useEffect(() => {
    getRutaBySlug(params.slug, locale)
      .then(setRuta)
      .finally(() => setLoading(false))
  }, [params.slug, locale])

  if (loading) {
    return (
      <div>
        <header className="relative h-[55vh] min-h-[400px] flex flex-col items-center justify-end bg-gray-800 overflow-hidden">
          <div className="relative z-10 pb-16 flex flex-col items-center gap-2 px-4">
            <Skeleton className="h-10 w-72 rounded" />
            <Skeleton className="h-5 w-48 rounded" />
          </div>
        </header>
        <section className="py-20 bg-brand-light dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-4xl">
            <SkeletonImage className="h-96 rounded-lg mb-8" aspectRatio="" />
            <div className="flex flex-wrap gap-4 mb-8">
              <Skeleton className="h-9 w-32 rounded-lg" />
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-28 rounded-lg" />
            </div>
            <div className="space-y-3 mb-12">
              <SkeletonLine className="w-full" />
              <SkeletonLine className="w-full" />
              <SkeletonLine className="w-4/5" />
            </div>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <Skeleton className="h-8 w-40 mb-6" />
                <ul className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Skeleton className="h-4 w-4 rounded shrink-0" />
                      <SkeletonLine className="flex-1" />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-12 w-12 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-12">
              <Skeleton className="h-8 w-44 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border-2 border-gray-200 dark:border-gray-600 p-4">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-9 w-24 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-12 w-48 rounded-lg" />
              <Skeleton className="h-12 w-36 rounded-lg" />
            </div>
          </div>
        </section>
      </div>
    )
  }
  if (!ruta) notFound()

  return (
    <div>
      <HeroCompact
        title={ruta.nombre}
        subtitle={`${ruta.zona} • ${ruta.duracion}`}
        breadcrumb={[
          { label: tHome('breadcrumbHome'), href: '/' },
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
              {tCommon('difficulty')}: {tEquipo(dificultadLabelKey[ruta.dificultad] ?? ruta.dificultad)}
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
              {ruta.equipo && ruta.equipo.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {ruta.equipo.map((item, i) => {
                    const titulo = typeof item === 'string' ? item : item.titulo || ''
                    const texto = typeof item === 'string' ? '' : item.texto || ''
                    const icono = typeof item === 'object' && item?.icono ? item.icono : undefined
                    const showTooltip = !!(titulo || texto)
                    return (
                      <EquipoIconTooltip
                        key={i}
                        titulo={titulo}
                        texto={texto}
                        icono={icono}
                        showTooltip={showTooltip}
                      />
                    )
                  })}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">No se ha definido equipo específico para esta ruta.</p>
              )}
            </motion.div>
          </div>

          <motion.div className="mb-12" {...itemView(0.25)}>
            <h3 className="text-2xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6 border-b-2 border-brand-primary pb-2">
              Próximas Salidas
            </h3>
            <div className="space-y-4">
              {ruta.proximasSalidas.map((salida, i) => {
                const cupos = salida.cuposDisponibles ?? salida.cupos ?? 0
                const fechaLabel = /^\d{4}-\d{2}-\d{2}$/.test(salida.fecha) ? formatFechaDisplay(salida.fecha, locale) : salida.fecha
                return (
                  <motion.div
                    key={salida.id ?? i}
                    className="flex items-center justify-between bg-brand-light dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-brand-primary rounded-lg p-4 transition"
                    {...itemViewX(i * 0.05)}
                  >
                    <span className="font-heading font-bold text-brand-dark dark:text-white">{fechaLabel}</span>
                    <span className="text-sm text-brand-earth dark:text-gray-400">{cupos} {tCommon('cuposDisponibles')}</span>
                    <I18nLink
                      href={`/reserva?ruta=${ruta.slug}`}
                      className="rounded-lg bg-brand-primary text-white px-6 py-2 font-heading uppercase text-xs font-bold hover:bg-brand-dark transition"
                    >
                      {tCommon('reserve')}
                    </I18nLink>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4" {...itemView(0.3)}>
            <I18nLink
              href={`/reserva?ruta=${ruta.slug}`}
              className="rounded-lg inline-flex justify-center items-center bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase text-sm tracking-widest px-10 py-4 transition duration-300 shadow-lg"
            >
              {tCommon('reserveThisRoute')}
            </I18nLink>
            <I18nLink href="/rutas" className="rounded-lg inline-flex justify-center items-center border-2 border-brand-dark dark:border-gray-300 hover:bg-brand-dark dark:hover:bg-gray-700 hover:text-white text-brand-dark dark:text-white font-heading font-bold uppercase text-sm tracking-widest px-10 py-4 transition duration-300">
              {tCommon('allRoutes')}
            </I18nLink>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
