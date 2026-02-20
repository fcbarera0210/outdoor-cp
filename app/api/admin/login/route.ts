import { NextRequest, NextResponse } from 'next/server'
import { setAdminCookie } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const password = body.password ?? ''
    const expected = process.env.ADMIN_PASSWORD ?? 'admin'
    if (password !== expected) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
    const res = NextResponse.json({ ok: true })
    setAdminCookie(res)
    return res
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
