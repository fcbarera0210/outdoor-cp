import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getLocalized } from '@/lib/locale'
import type { Locale } from '@/lib/locale'
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
        instruccionesBasicas: JSON.parse(row.instruccionesBasicasJson || '[]'),
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

    const locale: Locale = localeParam === 'en' ? 'en' : 'es'
    const instruccionesBasicasRaw = JSON.parse(row.instruccionesBasicasJson || '[]') as Record<string, unknown>[]
    return NextResponse.json({
      seguridad: getLocalized(row, 'seguridad', locale),
      queLlevar: getLocalized(row, 'queLlevar', locale),
      comportamiento: getLocalized(row, 'comportamiento', locale),
      instruccionesBasicas: instruccionesBasicasRaw.map((item) => ({
        titulo: getLocalized(item, 'titulo', locale),
        texto: getLocalized(item, 'texto', locale),
        icono: typeof item.icono === 'string' ? item.icono : undefined,
      })),
      dificultadFacil: getLocalized(row, 'dificultadFacil', locale),
      dificultadMedia: getLocalized(row, 'dificultadMedia', locale),
      dificultadAlta: getLocalized(row, 'dificultadAlta', locale),
      equipoNecesario: JSON.parse(row.equipoNecesarioJson || '[]').map((item: Record<string, unknown>) => ({
        titulo: getLocalized(item, 'titulo', locale),
        texto: getLocalized(item, 'texto', locale),
        icono: typeof item.icono === 'string' ? item.icono : undefined,
      })),
      senaletica: JSON.parse(row.senaleticaJson || '[]').map((item: Record<string, unknown>) => ({
        titulo: getLocalized(item, 'titulo', locale),
        texto: getLocalized(item, 'texto', locale),
        icono: typeof item.icono === 'string' ? item.icono : undefined,
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
      instruccionesBasicasJson: typeof body.instruccionesBasicas === 'string' ? body.instruccionesBasicas : JSON.stringify(body.instruccionesBasicas ?? []),
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
        instruccionesBasicasJson: data.instruccionesBasicasJson,
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
