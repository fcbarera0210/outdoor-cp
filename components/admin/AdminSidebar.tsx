'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useTheme } from '@/components/providers/ThemeProvider'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'fa-home' },
  { href: '/admin/rutas', label: 'Rutas', icon: 'fa-route' },
  { href: '/admin/blog', label: 'Blog', icon: 'fa-newspaper' },
  { href: '/admin/reservas', label: 'Reservas', icon: 'fa-calendar-check' },
  { href: '/admin/contacto', label: 'Contacto', icon: 'fa-address-book' },
  { href: '/admin/equipo', label: 'Equipo', icon: 'fa-users' },
  { href: '/admin/imagenes', label: 'Galería', icon: 'fa-images' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 rounded-lg bg-brand-dark text-white p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-brand-dark text-white transition-transform lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <Link href="/admin/dashboard" className="block" onClick={() => setMobileOpen(false)}>
              <img
                src="/logos/che-blanco-2.svg"
                alt="Cherry Experience"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-xs text-white/60 mt-2 font-heading uppercase tracking-widest">
              Panel Admin
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-heading text-sm uppercase tracking-wider transition ${
                    isActive
                      ? 'bg-brand-primary text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <i className={`fas ${item.icon} w-5`}></i>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition text-sm font-heading uppercase tracking-wider mb-2"
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} w-5`}></i>
              {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </button>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white transition text-sm"
              onClick={() => setMobileOpen(false)}
            >
              <i className="fas fa-external-link-alt w-5"></i>
              Volver al sitio
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition text-sm font-heading uppercase tracking-wider mt-2"
            >
              <i className="fas fa-sign-out-alt w-5"></i>
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}
