'use client'

import { useState } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import AdminTable from '@/components/admin/AdminTable'

// Datos mock para miembros
const miembrosMock = [
  { id: '1', nombre: 'Juan Pérez', rol: 'Guía Principal', imagen: '', bio: 'Más de 15 años de experiencia.' },
]

export default function AdminEquipoPage() {
  const [activeTab, setActiveTab] = useState<'instrucciones' | 'miembros'>('instrucciones')

  const [instrucciones, setInstrucciones] = useState({
    seguridad: 'Siempre sigue las indicaciones del guía. No te separes del grupo. En caso de mal tiempo, el guía puede modificar o cancelar la ruta por tu seguridad.',
    queLlevar: 'Ropa por capas, protección solar, botella de agua (mínimo 2L), snack energético. El equipo específico varía según la ruta; consulta la lista en cada expedición.',
    comportamiento: 'Respeta la naturaleza: no dejes basura, no te aproximes a la fauna silvestre, camina solo por los senderos marcados. Principio de no dejar rastro.',
    dificultadFacil: 'Terreno accesible, desnivel moderado. Ideal para principiantes y familias.',
    dificultadMedia: 'Requiere condición física básica. Algunos tramos con mayor exigencia.',
    dificultadAlta: 'Terreno técnico, condición física buena. Equipo especializado requerido.',
  })

  const handleInstruccionesChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setInstrucciones((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleInstruccionesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Maqueta: no persiste
  }

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold uppercase text-brand-dark mb-2">
        Contenido Equipo
      </h1>
      <p className="text-gray-600 mb-8">
        Instrucciones de trekking y miembros del equipo
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b-2 border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('instrucciones')}
          className={`px-6 py-3 font-heading font-bold uppercase text-sm tracking-wider transition ${
            activeTab === 'instrucciones'
              ? 'border-b-2 border-brand-primary text-brand-primary -mb-0.5'
              : 'text-gray-500 hover:text-brand-dark'
          }`}
        >
          <i className="fas fa-book-open mr-2"></i>
          Instrucciones
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('miembros')}
          className={`px-6 py-3 font-heading font-bold uppercase text-sm tracking-wider transition ${
            activeTab === 'miembros'
              ? 'border-b-2 border-brand-primary text-brand-primary -mb-0.5'
              : 'text-gray-500 hover:text-brand-dark'
          }`}
        >
          <i className="fas fa-users mr-2"></i>
          Miembros
        </button>
      </div>

      {activeTab === 'instrucciones' && (
        <form
          onSubmit={handleInstruccionesSubmit}
          className="bg-white border-2 border-gray-200 rounded-lg p-8 max-w-3xl"
        >
          <h2 className="text-xl font-heading font-bold uppercase text-brand-dark mb-6 border-b-2 border-brand-primary pb-2">
            Instrucciones Básicas
          </h2>
          <div className="space-y-6 mb-10">
            <AdminInput
              label="Seguridad"
              name="seguridad"
              value={instrucciones.seguridad}
              onChange={handleInstruccionesChange}
              as="textarea"
              rows={3}
            />
            <AdminInput
              label="Qué llevar"
              name="queLlevar"
              value={instrucciones.queLlevar}
              onChange={handleInstruccionesChange}
              as="textarea"
              rows={3}
            />
            <AdminInput
              label="Comportamiento en montaña"
              name="comportamiento"
              value={instrucciones.comportamiento}
              onChange={handleInstruccionesChange}
              as="textarea"
              rows={3}
            />
          </div>

          <h2 className="text-xl font-heading font-bold uppercase text-brand-dark mb-6 border-b-2 border-brand-primary pb-2">
            Niveles de Dificultad
          </h2>
          <div className="space-y-6 mb-10">
            <AdminInput
              label="Descripción Fácil"
              name="dificultadFacil"
              value={instrucciones.dificultadFacil}
              onChange={handleInstruccionesChange}
            />
            <AdminInput
              label="Descripción Media"
              name="dificultadMedia"
              value={instrucciones.dificultadMedia}
              onChange={handleInstruccionesChange}
            />
            <AdminInput
              label="Descripción Alta"
              name="dificultadAlta"
              value={instrucciones.dificultadAlta}
              onChange={handleInstruccionesChange}
            />
          </div>

          <AdminButton type="submit">
            <i className="fas fa-save"></i>
            Guardar Instrucciones
          </AdminButton>
        </form>
      )}

      {activeTab === 'miembros' && (
        <div>
          <div className="flex justify-end mb-6">
            <AdminButton>
              <i className="fas fa-plus"></i>
              Nuevo Miembro
            </AdminButton>
          </div>

          <AdminTable
            headers={['Nombre', 'Rol', 'Acciones']}
          >
            {miembrosMock.map((m) => (
              <tr key={m.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-brand-dark">{m.nombre}</td>
                <td className="px-4 py-3 text-gray-600">{m.rol}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-brand-primary/10 text-brand-primary rounded hover:bg-brand-primary hover:text-white transition text-xs font-heading uppercase"
                    >
                      <i className="fas fa-edit mr-1"></i>
                      Editar
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition text-xs font-heading uppercase"
                    >
                      <i className="fas fa-trash mr-1"></i>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </AdminTable>
        </div>
      )}
    </div>
  )
}
