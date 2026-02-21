'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useTranslation } from 'react-i18next'
import { Link, usePathname } from '@/i18n/navigation'

const SCROLL_THRESHOLD = 80

interface ContactSettings {
  telefono?: string
  email?: string
  instagram?: string
  facebook?: string
  whatsapp?: string
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [contact, setContact] = useState<ContactSettings>({})
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation('nav')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    fetch('/api/settings/contacto')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setContact(data) })
      .catch(() => {})
  }, [])

  const atTop = !scrolled
  const navContentClass = atTop
    ? 'text-white'
    : theme === 'dark'
      ? 'text-white'
      : 'text-brand-dark'

  const headerBgClass = scrolled
    ? theme === 'dark'
      ? 'bg-brand-dark border-gray-800'
      : 'bg-brand-light/95 dark:bg-brand-dark border-brand-dark/10 dark:border-white/10'
    : 'bg-transparent border-transparent'

  const logoSrc = atTop
    ? '/logos/che-blanco-2.svg'
    : theme === 'dark'
      ? '/logos/che-blanco-2.svg'
      : '/logos/che-color.svg'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 ${headerBgClass}`}
    >
      <div className={`hidden md:block text-xs py-2 border-b transition-colors duration-300 ${atTop ? 'text-white/90 border-white/10 bg-transparent' : theme === 'dark' ? 'text-gray-300 border-white/10 bg-brand-dark' : 'text-brand-dark border-brand-dark/10 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span><i className="fas fa-phone-alt mr-2 text-brand-primary"></i> {contact.telefono || '+56 9 1234 5678'}</span>
            <Link href="/contacto" className="hover:text-brand-primary transition">
              <span><i className="fas fa-envelope mr-2 text-brand-primary"></i> {contact.email || 'contacto@cherryexperience.cl'}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="opacity-70">{t('followUs')}</span>
            <a href={contact.instagram || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition"><i className="fab fa-instagram"></i></a>
            <a href={contact.facebook || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition"><i className="fab fa-facebook-f"></i></a>
            <a href={contact.whatsapp || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition"><i className="fab fa-whatsapp"></i></a>
            <span className="opacity-70 ml-2">
              <Link href={pathname} locale="es" className="hover:text-brand-primary transition font-bold">ES</Link>
              <span className="mx-1">|</span>
              <Link href={pathname} locale="en" className="hover:text-brand-primary transition font-bold">EN</Link>
            </span>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0 group cursor-pointer block">
            <img
              src={logoSrc}
              alt="Cherry Experience - Andes of Chile"
              className="h-14 md:h-16 w-auto drop-shadow-lg group-hover:opacity-90 transition duration-300"
            />
          </Link>

          <div className={`hidden md:flex items-center gap-6 lg:gap-8 font-heading font-bold text-sm tracking-[0.2em] uppercase ${navContentClass}`}>
            <Link href="/" className="hover:text-brand-primary transition">{t('home')}</Link>
            <Link href="/rutas" className="hover:text-brand-primary transition">{t('routes')}</Link>
            <Link href="/blog" className="hover:text-brand-primary transition">{t('blog')}</Link>
            <Link href="/equipo" className="hover:text-brand-primary transition">{t('team')}</Link>
            <Link href="/contacto" className="hover:text-brand-primary transition">{t('contact')}</Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:opacity-80 transition"
              aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
            >
              {theme === 'dark' ? <i className="fas fa-sun text-lg" /> : <i className="fas fa-moon text-lg" />}
            </button>
            <span className="flex items-center gap-2">
              <Link href={pathname} locale="es" className="hover:text-brand-primary transition text-xs">ES</Link>
              <span className="opacity-70">|</span>
              <Link href={pathname} locale="en" className="hover:text-brand-primary transition text-xs">EN</Link>
            </span>
            <Link href="/reserva" className="hover:text-brand-primary transition" title={t('book')}>
              <i className="fas fa-calendar-check text-lg"></i>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full ${navContentClass}`}
              aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
            >
              {theme === 'dark' ? <i className="fas fa-sun text-lg" /> : <i className="fas fa-moon text-lg" />}
            </button>
            <button
              type="button"
              className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors duration-300 ${
                mobileMenuOpen
                  ? theme === 'dark'
                    ? 'bg-brand-dark text-white'
                    : 'bg-brand-light text-brand-dark'
                  : navContentClass
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t('openMenu')}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 py-4 px-4 -mx-6 rounded-lg border-t border-current border-opacity-10 transition-colors duration-300 ${mobileMenuOpen ? (theme === 'dark' ? 'bg-brand-dark' : 'bg-brand-light') : (scrolled ? (theme === 'dark' ? 'bg-brand-dark' : 'bg-brand-light') : 'bg-transparent')}`}>
          <div className="flex flex-col gap-1">
            <Link href="/" className="py-3 uppercase font-heading tracking-widest text-sm hover:text-brand-primary transition" onClick={() => setMobileMenuOpen(false)}>{t('home')}</Link>
            <Link href="/rutas" className="py-3 uppercase font-heading tracking-widest text-sm hover:text-brand-primary transition" onClick={() => setMobileMenuOpen(false)}>{t('routes')}</Link>
            <Link href="/blog" className="py-3 uppercase font-heading tracking-widest text-sm hover:text-brand-primary transition" onClick={() => setMobileMenuOpen(false)}>{t('blog')}</Link>
            <Link href="/equipo" className="py-3 uppercase font-heading tracking-widest text-sm hover:text-brand-primary transition" onClick={() => setMobileMenuOpen(false)}>{t('team')}</Link>
            <Link href="/contacto" className="py-3 uppercase font-heading tracking-widest text-sm hover:text-brand-primary transition" onClick={() => setMobileMenuOpen(false)}>{t('contact')}</Link>
            <Link href="/reserva" className="py-3 uppercase font-heading tracking-widest text-sm hover:text-brand-primary transition flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <i className="fas fa-calendar-check"></i> {t('book')}
            </Link>
            <div className="flex gap-4 py-3 border-t border-current border-opacity-10 mt-2 pt-4">
              <Link href={pathname} locale="es" className="uppercase font-heading text-sm hover:text-brand-primary" onClick={() => setMobileMenuOpen(false)}>ES</Link>
              <Link href={pathname} locale="en" className="uppercase font-heading text-sm hover:text-brand-primary" onClick={() => setMobileMenuOpen(false)}>EN</Link>
            </div>
            <button
              type="button"
              onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 py-3 uppercase font-heading tracking-widest text-sm border-t border-current border-opacity-10 mt-2 pt-4"
              aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
            >
              {theme === 'dark' ? <i className="fas fa-sun" /> : <i className="fas fa-moon" />}
              {theme === 'dark' ? t('lightMode') : t('darkMode')}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
