'use client'

import { Link } from '@/i18n/navigation'

interface HeroCompactProps {
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href?: string }[]
}

export default function HeroCompact({ title, subtitle, breadcrumb }: HeroCompactProps) {
  return (
    <header className="relative h-[55vh] min-h-[400px] flex flex-col items-center justify-end bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/80"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4 pb-12 md:pb-16">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="text-xs font-heading uppercase tracking-widest mb-4 text-white/80">
            {breadcrumb.map((item, i) => (
              <span key={i}>
                {item.href ? (
                  <Link href={item.href} className="hover:text-brand-primary transition">{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {i < breadcrumb.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight drop-shadow-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-sm md:text-lg font-light text-gray-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
      <div className="torn-separator-bottom absolute bottom-0 left-0 right-0"></div>
    </header>
  )
}
