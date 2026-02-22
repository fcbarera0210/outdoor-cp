'use client'

import { useState, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'

const ICONIFY_SEARCH = 'https://api.iconify.design/search'
const PREFIXES = [
  { value: 'mdi', label: 'Material Design Icons' },
  { value: 'lucide', label: 'Lucide' },
  { value: 'fa6-solid', label: 'Font Awesome 6' },
  { value: 'heroicons', label: 'Heroicons' },
  { value: 'game-icons', label: 'Game Icons' },
] as const

const VALID_ICON_ID = /^[a-z0-9-]+:[a-z0-9-]+$/i

export function isValidIconId(id: string): boolean {
  return id.length > 0 && VALID_ICON_ID.test(id)
}

interface AdminIconPickerProps {
  value: string
  onChange: (iconId: string) => void
  label?: string
}

export default function AdminIconPicker({ value, onChange, label = 'Ícono' }: AdminIconPickerProps) {
  const [prefix, setPrefix] = useState<string>(PREFIXES[0].value)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const searchIcons = useCallback(async () => {
    const q = query.trim() || 'circle'
    setLoading(true)
    try {
      const params = new URLSearchParams({
        query: q,
        limit: '48',
        prefix,
      })
      const res = await fetch(`${ICONIFY_SEARCH}?${params}`)
      const data = await res.json()
      setResults(Array.isArray(data.icons) ? data.icons : data.icons || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [query, prefix])

  useEffect(() => {
    const t = setTimeout(searchIcons, 300)
    return () => clearTimeout(t)
  }, [searchIcons])

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        {value && isValidIconId(value) && (
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
            <Icon icon={value} className="text-2xl text-brand-primary" />
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border-2 border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-heading uppercase tracking-wider text-brand-dark dark:text-gray-200 hover:border-brand-primary transition"
        >
          {value && isValidIconId(value) ? 'Cambiar ícono' : 'Elegir ícono'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="rounded-lg px-3 py-2 text-xs font-heading uppercase text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
          >
            Quitar
          </button>
        )}
      </div>

      {open && (
        <div className="mt-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 space-y-3">
          <div className="flex gap-2 flex-wrap">
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="border-2 border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-200"
            >
              {PREFIXES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar íconos..."
              className="flex-1 min-w-[140px] border-2 border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-200 placeholder:dark:text-gray-500"
            />
          </div>
          {loading ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">Buscando...</p>
          ) : (
            <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto">
              {results.map((iconId) => (
                <button
                  key={iconId}
                  type="button"
                  onClick={() => {
                    onChange(iconId)
                    setOpen(false)
                  }}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg border-2 transition ${
                    value === iconId
                      ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                      : 'border-gray-200 dark:border-gray-600 hover:border-brand-primary/50 dark:hover:border-brand-primary/50'
                  }`}
                  title={iconId}
                >
                  <Icon icon={iconId} className="text-xl" />
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm font-heading uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  )
}
