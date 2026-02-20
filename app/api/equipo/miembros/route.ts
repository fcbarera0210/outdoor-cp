import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getLocaleFromRequest } from '@/lib/locale'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request)
    const miembros = await prisma.miembroEquipo.findMany({
      orderBy: { orden: 'asc' },
    })

    const list = miembros.map((m) => ({
      id: m.id,
      nombre: m.nombre,
      rol: locale === 'es' ? m.rolEs : m.rolEn,
      imagen: m.imagen,
      bio: locale === 'es' ? m.bioEs : m.bioEn,
    }))
    return NextResponse.json(list)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch miembros' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if (auth) return auth
  try {
    const body = await request.json()
    const member = await prisma.miembroEquipo.create({
      data: {
        nombre: body.nombre ?? '',
        rolEs: body.rolEs ?? '',
        rolEn: body.rolEn ?? '',
        imagen: body.imagen ?? '',
        bioEs: body.bioEs ?? '',
        bioEn: body.bioEn ?? '',
        orden: Number(body.orden) ?? 0,
      },
    })
    return NextResponse.json(member)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
  }
}
