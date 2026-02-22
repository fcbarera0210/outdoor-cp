'use client'

export type ProximaSalidaItem = {
  fecha: string
  cupos: number
}

function formatDateForInput(isoOrText: string): string {
  if (!isoOrText) return ''
  const d = new Date(isoOrText)
  if (Number.isNaN(d.getTime())) return isoOrText
  return d.toISOString().slice(0, 10)
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

interface AdminProximasSalidasListProps {
  items: ProximaSalidaItem[]
  onChange: (items: ProximaSalidaItem[]) => void
  duracionDias?: number
  label?: string
}

export default function AdminProximasSalidasList({
  items,
  onChange,
  duracionDias,
  label = 'Próximas salidas',
}: AdminProximasSalidasListProps) {
  const updateItem = (index: number, field: 'fecha' | 'cupos', value: string | number) => {
    const next = [...items]
    if (!next[index]) next[index] = { fecha: '', cupos: 0 }
    next[index] = { ...next[index], [field]: field === 'cupos' ? Number(value) || 0 : value }
    onChange(next)
  }

  const addSalida = () => {
    onChange([...items, { fecha: '', cupos: 0 }])
  }

  const removeSalida = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200">
        {label}
      </label>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Agregue o elimine salidas. Indique fecha de inicio y cupos máximos. Los cupos se descontarán cuando existan reservas.
      </p>
      {typeof duracionDias === 'number' && duracionDias > 0 && (
        <p className="text-sm text-brand-primary dark:text-brand-primary/90">
          Duración de la ruta: {duracionDias} día(s). La fecha de término se calculará automáticamente.
        </p>
      )}
      <div className="space-y-4">
        {items.map((item, index) => {
          const fechaInput = formatDateForInput(item.fecha)
          const fechaFin =
            duracionDias != null && duracionDias > 0 && item.fecha
              ? addDays(formatDateForInput(item.fecha), duracionDias)
              : null
          return (
            <div
              key={index}
              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-heading uppercase text-gray-500 dark:text-gray-400">
                  Salida {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeSalida(index)}
                  className="rounded-lg px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition text-xs font-heading uppercase"
                >
                  <i className="fas fa-trash mr-1"></i>
                  Eliminar
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-1">
                    Fecha inicio
                  </label>
                  <input
                    type="date"
                    value={fechaInput}
                    onChange={(e) => updateItem(index, 'fecha', e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-1">
                    Cupos máximos
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={item.cupos}
                    onChange={(e) => updateItem(index, 'cupos', e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-200"
                  />
                </div>
              </div>
              {fechaFin && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Fecha término (calculada): {fechaFin}
                </p>
              )}
            </div>
          )
        })}
        <button
          type="button"
          onClick={addSalida}
          className="w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 py-4 text-sm font-heading uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:border-brand-primary hover:text-brand-primary transition"
        >
          <i className="fas fa-plus mr-2"></i>
          Agregar salida
        </button>
      </div>
    </div>
  )
}
