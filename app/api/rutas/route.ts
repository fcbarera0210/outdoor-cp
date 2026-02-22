import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getLocaleFromRequest, getLocalized } from '@/lib/locale'
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

    const list = rutas.map((r) => ({
      id: r.id,
      slug: r.slug,
      nombre: getLocalized(r, 'nombre', locale),
      zona: getLocalized(r, 'zona', locale),
      descripcion: getLocalized(r, 'descripcion', locale),
      duracion: getLocalized(r, 'duracion', locale),
      dificultad: r.dificultad,
      imagen: r.imagen,
      destacada: r.destacada,
      itinerario: r.itinerarios.map((i) => getLocalized(i, 'texto', locale)),
      equipo: r.equipos.map((e) => ({
        titulo: getLocalized(e, 'titulo', locale),
        texto: getLocalized(e, 'texto', locale),
        icono: e.icono || undefined,
      })),
      proximasSalidas: r.proximasSalidas.map((s) => ({
        id: s.id,
        fecha: s.fecha,
        cupos: s.cupos ?? 0,
        cuposDisponibles: s.cupos ?? 0,
      })),
    }))

    return NextResponse.json(list)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch rutas' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
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
      duracionDias,
      duracionNoches,
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
        duracionDias: duracionDias != null ? Number(duracionDias) : 0,
        duracionNoches: duracionNoches != null ? Number(duracionNoches) : 0,
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
          ? { create: equipo.map((t: { tituloEs?: string; tituloEn?: string; textoEs: string; textoEn?: string; icono?: string }, i: number) => ({
              tituloEs: t?.tituloEs ?? '',
              tituloEn: t?.tituloEn ?? '',
              textoEs: typeof t === 'string' ? t : (t.textoEs ?? ''),
              textoEn: typeof t === 'object' && t?.textoEn != null ? t.textoEn : '',
              icono: typeof t === 'object' && t?.icono != null ? t.icono : '',
              orden: i,
            })) }
          : undefined,
        proximasSalidas: Array.isArray(proximasSalidas)
          ? { create: proximasSalidas.map((s: { fecha: string; cupos?: number }, i: number) => ({
              fecha: s.fecha ?? '',
              cupos: typeof s.cupos === 'number' ? s.cupos : Number(s.cupos) || 0,
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
    revalidatePath('/', 'layout')
    return NextResponse.json(ruta)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create ruta' }, { status: 500 })
  }
}
