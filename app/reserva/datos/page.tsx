'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import HeroCompact from '@/components/ui/HeroCompact'
import { getRutaBySlug } from '@/data/rutas'

const STORAGE_KEY = 'cherry_reserva'

function ReservaDatosContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rutaSlug = searchParams.get('ruta')
  const ruta = rutaSlug ? getRutaBySlug(rutaSlug) : null

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    pais: '',
    notas: '',
  })

  useEffect(() => {
    if (!rutaSlug || !ruta) {
      router.replace('/reserva')
      return
    }
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    if (data.nombre) setForm(data)
  }, [rutaSlug, ruta, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, ...form }))
    router.push(`/reserva/fechas?ruta=${rutaSlug}`)
  }

  if (!ruta) return null

  return (
    <div>
      <HeroCompact
        title="Tus Datos"
        subtitle="Paso 2 de 4: Completa tu información"
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
                  step <= 2 ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-500'
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

          <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2 group-focus-within:text-brand-primary">Nombre completo</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2 group-focus-within:text-brand-primary">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2 group-focus-within:text-brand-primary">Teléfono</label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark"
                  placeholder="+56 9 1234 5678"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2 group-focus-within:text-brand-primary">País</label>
                <input
                  type="text"
                  value={form.pais}
                  onChange={(e) => setForm({ ...form, pais: e.target.value })}
                  className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark"
                  placeholder="Chile"
                />
              </div>
            </div>
            <div className="mt-6 group">
              <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2 group-focus-within:text-brand-primary">Notas adicionales</label>
              <textarea
                rows={3}
                value={form.notas}
                onChange={(e) => setForm({ ...form, notas: e.target.value })}
                className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark resize-none"
                placeholder="Alergias, necesidades especiales, etc."
              />
            </div>
            <div className="flex gap-4 mt-8">
              <Link
                href="/reserva"
                className="border-2 border-brand-dark text-brand-dark font-heading font-bold uppercase text-sm px-8 py-3 rounded hover:bg-brand-dark hover:text-white transition"
              >
                Volver
              </Link>
              <button
                type="submit"
                className="bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase text-sm px-8 py-3 rounded transition"
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default function ReservaDatosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-light flex items-center justify-center"><div className="animate-pulse">Cargando...</div></div>}>
      <ReservaDatosContent />
    </Suspense>
  )
}
