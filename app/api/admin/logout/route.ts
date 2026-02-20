import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Logout is now handled by NextAuth at /api/auth/signout
export async function POST() {
  return NextResponse.json(
    { error: 'Use /api/auth/signout instead' },
    { status: 410 }
  )
}
