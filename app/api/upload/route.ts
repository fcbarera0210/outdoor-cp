import { NextRequest, NextResponse } from 'next/server'
import { put, list } from '@vercel/blob'
import { nanoid } from 'nanoid'
import { requireAdmin } from '@/lib/auth-admin'

export const dynamic = 'force-dynamic'

const MAX_SIZE_BYTES = 300 * 1024 // 300 KB
const WEBP_MIME = 'image/webp'

function normalizeSlug(slug: string): string {
  return String(slug).trim().toLowerCase().replace(/\s+/g, '-')
}

/** GET: listar imágenes ya subidas al storage (solo admin) */
export async function GET() {
  const auth = await requireAdmin()
  if (auth) return auth

  try {
    const result = await list({ limit: 100 })
    const images = result.blobs.map((b) => ({ url: b.url, pathname: b.pathname }))
    return NextResponse.json({ images, cursor: result.cursor, hasMore: result.hasMore })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if (auth) return auth

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const tourSlug = formData.get('tourSlug') as string | null
    const type = formData.get('type') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.type !== WEBP_MIME) {
      return NextResponse.json(
        { error: 'Solo se permiten imágenes WebP. Optimiza la imagen en el cliente antes de subir.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: `La imagen no puede superar ${MAX_SIZE_BYTES / 1024} KB.` },
        { status: 400 }
      )
    }

    let path: string
    let isCover = false
    if (tourSlug && type === 'cover') {
      const slug = normalizeSlug(tourSlug)
      if (!slug) {
        return NextResponse.json({ error: 'tourSlug inválido' }, { status: 400 })
      }
      path = `tours/${slug}/cover.webp`
      isCover = true
    } else {
      path = `uploads/${nanoid()}.webp`
    }

    const blob = await put(path, file, {
      access: 'public',
      ...(isCover && { allowOverwrite: true }),
    })

    // Para portadas: misma URL se sobrescribe → el navegador/CDN cachean la imagen vieja.
    // Añadimos ?v=timestamp para que la URL guardada sea distinta y se cargue la nueva imagen.
    const url = isCover ? `${blob.url}?v=${Date.now()}` : blob.url
    return NextResponse.json({ url })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
