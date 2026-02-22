'use client'

import AdminInput from '@/components/admin/AdminInput'

export type ItinerarioItem = {
  textoEs: string
  textoEn: string
}

interface AdminItinerarioListProps {
  items: ItinerarioItem[]
  onChange: (items: ItinerarioItem[]) => void
  label?: string
}

export default function AdminItinerarioList({
  items,
  onChange,
  label = 'Itinerario por día',
}: AdminItinerarioListProps) {
  const updateItem = (index: number, field: 'textoEs' | 'textoEn', value: string) => {
    const next = [...items]
    if (!next[index]) next[index] = { textoEs: '', textoEn: '' }
    next[index] = { ...next[index], [field]: value }
    onChange(next)
  }

  const addDay = () => {
    onChange([...items, { textoEs: '', textoEn: '' }])
  }

  const removeDay = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200">
        {label}
      </label>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Agregue o elimine días. Cada ítem es un día del itinerario (ES / EN).
      </p>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-heading uppercase text-gray-500 dark:text-gray-400">
                Día {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeDay(index)}
                className="rounded-lg px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition text-xs font-heading uppercase"
              >
                <i className="fas fa-trash mr-1"></i>
                Eliminar
              </button>
            </div>
            <AdminInput
              name={`it-es-${index}`}
              label="Texto (ES)"
              value={item.textoEs}
              onChange={(e) => updateItem(index, 'textoEs', e.target.value)}
              as="textarea"
              rows={2}
            />
            <AdminInput
              name={`it-en-${index}`}
              label="Texto (EN)"
              value={item.textoEn}
              onChange={(e) => updateItem(index, 'textoEn', e.target.value)}
              as="textarea"
              rows={2}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addDay}
          className="w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 py-4 text-sm font-heading uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:border-brand-primary hover:text-brand-primary transition"
        >
          <i className="fas fa-plus mr-2"></i>
          Agregar día
        </button>
      </div>
    </div>
  )
}
