import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

// GET single block (raw JSON for admin)
export async function GET(
  _request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const block = await prisma.homeBlock.findUnique({
      where: { type: params.type },
    })
    if (!block) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(JSON.parse(block.value || '{}'))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch block' }, { status: 500 })
  }
}

// PUT update block (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const auth = await requireAdmin()
  if (auth) return auth
  try {
    const value = await request.json()
    await prisma.homeBlock.upsert({
      where: { type: params.type },
      create: { type: params.type, value: JSON.stringify(value) },
      update: { value: JSON.stringify(value) },
    })
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update block' }, { status: 500 })
  }
}
