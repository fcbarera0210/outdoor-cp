'use client'

import { Fragment, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Skeleton, SkeletonLine, SkeletonImage, SkeletonAvatar } from '@/components/ui/Skeleton'
import type { HomeData } from '@/services/home'
import type { Ruta } from '@/services/rutas'
import type { HomeSectionsSettings } from '@/services/settings'

const sectionView = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
}

const DEFAULT_SECTION_ORDER = ['partners', 'featuredSection', 'gallery', 'salidasSection', 'reserva']

interface AndesTrekDemoProps {
  loading?: boolean
  homeData?: HomeData | null
  featuredRutas?: Ruta[]
  homeSections?: HomeSectionsSettings | null
}

export default function AndesTrekDemo({ loading, homeData, featuredRutas, homeSections }: AndesTrekDemoProps) {
  const hero = homeData?.hero as Record<string, string> | undefined
  const partners = homeData?.partners as Record<string, string>[] | undefined
  const featuredSection = homeData?.featuredSection as Record<string, string> | undefined
  const gallery = homeData?.gallery as (Record<string, string> & { imagen?: string; enlace?: string; orden?: number })[] | undefined
  const gallerySection = homeData?.gallerySection as Record<string, string> | undefined
  const salidasSection = homeData?.salidasSection as Record<string, string> | undefined
  const reserva = homeData?.reserva as Record<string, string> | undefined

  const order = (homeSections?.order?.length ? homeSections.order : DEFAULT_SECTION_ORDER).filter((id) =>
    DEFAULT_SECTION_ORDER.includes(id)
  )
  const visibility = homeSections?.visibility ?? {}
  const toShow = order.filter((type) => visibility[type] !== false)

  useEffect(() => {
    if (loading) return
    const images = document.querySelectorAll('img[src*="unsplash.com"]')
    const fallbackImages = [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    ]
    images.forEach((img) => {
      img.addEventListener('error', () => {
        const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)]
        ;(img as HTMLImageElement).src = randomFallback
      })
    })
  }, [loading])

  if (loading) {
    return (
      <div>
        <header className="relative h-screen min-h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden pt-[120px]">
          <div className="absolute inset-0 z-0 bg-gray-800" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark/30" />
          <div className="relative z-10 text-center text-white px-4 max-w-5xl flex flex-col items-center">
            <Skeleton className="h-8 w-48 mb-4 bg-white/20" />
            <Skeleton className="h-14 w-80 max-w-full mb-2 bg-white/20" />
            <Skeleton className="h-14 w-72 max-w-full mb-6 bg-white/20" />
            <SkeletonLine className="w-96 max-w-full h-5 mb-10 bg-white/20" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-40 bg-white/20" />
              <Skeleton className="h-12 w-40 bg-white/20" />
            </div>
          </div>
          <div className="torn-separator-bottom" />
        </header>
        <section className="py-16 bg-brand-light dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="h-12 w-24 rounded" />
                  <SkeletonLine className="w-16 mt-2" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-brand-light dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-20">
              <SkeletonLine className="w-40 h-6 mx-auto mb-2" />
              <Skeleton className="h-12 w-96 max-w-full mx-auto" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
              <div className="w-full md:w-1/2">
                <SkeletonImage className="h-[400px] rounded-lg" aspectRatio="" />
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                <SkeletonLine className="w-3/4" />
                <Skeleton className="h-10 w-full" />
                <SkeletonLine className="w-full" />
                <SkeletonLine className="w-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-20">
              <div className="w-full md:w-1/2">
                <SkeletonImage className="h-[400px] rounded-lg" aspectRatio="" />
              </div>
              <div className="w-full md:w-1/2 space-y-3 md:text-right">
                <SkeletonLine className="w-3/4 md:ml-auto" />
                <Skeleton className="h-10 w-full" />
                <SkeletonLine className="w-full" />
                <SkeletonLine className="w-full" />
                <Skeleton className="h-4 w-32 md:ml-auto" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-brand-gray dark:bg-gray-800">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-gray-300 dark:border-gray-600">
              <div>
                <SkeletonLine className="w-48 h-6 mb-1" />
                <Skeleton className="h-10 w-64" />
              </div>
              <Skeleton className="h-4 w-36 mt-4 md:mt-0" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <SkeletonImage key={i} className={`h-[450px] ${i === 2 ? 'mt-0 md:-mt-8' : ''}`} aspectRatio="" />
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-brand-light dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <SkeletonLine className="w-40 h-6 mx-auto mb-2" />
              <Skeleton className="h-12 w-72 mx-auto" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-brand-light dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <Skeleton className="h-14 w-40 rounded-lg" />
                    <div className="flex flex-col gap-2">
                      <SkeletonLine className="w-48" />
                      <SkeletonLine className="w-24" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <SkeletonAvatar size="w-8 h-8" />
                      <SkeletonAvatar size="w-8 h-8" />
                    </div>
                    <Skeleton className="h-8 w-28 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 relative bg-brand-dark overflow-hidden">
          <div className="torn-separator-top" />
          <div className="absolute inset-0 z-0 bg-gray-800/50" />
          <div className="container mx-auto px-6 relative z-10 max-w-5xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                <Skeleton className="h-14 w-12 rounded bg-white/20" />
                <Skeleton className="h-16 w-full max-w-md bg-white/20" />
                <SkeletonLine className="w-full max-w-sm h-5 bg-white/20" />
                <div className="space-y-2">
                  <SkeletonLine className="w-48 h-4 bg-white/20" />
                  <SkeletonLine className="w-56 h-4 bg-white/20" />
                  <SkeletonLine className="w-40 h-4 bg-white/20" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 rounded-lg bg-white/5 p-8 border border-white/10 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <SkeletonLine className="w-20 h-3 bg-white/20" />
                    <Skeleton className="h-10 bg-white/10" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonLine className="w-20 h-3 bg-white/20" />
                    <Skeleton className="h-10 bg-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <SkeletonLine className="w-28 h-3 bg-white/20" />
                  <Skeleton className="h-10 bg-white/10" />
                </div>
                <div className="space-y-2">
                  <SkeletonLine className="w-24 h-3 bg-white/20" />
                  <Skeleton className="h-16 bg-white/10" />
                </div>
                <Skeleton className="h-14 w-full rounded-lg bg-white/20" />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section: empieza en el top; pt reserva espacio para el header fijo */}
      <header className="relative h-screen min-h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden pt-[120px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={hero?.imagenHero ?? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'} 
            alt="Paisaje Montañas" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark/30"></div>
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-5xl mt-0"
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
        >
          <motion.div
            variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className="text-xs md:text-sm font-heading tracking-[0.3em] uppercase mb-4 text-brand-primary font-bold bg-brand-dark/40 inline-block px-4 py-1 rounded backdrop-blur-sm"
          >
            <i className="fas fa-mountain mr-2"></i> {hero?.temporada ?? 'Temporada 2024 / 2025'}
          </motion.div>
          
          <motion.h2
            variants={{ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase leading-none mb-6 drop-shadow-2xl tracking-tight"
          >
            {hero?.titulo ? (() => {
              const parts = hero.titulo.split(' ')
              const last = parts.pop()
              return parts.length ? <>{parts.join(' ')} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">{last}</span></> : <>{hero.titulo}</>
            })() : <>Patagonia <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">Sin Límites</span></>}
          </motion.h2>
          
          <motion.p
            variants={{ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className="text-sm md:text-lg max-w-2xl mx-auto mb-10 font-light text-gray-200 tracking-wide leading-relaxed"
          >
            {hero?.subtitulo ?? 'Descubre los senderos más prístinos del sur del mundo. Guiamos tus pasos por glaciares milenarios, bosques nativos y las cumbres más imponentes de los Andes.'}
          </motion.p>
          
          <motion.div
            variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link href="/rutas" className="rounded-lg bg-brand-primary hover:bg-brand-light hover:text-brand-primary text-white font-heading font-bold uppercase text-xs tracking-widest px-10 py-4 transition duration-300 shadow-lg text-center">
              {hero?.cta1 ?? 'Ver Expediciones'}
            </Link>
            <Link href="/equipo" className="rounded-lg border border-white hover:bg-brand-light hover:text-brand-dark text-white font-heading font-bold uppercase text-xs tracking-widest px-10 py-4 transition duration-300 text-center">
              {hero?.cta2 ?? 'Nuestro Equipo'}
            </Link>
          </motion.div>
        </motion.div>

        {/* Rustic Torn Separator (Bottom) */}
        <div className="torn-separator-bottom"></div>
      </header>

      {toShow.map((sectionType) => (
        <Fragment key={sectionType}>
          {sectionType === 'partners' && (
      <motion.section
        className="py-16 bg-brand-light dark:bg-gray-900"
        {...sectionView}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {partners?.length ? partners.map((p, i) => (
              <div key={i} className="flex flex-col items-center group">
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.nombre ?? ''}
                    className="h-12 w-auto max-w-[120px] object-contain mb-2 opacity-70 group-hover:opacity-100 transition"
                  />
                ) : (
                  <i className="fas fa-hiking text-4xl mb-2 text-brand-dark dark:text-gray-300 group-hover:text-brand-primary transition"></i>
                )}
                <span className="font-heading font-bold text-xs tracking-widest uppercase text-brand-dark dark:text-gray-300">{p.nombre ?? ''}</span>
              </div>
            )) : (
              <>
                <div className="flex flex-col items-center group">
                  <i className="fas fa-hiking text-4xl mb-2 text-brand-dark dark:text-gray-300 group-hover:text-brand-primary transition"></i>
                  <span className="font-heading font-bold text-xs tracking-widest uppercase text-brand-dark dark:text-gray-300">Trek Chile</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-heading font-bold text-2xl tracking-tighter text-brand-dark dark:text-white uppercase border-b-2 border-brand-primary pb-1">SERNATUR <i className="fas fa-check-circle text-xs align-top text-brand-primary"></i></span>
                </div>
                <div className="flex flex-col items-center border-2 border-brand-dark dark:border-gray-400 p-2 px-3 rounded-lg">
                  <span className="font-heading font-bold text-sm uppercase text-brand-dark dark:text-gray-300">Guías</span>
                  <span className="text-[9px] uppercase tracking-widest text-brand-primary font-bold">Certificados</span>
                </div>
                <div className="flex flex-col items-center group">
                  <i className="fas fa-mountain text-3xl mb-1 text-brand-dark dark:text-gray-300 group-hover:text-brand-primary transition"></i>
                  <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase text-brand-dark dark:text-gray-300">Andes</span>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.section>
          )}
          {sectionType === 'featuredSection' && (
      <motion.section
        className="py-20 bg-brand-light dark:bg-gray-900 bg-topo-pattern relative"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="font-script text-brand-earth dark:text-gray-400 text-2xl mb-2">{featuredSection?.subtitulo ?? 'Vive la experiencia'}</p>
            <h3 className="text-4xl md:text-5xl font-heading font-bold uppercase text-brand-dark dark:text-white">
              {featuredSection?.titulo && featuredSection?.tituloDestacado ? (
                (() => {
                  const [before, ...rest] = (featuredSection.titulo || '').split(featuredSection.tituloDestacado)
                  const after = rest.join(featuredSection.tituloDestacado)
                  return <>{before}<span className="text-brand-primary underline decoration-brand-primary/30 decoration-4 underline-offset-4">{featuredSection.tituloDestacado}</span>{after}</>
                })()
              ) : featuredSection?.titulo ? (
                featuredSection.titulo
              ) : (
                <>Nuestras <span className="text-brand-primary underline decoration-brand-primary/30 decoration-4 underline-offset-4">Rutas</span> Destacadas</>
              )}
            </h3>
          </div>

          {featuredRutas && featuredRutas.length > 0 ? (
            featuredRutas.slice(0, 2).map((ruta, idx) => (
              <motion.div
                key={ruta.slug}
                className={`flex flex-col md:flex-row items-center gap-12 mb-24 ${idx === 1 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={`w-full md:w-1/2 relative group ${idx === 1 ? 'md:order-2' : ''}`}>
                  <div className={`p-2 bg-gray-100 shadow-xl transform transition duration-500 group-hover:rotate-0 ${idx === 0 ? 'rotate-1' : '-rotate-1'}`}>
                    <div className="overflow-hidden relative h-[400px]">
                      <img src={ruta.imagen || 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={ruta.nombre} className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110" />
                    </div>
                  </div>
                  <div className={`absolute -top-4 rounded-lg bg-brand-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg z-10 ${idx === 0 ? '-left-4' : '-right-4'}`}>
                    <i className="fas fa-map-marker-alt mr-2"></i> {ruta.zona}
                  </div>
                </div>
                <div className={`w-full md:w-1/2 ${idx === 0 ? 'md:pl-10' : 'md:pr-10'} text-left ${idx === 1 ? 'md:text-right' : ''}`}>
                  <div className={`text-xs text-brand-earth mb-3 font-heading uppercase tracking-widest font-bold flex items-center ${idx === 1 ? 'justify-start md:justify-end' : ''}`}>
                    <i className="far fa-clock mr-1"></i> {ruta.duracion} <span className="mx-2 text-gray-300">|</span> Dificultad: {ruta.dificultad}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-tight mb-6 text-brand-dark dark:text-white">
                    {ruta.nombre}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light text-lg">
                    {ruta.descripcion}
                  </p>
                  <Link href={`/rutas/${ruta.slug}`} className={`inline-flex items-center text-brand-dark dark:text-white font-heading font-bold uppercase text-sm tracking-widest hover:text-brand-primary transition group ${idx === 1 ? 'flex-row-reverse' : ''}`}>
                    Ver Itinerario <span className={`bg-brand-primary w-8 h-[2px] ${idx === 1 ? 'mr-3' : 'ml-3'} group-hover:w-12 transition-all duration-300`}></span>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <>
              <motion.div className="flex flex-col md:flex-row items-center gap-12 mb-24" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5 }}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="p-2 bg-gray-100 shadow-xl transform rotate-1 transition duration-500 group-hover:rotate-0">
                    <div className="overflow-hidden relative h-[400px]">
                      <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Trekking" className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110" />
                    </div>
                  </div>
                  <div className="absolute -top-4 -left-4 rounded-lg bg-brand-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg z-10">
                    <i className="fas fa-map-marker-alt mr-2"></i> Patagonia
                  </div>
                </div>
                <div className="w-full md:w-1/2 md:pl-10">
                  <div className="text-xs text-brand-earth mb-3 font-heading uppercase tracking-widest font-bold">
                    <i className="far fa-clock mr-1"></i> 5 Días / 4 Noches <span className="mx-2 text-gray-300">|</span> Dificultad: Media
                  </div>
                  <h4 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-tight mb-6 text-brand-dark dark:text-white">Circuito W: <br /> El Corazón de Paine</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light text-lg">Una travesía inolvidable por los senderos más icónicos del Parque Nacional Torres del Paine.</p>
                  <Link href="/rutas/circuito-w" className="inline-flex items-center text-brand-dark dark:text-white font-heading font-bold uppercase text-sm tracking-widest hover:text-brand-primary transition group">Ver Itinerario <span className="bg-brand-primary w-8 h-[2px] ml-3 group-hover:w-12 transition-all duration-300"></span></Link>
                </div>
              </motion.div>
              <motion.div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="p-2 bg-gray-100 shadow-xl transform -rotate-1 transition duration-500 group-hover:rotate-0">
                    <div className="overflow-hidden relative h-[400px]">
                      <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Nature" className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110" />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 rounded-lg bg-brand-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg z-10">
                    <i className="fas fa-map-marker-alt mr-2"></i> Araucanía
                  </div>
                </div>
                <div className="w-full md:w-1/2 md:pr-10 text-left md:text-right">
                  <div className="text-xs text-brand-earth mb-3 font-heading uppercase tracking-widest font-bold flex items-center justify-start md:justify-end">
                    <i className="far fa-clock mr-1"></i> Full Day <span className="mx-2 text-gray-300">|</span> Dificultad: Alta
                  </div>
                  <h4 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-tight mb-6 text-brand-dark dark:text-white">Ascenso al Cráter: <br /> Volcán Villarrica</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light text-lg">Desafía tus límites con el ascenso a uno de los volcanes más activos de Sudamérica.</p>
                  <Link href="/rutas/volcan-villarrica" className="inline-flex items-center flex-row-reverse text-brand-dark dark:text-white font-heading font-bold uppercase text-sm tracking-widest hover:text-brand-primary transition group">Ver Itinerario <span className="bg-brand-primary w-8 h-[2px] mr-3 group-hover:w-12 transition-all duration-300"></span></Link>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.section>
          )}
          {sectionType === 'gallery' && (
      <motion.section
        className="py-20 bg-brand-gray dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        {...sectionView}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-gray-300">
            <div>
              <p className="font-script text-brand-primary text-2xl mb-1">{gallerySection?.subtitulo ?? 'Galería de Aventuras'}</p>
              <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase text-brand-dark dark:text-white">{gallerySection?.titulo ?? 'Momentos en la Montaña'}</h3>
            </div>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 hover:text-brand-primary transition">{gallerySection?.link ?? 'Ver Todo en Instagram'} <i className="fab fa-instagram ml-2"></i></a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery?.length ? gallery.slice(0, 3).map((item, i) => (
              <motion.div
                key={i}
                className={`group relative overflow-hidden h-[450px] hover-zoom cursor-pointer shadow-lg ${i === 1 ? 'mt-0 md:-mt-8' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <img src={item.imagen ?? ''} className="w-full h-full object-cover filter brightness-90" alt={item.titulo ?? ''} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <span className="text-[10px] font-bold font-heading rounded-lg bg-brand-primary px-2 py-1 uppercase tracking-widest mb-3 inline-block">{item.titulo ?? ''}</span>
                  <h5 className="text-2xl font-heading font-bold uppercase leading-none">{item.subtitulo ?? ''}</h5>
                </div>
              </motion.div>
            )) : (
              <>
                <motion.div className="group relative overflow-hidden h-[450px] hover-zoom cursor-pointer shadow-lg" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover filter brightness-90" alt="Cajón del Maipo" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <span className="text-[10px] font-bold font-heading rounded-lg bg-brand-primary px-2 py-1 uppercase tracking-widest mb-3 inline-block">Cajón del Maipo</span>
                    <h5 className="text-2xl font-heading font-bold uppercase leading-none">Atardecer Andino</h5>
                  </div>
                </motion.div>
                <motion.div className="group relative overflow-hidden h-[450px] hover-zoom cursor-pointer shadow-lg mt-0 md:-mt-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                  <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover filter brightness-90" alt="Carretera Austral" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <span className="text-[10px] font-bold font-heading rounded-lg bg-brand-primary px-2 py-1 uppercase tracking-widest mb-3 inline-block">Carretera Austral</span>
                    <h5 className="text-2xl font-heading font-bold uppercase leading-none">Bosque Profundo</h5>
                  </div>
                </motion.div>
                <motion.div className="group relative overflow-hidden h-[450px] hover-zoom cursor-pointer shadow-lg" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}>
                  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover filter brightness-90" alt="San Pedro" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <span className="text-[10px] font-bold font-heading rounded-lg bg-brand-primary px-2 py-1 uppercase tracking-widest mb-3 inline-block">San Pedro</span>
                    <h5 className="text-2xl font-heading font-bold uppercase leading-none">Valle de la Luna</h5>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.section>
          )}
          {sectionType === 'salidasSection' && (
      <motion.section
        className="relative py-20 bg-brand-light dark:bg-gray-900 overflow-hidden"
        {...sectionView}
      >
        {/* Marca de agua: logo iso a un costado con ~15% opacidad */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 md:w-80 h-64 md:h-80 pointer-events-none flex items-center justify-center opacity-[0.15]">
          <img
            src="/logos/che-iso-color.svg"
            alt=""
            className="w-full h-full object-contain dark:hidden"
            aria-hidden
          />
          <img
            src="/logos/che-iso-blanco.svg"
            alt=""
            className="w-full h-full object-contain hidden dark:block"
            aria-hidden
          />
        </div>
        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="text-center mb-12">
            <p className="font-script text-brand-earth dark:text-gray-400 text-2xl mb-2">{salidasSection?.subtitulo ?? 'Temporada 2024 / 2025'}</p>
            <h3 className="text-4xl md:text-5xl font-heading font-bold uppercase text-brand-dark dark:text-white">
              {salidasSection?.titulo && salidasSection?.tituloDestacado ? (
                (() => {
                  const [before, ...rest] = (salidasSection.titulo || '').split(salidasSection.tituloDestacado)
                  const after = rest.join(salidasSection.tituloDestacado)
                  return <>{before}<span className="text-brand-primary underline decoration-brand-primary/30 decoration-4 underline-offset-4">{salidasSection.tituloDestacado}</span>{after}</>
                })()
              ) : salidasSection?.titulo ? (
                salidasSection.titulo
              ) : (
                <>Próximas <span className="text-brand-primary underline decoration-brand-primary/30 decoration-4 underline-offset-4">Salidas</span></>
              )}
            </h3>
          </div>
          
          <div className="space-y-4">
            {/* Date Item 1 */}
            <motion.div
              className="group bg-brand-light dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-brand-primary hover:bg-brand-primary/5 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer shadow-sm hover:shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="bg-brand-primary text-white px-6 py-4 rounded-lg text-sm font-heading font-bold uppercase tracking-widest w-full md:w-40 text-center">
                  Ene 15 - 20
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl text-brand-dark dark:text-white uppercase">Ruta de los Glaciares</span>
                  <span className="text-xs font-heading text-brand-earth uppercase tracking-wider mt-1">5 días / 4 noches</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=male-32&size=80&background=random" alt="" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=female-44&size=80&background=random" alt="" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">+4</div>
                </div>
                <span className="text-xs font-heading font-bold text-brand-primary bg-brand-primary/10 px-4 py-2 rounded-full uppercase tracking-widest">Cupos Disponibles</span>
                <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center group-hover:bg-brand-dark transition shadow-sm">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </motion.div>

            {/* Date Item 2 */}
            <motion.div
              className="group bg-brand-light dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-brand-primary hover:bg-brand-primary/5 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer shadow-sm hover:shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="bg-brand-dark text-white px-6 py-4 rounded-lg text-sm font-heading font-bold uppercase tracking-widest w-full md:w-40 text-center">
                  Feb 05 - 10
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl text-brand-dark dark:text-white uppercase">Circuito W - Paine</span>
                  <span className="text-xs font-heading text-brand-earth uppercase tracking-wider mt-1">Full Experience</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=female-68&size=80&background=random" alt="" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=male-11&size=80&background=random" alt="" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">+12</div>
                </div>
                <span className="text-xs font-heading font-bold text-brand-primary bg-brand-primary/20 px-4 py-2 rounded-full uppercase tracking-widest">Últimos Cupos</span>
                <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center group-hover:bg-brand-dark transition shadow-sm">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
          )}
          {sectionType === 'reserva' && (
      <motion.section
        id="reserva"
        className="py-24 relative bg-brand-dark text-white overflow-hidden flex items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="torn-separator-top"></div>

        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-30 grayscale contrast-125"
            alt="Background"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Text Side */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <i className="fas fa-compass text-5xl text-brand-primary mb-6"></i>
              <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-4 leading-none">
                {reserva?.titulo ? (() => {
                  const parts = (reserva.titulo || '').split(' ')
                  const last = parts.pop()
                  return parts.length ? <>{parts.join(' ')} <br /> <span className="text-brand-primary">{last}</span></> : <>{reserva.titulo}</>
                })() : <>Reserva tu <br /> <span className="text-brand-primary">Aventura</span></>}
              </h3>
              <p className="font-light text-gray-400 mb-8 text-lg leading-relaxed">
                {reserva?.texto ?? '¿Listo para desconectar? Cuéntanos qué tipo de experiencia buscas y nuestro equipo de guías expertos te ayudará a planificar la expedición perfecta. Cupos limitados por temporada.'}
              </p>
              <div className="flex flex-col space-y-4 text-sm font-heading tracking-widest text-gray-500">
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-check text-brand-primary mr-3"></i> {reserva?.bullet1 ?? 'Guías Certificados WFR'}
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-check text-brand-primary mr-3"></i> {reserva?.bullet2 ?? 'Equipamiento de Alta Montaña'}
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-check text-brand-primary mr-3"></i> {reserva?.bullet3 ?? 'Transporte Privado'}
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 rounded-lg bg-white/5 backdrop-blur-sm p-8 md:p-10 border border-white/10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand-primary">{reserva?.labelNombre ?? 'Tu Nombre'}</label>
                  <input type="text" className="w-full custom-input text-white pb-2 outline-none" placeholder={reserva?.placeholderNombre ?? 'Ej: Juan Pérez'} />
                </div>
                <div className="group">
                  <label className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand-primary">{reserva?.labelEmail ?? 'Tu Email'}</label>
                  <input type="email" className="w-full custom-input text-white pb-2 outline-none" placeholder={reserva?.placeholderEmail ?? 'correo@ejemplo.com'} />
                </div>
                </div>
                
                <div className="group">
                  <label className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand-primary">{reserva?.labelTipo ?? 'Tipo de Aventura'}</label>
                  <select className="w-full custom-input text-white pb-2 outline-none bg-transparent appearance-none cursor-pointer">
                    <option className="text-brand-dark">Trekking Patagonia (Circuito W)</option>
                    <option className="text-brand-dark">Ascenso Volcán Villarrica</option>
                    <option className="text-brand-dark">Desierto de Atacama</option>
                    <option className="text-brand-dark">Trekking por el día (Zona Central)</option>
                    <option className="text-brand-dark">Expedición a medida</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand-primary">{reserva?.labelMensaje ?? 'Mensaje / Fechas'}</label>
                  <textarea rows={2} className="w-full custom-input text-white pb-2 outline-none resize-none" placeholder={reserva?.placeholderMensaje ?? 'Cuéntanos más...'}></textarea>
                </div>

                <Link href="/reserva" className="block w-full rounded-lg bg-brand-primary hover:bg-brand-light hover:text-brand-dark text-white font-heading font-bold uppercase tracking-[0.2em] py-4 transition duration-300 mt-4 text-center">
                  {reserva?.cta ?? 'Solicitar Reserva'}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </motion.section>
          )}
        </Fragment>
      ))}

    </div>
  )
}
