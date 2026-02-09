'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import HeroCompact from '@/components/ui/HeroCompact'
import { getRutaBySlug } from '@/data/rutas'

const STORAGE_KEY = 'cherry_reserva'

function ReservaFechasContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rutaSlug = searchParams.get('ruta')
  const ruta = rutaSlug ? getRutaBySlug(rutaSlug) : null

  const [selectedSalida, setSelectedSalida] = useState<string | null>(null)

  useEffect(() => {
    if (!rutaSlug || !ruta) {
      router.replace('/reserva')
      return
    }
  }, [rutaSlug, ruta, router])

  const handleSiguiente = () => {
    if (!selectedSalida) return
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const [fecha, tipo] = selectedSalida.split('|')
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, fechaSalida: fecha, tipoSalida: tipo }))
    router.push(`/reserva/confirmacion?ruta=${rutaSlug}`)
  }

  if (!ruta) return null

  return (
    <div>
      <HeroCompact
        title="Elige tu Fecha"
        subtitle="Paso 3 de 4: Selecciona la fecha de salida"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Reserva', href: '/reserva' },
        ]}
      />
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-center gap-4 mb-16">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm ${
                  step <= 3 ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          <div className="mb-8 p-4 bg-brand-primary/10 rounded-lg">
            <p className="text-sm text-brand-earth">Ruta seleccionada:</p>
            <p className="font-heading font-bold text-brand-dark uppercase">{ruta.nombre}</p>
          </div>

          <div className="space-y-4">
            {ruta.proximasSalidas.map((salida, i) => {
              const key = `${salida.fecha}|${salida.tipo}`
              const isSelected = selectedSalida === key
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedSalida(key)}
                  className={`w-full p-6 rounded-lg border-2 text-left transition duration-300 flex items-center justify-between ${
                    isSelected ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 hover:border-brand-primary'
                  }`}
                >
                  <div>
                    <span className="font-heading font-bold text-xl text-brand-dark block">{salida.fecha}</span>
                    <span className="text-sm text-brand-earth">{salida.tipo}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-brand-primary bg-brand-primary' : 'border-gray-300'}`}>
                    {isSelected && <i className="fas fa-check text-white text-sm"></i>}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex gap-4 mt-8">
            <Link
              href={`/reserva/datos?ruta=${rutaSlug}`}
              className="border-2 border-brand-dark text-brand-dark font-heading font-bold uppercase text-sm px-8 py-3 rounded hover:bg-brand-dark hover:text-white transition"
            >
              Volver
            </Link>
            <button
              onClick={handleSiguiente}
              disabled={!selectedSalida}
              className="bg-brand-primary hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-heading font-bold uppercase text-sm px-8 py-3 rounded transition"
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ReservaFechasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-light flex items-center justify-center"><div className="animate-pulse">Cargando...</div></div>}>
      <ReservaFechasContent />
    </Suspense>
  )
}
