'use client'

import { useState } from 'react'
import HeroCompact from '@/components/ui/HeroCompact'

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <div>
      <HeroCompact
        title="Contacto"
        subtitle="Estamos aquí para ayudarte a planificar tu aventura"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Contacto' },
        ]}
      />
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-heading font-bold uppercase text-brand-dark mb-8">Datos de Contacto</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <i className="fas fa-phone-alt text-2xl text-brand-primary"></i>
                  <div>
                    <p className="font-heading font-bold text-brand-dark uppercase text-sm">Teléfono</p>
                    <a href="tel:+56912345678" className="text-gray-600 hover:text-brand-primary transition">+56 9 1234 5678</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <i className="fas fa-envelope text-2xl text-brand-primary"></i>
                  <div>
                    <p className="font-heading font-bold text-brand-dark uppercase text-sm">Email</p>
                    <a href="mailto:contacto@cherryexperience.cl" className="text-gray-600 hover:text-brand-primary transition">contacto@cherryexperience.cl</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <i className="fas fa-map-marker-alt text-2xl text-brand-primary"></i>
                  <div>
                    <p className="font-heading font-bold text-brand-dark uppercase text-sm">Ubicación</p>
                    <p className="text-gray-600">Puerto Varas, Región de Los Lagos, Chile</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 font-heading uppercase text-sm">Mapa (placeholder)</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold uppercase text-brand-dark mb-8">Envíanos un mensaje</h2>
              {enviado ? (
                <div className="bg-brand-primary/10 border-2 border-brand-primary rounded-lg p-8 text-center">
                  <i className="fas fa-check-circle text-4xl text-brand-primary mb-4"></i>
                  <p className="font-heading font-bold text-brand-dark uppercase">Mensaje enviado</p>
                  <p className="text-gray-600 mt-2">Te responderemos en las próximas 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2">Nombre</label>
                      <input
                        type="text"
                        required
                        className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                  </div>
                  <div className="mt-6 group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2">Teléfono</label>
                    <input
                      type="tel"
                      className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                  <div className="mt-6 group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2">Asunto</label>
                    <select className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark bg-white">
                      <option>Consulta general</option>
                      <option>Reserva</option>
                      <option>Información de rutas</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="mt-6 group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2">Mensaje</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full border-b-2 border-gray-200 focus:border-brand-primary outline-none py-2 text-brand-dark resize-none"
                      placeholder="Escribe tu mensaje..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-8 w-full bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase tracking-widest py-4 rounded transition"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
