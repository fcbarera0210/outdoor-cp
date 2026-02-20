import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await requireAdmin()
  if (auth) return auth
  try {
    const reservas = await prisma.reserva.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        ruta: { select: { slug: true, nombreEs: true, nombreEn: true } },
      },
    })
    return NextResponse.json(reservas)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch reservas' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rutaId, salidaId, nombre, email, telefono, pais, notas } = body

    if (!nombre || !email) {
      return NextResponse.json({ error: 'Nombre y email son requeridos' }, { status: 400 })
    }

    const reserva = await prisma.reserva.create({
      data: {
        rutaId: rutaId || null,
        salidaId: salidaId || null,
        nombre,
        email,
        telefono: telefono || '',
        pais: pais || '',
        notas: notas || '',
        estado: 'pendiente',
      },
    })
    return NextResponse.json(reserva, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create reserva' }, { status: 500 })
  }
}
