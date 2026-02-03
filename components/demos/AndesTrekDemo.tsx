'use client'

import { useEffect, useState } from 'react'

export default function AndesTrekDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
  }, [])

  return (
    <div className="font-body text-gray-700 bg-white">
      {/* Top Bar */}
      <div className="absolute top-0 w-full z-50 text-white/90 text-xs py-2 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span><i className="fas fa-phone-alt mr-2 text-brand-green"></i> +56 9 1234 5678</span>
            <span><i className="fas fa-envelope mr-2 text-brand-green"></i> contacto@andestrek.cl</span>
          </div>
          <div className="flex space-x-4">
            <span className="opacity-70">Síguenos:</span>
            <a href="#" className="hover:text-brand-green transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-brand-green transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-brand-green transition"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-12 w-full z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between relative">
            {/* Left Menu */}
            <div className="hidden md:flex space-x-8 text-white font-heading font-bold text-sm tracking-[0.2em] uppercase items-center flex-1 justify-end pr-10">
              <a href="#" className="hover:text-brand-green transition">Destinos</a>
              <a href="#" className="border-2 border-white/30 px-4 py-1 hover:bg-white hover:text-black transition">Inicio</a>
              <a href="#" className="hover:text-brand-green transition">Rutas</a>
            </div>

            {/* Logo (Center) */}
            <div className="text-white text-center flex-none px-4 group cursor-pointer">
              <h1 className="font-script text-4xl md:text-5xl drop-shadow-lg group-hover:text-brand-green transition duration-500">Andes Trek</h1>
              <span className="text-[9px] tracking-[0.4em] uppercase block mt-1 opacity-90 font-light">Explora Chile</span>
            </div>

            {/* Right Menu */}
            <div className="hidden md:flex space-x-8 text-white font-heading font-bold text-sm tracking-[0.2em] uppercase items-center flex-1 justify-start pl-10">
              <a href="#" className="hover:text-brand-green transition">Blog</a>
              <a href="#" className="hover:text-brand-green transition">Equipo</a>
              <a href="#" className="hover:text-brand-green transition">Contacto</a>
              <a href="#" className="ml-auto hover:text-brand-green transition"><i className="fas fa-search"></i></a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white absolute right-0 top-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
          
          {/* Mobile Menu Dropdown */}
          <div className={`${mobileMenuOpen ? '' : 'hidden'} md:hidden bg-brand-dark/95 backdrop-blur-md text-white mt-4 p-6 rounded text-center space-y-6 shadow-2xl border-t border-white/10`}>
            <a href="#" className="block uppercase font-heading tracking-widest text-sm">Inicio</a>
            <a href="#" className="block uppercase font-heading tracking-widest text-sm">Destinos</a>
            <a href="#" className="block uppercase font-heading tracking-widest text-sm">Rutas de Trekking</a>
            <a href="#" className="block uppercase font-heading tracking-widest text-sm">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen min-h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Paisaje Montañas" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30"></div>
        </div>

        {/* Arrows */}
        <div className="absolute left-4 md:left-10 z-20 text-white/50 hover:text-white cursor-pointer border border-white/30 p-3 rounded-full hover:bg-white/10 transition hidden md:block">
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="absolute right-4 md:right-10 z-20 text-white/50 hover:text-white cursor-pointer border border-white/30 p-3 rounded-full hover:bg-white/10 transition hidden md:block">
          <i className="fas fa-chevron-right"></i>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mt-20">
          <div className="text-xs md:text-sm font-heading tracking-[0.3em] uppercase mb-4 text-brand-green font-bold bg-black/40 inline-block px-4 py-1 rounded backdrop-blur-sm">
            <i className="fas fa-mountain mr-2"></i> Temporada 2024 / 2025
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase leading-none mb-6 drop-shadow-2xl tracking-tight">
            Patagonia <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">Sin Límites</span>
          </h2>
          
          <p className="text-sm md:text-lg max-w-2xl mx-auto mb-10 font-light text-gray-200 tracking-wide leading-relaxed">
            Descubre los senderos más prístinos del sur del mundo. Guiamos tus pasos por glaciares milenarios, bosques nativos y las cumbres más imponentes de los Andes.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#" className="bg-brand-green hover:bg-white hover:text-brand-green text-white font-heading font-bold uppercase text-xs tracking-widest px-10 py-4 transition duration-300 shadow-lg">
              Ver Expediciones
            </a>
            <a href="#" className="border border-white hover:bg-white hover:text-brand-dark text-white font-heading font-bold uppercase text-xs tracking-widest px-10 py-4 transition duration-300">
              Nuestra Historia
            </a>
          </div>
        </div>

        {/* Rustic Torn Separator (Bottom) */}
        <div className="torn-separator-bottom"></div>
      </header>

      {/* Partners / Logos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center group">
              <i className="fas fa-hiking text-4xl mb-2 text-brand-dark group-hover:text-brand-green transition"></i>
              <span className="font-heading font-bold text-xs tracking-widest uppercase">Trek Chile</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-heading font-bold text-2xl tracking-tighter text-brand-dark uppercase border-b-2 border-brand-green pb-1">SERNATUR <i className="fas fa-check-circle text-xs align-top text-brand-green"></i></span>
            </div>
            <div className="flex flex-col items-center border-2 border-brand-dark p-2 px-3">
              <span className="font-heading font-bold text-sm uppercase">Guías</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">Certificados</span>
            </div>
            <div className="flex flex-col items-center group">
              <i className="fas fa-mountain text-3xl mb-1 text-brand-dark group-hover:text-brand-green transition"></i>
              <span className="font-heading font-bold text-xs tracking-[0.3em] uppercase">Andes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Travel Essentials Tips */}
      <section className="py-20 bg-white bg-topo-pattern relative">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="font-script text-brand-earth text-2xl mb-2">Vive la experiencia</p>
            <h3 className="text-4xl md:text-5xl font-heading font-bold uppercase text-brand-dark">
              Nuestras <span className="text-brand-green underline decoration-brand-green/30 decoration-4 underline-offset-4">Rutas</span> Destacadas
            </h3>
          </div>

          {/* Post 1: Torres del Paine / Sur */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="w-full md:w-1/2 relative group">
              <div className="p-2 bg-gray-100 shadow-xl transform rotate-1 transition duration-500 group-hover:rotate-0">
                <div className="overflow-hidden relative h-[400px]">
                  <img 
                    src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Trekking Hiker" 
                    className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -left-4 bg-brand-green text-white px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg z-10">
                <i className="fas fa-map-marker-alt mr-2"></i> Patagonia
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-10">
              <div className="text-xs text-brand-earth mb-3 font-heading uppercase tracking-widest font-bold">
                <i className="far fa-clock mr-1"></i> 5 Días / 4 Noches <span className="mx-2 text-gray-300">|</span> Dificultad: Media
              </div>
              <h4 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-tight mb-6 text-brand-dark">
                Circuito W: <br /> El Corazón de Paine
              </h4>
              <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
                Una travesía inolvidable por los senderos más icónicos del Parque Nacional Torres del Paine. Camina junto a los Cuernos, el Valle del Francés y el Glaciar Grey. Incluye refugios y comidas.
              </p>
              <a href="#" className="inline-flex items-center text-brand-dark font-heading font-bold uppercase text-sm tracking-widest hover:text-brand-green transition group">
                Ver Itinerario <span className="bg-brand-green w-8 h-[2px] ml-3 group-hover:w-12 transition-all duration-300"></span>
              </a>
            </div>
          </div>

          {/* Post 2: Norte / Desierto / Volcanes */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-20">
            <div className="w-full md:w-1/2 relative group">
              <div className="p-2 bg-gray-100 shadow-xl transform -rotate-1 transition duration-500 group-hover:rotate-0">
                <div className="overflow-hidden relative h-[400px]">
                  <img 
                    src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Nature Hiking" 
                    className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-brand-dark text-white px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg z-10">
                <i className="fas fa-map-marker-alt mr-2 text-brand-green"></i> Araucanía
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pr-10 text-left md:text-right">
              <div className="text-xs text-brand-earth mb-3 font-heading uppercase tracking-widest font-bold flex items-center justify-start md:justify-end">
                <i className="far fa-clock mr-1"></i> Full Day <span className="mx-2 text-gray-300">|</span> Dificultad: Alta
              </div>
              <h4 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-tight mb-6 text-brand-dark">
                Ascenso al Cráter: <br /> Volcán Villarrica
              </h4>
              <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
                Desafía tus límites con el ascenso a uno de los volcanes más activos de Sudamérica. Vistas panorámicas de lagos y cordillera desde la cima humeante. Equipo técnico incluido.
              </p>
              <a href="#" className="inline-flex items-center flex-row-reverse text-brand-dark font-heading font-bold uppercase text-sm tracking-widest hover:text-brand-green transition group">
                Ver Itinerario <span className="bg-brand-green w-8 h-[2px] mr-3 group-hover:w-12 transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-gray-300">
            <div>
              <p className="font-script text-brand-green text-2xl mb-1">Galería de Aventuras</p>
              <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase text-brand-dark">Momentos en la Montaña</h3>
            </div>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 hover:text-brand-green transition">Ver Todo en Instagram <i className="fab fa-instagram ml-2"></i></a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative overflow-hidden h-[450px] hover-zoom cursor-pointer shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover filter brightness-90"
                alt="Cajón del Maipo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <span className="text-[10px] font-bold font-heading bg-brand-green px-2 py-1 uppercase tracking-widest mb-3 inline-block rounded-sm">Cajón del Maipo</span>
                <h5 className="text-2xl font-heading font-bold uppercase leading-none">Atardecer Andino</h5>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden h-[450px] hover-zoom cursor-pointer shadow-lg mt-0 md:-mt-8">
              <img 
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover filter brightness-90"
                alt="Carretera Austral"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <span className="text-[10px] font-bold font-heading bg-white text-black px-2 py-1 uppercase tracking-widest mb-3 inline-block rounded-sm">Carretera Austral</span>
                <h5 className="text-2xl font-heading font-bold uppercase leading-none">Bosque Profundo</h5>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden h-[450px] hover-zoom cursor-pointer shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover filter brightness-90"
                alt="San Pedro"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <span className="text-[10px] font-bold font-heading bg-brand-green px-2 py-1 uppercase tracking-widest mb-3 inline-block rounded-sm">San Pedro</span>
                <h5 className="text-2xl font-heading font-bold uppercase leading-none">Valle de la Luna</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Próximas Salidas Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <p className="font-script text-brand-earth text-2xl mb-2">Temporada 2024 / 2025</p>
            <h3 className="text-4xl md:text-5xl font-heading font-bold uppercase text-brand-dark">
              Próximas <span className="text-brand-green underline decoration-brand-green/30 decoration-4 underline-offset-4">Salidas</span>
            </h3>
          </div>
          
          <div className="space-y-4">
            {/* Date Item 1 */}
            <div className="group bg-white border-2 border-gray-200 hover:border-brand-green hover:bg-brand-green/5 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer shadow-sm hover:shadow-lg">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="bg-brand-green text-white px-6 py-4 rounded-lg text-sm font-heading font-bold uppercase tracking-widest w-full md:w-40 text-center">
                  Ene 15 - 20
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl text-brand-dark uppercase">Ruta de los Glaciares</span>
                  <span className="text-xs font-heading text-brand-earth uppercase tracking-wider mt-1">5 días / 4 noches</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=male-32&size=80&background=random" alt="" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=female-44&size=80&background=random" alt="" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">+4</div>
                </div>
                <span className="text-xs font-heading font-bold text-brand-green bg-brand-green/10 px-4 py-2 rounded-full uppercase tracking-widest">Cupos Disponibles</span>
                <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center group-hover:bg-brand-dark transition shadow-sm">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>

            {/* Date Item 2 */}
            <div className="group bg-white border-2 border-gray-200 hover:border-brand-green hover:bg-brand-green/5 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer shadow-sm hover:shadow-lg">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="bg-brand-dark text-white px-6 py-4 rounded-lg text-sm font-heading font-bold uppercase tracking-widest w-full md:w-40 text-center">
                  Feb 05 - 10
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl text-brand-dark uppercase">Circuito W - Paine</span>
                  <span className="text-xs font-heading text-brand-earth uppercase tracking-wider mt-1">Full Experience</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=female-68&size=80&background=random" alt="" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=male-11&size=80&background=random" alt="" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">+12</div>
                </div>
                <span className="text-xs font-heading font-bold text-orange-600 bg-orange-100 px-4 py-2 rounded-full uppercase tracking-widest">Últimos Cupos</span>
                <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center group-hover:bg-brand-dark transition shadow-sm">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Reservation Section */}
      <section className="py-24 relative bg-gray-900 text-white overflow-hidden flex items-center">
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
              <i className="fas fa-compass text-5xl text-brand-green mb-6"></i>
              <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-4 leading-none">Reserva tu <br /> <span className="text-brand-green">Aventura</span></h3>
              <p className="font-light text-gray-400 mb-8 text-lg leading-relaxed">
                ¿Listo para desconectar? Cuéntanos qué tipo de experiencia buscas y nuestro equipo de guías expertos te ayudará a planificar la expedición perfecta. Cupos limitados por temporada.
              </p>
              <div className="flex flex-col space-y-4 text-sm font-heading tracking-widest text-gray-500">
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-check text-brand-green mr-3"></i> Guías Certificados WFR
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-check text-brand-green mr-3"></i> Equipamiento de Alta Montaña
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <i className="fas fa-check text-brand-green mr-3"></i> Transporte Privado
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 bg-white/5 backdrop-blur-sm p-8 md:p-10 border border-white/10 rounded-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand-green">Tu Nombre</label>
                    <input type="text" className="w-full custom-input text-white pb-2 outline-none" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand-green">Tu Email</label>
                    <input type="email" className="w-full custom-input text-white pb-2 outline-none" placeholder="correo@ejemplo.com" />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand-green">Tipo de Aventura</label>
                  <select className="w-full custom-input text-white pb-2 outline-none bg-transparent appearance-none cursor-pointer">
                    <option className="text-black">Trekking Patagonia (Circuito W)</option>
                    <option className="text-black">Ascenso Volcán Villarrica</option>
                    <option className="text-black">Desierto de Atacama</option>
                    <option className="text-black">Trekking por el día (Zona Central)</option>
                    <option className="text-black">Expedición a medida</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-xs font-heading uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand-green">Mensaje / Fechas</label>
                  <textarea rows={2} className="w-full custom-input text-white pb-2 outline-none resize-none" placeholder="Cuéntanos más..."></textarea>
                </div>

                <button type="button" className="w-full bg-brand-green hover:bg-white hover:text-brand-dark text-white font-heading font-bold uppercase tracking-[0.2em] py-4 transition duration-300 mt-4">
                  Solicitar Reserva
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm font-light">
            {/* Col 1: Brand */}
            <div className="md:col-span-1">
              <h2 className="font-script text-4xl mb-6 text-white">Andes Trek</h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Expertos en turismo de montaña y conservación. Llevamos más de 10 años conectando personas con la naturaleza salvaje de Chile.
              </p>
              <div className="flex space-x-4 text-gray-400 text-lg">
                <a href="#" className="hover:text-brand-green transition"><i className="fab fa-instagram"></i></a>
                <a href="#" className="hover:text-brand-green transition"><i className="fab fa-youtube"></i></a>
                <a href="#" className="hover:text-brand-green transition"><i className="fab fa-spotify"></i></a>
              </div>
            </div>

            {/* Col 2: Recent Posts */}
            <div className="md:col-span-1">
              <h4 className="font-heading font-bold uppercase tracking-widest mb-8 text-white border-b-2 border-brand-green pb-2 inline-block">Blog Reciente</h4>
              <ul className="space-y-6 text-gray-400">
                <li className="flex gap-4 group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    className="w-16 h-16 object-cover grayscale group-hover:grayscale-0 transition duration-500"
                    alt="Blog post"
                  />
                  <div>
                    <a href="#" className="block group-hover:text-brand-green transition font-bold text-gray-300 uppercase text-xs leading-tight mb-1">Equipo Esencial: Invierno</a>
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
                    <a href="#" className="block group-hover:text-brand-green transition font-bold text-gray-300 uppercase text-xs leading-tight mb-1">Flora Nativa del Sur</a>
                    <span className="text-[10px] text-gray-600 block">Semana pasada</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Col 3: Quick Links */}
            <div className="md:col-span-1">
              <h4 className="font-heading font-bold uppercase tracking-widest mb-8 text-white border-b-2 border-brand-green pb-2 inline-block">Info Útil</h4>
              <ul className="space-y-3 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <li><a href="#" className="hover:text-brand-green transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-green"></i> Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-brand-green transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-green"></i> Niveles de Dificultad</a></li>
                <li><a href="#" className="hover:text-brand-green transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-green"></i> Políticas de Cancelación</a></li>
                <li><a href="#" className="hover:text-brand-green transition block py-1 flex items-center"><i className="fas fa-chevron-right text-[8px] mr-2 text-brand-green"></i> Trabaja con Nosotros</a></li>
              </ul>
            </div>

            {/* Col 4: Gallery Widget */}
            <div className="md:col-span-1">
              <h4 className="font-heading font-bold uppercase tracking-widest mb-8 text-white border-b-2 border-brand-green pb-2 inline-block">Instagram</h4>
              <div className="grid grid-cols-3 gap-2">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
                <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
                <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
                <img src="https://images.unsplash.com/photo-1519681393784-d8e5b5a4570e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
                <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
                <img src="https://images.unsplash.com/photo-1533240332313-0dbdd3199061?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-20 object-cover opacity-60 hover:opacity-100 transition cursor-pointer" alt="Instagram" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
            <p>&copy; 2024 Andes Trek Chile. Todos los derechos reservados.</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <a href="#" className="hover:text-white">Privacidad</a>
              <a href="#" className="hover:text-white">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
