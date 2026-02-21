'use client'

import { useState, useEffect } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import AdminTable from '@/components/admin/AdminTable'
import { sileo } from 'sileo'
import { getInstruccionesForAdmin, updateInstrucciones } from '@/services/equipo'
import { getMiembros, deleteMiembro } from '@/services/equipo'
import type { InstruccionesAdmin } from '@/services/equipo'
import type { MiembroEquipo } from '@/services/equipo'

const defaultInstrucciones = {
  seguridadEs: '',
  seguridadEn: '',
  queLlevarEs: '',
  queLlevarEn: '',
  comportamientoEs: '',
  comportamientoEn: '',
  dificultadFacilEs: '',
  dificultadFacilEn: '',
  dificultadMediaEs: '',
  dificultadMediaEn: '',
  dificultadAltaEs: '',
  dificultadAltaEn: '',
  equipoNecesario: [] as { tituloEs?: string; tituloEn?: string; textoEs?: string; textoEn?: string }[],
  senaletica: [] as { tituloEs?: string; tituloEn?: string; textoEs?: string; textoEn?: string }[],
}

export default function AdminEquipoPage() {
  const [activeTab, setActiveTab] = useState<'instrucciones' | 'miembros'>('instrucciones')
  const [instrucciones, setInstrucciones] = useState<InstruccionesAdmin>(defaultInstrucciones)
  const [instruccionesLoading, setInstruccionesLoading] = useState(true)
  const [instruccionesSaving, setInstruccionesSaving] = useState(false)
  const [miembros, setMiembros] = useState<MiembroEquipo[]>([])
  const [miembrosLoading, setMiembrosLoading] = useState(false)

  useEffect(() => {
    getInstruccionesForAdmin()
      .then((data) => data && setInstrucciones({ ...defaultInstrucciones, ...data }))
      .catch(() => {})
      .finally(() => setInstruccionesLoading(false))
  }, [])

  useEffect(() => {
    if (activeTab === 'miembros') {
      setMiembrosLoading(true)
      getMiembros('es')
        .then(setMiembros)
        .catch(() => setMiembros([]))
        .finally(() => setMiembrosLoading(false))
    }
  }, [activeTab])

  const handleInstruccionesChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as keyof InstruccionesAdmin
    setInstrucciones((prev) => ({ ...prev, [name]: e.target.value }))
  }

  const handleInstruccionesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setInstruccionesSaving(true)
    try {
      await updateInstrucciones(instrucciones as unknown as Record<string, unknown>)
      sileo.success({ title: 'Guardado correctamente' })
    } catch (err) {
      console.error(err)
      sileo.error({ title: 'Error al guardar' })
    } finally {
      setInstruccionesSaving(false)
    }
  }

  const handleDeleteMiembro = async (id: string) => {
    if (!confirm('¿Eliminar este miembro?')) return
    try {
      await deleteMiembro(id)
      setMiembros((prev) => prev.filter((m) => m.id !== id))
    } catch (err) {
      console.error(err)
      sileo.error({ title: 'Error al eliminar' })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-2">
        Contenido Equipo
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Instrucciones de trekking y miembros del equipo
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b-2 border-gray-200 dark:border-gray-600">
        <button
          type="button"
          onClick={() => setActiveTab('instrucciones')}
          className={`px-6 py-3 font-heading font-bold uppercase text-sm tracking-wider transition rounded-t-lg ${
            activeTab === 'instrucciones'
              ? 'border-b-2 border-brand-primary text-brand-primary -mb-0.5'
              : 'text-gray-500 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
          }`}
        >
          <i className="fas fa-book-open mr-2"></i>
          Instrucciones
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('miembros')}
          className={`px-6 py-3 font-heading font-bold uppercase text-sm tracking-wider transition rounded-t-lg ${
            activeTab === 'miembros'
              ? 'border-b-2 border-brand-primary text-brand-primary -mb-0.5'
              : 'text-gray-500 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
          }`}
        >
          <i className="fas fa-users mr-2"></i>
          Miembros
        </button>
      </div>

      {activeTab === 'instrucciones' && (
        <form
          onSubmit={handleInstruccionesSubmit}
          className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-8 max-w-3xl"
        >
          {instruccionesLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
          ) : (
            <>
              <h2 className="text-xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6 border-b-2 border-brand-primary pb-2">
                Instrucciones Básicas (ES / EN)
              </h2>
              <div className="space-y-6 mb-10">
                <AdminInput label="Seguridad (ES)" name="seguridadEs" value={instrucciones.seguridadEs} onChange={handleInstruccionesChange} as="textarea" rows={3} />
                <AdminInput label="Seguridad (EN)" name="seguridadEn" value={instrucciones.seguridadEn} onChange={handleInstruccionesChange} as="textarea" rows={3} />
                <AdminInput label="Qué llevar (ES)" name="queLlevarEs" value={instrucciones.queLlevarEs} onChange={handleInstruccionesChange} as="textarea" rows={3} />
                <AdminInput label="Qué llevar (EN)" name="queLlevarEn" value={instrucciones.queLlevarEn} onChange={handleInstruccionesChange} as="textarea" rows={3} />
                <AdminInput label="Comportamiento (ES)" name="comportamientoEs" value={instrucciones.comportamientoEs} onChange={handleInstruccionesChange} as="textarea" rows={3} />
                <AdminInput label="Comportamiento (EN)" name="comportamientoEn" value={instrucciones.comportamientoEn} onChange={handleInstruccionesChange} as="textarea" rows={3} />
              </div>

              <h2 className="text-xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6 border-b-2 border-brand-primary pb-2">
                Niveles de Dificultad (ES / EN)
              </h2>
              <div className="space-y-6 mb-10">
                <AdminInput label="Fácil (ES)" name="dificultadFacilEs" value={instrucciones.dificultadFacilEs} onChange={handleInstruccionesChange} />
                <AdminInput label="Fácil (EN)" name="dificultadFacilEn" value={instrucciones.dificultadFacilEn} onChange={handleInstruccionesChange} />
                <AdminInput label="Media (ES)" name="dificultadMediaEs" value={instrucciones.dificultadMediaEs} onChange={handleInstruccionesChange} />
                <AdminInput label="Media (EN)" name="dificultadMediaEn" value={instrucciones.dificultadMediaEn} onChange={handleInstruccionesChange} />
                <AdminInput label="Alta (ES)" name="dificultadAltaEs" value={instrucciones.dificultadAltaEs} onChange={handleInstruccionesChange} />
                <AdminInput label="Alta (EN)" name="dificultadAltaEn" value={instrucciones.dificultadAltaEn} onChange={handleInstruccionesChange} />
              </div>

              <AdminButton type="submit" loading={instruccionesSaving}>
                <i className="fas fa-save"></i>
                {instruccionesSaving ? 'Guardando...' : 'Guardar Instrucciones'}
              </AdminButton>
            </>
          )}
        </form>
      )}

      {activeTab === 'miembros' && (
        <div>
          {miembrosLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Cargando miembros...</p>
          ) : (
            <>
              <AdminTable headers={['Nombre', 'Rol', 'Acciones']}>
                {miembros.map((m) => (
                  <tr key={m.id} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-medium text-brand-dark dark:text-white">{m.nombre}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{m.rol}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleDeleteMiembro(m.id)}
                          className="rounded-lg px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition text-xs font-heading uppercase"
                        >
                          <i className="fas fa-trash mr-1"></i>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </AdminTable>
            </>
          )}
        </div>
      )}
    </div>
  )
}
