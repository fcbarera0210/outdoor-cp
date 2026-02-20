import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAdmin(request)
  if (auth) return auth
  try {
    const body = await request.json()
    const member = await prisma.miembroEquipo.update({
      where: { id: params.id },
      data: {
        ...(body.nombre != null && { nombre: body.nombre }),
        ...(body.rolEs != null && { rolEs: body.rolEs }),
        ...(body.rolEn != null && { rolEn: body.rolEn }),
        ...(body.imagen != null && { imagen: body.imagen }),
        ...(body.bioEs != null && { bioEs: body.bioEs }),
        ...(body.bioEn != null && { bioEn: body.bioEn }),
        ...(body.orden != null && { orden: Number(body.orden) }),
      },
    })
    return NextResponse.json(member)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAdmin(request)
  if (auth) return auth
  try {
    await prisma.miembroEquipo.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 })
  }
}
