'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { sectionView, itemView } from '@/components/ui/animations'
import { getRutaBySlug } from '@/services/rutas'
import { useTranslation } from 'react-i18next'
import { useLocale, useRouter, Link } from '@/i18n/navigation'

const STORAGE_KEY = 'cherry_reserva'

function ReservaDatosContent() {
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

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    pais: '',
    notas: '',
  })

  useEffect(() => {
    if (!rutaSlug) {
      router.replace('/reserva')
      return
    }
    if (ruta === null || ruta === undefined) return
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    if (data.nombre) setForm(data)
  }, [rutaSlug, ruta, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, ...form }))
    router.push(`/reserva/fechas?ruta=${rutaSlug}`)
  }

  if (ruta === undefined) return <div className="min-h-screen flex items-center justify-center"><p className="font-heading uppercase text-brand-dark dark:text-white">{tCommon('loading')}</p></div>
  if (!ruta) return null

  return (
    <div>
      <HeroCompact
        title="Tus Datos"
        subtitle="Paso 2 de 4: Completa tu información"
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
                  step <= 2 ? 'bg-brand-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
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

          <motion.form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 shadow-sm" {...itemView(0.1)}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2 group-focus-within:text-brand-primary">Nombre completo</label>
                <input type="text" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border-b-2 border-gray-200 dark:border-gray-500 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-gray-200 dark:bg-transparent placeholder:dark:text-gray-500" placeholder="Ej: Juan Pérez" />
              </div>
              <div className="group">
                <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2 group-focus-within:text-brand-primary">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border-b-2 border-gray-200 dark:border-gray-500 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-gray-200 dark:bg-transparent placeholder:dark:text-gray-500" placeholder="correo@ejemplo.com" />
              </div>
              <div className="group">
                <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2 group-focus-within:text-brand-primary">Teléfono</label>
                <input type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} className="w-full border-b-2 border-gray-200 dark:border-gray-500 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-gray-200 dark:bg-transparent placeholder:dark:text-gray-500" placeholder="+56 9 1234 5678" />
              </div>
              <div className="group">
                <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2 group-focus-within:text-brand-primary">País</label>
                <input type="text" value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })} className="w-full border-b-2 border-gray-200 dark:border-gray-500 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-gray-200 dark:bg-transparent placeholder:dark:text-gray-500" placeholder="Chile" />
              </div>
            </div>
            <div className="mt-6 group">
              <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2 group-focus-within:text-brand-primary">Notas adicionales</label>
              <textarea rows={3} value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} className="w-full border-b-2 border-gray-200 dark:border-gray-500 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-gray-200 dark:bg-transparent resize-none placeholder:dark:text-gray-500" placeholder="Alergias, necesidades especiales, etc." />
            </div>
            <div className="flex gap-4 mt-8">
              <Link href="/reserva" className="rounded-lg border-2 border-brand-dark dark:border-gray-300 text-brand-dark dark:text-white font-heading font-bold uppercase text-sm px-8 py-3 hover:bg-brand-dark dark:hover:bg-gray-700 hover:text-white transition">
                {tCommon('back')}
              </Link>
              <button type="submit" className="rounded-lg bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase text-sm px-8 py-3 transition">
                Siguiente
              </button>
            </div>
          </motion.form>
        </div>
      </motion.section>
    </div>
  )
}

export default function ReservaDatosPage() {
  const { t: tCommon } = useTranslation('common')
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-light dark:bg-gray-900 flex items-center justify-center"><div className="animate-pulse text-brand-dark dark:text-white">{tCommon('loading')}</div></div>}>
      <ReservaDatosContent />
    </Suspense>
  )
}
