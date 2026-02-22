'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { Skeleton, SkeletonLine } from '@/components/ui/Skeleton'
import { sectionView, itemView, itemViewX } from '@/components/ui/animations'
import { getRutaBySlug } from '@/services/rutas'
import { useTranslation } from 'react-i18next'
import { useLocale, useRouter, Link } from '@/i18n/navigation'

const STORAGE_KEY = 'cherry_reserva'

function ReservaFechasContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rutaSlug = searchParams.get('ruta')
  const locale = useLocale()
  const [ruta, setRuta] = useState<Awaited<ReturnType<typeof getRutaBySlug>> | undefined>(undefined)
  useEffect(() => {
    if (rutaSlug) getRutaBySlug(rutaSlug, locale).then(setRuta)
    else setRuta(null)
  }, [rutaSlug, locale])
  const { t: tHome } = useTranslation('home')
  const { t: tReserva } = useTranslation('reserva')
  const { t: tCommon } = useTranslation('common')

  const [selectedSalida, setSelectedSalida] = useState<string | null>(null)

  useEffect(() => {
    if (!rutaSlug) {
      router.replace('/reserva')
      return
    }
  }, [rutaSlug, router])

  const handleSiguiente = () => {
    if (!selectedSalida || !ruta) return
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const salida = ruta.proximasSalidas.find((s) => ((s as { id?: string }).id ?? `${s.fecha}|${s.cupos}`) === selectedSalida)
    const payload: Record<string, string> = { ...data, fechaSalida: salida?.fecha ?? selectedSalida.split('|')[0], tipoSalida: String(salida?.cupos ?? '') }
    if (salida && (salida as { id?: string }).id) payload.salidaId = (salida as { id: string }).id
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    router.push(`/reserva/confirmacion?ruta=${rutaSlug}`)
  }

  if (ruta === undefined) {
    return (
      <div>
        <HeroCompact title="Elige tu Fecha" subtitle="Paso 3 de 4" breadcrumb={[{ label: tHome('breadcrumbHome'), href: '/' }, { label: tReserva('breadcrumb'), href: '/reserva' }]} />
        <section className="py-20 bg-brand-light dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex justify-center gap-4 mb-16">
              {[1, 2, 3, 4].map((step) => (
                <Skeleton key={step} className="w-10 h-10 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-20 w-full rounded-lg mb-8" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-600 flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <SkeletonLine className="w-24" />
                  </div>
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <Skeleton className="h-11 w-24 rounded-lg" />
              <Skeleton className="h-11 w-28 rounded-lg" />
            </div>
          </div>
        </section>
      </div>
    )
  }
  if (!ruta) return null

  return (
    <div>
      <HeroCompact
        title="Elige tu Fecha"
        subtitle="Paso 3 de 4: Selecciona la fecha de salida"
        breadcrumb={[
          { label: tHome('breadcrumbHome'), href: '/' },
          { label: tReserva('breadcrumb'), href: '/reserva' },
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
                  step <= 3 ? 'bg-brand-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                }`}
              >
                {step}
              </div>
            ))}
          </motion.div>

          <motion.div className="mb-8 p-4 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg" {...itemView(0.05)}>
            <p className="text-sm text-brand-earth dark:text-gray-400">Ruta seleccionada:</p>
            <p className="font-heading font-bold text-brand-dark dark:text-white uppercase">{ruta.nombre}</p>
          </motion.div>

          <div className="space-y-4">
            {ruta.proximasSalidas.map((salida, i) => {
              const key = (salida as { id?: string }).id ?? `${salida.fecha}|${salida.cupos}`
              const isSelected = selectedSalida === key
              const cupos = (salida as { cuposDisponibles?: number }).cuposDisponibles ?? salida.cupos ?? 0
              const fechaLabel = /^\d{4}-\d{2}-\d{2}$/.test(salida.fecha)
                ? new Date(salida.fecha).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CL', { day: 'numeric', month: 'short', year: 'numeric' })
                : salida.fecha
              return (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => setSelectedSalida(key)}
                  className={`w-full p-6 rounded-lg border-2 text-left transition duration-300 flex items-center justify-between ${
                    isSelected ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 dark:border-gray-600 hover:border-brand-primary bg-white dark:bg-gray-800'
                  }`}
                  {...itemViewX(i * 0.05)}
                >
                  <div>
                    <span className="font-heading font-bold text-xl text-brand-dark dark:text-white block">{fechaLabel}</span>
                    <span className="text-sm text-brand-earth dark:text-gray-400">{cupos} {tCommon('cuposDisponibles')}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-brand-primary bg-brand-primary' : 'border-gray-300 dark:border-gray-500'}`}>
                    {isSelected && <i className="fas fa-check text-white text-sm"></i>}
                  </div>
                </motion.button>
              )
            })}
          </div>

          <div className="flex gap-4 mt-8">
            <Link
              href={`/reserva/datos?ruta=${rutaSlug}`}
              className="rounded-lg border-2 border-brand-dark dark:border-gray-300 text-brand-dark dark:text-white font-heading font-bold uppercase text-sm px-8 py-3 hover:bg-brand-dark dark:hover:bg-gray-700 hover:text-white transition"
            >
              {tCommon('back')}
            </Link>
            <button
              onClick={handleSiguiente}
              disabled={!selectedSalida}
              className="rounded-lg bg-brand-primary hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-heading font-bold uppercase text-sm px-8 py-3 transition"
            >
              Siguiente
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

function ReservaFechasSkeleton() {
  return (
    <div>
      <header className="relative h-[55vh] min-h-[400px] flex flex-col items-center justify-end bg-gray-800 overflow-hidden">
        <div className="relative z-10 pb-16 flex flex-col items-center gap-2">
          <Skeleton className="h-12 w-56 rounded" />
          <Skeleton className="h-5 w-48 rounded" />
        </div>
      </header>
      <section className="py-20 bg-brand-light dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-center gap-4 mb-16">
            {[1, 2, 3, 4].map((s) => (
              <Skeleton key={s} className="w-10 h-10 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-20 w-full rounded-lg mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-600 flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-8">
            <Skeleton className="h-11 w-24 rounded-lg" />
            <Skeleton className="h-11 w-28 rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ReservaFechasPage() {
  return (
    <Suspense fallback={<ReservaFechasSkeleton />}>
      <ReservaFechasContent />
    </Suspense>
  )
}
