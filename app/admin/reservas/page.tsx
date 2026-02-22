'use client'

import { useEffect, useState } from 'react'
import { sileo } from 'sileo'
import { useConfirm } from '@/components/admin/AdminConfirmContext'

interface Reserva {
  id: string
  nombre: string
  email: string
  telefono: string
  pais: string
  notas: string
  estado: string
  createdAt: string
  ruta?: { slug: string; nombreEs: string; nombreEn: string } | null
}

const estadoColors: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  confirmada: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  cancelada: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export default function AdminReservasPage() {
  const confirm = useConfirm()
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState<string>('todos')

  useEffect(() => {
    fetchReservas()
  }, [])

  const fetchReservas = async () => {
    try {
      const res = await fetch('/api/reservas')
      if (res.ok) {
        const data = await res.json()
        setReservas(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const updateEstado = async (id: string, estado: string) => {
    try {
      const res = await fetch(`/api/reservas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      })
      if (res.ok) {
        setReservas((prev) =>
          prev.map((r) => (r.id === id ? { ...r, estado } : r))
        )
      }
    } catch (e) {
      console.error(e)
    }
  }

  const deleteReserva = async (id: string) => {
    const ok = await confirm({
      title: 'Eliminar reserva',
      message: '¿Estás seguro de eliminar esta reserva?',
      confirmLabel: 'Eliminar',
    })
    if (!ok) return
    try {
      const res = await fetch(`/api/reservas/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setReservas((prev) => prev.filter((r) => r.id !== id))
        sileo.success({ title: 'Reserva eliminada' })
      } else {
        sileo.error({ title: 'Error al eliminar' })
      }
    } catch (e) {
      console.error(e)
      sileo.error({ title: 'Error al eliminar' })
    }
  }

  const filtered = filtro === 'todos' ? reservas : reservas.filter((r) => r.estado === filtro)

  const counts = {
    todos: reservas.length,
    pendiente: reservas.filter((r) => r.estado === 'pendiente').length,
    confirmada: reservas.filter((r) => r.estado === 'confirmada').length,
    cancelada: reservas.filter((r) => r.estado === 'cancelada').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <i className="fas fa-circle-notch fa-spin text-2xl text-brand-primary"></i>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white">
            Reservas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona las reservas de los clientes
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['todos', 'pendiente', 'confirmada', 'cancelada'] as const).map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltro(estado)}
            className={`px-4 py-2 rounded-lg text-sm font-heading uppercase tracking-wider transition ${
              filtro === estado
                ? 'bg-brand-primary text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-brand-primary'
            }`}
          >
            {estado.charAt(0).toUpperCase() + estado.slice(1)} ({counts[estado]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <i className="fas fa-calendar-check text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
          <p className="text-gray-500 dark:text-gray-400">No hay reservas {filtro !== 'todos' ? `con estado "${filtro}"` : ''}</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-brand-dark text-white text-left">
                  <th className="px-4 py-3 font-heading text-xs uppercase tracking-wider">Fecha</th>
                  <th className="px-4 py-3 font-heading text-xs uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-3 font-heading text-xs uppercase tracking-wider">Ruta</th>
                  <th className="px-4 py-3 font-heading text-xs uppercase tracking-wider">Contacto</th>
                  <th className="px-4 py-3 font-heading text-xs uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3 font-heading text-xs uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString('es-CL')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{r.nombre}</div>
                      {r.pais && <div className="text-xs text-gray-500 dark:text-gray-400">{r.pais}</div>}
                      {r.notas && <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-xs truncate">{r.notas}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      {r.ruta?.nombreEs || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{r.email}</div>
                      {r.telefono && <div className="text-xs text-gray-400">{r.telefono}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={r.estado}
                        onChange={(e) => updateEstado(r.id, e.target.value)}
                        className={`text-xs font-bold rounded-full px-3 py-1 border-0 cursor-pointer ${estadoColors[r.estado] || ''}`}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="cancelada">Cancelada</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteReserva(r.id)}
                        className="text-red-500 hover:text-red-700 transition text-sm"
                        title="Eliminar"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
