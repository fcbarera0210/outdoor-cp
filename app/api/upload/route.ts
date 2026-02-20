import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if (auth) return auth

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const blob = await put(file.name, file, {
      access: 'public',
    })

    return NextResponse.json({ url: blob.url })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
