import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getLocaleFromRequest } from '@/lib/locale'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request)
    const destacadasOnly = request.nextUrl.searchParams.get('destacadas') === 'true'

    const rutas = await prisma.ruta.findMany({
      orderBy: { orden: 'asc' },
      where: destacadasOnly ? { destacada: true } : undefined,
      include: {
        itinerarios: { orderBy: { orden: 'asc' } },
        equipos: { orderBy: { orden: 'asc' } },
        proximasSalidas: { orderBy: { orden: 'asc' } },
      },
    })

    const suffix = locale === 'es' ? 'Es' : 'En'
    const list = rutas.map((r) => ({
      slug: r.slug,
      nombre: locale === 'es' ? r.nombreEs : r.nombreEn,
      zona: locale === 'es' ? r.zonaEs : r.zonaEn,
      descripcion: locale === 'es' ? r.descripcionEs : r.descripcionEn,
      duracion: locale === 'es' ? r.duracionEs : r.duracionEn,
      dificultad: r.dificultad,
      imagen: r.imagen,
      destacada: r.destacada,
      itinerario: r.itinerarios.map((i) => (locale === 'es' ? i.textoEs : i.textoEn)),
      equipo: r.equipos.map((e) => (locale === 'es' ? e.textoEs : e.textoEn)),
      proximasSalidas: r.proximasSalidas.map((s) => ({
        fecha: s.fecha,
        tipo: locale === 'es' ? s.tipoEs : s.tipoEn,
      })),
    }))

    return NextResponse.json(list)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch rutas' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAdmin(request)
  if (auth) return auth
  try {
    const body = await request.json()
    const {
      slug,
      nombreEs,
      nombreEn,
      zonaEs,
      zonaEn,
      descripcionEs,
      descripcionEn,
      duracionEs,
      duracionEn,
      dificultad,
      imagen,
      destacada,
      orden,
      itinerario,
      equipo,
      proximasSalidas,
    } = body

    const ruta = await prisma.ruta.create({
      data: {
        slug: slug || body.slug,
        nombreEs: nombreEs ?? '',
        nombreEn: nombreEn ?? '',
        zonaEs: zonaEs ?? '',
        zonaEn: zonaEn ?? '',
        descripcionEs: descripcionEs ?? '',
        descripcionEn: descripcionEn ?? '',
        duracionEs: duracionEs ?? '',
        duracionEn: duracionEn ?? '',
        dificultad: dificultad ?? 'media',
        imagen: imagen ?? '',
        destacada: Boolean(destacada),
        orden: Number(orden) ?? 0,
        itinerarios: Array.isArray(itinerario)
          ? { create: itinerario.map((t: { textoEs: string; textoEn?: string }, i: number) => ({
              textoEs: typeof t === 'string' ? t : t.textoEs,
              textoEn: typeof t === 'object' && t?.textoEn != null ? t.textoEn : '',
              orden: i,
            })) }
          : undefined,
        equipos: Array.isArray(equipo)
          ? { create: equipo.map((t: { textoEs: string; textoEn?: string }, i: number) => ({
              textoEs: typeof t === 'string' ? t : t.textoEs,
              textoEn: typeof t === 'object' && t?.textoEn != null ? t.textoEn : '',
              orden: i,
            })) }
          : undefined,
        proximasSalidas: Array.isArray(proximasSalidas)
          ? { create: proximasSalidas.map((s: { fecha: string; tipoEs?: string; tipoEn?: string; tipo?: string }, i: number) => ({
              fecha: s.fecha ?? '',
              tipoEs: s.tipoEs ?? s.tipo ?? '',
              tipoEn: s.tipoEn ?? '',
              orden: i,
            })) }
          : undefined,
      },
      include: {
        itinerarios: true,
        equipos: true,
        proximasSalidas: true,
      },
    })
    return NextResponse.json(ruta)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create ruta' }, { status: 500 })
  }
}
