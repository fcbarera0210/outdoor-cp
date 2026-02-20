'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { sectionView, itemView } from '@/components/ui/animations'
import { getRutaBySlug } from '@/services/rutas'
import { useLocale } from 'next-intl'
import { useRouter, Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

const STORAGE_KEY = 'cherry_reserva'

function ReservaConfirmacionContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rutaSlug = searchParams.get('ruta')
  const locale = useLocale()
  const [ruta, setRuta] = useState<Awaited<ReturnType<typeof getRutaBySlug>> | undefined>(undefined)
  useEffect(() => {
    if (rutaSlug) getRutaBySlug(rutaSlug, locale).then(setRuta)
    else setRuta(null)
  }, [rutaSlug, locale])
  const tHome = useTranslations('home')
  const tReserva = useTranslations('reserva')
  const tCommon = useTranslations('common')

  const [data, setData] = useState<Record<string, string> | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!rutaSlug) {
      router.replace('/reserva')
      return
    }
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setData(JSON.parse(stored))
  }, [rutaSlug, router])

  const handleConfirmar = async () => {
    if (!data || !ruta) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rutaId: (ruta as unknown as { id?: string }).id || undefined,
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono || '',
          pais: data.pais || '',
          notas: data.notas ? `${data.notas}${data.fechaSalida ? ` | Fecha: ${data.fechaSalida}` : ''}${data.tipoSalida ? ` | Tipo: ${data.tipoSalida}` : ''}` : `Fecha: ${data.fechaSalida || ''} | Tipo: ${data.tipoSalida || ''}`,
        }),
      })
      if (!res.ok) throw new Error('Error al enviar la reserva')
      setConfirmed(true)
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      setError('Hubo un error al procesar tu reserva. Por favor intenta nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (ruta === undefined) return <div className="min-h-screen flex items-center justify-center"><p className="font-heading uppercase text-brand-dark dark:text-white">{tCommon('loading')}</p></div>
  if (!ruta) return null

  return (
    <div>
      <HeroCompact
        title="Confirmar Reserva"
        subtitle="Paso 4 de 4: Revisa y confirma tu reserva"
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
          {confirmed ? (
            <motion.div
              className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border-2 border-brand-primary shadow-lg"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <i className="fas fa-check-circle text-6xl text-brand-primary mb-6"></i>
              <h2 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-4">Reserva Solicitada</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                Hemos recibido tu solicitud. Nuestro equipo te contactará en las próximas 24 horas para confirmar disponibilidad y detalles del pago.
              </p>
              <Link href="/rutas" className="rounded-lg inline-block bg-brand-primary text-white font-heading font-bold uppercase text-sm px-8 py-3 hover:bg-brand-dark transition">
                {tCommon('allRoutes')}
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.div className="flex justify-center gap-4 mb-16" {...itemView(0)}>
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm bg-brand-primary text-white"
                  >
                    {step}
                  </div>
                ))}
              </motion.div>

              <motion.div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 shadow-sm space-y-8" {...itemView(0.05)}>
                <div>
                  <h3 className="text-xs font-heading uppercase tracking-widest text-brand-earth dark:text-gray-400 mb-2">Ruta</h3>
                  <p className="font-heading font-bold text-xl text-brand-dark dark:text-white">{ruta.nombre}</p>
                  <p className="text-sm text-brand-earth dark:text-gray-400">{ruta.zona} • {ruta.duracion}</p>
                </div>
                {data?.fechaSalida && (
                  <div>
                    <h3 className="text-xs font-heading uppercase tracking-widest text-brand-earth dark:text-gray-400 mb-2">Fecha de salida</h3>
                    <p className="font-heading font-bold text-brand-dark dark:text-white">{data.fechaSalida}</p>
                    <p className="text-sm text-brand-earth dark:text-gray-400">{data.tipoSalida}</p>
                  </div>
                )}
                {data && (
                  <div>
                    <h3 className="text-xs font-heading uppercase tracking-widest text-brand-earth dark:text-gray-400 mb-2">Tus datos</h3>
                    <p className="text-brand-dark dark:text-gray-200">{data.nombre}</p>
                    <p className="text-brand-dark dark:text-gray-200">{data.email}</p>
                    <p className="text-brand-dark dark:text-gray-200">{data.telefono}</p>
                    {data.notas && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{data.notas}</p>}
                  </div>
                )}
              </motion.div>

              <motion.div className="flex gap-4 mt-8" {...itemView(0.1)}>
                <Link
                  href={`/reserva/fechas?ruta=${rutaSlug}`}
                  className="rounded-lg border-2 border-brand-dark dark:border-gray-300 text-brand-dark dark:text-white font-heading font-bold uppercase text-sm px-8 py-3 hover:bg-brand-dark dark:hover:bg-gray-700 hover:text-white transition"
                >
                  {tCommon('back')}
                </Link>
                <button
                  onClick={handleConfirmar}
                  disabled={submitting}
                  className="rounded-lg bg-brand-primary hover:bg-brand-dark disabled:opacity-50 text-white font-heading font-bold uppercase text-sm px-8 py-3 transition"
                >
                  {submitting ? 'Enviando...' : 'Confirmar Reserva'}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </motion.div>
            </>
          )}
        </div>
      </motion.section>
    </div>
  )
}

export default function ReservaConfirmacionPage() {
  const tCommon = useTranslations('common')
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-light dark:bg-gray-900 flex items-center justify-center"><div className="animate-pulse text-brand-dark dark:text-white">{tCommon('loading')}</div></div>}>
      <ReservaConfirmacionContent />
    </Suspense>
  )
}
