import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin()
  if (auth) return auth
  try {
    const body = await request.json()
    const reserva = await prisma.reserva.update({
      where: { id: params.id },
      data: {
        ...(body.estado != null && { estado: body.estado }),
        ...(body.notas != null && { notas: body.notas }),
      },
    })
    return NextResponse.json(reserva)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update reserva' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin()
  if (auth) return auth
  try {
    await prisma.reserva.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete reserva' }, { status: 500 })
  }
}
