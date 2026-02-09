export type Dificultad = 'fácil' | 'media' | 'alta'

export interface Ruta {
  slug: string
  nombre: string
  zona: string
  descripcion: string
  duracion: string
  dificultad: Dificultad
  imagen: string
  itinerario: string[]
  equipo: string[]
  proximasSalidas: { fecha: string; tipo: string }[]
}

export const rutas: Ruta[] = [
  {
    slug: 'circuito-w',
    nombre: 'Circuito W: El Corazón de Paine',
    zona: 'Patagonia',
    descripcion: 'Una travesía inolvidable por los senderos más icónicos del Parque Nacional Torres del Paine. Camina junto a los Cuernos, el Valle del Francés y el Glaciar Grey. Incluye refugios y comidas.',
    duracion: '5 Días / 4 Noches',
    dificultad: 'media',
    imagen: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    itinerario: [
      'Día 1: Torres – Valle Ascencio',
      'Día 2: Base Torres – Cuernos',
      'Día 3: Valle del Francés',
      'Día 4: Glaciar Grey',
      'Día 5: Regreso',
    ],
    equipo: ['Mochila 40-50L', 'Bastones trekking', 'Ropa impermeable', 'Sleeping bag'],
    proximasSalidas: [
      { fecha: 'Ene 15 - 20', tipo: '5 días' },
      { fecha: 'Feb 05 - 10', tipo: 'Full Experience' },
    ],
  },
  {
    slug: 'volcan-villarrica',
    nombre: 'Ascenso al Cráter: Volcán Villarrica',
    zona: 'Araucanía',
    descripcion: 'Desafía tus límites con el ascenso a uno de los volcanes más activos de Sudamérica. Vistas panorámicas de lagos y cordillera desde la cima humeante. Equipo técnico incluido.',
    duracion: 'Full Day',
    dificultad: 'alta',
    imagen: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    itinerario: [
      '05:00 Salida desde Pucón',
      '06:30 Inicio de ascenso',
      '12:00 Cima del volcán',
      '14:00 Descenso',
      '18:00 Retorno a Pucón',
    ],
    equipo: ['Crampones', 'Piolet', 'Casco', 'Ropa técnica'],
    proximasSalidas: [
      { fecha: 'Ene 20', tipo: 'Full Day' },
      { fecha: 'Feb 02', tipo: 'Full Day' },
    ],
  },
  {
    slug: 'cajon-del-maipo',
    nombre: 'Cajón del Maipo: Atardecer Andino',
    zona: 'Zona Central',
    descripcion: 'Una ruta de día completo por el Valle del Maipo. Perfecta para comenzar en el trekking con paisajes de alta montaña a solo minutos de Santiago.',
    duracion: '1 Día',
    dificultad: 'fácil',
    imagen: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    itinerario: [
      '08:00 Salida Santiago',
      '10:00 Inicio sendero',
      '13:00 Almuerzo en ruta',
      '16:00 Punto panorámico',
      '19:00 Retorno',
    ],
    equipo: ['Mochila 20L', 'Bastones', 'Agua 2L'],
    proximasSalidas: [
      { fecha: 'Cada Sábado', tipo: 'Full Day' },
    ],
  },
  {
    slug: 'ruta-glaciares',
    nombre: 'Ruta de los Glaciares',
    zona: 'Patagonia',
    descripcion: 'Explora los glaciares más impresionantes del sur. Vistas al Glaciar Grey, caminata por hielo milenario y noches bajo las estrellas.',
    duracion: '5 Días / 4 Noches',
    dificultad: 'media',
    imagen: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    itinerario: [
      'Día 1: Llegada a Paine',
      'Día 2: Mirador Glaciar',
      'Día 3: Trekking glaciar',
      'Día 4: Navegación',
      'Día 5: Regreso',
    ],
    equipo: ['Mochila 40L', 'Crampones', 'Ropa térmica'],
    proximasSalidas: [
      { fecha: 'Ene 15 - 20', tipo: '5 días' },
    ],
  },
  {
    slug: 'desierto-atacama',
    nombre: 'Desierto de Atacama',
    zona: 'Norte',
    descripcion: 'Contrastes extremos: géiseres al amanecer, salares infinitos y lagunas altiplánicas. Una experiencia única en el desierto más árido del mundo.',
    duracion: '4 Días / 3 Noches',
    dificultad: 'fácil',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    itinerario: [
      'Día 1: Valle de la Luna',
      'Día 2: Géiseres del Tatio',
      'Día 3: Lagunas Altiplánicas',
      'Día 4: Retorno',
    ],
    equipo: ['Protección solar', 'Ropa abrigada', 'Agua'],
    proximasSalidas: [
      { fecha: 'Todo el año', tipo: 'Flexible' },
    ],
  },
]

export function getRutaBySlug(slug: string): Ruta | undefined {
  return rutas.find((r) => r.slug === slug)
}
