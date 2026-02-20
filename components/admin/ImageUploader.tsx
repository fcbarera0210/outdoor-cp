'use client'

import { useState, useRef, useCallback } from 'react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUploader({ value, onChange, label = 'Imagen' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      onChange(data.url)
    } catch (e) {
      console.error(e)
      alert('Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }, [onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file)
    }
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
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {uploading ? (
            <div className="text-brand-primary">
              <i className="fas fa-circle-notch fa-spin text-2xl"></i>
              <p className="text-sm mt-2">Subiendo...</p>
            </div>
          ) : (
            <div className="text-gray-400 dark:text-gray-500">
              <i className="fas fa-cloud-upload-alt text-2xl"></i>
              <p className="text-sm mt-2">Arrastra una imagen o haz clic para seleccionar</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 text-sm focus:border-brand-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => { onChange(urlInput); }}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm hover:bg-brand-dark transition"
          >
            Aplicar
          </button>
        </div>
      )}

      {value && (
        <div className="mt-3 relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full max-h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
          />
          <button
            type="button"
            onClick={() => { onChange(''); setUrlInput('') }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  )
}
