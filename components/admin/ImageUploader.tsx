'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { sileo } from 'sileo'
import { convertHeicToJpgIfNeeded, optimizeImage, uploadTourCover, uploadImage } from '@/lib/image-upload'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  /** Si es true, muestra aviso de que hay que guardar el formulario para aplicar cambios */
  showSaveReminder?: boolean
  /** Slug de la ruta (tour): si se pasa, la imagen se sube como portada en tours/{slug}/cover.webp */
  tourSlug?: string
}

interface StoredImage {
  url: string
  pathname: string
}

type UploadStep = 'receiving' | 'heic' | 'optimizing' | 'uploading' | 'done'

const UPLOAD_STEP_LABELS: Record<UploadStep, string> = {
  receiving: 'Recibiendo imagen',
  heic: 'Transformando HEIC a JPG',
  optimizing: 'Optimizando imagen',
  uploading: 'Subiendo a la nube',
  done: 'Listo',
}

export default function ImageUploader({ value, onChange, label = 'Imagen', showSaveReminder = false, tourSlug }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadStep, setUploadStep] = useState<UploadStep>('receiving')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [mode, setMode] = useState<'upload' | 'url' | 'existing'>('upload')
  const [urlInput, setUrlInput] = useState(() => value ?? '')
  const [existingImages, setExistingImages] = useState<StoredImage[]>([])
  const [loadingExisting, setLoadingExisting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sincronizar urlInput cuando el padre cambia value (ej. al cargar el formulario con datos guardados)
  useEffect(() => {
    setUrlInput(value ?? '')
  }, [value])

  const isHeicFile = useCallback((f: File) => /\.(heic|heif)$/i.test(f.name) || ['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence'].includes(f.type), [])

  const handleUpload = useCallback(async (file: File) => {
    const isImage = file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name)
    if (!isImage) {
      sileo.error({ title: 'Archivo no válido', description: 'Selecciona una imagen (JPG, PNG, WebP o HEIC).' })
      return
    }
    setUploading(true)
    setUploadStep('receiving')
    setUploadProgress(5)
    try {
      // Paso 1: convertir HEIC a JPG si aplica
      let forOptimization: File
      if (isHeicFile(file)) {
        setUploadStep('heic')
        setUploadProgress(15)
        forOptimization = await convertHeicToJpgIfNeeded(file)
        setUploadProgress(35)
      } else {
        forOptimization = file
        setUploadProgress(30)
      }
      // Paso 2: optimizar a WebP
      setUploadStep('optimizing')
      setUploadProgress(40)
      const optimized = await optimizeImage(forOptimization)
      setUploadProgress(65)
      // Paso 3: subir
      setUploadStep('uploading')
      setUploadProgress(70)
      const url = tourSlug
        ? await uploadTourCover(optimized, tourSlug)
        : await uploadImage(optimized)
      setUploadProgress(100)
      setUploadStep('done')
      onChange(url)
      if (showSaveReminder) {
        sileo.success({ title: 'Imagen subida', description: 'Haz clic en Guardar para que se aplique en la web.' })
      }
    } catch (e) {
      console.error(e)
      sileo.error({ title: 'Error al subir la imagen', description: e instanceof Error ? e.message : undefined })
    } finally {
      setUploading(false)
      setUploadProgress(0)
      setUploadStep('receiving')
    }
  }, [onChange, showSaveReminder, tourSlug, isHeicFile])

  const loadExistingImages = useCallback(async () => {
    setLoadingExisting(true)
    try {
      const res = await fetch('/api/upload')
      if (!res.ok) throw new Error('Failed to list')
      const data = await res.json()
      setExistingImages(data.images ?? [])
    } catch (e) {
      console.error(e)
      sileo.error({ title: 'Error al cargar imágenes' })
      setExistingImages([])
    } finally {
      setLoadingExisting(false)
    }
  }, [])

  useEffect(() => {
    if (mode === 'existing' && existingImages.length === 0 && !loadingExisting) {
      loadExistingImages()
    }
  }, [mode, existingImages.length, loadingExisting, loadExistingImages])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    const isImage = file && (file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name))
    if (isImage) handleUpload(file)
  }, [handleUpload])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  return (
    <div>
      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">
        {label}
      </label>

      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`text-xs px-3 py-1 rounded ${mode === 'upload' ? 'bg-brand-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
        >
          <i className="fas fa-upload mr-1"></i> Subir
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`text-xs px-3 py-1 rounded ${mode === 'url' ? 'bg-brand-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
        >
          <i className="fas fa-link mr-1"></i> URL
        </button>
        <button
          type="button"
          onClick={() => setMode('existing')}
          className={`text-xs px-3 py-1 rounded ${mode === 'existing' ? 'bg-brand-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
        >
          <i className="fas fa-images mr-1"></i> Existentes
        </button>
      </div>

      {mode === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            dragOver
              ? 'border-brand-primary bg-brand-primary/5'
              : 'border-gray-300 dark:border-gray-600 hover:border-brand-primary'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.heic,.heif"
            onChange={handleFileSelect}
            className="hidden"
          />
          {uploading ? (
            <div className="w-full max-w-sm mx-auto text-left">
              <p className="text-sm font-medium text-brand-primary mb-2">{UPLOAD_STEP_LABELS[uploadStep]}</p>
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-brand-primary transition-all duration-500 ease-out ${uploadStep === 'heic' ? 'animate-pulse' : ''}`}
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{uploadProgress}%</p>
              {uploadStep === 'heic' && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                  Las fotos HEIC de iPhone pueden tardar varios minutos.
                </p>
              )}
            </div>
          ) : (
            <div className="text-gray-400 dark:text-gray-500">
              <i className="fas fa-cloud-upload-alt text-2xl"></i>
              <p className="text-sm mt-2">Arrastra una imagen o haz clic para seleccionar</p>
            </div>
          )}
        </div>
      ) : mode === 'url' ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput ?? ''}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 text-sm focus:border-brand-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => { onChange(urlInput ?? ''); }}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm hover:bg-brand-dark transition"
          >
            Aplicar
          </button>
        </div>
      ) : (
        <div className="border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4 max-h-64 overflow-y-auto">
          {loadingExisting ? (
            <div className="flex items-center justify-center py-8 text-brand-primary">
              <i className="fas fa-circle-notch fa-spin text-2xl"></i>
              <span className="ml-2 text-sm">Cargando imágenes...</span>
            </div>
          ) : existingImages.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No hay imágenes en el storage. Sube una desde la pestaña &quot;Subir&quot;.
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {existingImages.map((img) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => {
                    onChange(img.url)
                    if (showSaveReminder) {
                      sileo.success({ title: 'Imagen seleccionada', description: 'Haz clic en Guardar para aplicar.' })
                    }
                  }}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                    (value ?? '') === img.url
                      ? 'border-brand-primary ring-2 ring-brand-primary/30'
                      : 'border-gray-200 dark:border-gray-600 hover:border-brand-primary'
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {(value ?? '') && (
        <div className="mt-3 relative group">
          <img
            src={value ?? ''}
            alt="Preview"
            className="w-full max-h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
          />
          <button
            type="button"
            onClick={() => { onChange(''); setUrlInput('') }}
            aria-label="Quitar imagen"
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {showSaveReminder && (value ?? '') && (
        <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
          <i className="fas fa-info-circle mr-1"></i>
          Haz clic en <strong>Guardar</strong> al final del formulario para que esta imagen se guarde y se vea en la web.
        </p>
      )}
    </div>
  )
}
