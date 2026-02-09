export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'equipo-esencial-invierno',
    title: 'Equipo Esencial: Invierno',
    excerpt: 'Todo lo que necesitas para una expedición segura en condiciones invernales.',
    content: 'El trekking en invierno requiere preparación especial. En este artículo te guiamos sobre el equipo esencial: capas de ropa, calzado impermeable, crampones, bastones y más. La clave está en mantenerte seco y abrigado sin sobrecargar la mochila.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2024-01-15',
    author: 'Equipo Cherry',
  },
  {
    slug: 'flora-nativa-del-sur',
    title: 'Flora Nativa del Sur',
    excerpt: 'Descubre las especies únicas que encuentras en los senderos de la Patagonia.',
    content: 'La Patagonia chilena alberga una biodiversidad única. Desde el arrayán hasta el notro, las especies adaptadas al clima austral crean paisajes de otro mundo. Aprende a identificarlas y respetarlas durante tu travesía.',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2024-01-08',
    author: 'Equipo Cherry',
  },
  {
    slug: 'circuito-w-primeros-pasos',
    title: 'Circuito W: Primeros Pasos',
    excerpt: 'Guía práctica para preparar tu primera experiencia en Torres del Paine.',
    content: 'El Circuito W es uno de los trekkings más icónicos del mundo. Te contamos cómo prepararte físicamente, qué documentación necesitas y qué esperar día a día. Incluye consejos de nuestros guías con más de 10 años de experiencia.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2024-01-01',
    author: 'Equipo Cherry',
  },
  {
    slug: 'ascenso-volcanes-chile',
    title: 'Ascenso a Volcanes de Chile',
    excerpt: 'Todo sobre el equipo técnico y la preparación para ascender volcanes activos.',
    content: 'Chile tiene más de 2000 volcanes. El Villarrica, Lonquimay y otros ofrecen experiencias únicas. Te explicamos el equipo técnico necesario, las técnicas básicas de crampones y piolet, y cómo elegir tu primera cumbre.',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2023-12-20',
    author: 'Equipo Cherry',
  },
  {
    slug: 'fotografia-montana',
    title: 'Fotografía en la Montaña',
    excerpt: 'Consejos para capturar los mejores momentos de tu expedición.',
    content: 'La montaña ofrece escenarios únicos. Aprende a aprovechar la luz del amanecer, a proteger tu equipo de la humedad y a componer fotos que transmitan la escala y la belleza del paisaje. Sin necesidad de equipo profesional.',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2023-12-10',
    author: 'Equipo Cherry',
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
