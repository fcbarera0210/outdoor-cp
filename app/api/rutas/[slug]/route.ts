import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getLocalized } from '@/lib/locale'
import type { Locale } from '@/lib/locale'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const localeParam = request.nextUrl.searchParams.get('locale')
    const slug = params.slug

    const ruta = await prisma.ruta.findUnique({
      where: { slug },
      include: {
        itinerarios: { orderBy: { orden: 'asc' } },
        equipos: { orderBy: { orden: 'asc' } },
        proximasSalidas: { orderBy: { orden: 'asc' } },
      },
    })

    if (!ruta) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Admin: return raw model with both languages
    if (localeParam === 'all') {
      return NextResponse.json({
        slug: ruta.slug,
        nombreEs: ruta.nombreEs,
        nombreEn: ruta.nombreEn,
        zonaEs: ruta.zonaEs,
        zonaEn: ruta.zonaEn,
        descripcionEs: ruta.descripcionEs,
        descripcionEn: ruta.descripcionEn,
        duracionEs: ruta.duracionEs,
        duracionEn: ruta.duracionEn,
        dificultad: ruta.dificultad,
        imagen: ruta.imagen,
        destacada: ruta.destacada,
        orden: ruta.orden,
        itinerarios: ruta.itinerarios.map((i) => ({ textoEs: i.textoEs, textoEn: i.textoEn, orden: i.orden })),
        equipos: ruta.equipos.map((e) => ({ textoEs: e.textoEs, textoEn: e.textoEn, orden: e.orden })),
        proximasSalidas: ruta.proximasSalidas.map((s) => ({ fecha: s.fecha, tipoEs: s.tipoEs, tipoEn: s.tipoEn, orden: s.orden })),
      })
    }

    const locale: Locale = localeParam === 'en' ? 'en' : 'es'
    const response = {
      id: ruta.id,
      slug: ruta.slug,
      nombre: getLocalized(ruta, 'nombre', locale),
      zona: getLocalized(ruta, 'zona', locale),
      descripcion: getLocalized(ruta, 'descripcion', locale),
      duracion: getLocalized(ruta, 'duracion', locale),
      dificultad: ruta.dificultad,
      imagen: ruta.imagen,
      itinerario: ruta.itinerarios.map((i) => getLocalized(i, 'texto', locale)),
      equipo: ruta.equipos.map((e) => getLocalized(e, 'texto', locale)),
      proximasSalidas: ruta.proximasSalidas.map((s) => ({
        fecha: s.fecha,
        tipo: getLocalized(s, 'tipo', locale),
      })),
    }
    return NextResponse.json(response)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch ruta' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const auth = await requireAdmin()
  if (auth) return auth
  try {
    const slug = params.slug
    const body = await request.json()

    const existing = await prisma.ruta.findUnique({ where: { slug } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Delete nested and recreate
    await prisma.rutaItinerario.deleteMany({ where: { rutaId: existing.id } })
    await prisma.rutaEquipo.deleteMany({ where: { rutaId: existing.id } })
    await prisma.rutaProximaSalida.deleteMany({ where: { rutaId: existing.id } })

    const {
      slug: newSlug,
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

    const ruta = await prisma.ruta.update({
      where: { slug },
      data: {
        ...(newSlug != null && newSlug !== slug && { slug: newSlug }),
        ...(nombreEs != null && { nombreEs }),
        ...(nombreEn != null && { nombreEn }),
        ...(zonaEs != null && { zonaEs }),
        ...(zonaEn != null && { zonaEn }),
        ...(descripcionEs != null && { descripcionEs }),
        ...(descripcionEn != null && { descripcionEn }),
        ...(duracionEs != null && { duracionEs }),
        ...(duracionEn != null && { duracionEn }),
        ...(dificultad != null && { dificultad }),
        ...(imagen != null && { imagen }),
        ...(destacada != null && { destacada }),
        ...(orden != null && { orden: Number(orden) }),
        ...(Array.isArray(itinerario) && {
          itinerarios: {
            create: itinerario.map((t: { textoEs: string; textoEn?: string }, i: number) => ({
              textoEs: typeof t === 'string' ? t : t.textoEs,
              textoEn: typeof t === 'object' && t?.textoEn != null ? t.textoEn : '',
              orden: i,
            })),
          },
        }),
        ...(Array.isArray(equipo) && {
          equipos: {
            create: equipo.map((t: { textoEs: string; textoEn?: string }, i: number) => ({
              textoEs: typeof t === 'string' ? t : t.textoEs,
              textoEn: typeof t === 'object' && t?.textoEn != null ? t.textoEn : '',
              orden: i,
            })),
          },
        }),
        ...(Array.isArray(proximasSalidas) && {
          proximasSalidas: {
            create: proximasSalidas.map((s: { fecha: string; tipoEs?: string; tipoEn?: string; tipo?: string }, i: number) => ({
              fecha: s.fecha ?? '',
              tipoEs: s.tipoEs ?? s.tipo ?? '',
              tipoEn: s.tipoEn ?? '',
              orden: i,
            })),
          },
        }),
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
    return NextResponse.json({ error: 'Failed to update ruta' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const auth = await requireAdmin()
  if (auth) return auth
  try {
    await prisma.ruta.delete({ where: { slug: params.slug } })
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete ruta' }, { status: 500 })
  }
}
