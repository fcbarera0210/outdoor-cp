import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getLocaleFromRequest } from '@/lib/locale'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const localeParam = request.nextUrl.searchParams.get('locale')
    const row = await prisma.equipoInstrucciones.findUnique({
      where: { id: 'singleton' },
    })
    if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    if (localeParam === 'all') {
      return NextResponse.json({
        seguridadEs: row.seguridadEs,
        seguridadEn: row.seguridadEn,
        queLlevarEs: row.queLlevarEs,
        queLlevarEn: row.queLlevarEn,
        comportamientoEs: row.comportamientoEs,
        comportamientoEn: row.comportamientoEn,
        dificultadFacilEs: row.dificultadFacilEs,
        dificultadFacilEn: row.dificultadFacilEn,
        dificultadMediaEs: row.dificultadMediaEs,
        dificultadMediaEn: row.dificultadMediaEn,
        dificultadAltaEs: row.dificultadAltaEs,
        dificultadAltaEn: row.dificultadAltaEn,
        equipoNecesario: JSON.parse(row.equipoNecesarioJson || '[]'),
        senaletica: JSON.parse(row.senaleticaJson || '[]'),
      })
    }

    const locale = localeParam === 'en' ? 'en' : 'es'
    return NextResponse.json({
      seguridad: locale === 'es' ? row.seguridadEs : row.seguridadEn,
      queLlevar: locale === 'es' ? row.queLlevarEs : row.queLlevarEn,
      comportamiento: locale === 'es' ? row.comportamientoEs : row.comportamientoEn,
      dificultadFacil: locale === 'es' ? row.dificultadFacilEs : row.dificultadFacilEn,
      dificultadMedia: locale === 'es' ? row.dificultadMediaEs : row.dificultadMediaEn,
      dificultadAlta: locale === 'es' ? row.dificultadAltaEs : row.dificultadAltaEn,
      equipoNecesario: JSON.parse(row.equipoNecesarioJson || '[]').map((item: { tituloEs: string; tituloEn: string; textoEs: string; textoEn: string }) => ({
        titulo: locale === 'es' ? item.tituloEs : item.tituloEn,
        texto: locale === 'es' ? item.textoEs : item.textoEn,
      })),
      senaletica: JSON.parse(row.senaleticaJson || '[]').map((item: { tituloEs: string; tituloEn: string; textoEs: string; textoEn: string }) => ({
        titulo: locale === 'es' ? item.tituloEs : item.tituloEn,
        texto: locale === 'es' ? item.textoEs : item.textoEn,
      })),
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch instrucciones' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdmin()
  if (auth) return auth
  try {
    const body = await request.json()

    const data: Parameters<typeof prisma.equipoInstrucciones.upsert>[0]['create'] = {
      id: 'singleton',
      seguridadEs: body.seguridadEs ?? '',
      seguridadEn: body.seguridadEn ?? '',
      queLlevarEs: body.queLlevarEs ?? '',
      queLlevarEn: body.queLlevarEn ?? '',
      comportamientoEs: body.comportamientoEs ?? '',
      comportamientoEn: body.comportamientoEn ?? '',
      dificultadFacilEs: body.dificultadFacilEs ?? '',
      dificultadFacilEn: body.dificultadFacilEn ?? '',
      dificultadMediaEs: body.dificultadMediaEs ?? '',
      dificultadMediaEn: body.dificultadMediaEn ?? '',
      dificultadAltaEs: body.dificultadAltaEs ?? '',
      dificultadAltaEn: body.dificultadAltaEn ?? '',
      equipoNecesarioJson: typeof body.equipoNecesario === 'string' ? body.equipoNecesario : JSON.stringify(body.equipoNecesario ?? []),
      senaleticaJson: typeof body.senaletica === 'string' ? body.senaletica : JSON.stringify(body.senaletica ?? []),
    }

    await prisma.equipoInstrucciones.upsert({
      where: { id: 'singleton' },
      create: data,
      update: {
        seguridadEs: data.seguridadEs,
        seguridadEn: data.seguridadEn,
        queLlevarEs: data.queLlevarEs,
        queLlevarEn: data.queLlevarEn,
        comportamientoEs: data.comportamientoEs,
        comportamientoEn: data.comportamientoEn,
        dificultadFacilEs: data.dificultadFacilEs,
        dificultadFacilEn: data.dificultadFacilEn,
        dificultadMediaEs: data.dificultadMediaEs,
        dificultadMediaEn: data.dificultadMediaEn,
        dificultadAltaEs: data.dificultadAltaEs,
        dificultadAltaEn: data.dificultadAltaEn,
        equipoNecesarioJson: data.equipoNecesarioJson,
        senaleticaJson: data.senaleticaJson,
      },
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update instrucciones' }, { status: 500 })
  }
}
