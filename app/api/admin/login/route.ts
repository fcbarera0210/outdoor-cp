import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Login is now handled by NextAuth at /api/auth/[...nextauth]
export async function POST() {
  return NextResponse.json(
    { error: 'Use /api/auth/signin instead' },
    { status: 410 }
  )
}
