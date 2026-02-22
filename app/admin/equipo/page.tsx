'use client'

import { useState, useEffect } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import AdminTable from '@/components/admin/AdminTable'
import AdminIconPicker from '@/components/admin/AdminIconPicker'
import { sileo } from 'sileo'
import { useConfirm } from '@/components/admin/AdminConfirmContext'
import { getInstruccionesForAdmin, updateInstrucciones } from '@/services/equipo'
import { getMiembros, deleteMiembro } from '@/services/equipo'
import type { InstruccionesAdmin } from '@/services/equipo'
import type { MiembroEquipo } from '@/services/equipo'

type ItemConIcono = { tituloEs?: string; tituloEn?: string; textoEs?: string; textoEn?: string; icono?: string }

const defaultInstrucciones: InstruccionesAdmin = {
  seguridadEs: '',
  seguridadEn: '',
  queLlevarEs: '',
  queLlevarEn: '',
  comportamientoEs: '',
  comportamientoEn: '',
  instruccionesBasicas: [],
  dificultadFacilEs: '',
  dificultadFacilEn: '',
  dificultadMediaEs: '',
  dificultadMediaEn: '',
  dificultadAltaEs: '',
  dificultadAltaEn: '',
  equipoNecesario: [],
  senaletica: [],
}

export default function AdminEquipoPage() {
  const confirm = useConfirm()
  const [activeTab, setActiveTab] = useState<'instrucciones' | 'miembros'>('instrucciones')
  const [instrucciones, setInstrucciones] = useState<InstruccionesAdmin>(defaultInstrucciones)
  const [instruccionesLoading, setInstruccionesLoading] = useState(true)
  const [instruccionesSaving, setInstruccionesSaving] = useState(false)
  const [miembros, setMiembros] = useState<MiembroEquipo[]>([])
  const [miembrosLoading, setMiembrosLoading] = useState(false)

  useEffect(() => {
    getInstruccionesForAdmin()
      .then((data) => data && setInstrucciones({ ...defaultInstrucciones, ...data }))
      .catch(() => setInstrucciones(defaultInstrucciones))
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

  const updateInstruccionesBasicas = (index: number, field: keyof ItemConIcono, value: string) => {
    setInstrucciones((prev) => {
      const list = [...(prev.instruccionesBasicas || [])]
      if (!list[index]) list[index] = {}
      list[index] = { ...list[index], [field]: value }
      return { ...prev, instruccionesBasicas: list }
    })
  }

  const addInstruccionBasica = () => {
    setInstrucciones((prev) => ({
      ...prev,
      instruccionesBasicas: [...(prev.instruccionesBasicas || []), {}],
    }))
  }

  const removeInstruccionBasica = (index: number) => {
    setInstrucciones((prev) => ({
      ...prev,
      instruccionesBasicas: prev.instruccionesBasicas.filter((_, i) => i !== index),
    }))
  }

  const updateEquipoNecesario = (index: number, field: keyof ItemConIcono, value: string) => {
    setInstrucciones((prev) => {
      const list = [...(prev.equipoNecesario || [])]
      if (!list[index]) list[index] = {}
      list[index] = { ...list[index], [field]: value }
      return { ...prev, equipoNecesario: list }
    })
  }

  const addEquipoNecesario = () => {
    setInstrucciones((prev) => ({
      ...prev,
      equipoNecesario: [...(prev.equipoNecesario || []), {}],
    }))
  }

  const removeEquipoNecesario = (index: number) => {
    setInstrucciones((prev) => ({
      ...prev,
      equipoNecesario: prev.equipoNecesario.filter((_, i) => i !== index),
    }))
  }

  const updateSenaletica = (index: number, field: keyof ItemConIcono, value: string) => {
    setInstrucciones((prev) => {
      const list = [...(prev.senaletica || [])]
      if (!list[index]) list[index] = {}
      list[index] = { ...list[index], [field]: value }
      return { ...prev, senaletica: list }
    })
  }

  const addSenaletica = () => {
    setInstrucciones((prev) => ({
      ...prev,
      senaletica: [...(prev.senaletica || []), {}],
    }))
  }

  const removeSenaletica = (index: number) => {
    setInstrucciones((prev) => ({
      ...prev,
      senaletica: prev.senaletica.filter((_, i) => i !== index),
    }))
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
    const ok = await confirm({
      title: 'Eliminar miembro',
      message: '¿Eliminar este miembro?',
      confirmLabel: 'Eliminar',
    })
    if (!ok) return
    try {
      await deleteMiembro(id)
      setMiembros((prev) => prev.filter((m) => m.id !== id))
      sileo.success({ title: 'Miembro eliminado' })
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
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Agregue o elimine subtemas. Cada uno tiene título, descripción e ícono.
              </p>
              <div className="space-y-6 mb-10">
                {(instrucciones.instruccionesBasicas || []).map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-heading uppercase text-gray-500 dark:text-gray-400">
                        Subtema {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeInstruccionBasica(index)}
                        className="rounded-lg px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition text-xs font-heading uppercase"
                      >
                        <i className="fas fa-trash mr-1"></i>
                        Eliminar
                      </button>
                    </div>
                    <AdminInput
                      name={`ib-${index}-tituloEs`}
                      label="Título (ES)"
                      value={item.tituloEs ?? ''}
                      onChange={(e) => updateInstruccionesBasicas(index, 'tituloEs', e.target.value)}
                    />
                    <AdminInput
                      name={`ib-${index}-tituloEn`}
                      label="Título (EN)"
                      value={item.tituloEn ?? ''}
                      onChange={(e) => updateInstruccionesBasicas(index, 'tituloEn', e.target.value)}
                    />
                    <AdminInput
                      name={`ib-${index}-textoEs`}
                      label="Descripción (ES)"
                      as="textarea"
                      rows={2}
                      value={item.textoEs ?? ''}
                      onChange={(e) => updateInstruccionesBasicas(index, 'textoEs', e.target.value)}
                    />
                    <AdminInput
                      name={`ib-${index}-textoEn`}
                      label="Descripción (EN)"
                      as="textarea"
                      rows={2}
                      value={item.textoEn ?? ''}
                      onChange={(e) => updateInstruccionesBasicas(index, 'textoEn', e.target.value)}
                    />
                    <AdminIconPicker
                      label="Ícono"
                      value={item.icono ?? ''}
                      onChange={(iconId) => updateInstruccionesBasicas(index, 'icono', iconId)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addInstruccionBasica}
                  className="w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 py-4 text-sm font-heading uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:border-brand-primary hover:text-brand-primary transition"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Agregar subtema
                </button>
              </div>

              <h2 className="text-xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6 border-b-2 border-brand-primary pb-2">
                Equipo Necesario (ES / EN)
              </h2>
              <div className="space-y-6 mb-10">
                {(instrucciones.equipoNecesario || []).map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-heading uppercase text-gray-500 dark:text-gray-400">
                        Ítem {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEquipoNecesario(index)}
                        className="rounded-lg px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition text-xs font-heading uppercase"
                      >
                        <i className="fas fa-trash mr-1"></i>
                        Eliminar
                      </button>
                    </div>
                    <AdminInput
                      name={`eq-${index}-tituloEs`}
                      label="Título (ES)"
                      value={item.tituloEs ?? ''}
                      onChange={(e) => updateEquipoNecesario(index, 'tituloEs', e.target.value)}
                    />
                    <AdminInput
                      name={`eq-${index}-tituloEn`}
                      label="Título (EN)"
                      value={item.tituloEn ?? ''}
                      onChange={(e) => updateEquipoNecesario(index, 'tituloEn', e.target.value)}
                    />
                    <AdminInput
                      name={`eq-${index}-textoEs`}
                      label="Descripción (ES)"
                      as="textarea"
                      rows={2}
                      value={item.textoEs ?? ''}
                      onChange={(e) => updateEquipoNecesario(index, 'textoEs', e.target.value)}
                    />
                    <AdminInput
                      name={`eq-${index}-textoEn`}
                      label="Descripción (EN)"
                      as="textarea"
                      rows={2}
                      value={item.textoEn ?? ''}
                      onChange={(e) => updateEquipoNecesario(index, 'textoEn', e.target.value)}
                    />
                    <AdminIconPicker
                      label="Ícono"
                      value={item.icono ?? ''}
                      onChange={(iconId) => updateEquipoNecesario(index, 'icono', iconId)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEquipoNecesario}
                  className="w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 py-4 text-sm font-heading uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:border-brand-primary hover:text-brand-primary transition"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Agregar ítem
                </button>
              </div>

              <h2 className="text-xl font-heading font-bold uppercase text-brand-dark dark:text-white mb-6 border-b-2 border-brand-primary pb-2">
                Señaléticas de Senderos (ES / EN)
              </h2>
              <div className="space-y-6 mb-10">
                {(instrucciones.senaletica || []).map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-heading uppercase text-gray-500 dark:text-gray-400">
                        Señalética {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSenaletica(index)}
                        className="rounded-lg px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition text-xs font-heading uppercase"
                      >
                        <i className="fas fa-trash mr-1"></i>
                        Eliminar
                      </button>
                    </div>
                    <AdminInput
                      name={`sn-${index}-tituloEs`}
                      label="Título (ES)"
                      value={item.tituloEs ?? ''}
                      onChange={(e) => updateSenaletica(index, 'tituloEs', e.target.value)}
                    />
                    <AdminInput
                      name={`sn-${index}-tituloEn`}
                      label="Título (EN)"
                      value={item.tituloEn ?? ''}
                      onChange={(e) => updateSenaletica(index, 'tituloEn', e.target.value)}
                    />
                    <AdminInput
                      name={`sn-${index}-textoEs`}
                      label="Descripción (ES)"
                      as="textarea"
                      rows={2}
                      value={item.textoEs ?? ''}
                      onChange={(e) => updateSenaletica(index, 'textoEs', e.target.value)}
                    />
                    <AdminInput
                      name={`sn-${index}-textoEn`}
                      label="Descripción (EN)"
                      as="textarea"
                      rows={2}
                      value={item.textoEn ?? ''}
                      onChange={(e) => updateSenaletica(index, 'textoEn', e.target.value)}
                    />
                    <AdminIconPicker
                      label="Ícono"
                      value={item.icono ?? ''}
                      onChange={(iconId) => updateSenaletica(index, 'icono', iconId)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSenaletica}
                  className="w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 py-4 text-sm font-heading uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:border-brand-primary hover:text-brand-primary transition"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Agregar señalética
                </button>
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
