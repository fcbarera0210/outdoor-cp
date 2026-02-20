import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_session'

export function getAdminToken(): string {
  return process.env.ADMIN_PASSWORD ?? 'admin'
}

export function getAdminSession(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value
  return token === getAdminToken()
}

export function setAdminCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, getAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function clearAdminCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 })
}

/** Use in write handlers: if (!requireAdmin(request)) return that 401 response */
export function requireAdmin(request: NextRequest): NextResponse | null {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
