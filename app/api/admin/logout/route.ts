import { NextResponse } from 'next/server'
import { clearAdminCookie } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  clearAdminCookie(res)
  return res
}
