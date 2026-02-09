'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import HeroCompact from '@/components/ui/HeroCompact'
import { rutas } from '@/data/rutas'

const STORAGE_KEY = 'cherry_reserva'

function ReservaPaso1Content() {
  const searchParams = useSearchParams()
  const rutaParam = searchParams.get('ruta')

  const saveRuta = (slug: string) => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, ruta: slug }))
    }
  }

  return (
    <div>
      <HeroCompact
        title="Elige tu Aventura"
        subtitle="Paso 1 de 4: Selecciona la ruta que deseas reservar"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Reserva', href: '/reserva' },
        ]}
      />
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Progress */}
          <div className="flex justify-center gap-4 mb-16">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm ${
                  step === 1 ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          <div className="grid gap-6">
            {rutas.map((ruta) => (
              <Link
                key={ruta.slug}
                href={`/reserva/datos?ruta=${ruta.slug}`}
                onClick={() => saveRuta(ruta.slug)}
                className={`block p-6 rounded-lg border-2 transition duration-300 ${
                  rutaParam === ruta.slug
                    ? 'border-brand-primary bg-brand-primary/5'
                    : 'border-gray-200 hover:border-brand-primary hover:bg-brand-primary/5'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={ruta.imagen}
                    alt={ruta.nombre}
                    className="w-full sm:w-40 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl text-brand-dark uppercase">{ruta.nombre}</h3>
                    <p className="text-sm text-brand-earth mt-1">{ruta.zona} • {ruta.duracion}</p>
                    <p className="text-gray-600 text-sm mt-2">{ruta.descripcion}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-brand-primary text-white px-4 py-2 rounded font-heading uppercase text-xs font-bold">
                      Seleccionar
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ReservaPaso1Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-light flex items-center justify-center"><div className="animate-pulse">Cargando...</div></div>}>
      <ReservaPaso1Content />
    </Suspense>
  )
}
