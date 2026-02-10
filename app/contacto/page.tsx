'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import HeroCompact from '@/components/ui/HeroCompact'
import { sectionView, itemView } from '@/components/ui/animations'

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
      <motion.section
        className="py-20 bg-brand-light dark:bg-gray-900"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div {...itemView(0)}>
              <h2 className="text-2xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-8">Datos de Contacto</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <i className="fas fa-phone-alt text-2xl text-brand-primary"></i>
                  <div>
                    <p className="font-heading font-bold text-brand-dark dark:text-gray-200 uppercase text-sm">Teléfono</p>
                    <a href="tel:+56912345678" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary transition">+56 9 1234 5678</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <i className="fas fa-envelope text-2xl text-brand-primary"></i>
                  <div>
                    <p className="font-heading font-bold text-brand-dark dark:text-gray-200 uppercase text-sm">Email</p>
                    <a href="mailto:contacto@cherryexperience.cl" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary transition">contacto@cherryexperience.cl</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <i className="fas fa-map-marker-alt text-2xl text-brand-primary"></i>
                  <div>
                    <p className="font-heading font-bold text-brand-dark dark:text-gray-200 uppercase text-sm">Ubicación</p>
                    <p className="text-gray-600 dark:text-gray-400">Puerto Varas, Región de Los Lagos, Chile</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 font-heading uppercase text-sm">Mapa (placeholder)</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...itemView(0.1)}>
              <h2 className="text-2xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-8">Envíanos un mensaje</h2>
              {enviado ? (
                <div className="bg-brand-primary/10 border-2 border-brand-primary rounded-lg p-8 text-center">
                  <i className="fas fa-check-circle text-4xl text-brand-primary mb-4"></i>
                  <p className="font-heading font-bold text-brand-dark dark:text-white uppercase">Mensaje enviado</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Te responderemos en las próximas 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">Nombre</label>
                      <input
                        type="text"
                        required
                        className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-transparent"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-transparent"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                  </div>
                  <div className="mt-6 group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-transparent"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                  <div className="mt-6 group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">Asunto</label>
                    <select className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-white dark:bg-gray-800">
                      <option>Consulta general</option>
                      <option>Reserva</option>
                      <option>Información de rutas</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="mt-6 group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">Mensaje</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full border-b-2 border-gray-200 dark:border-gray-600 focus:border-brand-primary outline-none py-2 text-brand-dark dark:text-white bg-transparent resize-none"
                      placeholder="Escribe tu mensaje..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-8 w-full rounded-lg bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase tracking-widest py-4 transition"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
