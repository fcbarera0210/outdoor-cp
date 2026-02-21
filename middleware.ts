import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isLocale, defaultLocale } from '@/i18n/routing'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]

  if (isLocale(first)) {
    return NextResponse.next()
  }

  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
}
