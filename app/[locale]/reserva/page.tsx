'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { Skeleton, SkeletonLine, SkeletonImage } from '@/components/ui/Skeleton'
import { sectionView, itemView } from '@/components/ui/animations'
import { getRutas } from '@/services/rutas'
import type { Ruta } from '@/services/rutas'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocale, Link } from '@/i18n/navigation'


const STORAGE_KEY = 'cherry_reserva'

function ReservaPaso1Content() {
  const searchParams = useSearchParams()
  const rutaParam = searchParams.get('ruta')
  const locale = useLocale()
  const [rutas, setRutas] = useState<Ruta[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation('reserva')
  const { t: tHome } = useTranslation('home')
  const { t: tCommon } = useTranslation('common')

  useEffect(() => {
    getRutas(locale)
      .then(setRutas)
      .catch(() => setRutas([]))
      .finally(() => setLoading(false))
  }, [locale])

  const saveRuta = (slug: string) => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, ruta: slug }))
    }
  }

  return (
    <div>
      <HeroCompact
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[
          { label: tHome('breadcrumbHome'), href: '/' },
          { label: t('breadcrumb'), href: '/reserva' },
        ]}
      />
      <motion.section
        className="py-20 bg-brand-light dark:bg-gray-900"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div className="flex justify-center gap-4 mb-16" {...itemView(0)}>
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm ${
                  step === 1 ? 'bg-brand-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                }`}
              >
                {step}
              </div>
            ))}
          </motion.div>

          {loading ? (
            <div className="grid gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="block p-6 rounded-lg border-2 border-gray-200 dark:border-gray-600">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <SkeletonImage className="w-full sm:w-40 h-32 rounded-lg shrink-0" aspectRatio="" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <SkeletonLine className="w-36" />
                      <SkeletonLine className="w-full" />
                      <SkeletonLine className="w-3/4" />
                    </div>
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-24 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <div className="grid gap-6">
            {rutas.map((ruta, index) => (
              <motion.div key={ruta.slug} {...itemView(0.1 + index * 0.05)}>
                <Link
                  href={`/reserva/datos?ruta=${ruta.slug}`}
                  onClick={() => saveRuta(ruta.slug)}
                  className={`block p-6 rounded-lg border-2 transition duration-300 ${
                    rutaParam === ruta.slug
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-gray-200 dark:border-gray-600 hover:border-brand-primary hover:bg-brand-primary/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={ruta.imagen}
                      alt={ruta.nombre}
                      className="w-full sm:w-40 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl text-brand-dark dark:text-white uppercase">{ruta.nombre}</h3>
                      <p className="text-sm text-brand-earth dark:text-gray-400 mt-1">{ruta.zona} • {ruta.duracion}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{ruta.descripcion}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="rounded-lg bg-brand-primary text-white px-4 py-2 font-heading uppercase text-xs font-bold">
                        {tCommon('select')}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </motion.section>
    </div>
  )
}

function ReservaPaso1Skeleton() {
  return (
    <div>
      <header className="relative h-[55vh] min-h-[400px] flex flex-col items-center justify-end bg-gray-800 overflow-hidden">
        <div className="relative z-10 pb-16 flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-64 rounded" />
          <Skeleton className="h-6 w-48 rounded" />
        </div>
      </header>
      <section className="py-20 bg-brand-light dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-center gap-4 mb-16">
            {[1, 2, 3, 4].map((step) => (
              <Skeleton key={step} className="w-10 h-10 rounded-full" />
            ))}
          </div>
          <div className="grid gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-600">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="w-full sm:w-40 h-32 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <SkeletonLine className="w-36" />
                    <SkeletonLine className="w-full" />
                    <SkeletonLine className="w-3/4" />
                  </div>
                  <Skeleton className="h-10 w-24 rounded-lg shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ReservaPaso1Page() {
  return (
    <Suspense fallback={<ReservaPaso1Skeleton />}>
      <ReservaPaso1Content />
    </Suspense>
  )
}
