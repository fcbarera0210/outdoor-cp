import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getLocaleFromRequest } from '@/lib/locale'

export const dynamic = 'force-dynamic'

function pickLang(obj: Record<string, unknown>, locale: 'es' | 'en'): Record<string, string> {
  const suffix = locale === 'es' ? 'Es' : 'En'
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v !== 'string') continue
    if (k.endsWith('Es') || k.endsWith('En')) {
      if (k.endsWith(suffix)) out[k.slice(0, -2)] = v
    } else {
      out[k] = v
    }
  }
  return out
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
