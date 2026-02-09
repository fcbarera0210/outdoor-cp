import HeroCompact from '@/components/ui/HeroCompact'

export default function EquipoPage() {
  return (
    <div>
      <HeroCompact
        title="Nuestro Equipo"
        subtitle="Instrucciones básicas y simbología para tus expediciones"
        breadcrumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Equipo' },
        ]}
      />
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-6 max-w-4xl">
          <div id="instrucciones" className="mb-20">
            <h2 className="text-3xl font-heading font-bold uppercase text-brand-dark mb-8 border-b-2 border-brand-primary pb-4">
              Instrucciones Básicas
            </h2>
            <div className="space-y-6 text-gray-600">
              <div className="flex gap-4">
                <i className="fas fa-shield-alt text-2xl text-brand-primary flex-shrink-0"></i>
                <div>
                  <h3 className="font-heading font-bold text-brand-dark uppercase mb-2">Seguridad</h3>
                  <p>Siempre sigue las indicaciones del guía. No te separes del grupo. En caso de mal tiempo, el guía puede modificar o cancelar la ruta por tu seguridad.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <i className="fas fa-shopping-bag text-2xl text-brand-primary flex-shrink-0"></i>
                <div>
                  <h3 className="font-heading font-bold text-brand-dark uppercase mb-2">Qué llevar</h3>
                  <p>Ropa por capas, protección solar, botella de agua (mínimo 2L), snack energético. El equipo específico varía según la ruta; consulta la lista en cada expedición.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <i className="fas fa-leaf text-2xl text-brand-primary flex-shrink-0"></i>
                <div>
                  <h3 className="font-heading font-bold text-brand-dark uppercase mb-2">Comportamiento en montaña</h3>
                  <p>Respeta la naturaleza: no dejes basura, no te aproximes a la fauna silvestre, camina solo por los senderos marcados. Principio de no dejar rastro.</p>
                </div>
              </div>
            </div>
          </div>

          <div id="simbolologia" className="mb-20">
            <h2 className="text-3xl font-heading font-bold uppercase text-brand-dark mb-8 border-b-2 border-brand-primary pb-4">
              Simbología
            </h2>

            <div id="dificultad" className="mb-12">
              <h3 className="text-xl font-heading font-bold uppercase text-brand-dark mb-6">Niveles de Dificultad</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-500/10 rounded-lg border-2 border-green-500/30">
                  <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center mb-4">
                    <i className="fas fa-circle text-green-600 text-sm"></i>
                  </div>
                  <h4 className="font-heading font-bold uppercase text-brand-dark mb-2">Fácil</h4>
                  <p className="text-sm text-gray-600">Terreno accesible, desnivel moderado. Ideal para principiantes y familias.</p>
                </div>
                <div className="p-6 bg-yellow-500/10 rounded-lg border-2 border-yellow-500/30">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/30 flex items-center justify-center mb-4">
                    <i className="fas fa-circle text-yellow-600 text-sm"></i>
                  </div>
                  <h4 className="font-heading font-bold uppercase text-brand-dark mb-2">Media</h4>
                  <p className="text-sm text-gray-600">Requiere condición física básica. Algunos tramos con mayor exigencia.</p>
                </div>
                <div className="p-6 bg-brand-primary/10 rounded-lg border-2 border-brand-primary/30">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/30 flex items-center justify-center mb-4">
                    <i className="fas fa-circle text-brand-primary text-sm"></i>
                  </div>
                  <h4 className="font-heading font-bold uppercase text-brand-dark mb-2">Alta</h4>
                  <p className="text-sm text-gray-600">Terreno técnico, condición física buena. Equipo especializado requerido.</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-heading font-bold uppercase text-brand-dark mb-6">Equipo Necesario</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <i className="fas fa-backpack text-3xl text-brand-primary"></i>
                  <div>
                    <h4 className="font-heading font-bold text-brand-dark">Mochila</h4>
                    <p className="text-sm text-gray-600">40-50L para rutas multinoche. 20-30L para día.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <i className="fas fa-hiking text-3xl text-brand-primary"></i>
                  <div>
                    <h4 className="font-heading font-bold text-brand-dark">Bastones</h4>
                    <p className="text-sm text-gray-600">Reducen impacto en rodillas y mejoran estabilidad.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <i className="fas fa-helmet-safety text-3xl text-brand-primary"></i>
                  <div>
                    <h4 className="font-heading font-bold text-brand-dark">Casco</h4>
                    <p className="text-sm text-gray-600">Obligatorio en ascensos volcánicos y terrenos técnicos.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <i className="fas fa-snowflake text-3xl text-brand-primary"></i>
                  <div>
                    <h4 className="font-heading font-bold text-brand-dark">Crampones</h4>
                    <p className="text-sm text-gray-600">Para nieve y hielo. Incluidos en rutas que lo requieren.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold uppercase text-brand-dark mb-6">Señalética de Senderos</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <span className="font-heading font-bold text-brand-primary">◀</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-brand-dark">Marcas de sendero</h4>
                    <p className="text-sm text-gray-600">Cairns (montículos de piedras) y hitos pintados indican la ruta correcta.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <i className="fas fa-map-signs text-brand-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-brand-dark">Postes indicadores</h4>
                    <p className="text-sm text-gray-600">En parques nacionales marcan distancias y cruces.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
