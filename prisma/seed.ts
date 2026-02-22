import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Seed admin user
  const adminEmail = 'admin@cherryexperience.cl'
  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      name: 'Admin',
      passwordHash: hashSync('admin123', 10),
      role: 'admin',
    },
    update: {},
  })
  console.log('Created admin user:', adminEmail)

  // Seed Rutas (from data/rutas.ts - map to _es, copy to _en for demo)
  const rutasData = [
    {
      slug: 'circuito-w',
      nombreEs: 'Circuito W: El Corazón de Paine',
      nombreEn: 'W Circuit: The Heart of Paine',
      zonaEs: 'Patagonia',
      zonaEn: 'Patagonia',
      descripcionEs: 'Una travesía inolvidable por los senderos más icónicos del Parque Nacional Torres del Paine. Camina junto a los Cuernos, el Valle del Francés y el Glaciar Grey. Incluye refugios y comidas.',
      descripcionEn: 'An unforgettable trek along the most iconic trails of Torres del Paine National Park. Walk past the Cuernos, the French Valley and Grey Glacier. Includes refuges and meals.',
      duracionEs: '5 Días / 4 Noches',
      duracionEn: '5 Days / 4 Nights',
      duracionDias: 5,
      duracionNoches: 4,
      dificultad: 'media',
      imagen: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      destacada: true,
      orden: 0,
      itinerarios: [
        { textoEs: 'Día 1: Torres – Valle Ascencio', textoEn: 'Day 1: Torres – Ascencio Valley', orden: 0 },
        { textoEs: 'Día 2: Base Torres – Cuernos', textoEn: 'Day 2: Torres Base – Cuernos', orden: 1 },
        { textoEs: 'Día 3: Valle del Francés', textoEn: 'Day 3: French Valley', orden: 2 },
        { textoEs: 'Día 4: Glaciar Grey', textoEn: 'Day 4: Grey Glacier', orden: 3 },
        { textoEs: 'Día 5: Regreso', textoEn: 'Day 5: Return', orden: 4 },
      ],
      equipos: [
        { textoEs: 'Mochila 40-50L', textoEn: '40-50L Backpack', orden: 0 },
        { textoEs: 'Bastones trekking', textoEn: 'Trekking poles', orden: 1 },
        { textoEs: 'Ropa impermeable', textoEn: 'Waterproof clothing', orden: 2 },
        { textoEs: 'Sleeping bag', textoEn: 'Sleeping bag', orden: 3 },
      ],
      proximasSalidas: [
        { fecha: '2025-01-15', cupos: 12, orden: 0 },
        { fecha: '2025-02-05', cupos: 12, orden: 1 },
      ],
    },
    {
      slug: 'volcan-villarrica',
      nombreEs: 'Ascenso al Cráter: Volcán Villarrica',
      nombreEn: 'Crater Ascent: Villarrica Volcano',
      zonaEs: 'Araucanía',
      zonaEn: 'Araucanía',
      descripcionEs: 'Desafía tus límites con el ascenso a uno de los volcanes más activos de Sudamérica. Vistas panorámicas de lagos y cordillera desde la cima humeante. Equipo técnico incluido.',
      descripcionEn: 'Challenge your limits climbing one of South America\'s most active volcanoes. Panoramic views of lakes and mountains from the smoking summit. Technical equipment included.',
      duracionEs: 'Full Day',
      duracionEn: 'Full Day',
      duracionDias: 1,
      duracionNoches: 0,
      dificultad: 'alta',
      imagen: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      destacada: true,
      orden: 1,
      itinerarios: [
        { textoEs: '05:00 Salida desde Pucón', textoEn: '05:00 Departure from Pucón', orden: 0 },
        { textoEs: '06:30 Inicio de ascenso', textoEn: '06:30 Ascent start', orden: 1 },
        { textoEs: '12:00 Cima del volcán', textoEn: '12:00 Volcano summit', orden: 2 },
        { textoEs: '14:00 Descenso', textoEn: '14:00 Descent', orden: 3 },
        { textoEs: '18:00 Retorno a Pucón', textoEn: '18:00 Return to Pucón', orden: 4 },
      ],
      equipos: [
        { textoEs: 'Crampones', textoEn: 'Crampons', orden: 0 },
        { textoEs: 'Piolet', textoEn: 'Ice axe', orden: 1 },
        { textoEs: 'Casco', textoEn: 'Helmet', orden: 2 },
        { textoEs: 'Ropa técnica', textoEn: 'Technical clothing', orden: 3 },
      ],
      proximasSalidas: [
        { fecha: '2025-01-20', cupos: 8, orden: 0 },
        { fecha: '2025-02-02', cupos: 8, orden: 1 },
      ],
    },
    {
      slug: 'cajon-del-maipo',
      nombreEs: 'Cajón del Maipo: Atardecer Andino',
      nombreEn: 'Cajón del Maipo: Andean Sunset',
      zonaEs: 'Zona Central',
      zonaEn: 'Central Zone',
      descripcionEs: 'Una ruta de día completo por el Valle del Maipo. Perfecta para comenzar en el trekking con paisajes de alta montaña a solo minutos de Santiago.',
      descripcionEn: 'A full-day route through the Maipo Valley. Perfect for starting trekking with high mountain landscapes just minutes from Santiago.',
      duracionEs: '1 Día',
      duracionEn: '1 Day',
      duracionDias: 1,
      duracionNoches: 0,
      dificultad: 'fácil',
      imagen: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      destacada: false,
      orden: 2,
      itinerarios: [
        { textoEs: '08:00 Salida Santiago', textoEn: '08:00 Departure Santiago', orden: 0 },
        { textoEs: '10:00 Inicio sendero', textoEn: '10:00 Trail start', orden: 1 },
        { textoEs: '13:00 Almuerzo en ruta', textoEn: '13:00 Lunch on route', orden: 2 },
        { textoEs: '16:00 Punto panorámico', textoEn: '16:00 Viewpoint', orden: 3 },
        { textoEs: '19:00 Retorno', textoEn: '19:00 Return', orden: 4 },
      ],
      equipos: [
        { textoEs: 'Mochila 20L', textoEn: '20L Backpack', orden: 0 },
        { textoEs: 'Bastones', textoEn: 'Poles', orden: 1 },
        { textoEs: 'Agua 2L', textoEn: '2L Water', orden: 2 },
      ],
      proximasSalidas: [
        { fecha: '2025-02-01', cupos: 10, orden: 0 },
      ],
    },
    {
      slug: 'ruta-glaciares',
      nombreEs: 'Ruta de los Glaciares',
      nombreEn: 'Glaciers Route',
      zonaEs: 'Patagonia',
      zonaEn: 'Patagonia',
      descripcionEs: 'Explora los glaciares más impresionantes del sur. Vistas al Glaciar Grey, caminata por hielo milenario y noches bajo las estrellas.',
      descripcionEn: 'Explore the most impressive glaciers of the south. Views of Grey Glacier, walk on ancient ice and nights under the stars.',
      duracionEs: '5 Días / 4 Noches',
      duracionEn: '5 Days / 4 Nights',
      duracionDias: 5,
      duracionNoches: 4,
      dificultad: 'media',
      imagen: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      destacada: false,
      orden: 3,
      itinerarios: [
        { textoEs: 'Día 1: Llegada a Paine', textoEn: 'Day 1: Arrival at Paine', orden: 0 },
        { textoEs: 'Día 2: Mirador Glaciar', textoEn: 'Day 2: Glacier viewpoint', orden: 1 },
        { textoEs: 'Día 3: Trekking glaciar', textoEn: 'Day 3: Glacier trekking', orden: 2 },
        { textoEs: 'Día 4: Navegación', textoEn: 'Day 4: Navigation', orden: 3 },
        { textoEs: 'Día 5: Regreso', textoEn: 'Day 5: Return', orden: 4 },
      ],
      equipos: [
        { textoEs: 'Mochila 40L', textoEn: '40L Backpack', orden: 0 },
        { textoEs: 'Crampones', textoEn: 'Crampons', orden: 1 },
        { textoEs: 'Ropa térmica', textoEn: 'Thermal clothing', orden: 2 },
      ],
      proximasSalidas: [
        { fecha: '2025-01-15', cupos: 8, orden: 0 },
      ],
    },
    {
      slug: 'desierto-atacama',
      nombreEs: 'Desierto de Atacama',
      nombreEn: 'Atacama Desert',
      zonaEs: 'Norte',
      zonaEn: 'North',
      descripcionEs: 'Contrastes extremos: géiseres al amanecer, salares infinitos y lagunas altiplánicas. Una experiencia única en el desierto más árido del mundo.',
      descripcionEn: 'Extreme contrasts: geysers at dawn, endless salt flats and highland lagoons. A unique experience in the world\'s driest desert.',
      duracionEs: '4 Días / 3 Noches',
      duracionEn: '4 Days / 3 Nights',
      duracionDias: 4,
      duracionNoches: 3,
      dificultad: 'fácil',
      imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      destacada: false,
      orden: 4,
      itinerarios: [
        { textoEs: 'Día 1: Valle de la Luna', textoEn: 'Day 1: Valley of the Moon', orden: 0 },
        { textoEs: 'Día 2: Géiseres del Tatio', textoEn: 'Day 2: Tatio Geysers', orden: 1 },
        { textoEs: 'Día 3: Lagunas Altiplánicas', textoEn: 'Day 3: Highland Lagoons', orden: 2 },
        { textoEs: 'Día 4: Retorno', textoEn: 'Day 4: Return', orden: 3 },
      ],
      equipos: [
        { textoEs: 'Protección solar', textoEn: 'Sun protection', orden: 0 },
        { textoEs: 'Ropa abrigada', textoEn: 'Warm clothing', orden: 1 },
        { textoEs: 'Agua', textoEn: 'Water', orden: 2 },
      ],
      proximasSalidas: [
        { fecha: '2025-03-01', cupos: 6, orden: 0 },
      ],
    },
  ]

  for (const r of rutasData) {
    const { itinerarios, equipos, proximasSalidas, ...rutaFields } = r
    const ruta = await prisma.ruta.create({
      data: {
        ...rutaFields,
        itinerarios: { create: itinerarios },
        equipos: { create: equipos },
        proximasSalidas: { create: proximasSalidas },
      },
    })
    console.log('Created ruta:', ruta.slug)
  }

  // Seed Blog
  const blogData = [
    { slug: 'equipo-esencial-invierno', titleEs: 'Equipo Esencial: Invierno', titleEn: 'Essential Gear: Winter', excerptEs: 'Todo lo que necesitas para una expedición segura en condiciones invernales.', excerptEn: 'Everything you need for a safe expedition in winter conditions.', contentEs: 'El trekking en invierno requiere preparación especial. En este artículo te guiamos sobre el equipo esencial: capas de ropa, calzado impermeable, crampones, bastones y más. La clave está en mantenerte seco y abrigado sin sobrecargar la mochila.', contentEn: 'Winter trekking requires special preparation. In this article we guide you on essential gear: clothing layers, waterproof footwear, crampons, poles and more. The key is staying dry and warm without overloading your pack.', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', date: '2024-01-15', authorEs: 'Equipo Cherry', authorEn: 'Cherry Team' },
    { slug: 'flora-nativa-del-sur', titleEs: 'Flora Nativa del Sur', titleEn: 'Native Flora of the South', excerptEs: 'Descubre las especies únicas que encuentras en los senderos de la Patagonia.', excerptEn: 'Discover the unique species you find on Patagonia trails.', contentEs: 'La Patagonia chilena alberga una biodiversidad única. Desde el arrayán hasta el notro, las especies adaptadas al clima austral crean paisajes de otro mundo. Aprende a identificarlas y respetarlas durante tu travesía.', contentEn: 'Chilean Patagonia hosts unique biodiversity. From the arrayán to the notro, species adapted to the southern climate create otherworldly landscapes. Learn to identify and respect them on your trek.', image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', date: '2024-01-08', authorEs: 'Equipo Cherry', authorEn: 'Cherry Team' },
    { slug: 'circuito-w-primeros-pasos', titleEs: 'Circuito W: Primeros Pasos', titleEn: 'W Circuit: First Steps', excerptEs: 'Guía práctica para preparar tu primera experiencia en Torres del Paine.', excerptEn: 'Practical guide to prepare your first experience in Torres del Paine.', contentEs: 'El Circuito W es uno de los trekkings más icónicos del mundo. Te contamos cómo prepararte físicamente, qué documentación necesitas y qué esperar día a día. Incluye consejos de nuestros guías con más de 10 años de experiencia.', contentEn: 'The W Circuit is one of the world\'s most iconic treks. We tell you how to prepare physically, what documentation you need and what to expect day by day. Includes tips from our guides with over 10 years of experience.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', date: '2024-01-01', authorEs: 'Equipo Cherry', authorEn: 'Cherry Team' },
    { slug: 'ascenso-volcanes-chile', titleEs: 'Ascenso a Volcanes de Chile', titleEn: 'Climbing Chile\'s Volcanoes', excerptEs: 'Todo sobre el equipo técnico y la preparación para ascender volcanes activos.', excerptEn: 'All about technical gear and preparation for climbing active volcanoes.', contentEs: 'Chile tiene más de 2000 volcanes. El Villarrica, Lonquimay y otros ofrecen experiencias únicas. Te explicamos el equipo técnico necesario, las técnicas básicas de crampones y piolet, y cómo elegir tu primera cumbre.', contentEn: 'Chile has over 2000 volcanoes. Villarrica, Lonquimay and others offer unique experiences. We explain the necessary technical gear, basic crampon and ice axe techniques, and how to choose your first summit.', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', date: '2023-12-20', authorEs: 'Equipo Cherry', authorEn: 'Cherry Team' },
    { slug: 'fotografia-montana', titleEs: 'Fotografía en la Montaña', titleEn: 'Mountain Photography', excerptEs: 'Consejos para capturar los mejores momentos de tu expedición.', excerptEn: 'Tips for capturing the best moments of your expedition.', contentEs: 'La montaña ofrece escenarios únicos. Aprende a aprovechar la luz del amanecer, a proteger tu equipo de la humedad y a componer fotos que transmitan la escala y la belleza del paisaje. Sin necesidad de equipo profesional.', contentEn: 'The mountains offer unique settings. Learn to use dawn light, protect your gear from moisture and compose photos that convey the scale and beauty of the landscape. No professional gear required.', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', date: '2023-12-10', authorEs: 'Equipo Cherry', authorEn: 'Cherry Team' },
  ]
  for (const p of blogData) {
    await prisma.blogPost.create({ data: p })
    console.log('Created blog post:', p.slug)
  }

  // Settings: contacto
  await prisma.setting.upsert({
    where: { key: 'contacto' },
    create: {
      key: 'contacto',
      value: JSON.stringify({
        telefono: '+56 9 1234 5678',
        email: 'contacto@cherryexperience.cl',
        ubicacionEs: 'Puerto Varas, Región de Los Lagos, Chile',
        ubicacionEn: 'Puerto Varas, Los Lagos Region, Chile',
        instagram: '#',
        facebook: '#',
        whatsapp: '#',
        youtube: '#',
        mapaEmbed: '',
      }),
    },
    update: {},
  })
  console.log('Created setting: contacto')

  // Settings: site (meta, etc.)
  await prisma.setting.upsert({
    where: { key: 'site' },
    create: {
      key: 'site',
      value: JSON.stringify({
        metaTitleEs: 'Cherry Experience - Andes of Chile',
        metaTitleEn: 'Cherry Experience - Andes of Chile',
        metaDescriptionEs: 'Expertos en turismo de montaña y conservación. Descubre los senderos más prístinos del sur del mundo.',
        metaDescriptionEn: 'Experts in mountain tourism and conservation. Discover the most pristine trails in the southern world.',
      }),
    },
    update: {},
  })
  console.log('Created setting: site')

  // Equipo instrucciones (singleton)
  await prisma.equipoInstrucciones.upsert({
    where: { id: 'singleton' },
    create: {
      id: 'singleton',
      seguridadEs: 'Siempre sigue las indicaciones del guía. No te separes del grupo. En caso de mal tiempo, el guía puede modificar o cancelar la ruta por tu seguridad.',
      seguridadEn: 'Always follow the guide\'s instructions. Do not leave the group. In case of bad weather, the guide may modify or cancel the route for your safety.',
      queLlevarEs: 'Ropa por capas, protección solar, botella de agua (mínimo 2L), snack energético. El equipo específico varía según la ruta; consulta la lista en cada expedición.',
      queLlevarEn: 'Layered clothing, sun protection, water bottle (min 2L), energy snack. Specific gear varies by route; check the list for each expedition.',
      comportamientoEs: 'Respeta la naturaleza: no dejes basura, no te aproximes a la fauna silvestre, camina solo por los senderos marcados. Principio de no dejar rastro.',
      comportamientoEn: 'Respect nature: do not leave trash, do not approach wildlife, walk only on marked trails. Leave no trace principle.',
      dificultadFacilEs: 'Terreno accesible, desnivel moderado. Ideal para principiantes y familias.',
      dificultadFacilEn: 'Accessible terrain, moderate elevation. Ideal for beginners and families.',
      dificultadMediaEs: 'Requiere condición física básica. Algunos tramos con mayor exigencia.',
      dificultadMediaEn: 'Requires basic physical condition. Some sections with greater demand.',
      dificultadAltaEs: 'Terreno técnico, condición física buena. Equipo especializado requerido.',
      dificultadAltaEn: 'Technical terrain, good physical condition. Specialized equipment required.',
      equipoNecesarioJson: JSON.stringify([
        { tituloEs: 'Mochila', tituloEn: 'Backpack', textoEs: '40-50L para rutas multinoche. 20-30L para día.', textoEn: '40-50L for multi-night routes. 20-30L for day.' },
        { tituloEs: 'Bastones', tituloEn: 'Poles', textoEs: 'Reducen impacto en rodillas y mejoran estabilidad.', textoEn: 'Reduce impact on knees and improve stability.' },
        { tituloEs: 'Casco', tituloEn: 'Helmet', textoEs: 'Obligatorio en ascensos volcánicos y terrenos técnicos.', textoEn: 'Mandatory on volcanic ascents and technical terrain.' },
        { tituloEs: 'Crampones', tituloEn: 'Crampons', textoEs: 'Para nieve y hielo. Incluidos en rutas que lo requieren.', textoEn: 'For snow and ice. Included on routes that require them.' },
      ]),
      senaleticaJson: JSON.stringify([
        { tituloEs: 'Marcas de sendero', tituloEn: 'Trail markers', textoEs: 'Cairns (montículos de piedras) y hitos pintados indican la ruta correcta.', textoEn: 'Cairns (stone mounds) and painted markers indicate the correct route.' },
        { tituloEs: 'Postes indicadores', tituloEn: 'Signposts', textoEs: 'En parques nacionales marcan distancias y cruces.', textoEn: 'In national parks they mark distances and junctions.' },
      ]),
    },
    update: {},
  })
  console.log('Created equipo instrucciones')

  // One default member
  await prisma.miembroEquipo.create({
    data: { nombre: 'Juan Pérez', rolEs: 'Guía Principal', rolEn: 'Lead Guide', imagen: '', bioEs: 'Más de 15 años de experiencia.', bioEn: 'Over 15 years of experience.', orden: 0 },
  })
  console.log('Created miembro equipo')

  // Home blocks
  const heroValue = {
    temporadaEs: 'Temporada 2024 / 2025',
    temporadaEn: 'Season 2024 / 2025',
    tituloEs: 'Patagonia Sin Límites',
    tituloEn: 'Patagonia Without Limits',
    subtituloEs: 'Descubre los senderos más prístinos del sur del mundo. Guiamos tus pasos por glaciares milenarios, bosques nativos y las cumbres más imponentes de los Andes.',
    subtituloEn: 'Discover the most pristine trails in the southern world. We guide your steps through ancient glaciers, native forests and the most imposing peaks of the Andes.',
    cta1Es: 'Ver Expediciones',
    cta1En: 'View Expeditions',
    cta2Es: 'Nuestro Equipo',
    cta2En: 'Our Team',
    imagenHero: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  }
  await prisma.homeBlock.upsert({
    where: { type: 'hero' },
    create: { type: 'hero', value: JSON.stringify(heroValue) },
    update: { value: JSON.stringify(heroValue) },
  })

  const partnersValue = [
    { nombreEs: 'Trek Chile', nombreEn: 'Trek Chile' },
    { nombreEs: 'SERNATUR', nombreEn: 'SERNATUR' },
    { nombreEs: 'Guías Certificados', nombreEn: 'Certified Guides' },
    { nombreEs: 'Andes', nombreEn: 'Andes' },
  ]
  await prisma.homeBlock.upsert({
    where: { type: 'partners' },
    create: { type: 'partners', value: JSON.stringify(partnersValue) },
    update: { value: JSON.stringify(partnersValue) },
  })

  const featuredSectionValue = {
    subtituloEs: 'Vive la experiencia',
    subtituloEn: 'Live the experience',
    tituloEs: 'Nuestras Rutas Destacadas',
    tituloEn: 'Our Featured Routes',
    tituloDestacadoEs: 'Rutas',
    tituloDestacadoEn: 'Routes',
  }
  await prisma.homeBlock.upsert({
    where: { type: 'featuredSection' },
    create: { type: 'featuredSection', value: JSON.stringify(featuredSectionValue) },
    update: { value: JSON.stringify(featuredSectionValue) },
  })

  const galleryValue = [
    { imagen: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tituloEs: 'Cajón del Maipo', tituloEn: 'Cajón del Maipo', subtituloEs: 'Atardecer Andino', subtituloEn: 'Andean Sunset', enlace: '#', orden: 0 },
    { imagen: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tituloEs: 'Carretera Austral', tituloEn: 'Carretera Austral', subtituloEs: 'Bosque Profundo', subtituloEn: 'Deep Forest', enlace: '#', orden: 1 },
    { imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', tituloEs: 'San Pedro', tituloEn: 'San Pedro', subtituloEs: 'Valle de la Luna', subtituloEn: 'Valley of the Moon', enlace: '#', orden: 2 },
  ]
  await prisma.homeBlock.upsert({
    where: { type: 'gallery' },
    create: { type: 'gallery', value: JSON.stringify(galleryValue) },
    update: { value: JSON.stringify(galleryValue) },
  })

  const salidasSectionValue = {
    subtituloEs: 'Temporada 2024 / 2025',
    subtituloEn: 'Season 2024 / 2025',
    tituloEs: 'Próximas Salidas',
    tituloEn: 'Upcoming Departures',
    tituloDestacadoEs: 'Salidas',
    tituloDestacadoEn: 'Departures',
  }
  await prisma.homeBlock.upsert({
    where: { type: 'salidasSection' },
    create: { type: 'salidasSection', value: JSON.stringify(salidasSectionValue) },
    update: { value: JSON.stringify(salidasSectionValue) },
  })

  const reservaValue = {
    tituloEs: 'Reserva tu Aventura',
    tituloEn: 'Book Your Adventure',
    textoEs: '¿Listo para desconectar? Cuéntanos qué tipo de experiencia buscas y nuestro equipo de guías expertos te ayudará a planificar la expedición perfecta. Cupos limitados por temporada.',
    textoEn: 'Ready to disconnect? Tell us what kind of experience you\'re looking for and our team of expert guides will help you plan the perfect expedition. Limited spots per season.',
    bullet1Es: 'Guías Certificados WFR',
    bullet1En: 'WFR Certified Guides',
    bullet2Es: 'Equipamiento de Alta Montaña',
    bullet2En: 'High Mountain Equipment',
    bullet3Es: 'Transporte Privado',
    bullet3En: 'Private Transport',
    labelNombreEs: 'Tu Nombre',
    labelNombreEn: 'Your Name',
    labelEmailEs: 'Tu Email',
    labelEmailEn: 'Your Email',
    labelTipoEs: 'Tipo de Aventura',
    labelTipoEn: 'Type of Adventure',
    labelMensajeEs: 'Mensaje / Fechas',
    labelMensajeEn: 'Message / Dates',
    ctaEs: 'Solicitar Reserva',
    ctaEn: 'Request Booking',
    placeholderNombreEs: 'Ej: Juan Pérez',
    placeholderNombreEn: 'e.g. John Smith',
    placeholderEmailEs: 'correo@ejemplo.com',
    placeholderEmailEn: 'email@example.com',
    placeholderMensajeEs: 'Cuéntanos más...',
    placeholderMensajeEn: 'Tell us more...',
  }
  await prisma.homeBlock.upsert({
    where: { type: 'reserva' },
    create: { type: 'reserva', value: JSON.stringify(reservaValue) },
    update: { value: JSON.stringify(reservaValue) },
  })

  // Gallery section titles
  const gallerySectionValue = {
    subtituloEs: 'Galería de Aventuras',
    subtituloEn: 'Adventure Gallery',
    tituloEs: 'Momentos en la Montaña',
    tituloEn: 'Moments in the Mountains',
    linkEs: 'Ver Todo en Instagram',
    linkEn: 'View All on Instagram',
  }
  await prisma.homeBlock.upsert({
    where: { type: 'gallerySection' },
    create: { type: 'gallerySection', value: JSON.stringify(gallerySectionValue) },
    update: { value: JSON.stringify(gallerySectionValue) },
  })

  console.log('Seed completed.')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
