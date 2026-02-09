'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
  darkOverlay?: boolean
}

export default function Header({ darkOverlay = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navClasses = darkOverlay
    ? 'text-white'
    : 'text-brand-dark'

  return (
    <>
      {/* Top Bar */}
      <div className={`absolute top-0 w-full z-50 text-xs py-2 border-b ${darkOverlay ? 'text-white/90 border-white/10 bg-brand-dark/20' : 'text-brand-dark border-brand-dark/10 bg-brand-light/95'} backdrop-blur-sm`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span><i className="fas fa-phone-alt mr-2 text-brand-primary"></i> +56 9 1234 5678</span>
            <Link href="/contacto" className="hover:text-brand-primary transition">
              <span><i className="fas fa-envelope mr-2 text-brand-primary"></i> contacto@cherryexperience.cl</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <span className="opacity-70">Síguenos:</span>
            <a href="#" className="hover:text-brand-primary transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-brand-primary transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-brand-primary transition"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-12 w-full z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between relative">
            {/* Left Menu */}
            <div className={`hidden md:flex space-x-8 font-heading font-bold text-sm tracking-[0.2em] uppercase items-center flex-1 justify-end pr-10 ${navClasses}`}>
              <Link href="/" className="hover:text-brand-primary transition">Inicio</Link>
              <Link href="/rutas" className="hover:text-brand-primary transition">Rutas</Link>
            </div>

            {/* Logo (Center) */}
            <Link href="/" className="flex-none px-4 group cursor-pointer block">
              <img
                src={darkOverlay ? "/logos/che-blanco.svg" : "/logos/che-color.svg"}
                alt="Cherry Experience - Andes of Chile"
                className="h-16 md:h-20 w-auto drop-shadow-lg group-hover:opacity-90 transition duration-500"
              />
            </Link>

            {/* Right Menu */}
            <div className={`hidden md:flex space-x-8 font-heading font-bold text-sm tracking-[0.2em] uppercase items-center flex-1 justify-start pl-10 ${navClasses}`}>
              <Link href="/blog" className="hover:text-brand-primary transition">Blog</Link>
              <Link href="/equipo" className="hover:text-brand-primary transition">Equipo</Link>
              <Link href="/contacto" className="hover:text-brand-primary transition">Contacto</Link>
              <Link href="/reserva" className="ml-auto hover:text-brand-primary transition"><i className="fas fa-calendar-check"></i></Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden absolute right-0 top-2 ${navClasses}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`${mobileMenuOpen ? '' : 'hidden'} md:hidden bg-brand-dark/95 backdrop-blur-md text-white mt-4 p-6 rounded text-center space-y-6 shadow-2xl border-t border-white/10`}>
            <Link href="/" className="block uppercase font-heading tracking-widest text-sm" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
            <Link href="/rutas" className="block uppercase font-heading tracking-widest text-sm" onClick={() => setMobileMenuOpen(false)}>Rutas</Link>
            <Link href="/blog" className="block uppercase font-heading tracking-widest text-sm" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/equipo" className="block uppercase font-heading tracking-widest text-sm" onClick={() => setMobileMenuOpen(false)}>Equipo</Link>
            <Link href="/contacto" className="block uppercase font-heading tracking-widest text-sm" onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
