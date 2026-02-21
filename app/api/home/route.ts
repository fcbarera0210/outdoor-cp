import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getLocaleFromRequest, pickLocale } from '@/lib/locale'

export const dynamic = 'force-dynamic'

/** Aplica convención Es/En y mantiene claves sin sufijo (ej. type, imagen). */
function pickLang(obj: Record<string, unknown>, locale: 'es' | 'en'): Record<string, string> {
  const picked = pickLocale(obj, locale)
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && !k.endsWith('Es') && !k.endsWith('En')) (picked as Record<string, string>)[k] = v
  }
  return picked as Record<string, string>
}

export async function GET(request: NextRequest) {
  try {
    const locale = getLocaleFromRequest(request)
    const blocks = await prisma.homeBlock.findMany()

    const result: Record<string, unknown> = {}
    for (const b of blocks) {
      const value = JSON.parse(b.value || '{}') as Record<string, unknown>
      if (Array.isArray(value)) {
        result[b.type] = value.map((item: Record<string, unknown>) => pickLang(item, locale))
      } else {
        result[b.type] = pickLang(value, locale)
      }
    }

    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch home' }, { status: 500 })
  }
}
