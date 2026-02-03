'use client'

import { useEffect } from 'react'

export default function PatagoniaDemo() {
  useEffect(() => {
    // Image fallback handler
    const images = document.querySelectorAll('img[src*="unsplash.com"], img[src*="ui-avatars.com"]')
    const fallbackImages = [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    ]
    const avatarFallback = 'https://ui-avatars.com/api/?name=User&size=80&background=random'
    
    images.forEach((img) => {
      img.addEventListener('error', () => {
        if ((img as HTMLImageElement).src.includes('ui-avatars.com')) {
          ;(img as HTMLImageElement).src = avatarFallback
        } else {
          const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)]
          ;(img as HTMLImageElement).src = randomFallback
        }
      })
    })
  }, [])

  return (
    <div className="bg-white text-brand-dark font-outfit overflow-x-hidden selection:bg-brand-orange selection:text-white scroll-smooth">
      {/* Navbar */}
      <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center bg-white sticky top-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white">
            <i className="fas fa-mountain"></i>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">Patagonia</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-bold text-gray-500">
          <a href="#" className="hover:text-brand-orange transition">El Tour</a>
          <a href="#" className="hover:text-brand-orange transition">Precios</a>
          <a href="#" className="hover:text-brand-orange transition">Nosotros</a>
          <a href="#" className="hover:text-brand-orange transition">Contacto</a>
        </div>

        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
          <i className="fas fa-search text-gray-400"></i>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 md:px-6 mb-24 mt-4">
        <div className="relative w-full h-[600px] md:h-[700px] rounded-4xl overflow-hidden shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Patagonia Glacier Hiking" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] ease-in-out group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 pointer-events-none">
            <span className="text-white font-bold tracking-[0.5em] text-sm md:text-base uppercase mb-4 animate-pulse">Expedición 2025</span>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase leading-none text-white drop-shadow-lg">
              <span className="block">Tiempo de</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">Patagonia</span>
            </h1>
          </div>

          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20">
            <button className="bg-brand-orange text-white px-10 py-5 rounded-full font-bold text-sm md:text-base uppercase tracking-widest floating-cta hover:bg-white hover:text-brand-orange transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
              Reservar Cupo <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 text-white text-right hidden md:block">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Próxima Salida</p>
            <p className="text-2xl font-bold">15 Ene</p>
          </div>
        </div>

        {/* Mensaje Clave */}
        <div className="relative py-16 text-center mt-8">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-3 text-brand-dark">&quot;PATAGONIA SALVAJE&quot; — Tu llave a lo inexplorado</h3>
            <p className="text-gray-500 text-sm mb-8">Creemos que el trekking es más que caminar. Es la oportunidad de desconectar para reconectar con lo esencial.</p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-brand-blue group-hover:border-brand-orange transition duration-300">
                  <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="Expertos" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide">Expertos</span>
              </div>
              <div className="flex flex-col items-center gap-3 group cursor-pointer mt-4 md:mt-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-brand-orange bg-brand-orange flex items-center justify-center text-white text-3xl shadow-lg transform group-hover:-translate-y-2 transition duration-300">
                  <i className="fas fa-heart"></i>
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-brand-orange">Pasión</span>
              </div>
              <div className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-brand-blue group-hover:border-brand-orange transition duration-300">
                  <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="Naturaleza" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide">Naturaleza</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dates List */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="flex items-end justify-between mb-8 ml-2">
          <h2 className="text-3xl font-extrabold text-brand-dark">Próximas salidas 2025</h2>
          <a href="#" className="text-sm font-bold text-brand-orange hover:underline">Ver calendario completo</a>
        </div>
        
        <div className="space-y-4">
          {/* Date Item 1 */}
          <div className="group bg-white border border-gray-100 hover:border-brand-blue hover:bg-brand-blue/30 rounded-4xl p-3 pr-8 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer hover:shadow-md">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="bg-gray-100 group-hover:bg-white px-8 py-5 rounded-3xl text-sm font-extrabold w-full md:w-48 text-center transition">
                Ene 15 - 20
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-brand-dark">Ruta de los Glaciares</span>
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
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition shadow-sm">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>

          {/* Date Item 2 */}
          <div className="group bg-white border border-gray-100 hover:border-brand-blue hover:bg-brand-blue/30 rounded-4xl p-3 pr-8 flex flex-col md:flex-row items-center justify-between transition duration-300 cursor-pointer hover:shadow-md">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="bg-gray-100 group-hover:bg-white px-8 py-5 rounded-3xl text-sm font-extrabold w-full md:w-48 text-center transition">
                Feb 05 - 10
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-brand-dark">Circuito W - Paine</span>
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
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition shadow-sm">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Cards */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <h2 className="text-3xl font-extrabold mb-8 ml-2 text-brand-dark">¿Qué te espera?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:h-[550px]">
          {/* Card 1 */}
          <div className="bg-brand-orange rounded-4xl p-10 text-white flex flex-col justify-between relative overflow-hidden group hover-lift md:row-span-1">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 leading-tight">Hielos Milenarios</h3>
              <p className="text-white/90 text-sm font-medium leading-relaxed">Camina sobre glaciares que han estado allí por siglos. Una experiencia segura y transformadora.</p>
            </div>
            
            <div className="relative z-10 mt-auto">
              <div className="overflow-hidden rounded-3xl mb-6 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-700"
                  alt="Hielos Milenarios"
                />
              </div>
              <button className="w-full bg-white text-brand-orange font-bold py-4 rounded-full text-sm hover:bg-brand-dark hover:text-white transition shadow-lg">Ver Detalles</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-4xl overflow-hidden group cursor-pointer hover-lift shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
              alt="Bosques"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30">
                <i className="fas fa-arrow-up rotate-45 text-white"></i>
              </div>
              <span className="text-white font-bold text-2xl">Bosques</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-4xl overflow-hidden group cursor-pointer md:translate-y-12 hover-lift shadow-lg z-10">
            <img 
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
              alt="Cumbres"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30">
                <i className="fas fa-arrow-up rotate-45 text-white"></i>
              </div>
              <span className="text-white font-bold text-2xl">Cumbres</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative rounded-4xl overflow-hidden group cursor-pointer hover-lift shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-1000"
              alt="Fauna"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30">
                <i className="fas fa-arrow-up rotate-45 text-white"></i>
              </div>
              <span className="text-white font-bold text-2xl">Fauna</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Includes */}
      <section className="container mx-auto px-4 md:px-6 mb-24 mt-20 md:mt-0">
        <div className="bg-brand-dark text-white rounded-5xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1533240332313-0dbdd3199061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
              className="w-full h-full object-cover grayscale"
              alt="Background"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-72 h-72 rounded-full bg-white text-brand-dark flex flex-col items-center justify-center shadow-2xl relative group cursor-default">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Paquete Base</span>
                <span className="text-6xl font-extrabold tracking-tighter">950<span className="text-2xl align-top text-gray-400 font-semibold">$</span></span>
                <span className="text-sm font-semibold text-gray-500 mt-2">USD / Persona</span>
                
                <div className="absolute top-6 right-12 w-6 h-6 bg-brand-orange rounded-full group-hover:scale-125 transition"></div>
              </div>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-4xl p-8 hover:bg-white/20 transition">
                <h4 className="font-bold mb-6 text-2xl text-brand-orange">Todo Incluido</h4>
                <ul className="space-y-4 text-sm font-medium text-gray-200">
                  <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-xs"><i className="fas fa-check"></i></div> Transporte 4x4 privado</li>
                  <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-xs"><i className="fas fa-check"></i></div> Alojamiento en Domos</li>
                  <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-xs"><i className="fas fa-check"></i></div> Comidas Gourmet + Snack</li>
                  <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-xs"><i className="fas fa-check"></i></div> Guías WFR</li>
                </ul>
              </div>
              <div className="bg-brand-accent/20 backdrop-blur-md rounded-4xl p-8 flex flex-col justify-center text-center border border-white/10">
                <i className="fas fa-hiking text-4xl mb-4 text-brand-accent"></i>
                <p className="mb-6 font-bold text-lg">¿Tienes tu propio equipo? <br /> ¡Te descontamos el arriendo!</p>
                <button className="bg-white text-brand-dark font-bold py-3 rounded-full text-xs uppercase hover:bg-brand-accent hover:text-white transition shadow-lg">Consultar Promo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Form Section */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Contact Info */}
          <div className="md:w-1/3 bg-brand-orange rounded-4xl p-12 text-white flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-3xl font-extrabold mb-6">Hablemos</h3>
              <p className="text-white/90 text-sm mb-10 font-medium leading-relaxed">Estamos listos para resolver todas tus dudas sobre la Patagonia y armar tu viaje ideal.</p>
              
              <div className="space-y-4 text-sm font-bold">
                <div className="flex items-center gap-4 bg-white/20 p-4 rounded-3xl backdrop-blur-sm">
                  <i className="fas fa-envelope text-xl"></i> Hola@patagonia.cl
                </div>
                <div className="flex items-center gap-4 bg-white/20 p-4 rounded-3xl backdrop-blur-sm">
                  <i className="fas fa-phone text-xl"></i> +56 9 8765 4321
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-12">
              <a href="#" className="w-12 h-12 rounded-full bg-white text-brand-orange flex items-center justify-center hover:scale-110 transition shadow-md"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white text-brand-orange flex items-center justify-center hover:scale-110 transition shadow-md"><i className="fab fa-whatsapp text-xl"></i></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white text-brand-orange flex items-center justify-center hover:scale-110 transition shadow-md"><i className="fab fa-youtube text-xl"></i></a>
            </div>
          </div>

          {/* Form */}
          <div className="md:w-2/3 bg-gray-50 rounded-4xl p-12 border border-gray-100">
            <h3 className="text-3xl font-extrabold mb-8 text-brand-dark">Reserva tu cupo</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Tu Nombre" className="w-full bg-white border border-gray-200 rounded-3xl px-6 py-5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-brand-orange outline-none transition" />
                <input type="email" placeholder="Tu Email" className="w-full bg-white border border-gray-200 rounded-3xl px-6 py-5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-brand-orange outline-none transition" />
              </div>
              <select className="w-full bg-white border border-gray-200 rounded-3xl px-6 py-5 text-sm font-bold text-gray-500 focus:ring-2 focus:ring-brand-orange outline-none transition appearance-none cursor-pointer">
                <option>Selecciona una fecha</option>
                <option>Enero 15 - 20</option>
                <option>Febrero 05 - 10</option>
              </select>
              <textarea rows={4} placeholder="Cuéntanos más..." className="w-full bg-white border border-gray-200 rounded-3xl px-6 py-5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-brand-orange outline-none resize-none transition"></textarea>
              
              <button className="bg-brand-dark text-white font-bold py-5 px-10 rounded-full uppercase text-sm tracking-widest hover:bg-black transition w-full md:w-auto hover:shadow-lg transform hover:-translate-y-1">
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-10 text-gray-400 text-xs uppercase tracking-widest font-bold">
        <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
          <i className="fas fa-mountain"></i> Patagonia Adventure Co.
        </div>
        &copy; 2025 Todos los derechos reservados.
      </footer>
    </div>
  )
}
