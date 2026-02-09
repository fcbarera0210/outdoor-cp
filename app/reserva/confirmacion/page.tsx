'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import HeroCompact from '@/components/ui/HeroCompact'
import { getRutaBySlug } from '@/data/rutas'

const STORAGE_KEY = 'cherry_reserva'

function ReservaConfirmacionContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rutaSlug = searchParams.get('ruta')
  const ruta = rutaSlug ? getRutaBySlug(rutaSlug) : null

  const [data, setData] = useState<Record<string, string> | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!rutaSlug || !ruta) {
      router.replace('/reserva')
      return
    }
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setData(JSON.parse(stored))
  }, [rutaSlug, ruta, router])

  const handleConfirmar = () => {
    setConfirmed(true)
    localStorage.removeItem(STORAGE_KEY)
  }

  if (!ruta) return null

  return (
    <div>
      <HeroCompact
        title="Confirmar Reserva"
        subtitle="Paso 4 de 4: Revisa y confirma tu reserva"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Reserva', href: '/reserva' },
        ]}
      />
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-6 max-w-4xl">
          {confirmed ? (
            <div className="text-center py-16 bg-white rounded-lg border-2 border-brand-primary shadow-lg">
              <i className="fas fa-check-circle text-6xl text-brand-primary mb-6"></i>
              <h2 className="text-3xl font-heading font-bold uppercase text-brand-dark mb-4">Reserva Solicitada</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Hemos recibido tu solicitud. Nuestro equipo te contactará en las próximas 24 horas para confirmar disponibilidad y detalles del pago.
              </p>
              <Link href="/rutas" className="inline-block bg-brand-primary text-white font-heading font-bold uppercase text-sm px-8 py-3 rounded hover:bg-brand-dark transition">
                Ver Otras Rutas
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-center gap-4 mb-16">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm bg-brand-primary text-white"
                  >
                    {step}
                  </div>
                ))}
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm space-y-8">
                <div>
                  <h3 className="text-xs font-heading uppercase tracking-widest text-brand-earth mb-2">Ruta</h3>
                  <p className="font-heading font-bold text-xl text-brand-dark">{ruta.nombre}</p>
                  <p className="text-sm text-brand-earth">{ruta.zona} • {ruta.duracion}</p>
                </div>
                {data?.fechaSalida && (
                  <div>
                    <h3 className="text-xs font-heading uppercase tracking-widest text-brand-earth mb-2">Fecha de salida</h3>
                    <p className="font-heading font-bold text-brand-dark">{data.fechaSalida}</p>
                    <p className="text-sm text-brand-earth">{data.tipoSalida}</p>
                  </div>
                )}
                {data && (
                  <div>
                    <h3 className="text-xs font-heading uppercase tracking-widest text-brand-earth mb-2">Tus datos</h3>
                    <p className="text-brand-dark">{data.nombre}</p>
                    <p className="text-brand-dark">{data.email}</p>
                    <p className="text-brand-dark">{data.telefono}</p>
                    {data.notas && <p className="text-sm text-gray-600 mt-2">{data.notas}</p>}
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <Link
                  href={`/reserva/fechas?ruta=${rutaSlug}`}
                  className="border-2 border-brand-dark text-brand-dark font-heading font-bold uppercase text-sm px-8 py-3 rounded hover:bg-brand-dark hover:text-white transition"
                >
                  Volver
                </Link>
                <button
                  onClick={handleConfirmar}
                  className="bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase text-sm px-8 py-3 rounded transition"
                >
                  Confirmar Reserva
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default function ReservaConfirmacionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-light flex items-center justify-center"><div className="animate-pulse">Cargando...</div></div>}>
      <ReservaConfirmacionContent />
    </Suspense>
  )
}
