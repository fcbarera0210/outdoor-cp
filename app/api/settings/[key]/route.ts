import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getLocaleFromRequest } from '@/lib/locale'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const key = params.key
    const locale = getLocaleFromRequest(request)

    const setting = await prisma.setting.findUnique({
      where: { key },
    })
    if (!setting) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const value = JSON.parse(setting.value) as Record<string, unknown>
    const localeParam = request.nextUrl.searchParams.get('locale')

    // Admin: return raw value with both languages
    if (localeParam === 'all') return NextResponse.json(value)

    // If key is contacto, map ubicacionEs/ubicacionEn to ubicacion by locale
    if (key === 'contacto' && (value.ubicacionEs != null || value.ubicacionEn != null)) {
      const ubicacion = locale === 'es' ? value.ubicacionEs : value.ubicacionEn
      return NextResponse.json({ ...value, ubicacion })
    }
    return NextResponse.json(value)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch setting' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  const auth = await requireAdmin()
  if (auth) return auth
  try {
    const key = params.key
    const value = await request.json()

    await prisma.setting.upsert({
      where: { key },
      create: { key, value: JSON.stringify(value) },
      update: { value: JSON.stringify(value) },
    })
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 })
  }
}
