const UPLOAD_API = '/api/upload'

const HEIC_MIMES = ['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence']
const HEIC_EXT = /\.(heic|heif)$/i

function isHeic(file: File): boolean {
  return HEIC_MIMES.includes(file.type) || HEIC_EXT.test(file.name)
}

/**
 * Convierte HEIC/HEIF a JPG. Si el archivo no es HEIC, lo devuelve sin cambios.
 * Usa heic-to (libheif 1.21.x) para mejor soporte de HEIC de iPhones recientes.
 * Carga dinámica para evitar "window is not defined" en SSR.
 */
const HEIC_ERROR_MESSAGE =
  'Este archivo HEIC/HEIF no pudo convertirse. Conviértelo a JPG o PNG en tu dispositivo (Fotos, o una app de conversión) y súbelo de nuevo.'

export async function convertHeicToJpgIfNeeded(file: File): Promise<File> {
  if (!isHeic(file)) return file

  try {
    const { heicTo } = await import('heic-to')
    const blob = await heicTo({
      blob: file,
      type: 'image/jpeg',
      quality: 0.9,
    })
    const name = file.name.replace(HEIC_EXT, '.jpg')
    return new File([blob], name, { type: 'image/jpeg' })
  } catch (e) {
    const msg = e && typeof e === 'object' && 'message' in e ? String((e as { message: unknown }).message) : ''
    if (/HEIF|HEIC|format not supported|ERR_LIBHEIF|decode|parse/i.test(msg)) {
      throw new Error(HEIC_ERROR_MESSAGE)
    }
    throw e
  }
}

const compressionOptions = {
  maxSizeMB: 0.25,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: 'image/webp' as const,
}

/**
 * Optimiza una imagen: convierte a WebP, comprime y limita tamaño/dimensiones.
 * Objetivo: 150–250 KB, máx 1920px, buena calidad visual.
 * Espera JPG/PNG/etc.; para HEIC usar primero convertHeicToJpgIfNeeded.
 * Carga browser-image-compression solo en el cliente para evitar "window is not defined" en SSR.
 */
export async function optimizeImage(file: File): Promise<File> {
  const imageCompression = (await import('browser-image-compression')).default
  const compressed = await imageCompression(file, compressionOptions)
  return compressed
}

/**
 * Sube la imagen como portada de una ruta (tour).
 * El archivo debe estar ya optimizado (WebP). Guarda en tours/{tourSlug}/cover.webp.
 */
export async function uploadTourCover(file: File, tourSlug: string): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('tourSlug', tourSlug)
  formData.append('type', 'cover')

  const res = await fetch(UPLOAD_API, { method: 'POST', body: formData })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error ?? 'Error al subir la imagen')
  }
  const data = (await res.json()) as { url: string }
  return data.url
}

/**
 * Sube una imagen de uso genérico (blog, hero, partners).
 * El archivo debe estar ya optimizado (WebP). Guarda en uploads/{id}.webp.
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(UPLOAD_API, { method: 'POST', body: formData })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error ?? 'Error al subir la imagen')
  }
  const data = (await res.json()) as { url: string }
  return data.url
}
