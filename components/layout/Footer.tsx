'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-brand-dark dark:bg-gray-950 text-white py-20 border-t border-white/10 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Col 1: Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <img src="/logos/che-blanco-2.svg" alt="Cherry Experience - Andes of Chile" className="h-16 w-auto mb-6" />
            </Link>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Expertos en turismo de montaña y conservación. Llevamos más de 10 años conectando personas con la naturaleza salvaje de Chile.
            </p>
            <div className="flex space-x-4 text-gray-400 text-lg">
              <a href="#" className="hover:text-brand-primary transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-brand-primary transition"><i className="fab fa-youtube"></i></a>
              <a href="#" className="hover:text-brand-primary transition"><i className="fab fa-spotify"></i></a>
            </div>
          </div>

          {/* Col 2: Recent Posts */}
          <div className="md:col-span-1">
            <h4 className="font-heading font-bold uppercase tracking-widest mb-8 text-white border-b-2 border-brand-primary pb-2 inline-block">Blog Reciente</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex gap-4 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                  className="w-16 h-16 object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  alt="Blog post"
                />
                <div>
                  <Link href="/blog/equipo-esencial-invierno" className="block group-hover:text-brand-primary transition font-bold text-gray-300 uppercase text-xs leading-tight mb-1">Equipo Esencial: Invierno</Link>
                  <span className="text-[10px] text-gray-600 block">Hace 2 días</span>
                </div>
              </li>
              <li className="flex gap-4 group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                  className="w-16 h-16 object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  alt="Blog post"
                />
                <div>
                  <Link href="/blog/flora-nativa-del-sur" className="block group-hover:text-brand-primary transition font-bold text-gray-300 uppercase text-xs leading-tight mb-1">Flora Nativa del Sur</Link>
                  <span className="text-[10px] text-gray-600 block">Semana pasada</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-heading font-bold uppercase tracking-widest mb-8 text-white border-b-2 border-brand-primary pb-2 inline-block">Info Útil</h4>
            <ul className="space-y-3 text-gray-400 uppercase text-xs font-bold tracking-wider">
              <li><Link href="/equipo#dificultad" className="hover:text-brand-primary transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-primary"></i> Niveles de Dificultad</Link></li>
              <li><Link href="/equipo" className="hover:text-brand-primary transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-primary"></i> Simbología</Link></li>
              <li><Link href="/contacto" className="hover:text-brand-primary transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-primary"></i> Contacto</Link></li>
              <li><Link href="/reserva" className="hover:text-brand-primary transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-primary"></i> Reservar</Link></li>
            </ul>
          </div>

          {/* Col 4: Gallery Widget */}
          <div className="md:col-span-1">
            <h4 className="font-heading font-bold uppercase tracking-widest mb-8 text-white border-b-2 border-brand-primary pb-2 inline-block">Instagram</h4>
            <div className="grid grid-cols-3 gap-2">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1519681393784-d8e5b5a4570e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              <img src="https://images.unsplash.com/photo-1533240332313-0dbdd3199061?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/10 dark:border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          <p>&copy; 2024 Cherry Experience. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
