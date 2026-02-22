'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { Skeleton, SkeletonLine, SkeletonImage } from '@/components/ui/Skeleton'
import { sectionView, itemView } from '@/components/ui/animations'
import { getRutas } from '@/services/rutas'
import type { Ruta } from '@/services/rutas'
import { useTranslation } from 'react-i18next'
import { useLocale, Link as I18nLink } from '@/i18n/navigation'

const dificultadColors: Record<string, string> = {
  fácil: 'bg-green-500/20 text-green-800',
  media: 'bg-yellow-500/20 text-yellow-800',
  alta: 'bg-brand-primary/20 text-brand-primary',
}

const dificultadLabelKey: Record<string, string> = {
  fácil: 'easy',
  media: 'medium',
  alta: 'hard',
}

export default function RutasPage() {
  const locale = useLocale()
  const [rutas, setRutas] = useState<Ruta[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation('rutas')
  const { t: tCommon } = useTranslation('common')
  const { t: tEquipo } = useTranslation('equipo')
  const { t: tHome } = useTranslation('home')

  useEffect(() => {
    getRutas(locale)
      .then(setRutas)
      .catch(() => setRutas([]))
      .finally(() => setLoading(false))
  }, [locale])

  return (
    <div>
      <HeroCompact
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[{ label: tHome('breadcrumbHome'), href: '/' }, { label: t('breadcrumb') }]}
      />
      <motion.section
        className="py-20 bg-brand-light dark:bg-gray-900 bg-topo-pattern"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          {loading ? (
            <div className="space-y-16">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <SkeletonImage className="h-[350px]" aspectRatio="" />
                    </div>
                    <Skeleton className="h-8 w-24 rounded-lg -mt-4 ml-4 md:ml-0" />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-10 md:pr-10 space-y-3">
                    <SkeletonLine className="w-2/3" />
                    <Skeleton className="h-9 w-full" />
                    <SkeletonLine className="w-full" />
                    <SkeletonLine className="w-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {rutas.map((ruta, index) => (
                <motion.div
                  key={ruta.slug}
                  className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
                  {...itemView(index * 0.1)}
                >
                  <div className="w-full md:w-1/2 relative group">
                    <div className={`p-2 bg-gray-100 dark:bg-gray-800 shadow-xl transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} transition duration-500 group-hover:rotate-0`}>
                      <I18nLink href={`/rutas/${ruta.slug}`}>
                        <div className="overflow-hidden relative h-[350px]">
                          <img
                            src={ruta.imagen}
                            alt={ruta.nombre}
                            className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110"
                          />
                        </div>
                      </I18nLink>
                    </div>
                    <div className={`absolute -top-4 ${index % 2 === 0 ? '-left-4' : '-right-4'} rounded-lg bg-brand-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg z-10`}>
                      <i className="fas fa-map-marker-alt mr-2"></i> {ruta.zona}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:pl-10 md:pr-10">
                    <div className="text-xs text-brand-earth dark:text-gray-400 mb-3 font-heading uppercase tracking-widest font-bold">
                      <i className="far fa-clock mr-1"></i> {ruta.duracion}
                      <span className="mx-2 text-gray-300 dark:text-gray-500">|</span>
                      <span className={`px-2 py-0.5 rounded-lg ${dificultadColors[ruta.dificultad]}`}>
                        {tCommon('difficulty')}: {tEquipo(dificultadLabelKey[ruta.dificultad] ?? ruta.dificultad)}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-tight mb-6 text-brand-dark dark:text-white">
                      {ruta.nombre}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light text-lg">
                      {ruta.descripcion}
                    </p>
                    <I18nLink
                      href={`/rutas/${ruta.slug}`}
                      className="inline-flex items-center text-brand-dark dark:text-white font-heading font-bold uppercase text-sm tracking-widest hover:text-brand-primary transition group"
                    >
                      {tCommon('detail')} <span className="bg-brand-primary w-8 h-[2px] ml-3 group-hover:w-12 transition-all duration-300"></span>
                    </I18nLink>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </div>
  )
}
