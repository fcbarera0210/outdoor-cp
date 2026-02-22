'use client'

import { Icon } from '@iconify/react'

export type EquipoItem = {
  tituloEs?: string
  tituloEn?: string
  textoEs?: string
  textoEn?: string
  icono?: string
}

const VALID_ICON = /^[a-z0-9-]+:[a-z0-9-]+$/i
function hasValidIcon(icono?: string) {
  return icono && VALID_ICON.test(icono)
}

function sameItem(a: EquipoItem, b: EquipoItem): boolean {
  return (
    (a.tituloEs ?? '') === (b.tituloEs ?? '') &&
    (a.textoEs ?? '') === (b.textoEs ?? '')
  )
}

interface AdminEquipoSelectorProps {
  available: EquipoItem[]
  selected: EquipoItem[]
  onChange: (selected: EquipoItem[]) => void
  label?: string
}

export default function AdminEquipoSelector({
  available,
  selected,
  onChange,
  label = 'Equipo recomendado para esta ruta',
}: AdminEquipoSelectorProps) {
  const toggle = (item: EquipoItem) => {
    const isSelected = selected.some((s) => sameItem(s, item))
    if (isSelected) {
      onChange(selected.filter((s) => !sameItem(s, item)))
    } else {
      onChange([...selected, item])
    }
  }

  const move = (index: number, direction: 'up' | 'down') => {
    const next = [...selected]
    const j = direction === 'up' ? index - 1 : index + 1
    if (j < 0 || j >= next.length) return
    ;[next[index], next[j]] = [next[j], next[index]]
    onChange(next)
  }

  return (
    <div className="space-y-4">
      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200">
        {label}
      </label>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Marque los ítems del equipo necesario que aplican a esta ruta. En el front se mostrará el ícono y al pasar el cursor o hacer clic se verá el nombre y la descripción.
      </p>
      {available.length === 0 ? (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          No hay ítems en Equipo necesario. Agregue ítems en la sección Admin → Equipo → Instrucciones.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3">
          {available.map((item, idx) => {
            const isSelected = selected.some((s) => sameItem(s, item))
            const titulo = (item.tituloEs || item.tituloEn || 'Sin título').trim()
            return (
              <label
                key={idx}
                className={`flex items-center gap-3 p-2 rounded-lg border-2 cursor-pointer transition ${
                  isSelected
                    ? 'border-brand-primary bg-brand-primary/10 dark:bg-brand-primary/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(item)}
                  className="rounded border-gray-300 text-brand-primary"
                />
                {hasValidIcon(item.icono) ? (
                  <Icon icon={item.icono!} className="text-2xl text-brand-primary flex-shrink-0" />
                ) : (
                  <span className="w-8 h-8 flex items-center justify-center text-brand-primary">
                    <Icon icon="mdi:backpack" className="text-2xl" />
                  </span>
                )}
                <span className="text-sm font-medium text-brand-dark dark:text-white truncate">
                  {titulo}
                </span>
              </label>
            )
          })}
        </div>
      )}
      {selected.length > 0 && (
        <div className="mt-3">
          <span className="text-xs font-heading uppercase text-gray-500 dark:text-gray-400">
            Orden seleccionado ({selected.length})
          </span>
          <ul className="mt-1 flex flex-wrap gap-2">
            {selected.map((item, index) => (
              <li
                key={index}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm"
              >
                {hasValidIcon(item.icono) ? (
                  <Icon icon={item.icono!} className="text-lg text-brand-primary" />
                ) : (
                  <Icon icon="mdi:backpack" className="text-lg text-brand-primary" />
                )}
                <span className="text-brand-dark dark:text-white">
                  {item.tituloEs || item.tituloEn || '—'}
                </span>
                <div className="flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(index, 'up')}
                    disabled={index === 0}
                    className="p-0.5 rounded text-gray-500 hover:text-brand-primary disabled:opacity-30"
                    title="Subir"
                  >
                    <i className="fas fa-chevron-up text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 'down')}
                    disabled={index === selected.length - 1}
                    className="p-0.5 rounded text-gray-500 hover:text-brand-primary disabled:opacity-30"
                    title="Bajar"
                  >
                    <i className="fas fa-chevron-down text-xs" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onChange(selected.filter((_, i) => i !== index))}
                  className="p-0.5 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20"
                  title="Quitar"
                >
                  <i className="fas fa-times text-xs" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
