import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function requireAdmin(): Promise<NextResponse | null> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return null
  } catch (e) {
    console.error('Auth error:', e)
    return NextResponse.json({ error: 'Auth error' }, { status: 500 })
  }
}
