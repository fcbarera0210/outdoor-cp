'use client'

import { useEffect, useRef } from 'react'

export default function MNTNDemo() {
  const fadeRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Image fallback handler
    const images = document.querySelectorAll('img[src*="unsplash.com"]')
    const fallbackImages = [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    ]

    images.forEach((img) => {
      img.addEventListener('error', function() {
        const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)]
        ;(this as HTMLImageElement).src = randomFallback
      })
    })

    // Fade-in animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    fadeRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      fadeRefs.current.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <div className="bg-mntn-bg text-white font-manrope overflow-x-hidden scroll-smooth">
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 py-8 px-8 md:px-16 flex justify-between items-center">
        <div className="text-2xl font-playfair font-bold tracking-wider hover:text-mntn-gold transition cursor-pointer">MNTN</div>
        <div className="hidden md:flex space-x-10 text-sm font-bold tracking-wide">
          <a href="#equipment" className="hover:text-mntn-gold transition">Equipo</a>
          <a href="#about" className="hover:text-mntn-gold transition">Nosotros</a>
          <a href="#blog" className="hover:text-mntn-gold transition">Blog</a>
        </div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <i className="far fa-user-circle text-xl group-hover:text-mntn-gold transition"></i>
          <span className="text-sm font-bold group-hover:text-mntn-gold transition">Cuenta</span>
        </div>
      </nav>

      {/* Side Indicators */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-6 mix-blend-difference">
        <div className="vertical-text-left text-xs font-bold tracking-widest text-white/70">Síguenos</div>
        <div className="w-px h-12 bg-white/50"></div>
        <a href="#" className="text-white hover:text-mntn-gold transition"><i className="fab fa-instagram"></i></a>
        <a href="#" className="text-white hover:text-mntn-gold transition"><i className="fab fa-twitter"></i></a>
      </div>

      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-8 text-right font-bold text-xs">
        <div className="flex items-center gap-4 text-white hover:text-mntn-gold transition cursor-pointer border-r-2 border-transparent hover:border-mntn-gold pr-2">Start <span className="text-[10px] opacity-50">01</span></div>
        <div className="flex items-center gap-4 text-white/50 hover:text-mntn-gold transition cursor-pointer pr-2">01 <span className="text-[10px] opacity-50">02</span></div>
        <div className="flex items-center gap-4 text-white/50 hover:text-mntn-gold transition cursor-pointer pr-2">02 <span className="text-[10px] opacity-50">03</span></div>
        <div className="flex items-center gap-4 text-white/50 hover:text-mntn-gold transition cursor-pointer pr-2">03 <span className="text-[10px] opacity-50">04</span></div>
      </div>

      {/* Hero Section */}
      <header className="relative h-[120vh] w-full">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover object-center"
            alt="Mountain Header"
          />
          <div className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-t from-mntn-bg via-mntn-bg/80 to-transparent"></div>
          <div className="absolute inset-0 bg-mntn-bg/20"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 h-screen flex flex-col justify-center max-w-6xl pt-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[2px] bg-mntn-gold"></div>
              <span className="text-mntn-gold font-bold tracking-[0.4em] uppercase text-xs md:text-sm">Una Guía de Senderismo</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-medium leading-tight mb-8 capitalize">
              Prepárate para la <br /> montaña y más allá
            </h1>
            
            <div className="flex items-center gap-4 text-white font-bold text-sm cursor-pointer animate-bounce mt-8">
              <span>Desliza hacia abajo</span>
              <i className="fas fa-arrow-down"></i>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 -mt-40 container mx-auto px-6 md:px-12 max-w-6xl pb-32">
        {/* Section 01: Image Right */}
        <section className="flex flex-col md:flex-row items-center gap-12 md:gap-24 fade-in-section" ref={(el) => { fadeRefs.current[0] = el }}>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-24 -left-12 text-[180px] md:text-[240px] font-bold text-outline opacity-30 select-none z-0">01</div>
            
            <div className="relative z-10 pt-10 pl-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-mntn-gold"></div>
                <span className="text-mntn-gold font-bold tracking-[0.4em] uppercase text-xs">Comenzando</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-playfair font-semibold mb-6 leading-tight">
                ¿Qué nivel de <br /> excursionista eres?
              </h2>
              <p className="text-mntn-gray leading-relaxed mb-8 text-sm md:text-base font-light">
                Determinar qué nivel de excursionista eres puede ser una herramienta importante al planificar futuras caminatas. Esta guía de nivel de senderismo te ayudará a planificar rutas de acuerdo con diferentes clasificaciones establecidas por varios sitios web como All Trails y Modern Hiker.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-mntn-gold hover:text-white transition font-bold text-sm">
                Leer más <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-in-out"
                alt="Section 01"
              />
            </div>
          </div>
        </section>

        {/* Section 02: Image Left */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 fade-in-section" id="equipment" ref={(el) => { fadeRefs.current[1] = el }}>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-24 -left-12 text-[180px] md:text-[240px] font-bold text-outline opacity-30 select-none z-0">02</div>
            
            <div className="relative z-10 pt-10 pl-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-mntn-gold"></div>
                <span className="text-mntn-gold font-bold tracking-[0.4em] uppercase text-xs">Esenciales de Montaña</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-playfair font-semibold mb-6 leading-tight">
                Eligiendo el equipo <br /> correcto
              </h2>
              <p className="text-mntn-gray leading-relaxed mb-8 text-sm md:text-base font-light">
                Lo bueno de comenzar a hacer senderismo es que realmente no necesitas ningún equipo especial; probablemente ya tengas algo para salir. Comienza con ropa cómoda y zapatillas resistentes.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-mntn-gold hover:text-white transition font-bold text-sm">
                Leer más <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-in-out"
                alt="Section 02"
              />
            </div>
          </div>
        </section>

        {/* Section 03: Image Right */}
        <section className="flex flex-col md:flex-row items-center gap-12 md:gap-24 fade-in-section" ref={(el) => { fadeRefs.current[2] = el }}>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-24 -left-12 text-[180px] md:text-[240px] font-bold text-outline opacity-30 select-none z-0">03</div>
            
            <div className="relative z-10 pt-10 pl-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-mntn-gold"></div>
                <span className="text-mntn-gold font-bold tracking-[0.4em] uppercase text-xs">Donde ir</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-playfair font-semibold mb-6 leading-tight">
                Entiende tu mapa <br /> y tiempos
              </h2>
              <p className="text-mntn-gray leading-relaxed mb-8 text-sm md:text-base font-light">
                Para empezar, busca rutas cerca de ti. La mayoría son senderos circulares de pocas horas. Con el tiempo, podrás planificar rutas más largas en parques nacionales como Torres del Paine o Villarrica.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-mntn-gold hover:text-white transition font-bold text-sm">
                Leer más <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-in-out"
                alt="Section 03"
              />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 fade-in-section" ref={(el) => { fadeRefs.current[3] = el }}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-mntn-gold"></div>
              <span className="text-mntn-gold font-bold tracking-[0.4em] uppercase text-xs">Galería</span>
              <div className="w-8 h-[2px] bg-mntn-gold"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair font-semibold">Vistas Inolvidables</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-64 overflow-hidden rounded-sm relative group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                alt="Gallery 1"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition"></div>
            </div>
            <div className="h-64 overflow-hidden rounded-sm relative group cursor-pointer md:col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                alt="Gallery 2"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition"></div>
            </div>
            <div className="h-64 overflow-hidden rounded-sm relative group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                alt="Gallery 3"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition"></div>
            </div>
          </div>
        </section>

        {/* Próximas Salidas Section */}
        <section id="proximas-salidas-section" className="py-20 bg-[#0c1f28] relative mt-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-8 h-[2px] bg-mntn-gold"></div>
              <span className="text-mntn-gold font-bold tracking-[0.4em] uppercase text-xs">Próximas Salidas</span>
              <div className="w-8 h-[2px] bg-mntn-gold"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-center mb-12 text-white">Temporada 2025</h2>
            
            <div className="space-y-4">
              {/* Date Item 1 */}
              <div className="group bg-[#0c1f28] border border-white/10 hover:border-mntn-gold/50 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer hover:bg-[#0f2532]">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="bg-mntn-gold text-mntn-bg px-6 py-4 rounded-sm text-sm font-bold uppercase tracking-widest w-full md:w-40 text-center">
                    Ene 15 - 20
                  </div>
                  <div className="flex flex-col">
                    <span className="font-playfair font-semibold text-xl text-white">Ruta de los Glaciares</span>
                    <span className="text-xs text-mntn-gray uppercase tracking-wider mt-1">5 días / 4 noches</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-mntn-bg" src="https://ui-avatars.com/api/?name=male-32&size=80&background=random" alt="" />
                    <img className="w-8 h-8 rounded-full border-2 border-mntn-bg" src="https://ui-avatars.com/api/?name=female-44&size=80&background=random" alt="" />
                    <div className="w-8 h-8 rounded-full border-2 border-mntn-bg bg-white/10 flex items-center justify-center text-xs font-bold text-mntn-gray">+4</div>
                  </div>
                  <span className="text-xs font-bold text-green-400 bg-green-400/20 px-4 py-2 rounded-full">Cupos Disponibles</span>
                  <div className="w-12 h-12 rounded-full bg-mntn-gold text-mntn-bg flex items-center justify-center group-hover:bg-white transition shadow-sm">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>

              {/* Date Item 2 */}
              <div className="group bg-[#0c1f28] border border-white/10 hover:border-mntn-gold/50 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer hover:bg-[#0f2532]">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="bg-mntn-gold text-mntn-bg px-6 py-4 rounded-sm text-sm font-bold uppercase tracking-widest w-full md:w-40 text-center">
                    Feb 05 - 10
                  </div>
                  <div className="flex flex-col">
                    <span className="font-playfair font-semibold text-xl text-white">Circuito W - Paine</span>
                    <span className="text-xs text-mntn-gray uppercase tracking-wider mt-1">Full Experience</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-mntn-bg" src="https://ui-avatars.com/api/?name=female-68&size=80&background=random" alt="" />
                    <img className="w-8 h-8 rounded-full border-2 border-mntn-bg" src="https://ui-avatars.com/api/?name=male-11&size=80&background=random" alt="" />
                    <div className="w-8 h-8 rounded-full border-2 border-mntn-bg bg-white/10 flex items-center justify-center text-xs font-bold text-mntn-gray">+12</div>
                  </div>
                  <span className="text-xs font-bold text-mntn-gold bg-mntn-gold/20 px-4 py-2 rounded-full">Últimos Cupos</span>
                  <div className="w-12 h-12 rounded-full bg-mntn-gold text-mntn-bg flex items-center justify-center group-hover:bg-white transition shadow-sm">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking / Contact Form */}
        <section className="max-w-4xl mx-auto py-20 bg-[#0c1f28] p-10 md:p-16 rounded-sm border border-white/5 fade-in-section shadow-2xl relative overflow-hidden mt-20" ref={(el) => { fadeRefs.current[4] = el }}>
          <div className="absolute -top-20 -right-20 text-[300px] text-outline opacity-10 font-playfair select-none pointer-events-none">?</div>

          <div className="relative z-10">
            <h3 className="text-3xl font-playfair font-semibold mb-2">Únete a la Aventura</h3>
            <p className="text-mntn-gray text-sm mb-10 font-light">Reserva tu cupo para la próxima temporada de ascensos.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-mntn-gold font-bold">Nombre Completo</label>
                <input type="text" className="input-dark py-2" placeholder="Juan Pérez" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-mntn-gold font-bold">Email</label>
                <input type="email" className="input-dark py-2" placeholder="tu@email.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-mntn-gold font-bold">Destino de Interés</label>
                <select className="input-dark py-2 bg-transparent appearance-none cursor-pointer">
                  <option className="text-black">Patagonia Sur</option>
                  <option className="text-black">Desierto Atacama</option>
                  <option className="text-black">Andes Central</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <button className="bg-mntn-gold text-mntn-bg font-bold uppercase tracking-widest py-3 hover:bg-white transition duration-300">
                  Consultar Disponibilidad
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#09161d] pt-20 pb-10 mt-20 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-sm">
              <h2 className="text-2xl font-playfair font-bold tracking-wider text-white mb-6">MNTN</h2>
              <p className="text-mntn-gray text-sm leading-relaxed mb-6 font-light">
                Prepárate para la montaña y más allá. Somos una comunidad de amantes de la naturaleza dedicados a explorar los rincones más remotos de Chile.
              </p>
              <p className="text-xs text-white/40">© 2024 MNTN Inc. Todos los derechos reservados.</p>
            </div>

            <div className="flex gap-16 md:gap-24">
              <div>
                <h4 className="text-mntn-gold font-bold uppercase tracking-widest text-sm mb-6">Blog</h4>
                <ul className="space-y-4 text-sm font-medium text-white/80">
                  <li><a href="#" className="hover:text-white transition">Lugares</a></li>
                  <li><a href="#" className="hover:text-white transition">Equipo</a></li>
                  <li><a href="#" className="hover:text-white transition">Guías</a></li>
                  <li><a href="#" className="hover:text-white transition">Historias</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-mntn-gold font-bold uppercase tracking-widest text-sm mb-6">MNTN</h4>
                <ul className="space-y-4 text-sm font-medium text-white/80">
                  <li><a href="#" className="hover:text-white transition">Equipo</a></li>
                  <li><a href="#" className="hover:text-white transition">Trabajos</a></li>
                  <li><a href="#" className="hover:text-white transition">Prensa</a></li>
                  <li><a href="#" className="hover:text-white transition">Contacto</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
