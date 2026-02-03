'use client'

import { useEffect, useRef } from 'react'

export default function TravelJourneyDemo() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Image fallback handler
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

    // Scroll reveal animation
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const currentRefs = revealRefs.current
    currentRefs.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      currentRefs.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <div className="bg-white text-brand-dark font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 py-6 text-white/90">
        <div className="container mx-auto px-6 flex justify-between items-center text-xs uppercase tracking-widest font-medium">
          <div className="flex items-center gap-2 hover:text-brand-red transition cursor-pointer">
            <i className="fas fa-compass text-2xl animate-pulse"></i>
            <span className="text-lg font-bold">Travel</span>
          </div>
          <div className="hidden md:flex space-x-10">
            <a href="#" className="hover:text-brand-red transition relative group">
              Destinos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-brand-red transition relative group">
              Rutas
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-brand-red transition relative group">
              Tours
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-brand-red transition relative group">
              Reseñas
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
            </a>
          </div>
          <div>
            <i className="fas fa-search cursor-pointer hover:text-brand-red transition transform hover:scale-110"></i>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[90vh] flex flex-col items-center justify-center bg-gray-900 clip-hero shadow-2xl mb-10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Mountain Lake" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white mt-10 px-4 reveal-on-scroll" ref={(el) => { revealRefs.current[0] = el }}>
          <span className="block text-brand-red font-bold tracking-[0.3em] text-xs uppercase mb-4 animate-float">Explora lo desconocido</span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wider mb-6 drop-shadow-2xl">
            Caminos Salvajes
          </h1>
          <p className="text-sm md:text-lg font-light tracking-widest opacity-90 uppercase max-w-2xl mx-auto border-t border-white/20 pt-6">
            Descubre la belleza indómita de los Andes y la Patagonia
          </p>
        </div>

        {/* Search/Filter Bar */}
        <div className="absolute bottom-20 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm py-6 px-8 hidden md:flex items-center gap-8 max-w-4xl w-full mx-auto justify-between shadow-2xl reveal-on-scroll" ref={(el) => { revealRefs.current[1] = el }}>
          <div className="flex flex-col group cursor-pointer">
            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest group-hover:text-brand-red transition">Destino</span>
            <span className="text-lg font-serif text-white italic">Seleccionar región</span>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <div className="flex flex-col group cursor-pointer">
            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest group-hover:text-brand-red transition">Fecha</span>
            <span className="text-lg font-serif text-white italic">¿Cuándo viajas?</span>
          </div>
          <button className="bg-brand-red text-white px-10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-red transition duration-300 shadow-lg clip-rustic-1">
            Buscar Aventura
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative bg-white pb-20">
        {/* SVG Path Background */}
        <div className="path-container md:block hidden opacity-20" style={{ height: 'auto', maxHeight: '1800px' }}>
          <svg width="100%" height="100%" viewBox="0 0 1000 2000" preserveAspectRatio="none">
            <path 
              d="M500,0 C500,100 800,200 800,400 C800,700 200,800 200,1100 C200,1400 800,1500 800,1800" 
              fill="none" 
              stroke="#d64541" 
              strokeWidth="3" 
              strokeDasharray="15,15" 
              strokeLinecap="round" 
            />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 space-y-40 mt-20">
          {/* Item 1: Right */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 reveal-on-scroll" ref={(el) => { revealRefs.current[2] = el }}>
            <div className="w-full md:w-5/12 order-2 md:order-1 text-center md:text-right">
              <span className="text-brand-red font-bold text-xs tracking-widest uppercase mb-2 block">Patagonia Norte</span>
              <h3 className="text-3xl font-bold uppercase mb-6 tracking-wide text-brand-dark">Ruta de los Parques</h3>
              <p className="text-gray-500 font-serif italic text-xl leading-relaxed mb-6">
                &quot;Una travesía visual a través de bosques milenarios y ríos turquesa. Donde el silencio solo es roto por el viento.&quot;
              </p>
              <ul className="text-xs text-gray-400 uppercase tracking-widest space-y-2 flex flex-col items-center md:items-end">
                <li className="flex items-center"><i className="fas fa-clock mr-3 text-brand-red"></i> Duración: 12 días</li>
                <li className="flex items-center"><i className="fas fa-route mr-3 text-brand-red"></i> Distancia: 50km</li>
              </ul>
            </div>
            <div className="w-full md:w-6/12 order-1 md:order-2 relative flex justify-center group">
              <div className="hidden md:block absolute top-1/2 -left-14 w-4 h-4 bg-white rounded-full border-4 border-brand-red shadow-lg z-20 group-hover:scale-150 transition duration-300"></div>
              <div className="relative w-full h-[450px] clip-rustic-1 shadow-2xl image-card">
                <img 
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-full object-cover"
                  alt="Patagonia Norte"
                />
              </div>
            </div>
          </div>

          {/* Item 2: Left */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 reveal-on-scroll" ref={(el) => { revealRefs.current[3] = el }}>
            <div className="w-full md:w-6/12 order-1 relative flex justify-center group">
              <div className="hidden md:block absolute top-1/2 -right-14 w-4 h-4 bg-white rounded-full border-4 border-brand-red shadow-lg z-20 group-hover:scale-150 transition duration-300"></div>
              <div className="relative w-full h-[450px] clip-rustic-2 shadow-2xl image-card">
                <img 
                  src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-full object-cover"
                  alt="Cordillera Central"
                />
              </div>
            </div>
            <div className="w-full md:w-5/12 order-2 text-center md:text-left">
              <span className="text-brand-red font-bold text-xs tracking-widest uppercase mb-2 block">Cordillera Central</span>
              <h3 className="text-3xl font-bold uppercase mb-6 tracking-wide text-brand-dark">Alturas Andinas</h3>
              <p className="text-gray-500 font-serif italic text-xl leading-relaxed mb-6">
                &quot;Desafía tus límites ascendiendo a cumbres que tocan el cielo. Una experiencia de alta montaña inolvidable.&quot;
              </p>
              <ul className="text-xs text-gray-400 uppercase tracking-widest space-y-2 flex flex-col items-center md:items-start">
                <li className="flex items-center"><i className="fas fa-calendar mr-3 text-brand-red"></i> Fechas: Ago - Oct</li>
                <li className="flex items-center"><i className="fas fa-mountain mr-3 text-brand-red"></i> Altitud: 4.500m</li>
              </ul>
            </div>
          </div>

          {/* Item 3: Right */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 reveal-on-scroll" ref={(el) => { revealRefs.current[4] = el }}>
            <div className="w-full md:w-5/12 order-2 md:order-1 text-center md:text-right">
              <span className="text-brand-red font-bold text-xs tracking-widest uppercase mb-2 block">Zona Lacustre</span>
              <h3 className="text-3xl font-bold uppercase mb-6 tracking-wide text-brand-dark">Volcanes del Sur</h3>
              <p className="text-gray-500 font-serif italic text-xl leading-relaxed mb-6">
                &quot;Entre lagos espejados y bosques de araucarias, los volcanes vigilan el horizonte. Trekking suave y vistas épicas.&quot;
              </p>
              <ul className="text-xs text-gray-400 uppercase tracking-widest space-y-2 flex flex-col items-center md:items-end">
                <li className="flex items-center"><i className="fas fa-sun mr-3 text-brand-red"></i> Temporada: Verano</li>
                <li className="flex items-center"><i className="fas fa-user-friends mr-3 text-brand-red"></i> Grupos: 4-10</li>
              </ul>
            </div>
            <div className="w-full md:w-6/12 order-1 md:order-2 relative flex justify-center group">
              <div className="hidden md:block absolute top-1/2 -left-14 w-4 h-4 bg-white rounded-full border-4 border-brand-red shadow-lg z-20 group-hover:scale-150 transition duration-300"></div>
              <div className="relative w-full h-[450px] clip-rustic-3 shadow-2xl image-card">
                <img 
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-full object-cover"
                  alt="Zona Lacustre"
                />
              </div>
            </div>
          </div>

          {/* Item 4: Left (Bottom Sea/Coast) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 reveal-on-scroll" ref={(el) => { revealRefs.current[5] = el }}>
            <div className="w-full md:w-6/12 order-1 relative flex justify-center group">
              <div className="relative w-full h-[450px] clip-rustic-2 shadow-2xl image-card">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-full object-cover"
                  alt="Costa Pacífico"
                />
              </div>
            </div>
            <div className="w-full md:w-5/12 order-2 text-center md:text-left">
              <span className="text-brand-red font-bold text-xs tracking-widest uppercase mb-2 block">Costa Pacífico</span>
              <h3 className="text-3xl font-bold uppercase mb-6 tracking-wide text-brand-dark">Acantilados Costeros</h3>
              <p className="text-gray-500 font-serif italic text-xl leading-relaxed mb-8">
                &quot;Donde la tierra termina y el inmenso océano comienza. Senderos costeros con la brisa salina en tu rostro.&quot;
              </p>
              <button className="text-brand-red font-bold uppercase text-xs tracking-widest border-b-2 border-brand-red pb-1 hover:text-black hover:border-black transition hover:pb-2 duration-300">
                Ver Detalles Completos
              </button>
            </div>
          </div>
        </div>

        {/* Próximas Salidas Section */}
        <section id="proximas-salidas-section" className="py-20 bg-white relative mt-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-brand-red font-bold text-xs tracking-[0.3em] uppercase mb-2 block">Calendario 2025</span>
                <h2 className="text-4xl font-bold uppercase text-brand-dark">Próximas Salidas</h2>
              </div>
              <a href="#" className="text-sm font-bold text-brand-red hover:underline uppercase tracking-widest">Ver calendario completo</a>
            </div>
            
            <div className="space-y-4">
              {/* Date Item 1 */}
              <div className="group bg-white border-2 border-gray-200 hover:border-brand-red hover:bg-red-50/30 rounded-sm p-4 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer clip-rustic-1 hover:shadow-lg">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="bg-brand-red text-white px-8 py-5 rounded-sm text-sm font-bold uppercase tracking-widest w-full md:w-48 text-center clip-rustic-2">
                    Ene 15 - 20
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-brand-dark uppercase">Ruta de los Glaciares</span>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">5 días / 4 noches</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=male-32&size=80&background=random" alt="" />
                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=female-44&size=80&background=random" alt="" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">+4</div>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-4 py-2 rounded-full">Cupos Disponibles</span>
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition shadow-sm">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>

              {/* Date Item 2 */}
              <div className="group bg-white border-2 border-gray-200 hover:border-brand-red hover:bg-red-50/30 rounded-sm p-4 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer clip-rustic-2 hover:shadow-lg">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="bg-brand-red text-white px-8 py-5 rounded-sm text-sm font-bold uppercase tracking-widest w-full md:w-48 text-center clip-rustic-1">
                    Feb 05 - 10
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-brand-dark uppercase">Circuito W - Paine</span>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Experience</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=female-68&size=80&background=random" alt="" />
                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=male-11&size=80&background=random" alt="" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">+12</div>
                  </div>
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-4 py-2 rounded-full">Últimos Cupos</span>
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition shadow-sm">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario de Reserva */}
        <section id="formulario-reserva-section" className="py-20 bg-gray-50 relative mt-10">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-brand-red font-bold text-xs tracking-[0.3em] uppercase mb-2 block">Reserva tu Aventura</span>
              <h2 className="text-4xl font-bold uppercase text-brand-dark">Solicita tu Cupo</h2>
            </div>
            
            <div className="bg-white p-8 md:p-12 shadow-2xl clip-rustic-1">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-2 group-focus-within:text-brand-red">Tu Nombre</label>
                    <input type="text" className="w-full border-b-2 border-gray-300 pb-2 outline-none focus:border-brand-red transition bg-transparent" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-2 group-focus-within:text-brand-red">Tu Email</label>
                    <input type="email" className="w-full border-b-2 border-gray-300 pb-2 outline-none focus:border-brand-red transition bg-transparent" placeholder="correo@ejemplo.com" />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-2 group-focus-within:text-brand-red">Salida de Interés</label>
                  <select className="w-full border-b-2 border-gray-300 pb-2 outline-none focus:border-brand-red transition bg-transparent appearance-none cursor-pointer">
                    <option>Enero 15 - 20: Ruta de los Glaciares</option>
                    <option>Febrero 05 - 10: Circuito W - Paine</option>
                    <option>Otra fecha</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-2 group-focus-within:text-brand-red">Número de Personas</label>
                  <input type="number" min={1} className="w-full border-b-2 border-gray-300 pb-2 outline-none focus:border-brand-red transition bg-transparent" placeholder="1" />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-2 group-focus-within:text-brand-red">Mensaje / Consultas</label>
                  <textarea rows={4} className="w-full border-b-2 border-gray-300 pb-2 outline-none resize-none focus:border-brand-red transition bg-transparent" placeholder="Cuéntanos más sobre tu consulta..."></textarea>
                </div>

                <button type="button" className="w-full bg-brand-red text-white font-bold uppercase tracking-[0.2em] py-4 transition duration-300 hover:bg-black clip-rustic-1 shadow-lg">
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white relative pt-32 clip-hero mt-10">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Logo */}
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 text-brand-red mb-6">
                <i className="fas fa-compass text-3xl"></i>
                <span className="text-2xl font-bold uppercase tracking-widest text-white">Travel</span>
              </div>
              <p className="text-gray-400 font-serif italic text-sm leading-relaxed">
                Creamos experiencias únicas conectando a viajeros con la naturaleza más pura de Chile. Aventuras responsables y memorables.
              </p>
            </div>

            {/* Links Columns */}
            <div className="flex gap-20 text-[10px] uppercase tracking-widest text-gray-400">
              <div className="flex flex-col gap-4">
                <span className="text-white font-bold mb-2 border-b border-gray-700 pb-2">Contacto</span>
                <a href="#" className="hover:text-brand-red transition">contacto@travel.com</a>
                <span>+56 9 1234 5678</span>
                <span>Santiago, Chile</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white font-bold mb-2 border-b border-gray-700 pb-2">Explora</span>
                <a href="#" className="hover:text-brand-red transition">Nuestros Tours</a>
                <a href="#" className="hover:text-brand-red transition">Sobre Nosotros</a>
                <a href="#" className="hover:text-brand-red transition">Blog de Viajes</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white font-bold mb-2 border-b border-gray-700 pb-2">Síguenos</span>
                <a href="#" className="hover:text-brand-red transition"><i className="fab fa-instagram mr-2"></i> Instagram</a>
                <a href="#" className="hover:text-brand-red transition"><i className="fab fa-facebook mr-2"></i> Facebook</a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-[9px] text-gray-600 mt-16 uppercase tracking-[0.2em] border-t border-gray-800 pt-8">
            &copy; 2024 Travel Journey Design. Hecho con pasión por la montaña.
          </div>
        </div>
      </footer>
    </div>
  )
}
