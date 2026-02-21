'use client'

import { useState, useEffect } from 'react'
import AdminButton from '@/components/admin/AdminButton'
import AdminInput from '@/components/admin/AdminInput'
import { sileo } from 'sileo'
import { getHomeBlock, updateHomeBlock } from '@/services/home'

export interface ReservaBlock {
  tituloEs?: string
  tituloEn?: string
  textoEs?: string
  textoEn?: string
  bullet1Es?: string
  bullet1En?: string
  bullet2Es?: string
  bullet2En?: string
  bullet3Es?: string
  bullet3En?: string
  labelNombreEs?: string
  labelNombreEn?: string
  placeholderNombreEs?: string
  placeholderNombreEn?: string
  labelEmailEs?: string
  labelEmailEn?: string
  placeholderEmailEs?: string
  placeholderEmailEn?: string
  labelTipoEs?: string
  labelTipoEn?: string
  labelMensajeEs?: string
  labelMensajeEn?: string
  placeholderMensajeEs?: string
  placeholderMensajeEn?: string
  ctaEs?: string
  ctaEn?: string
}

const defaultReserva: ReservaBlock = {
  tituloEs: 'Reserva tu Aventura',
  tituloEn: 'Book Your Adventure',
  textoEs: '¿Listo para desconectar? Cuéntanos qué tipo de experiencia buscas.',
  textoEn: 'Ready to disconnect? Tell us what kind of experience you are looking for.',
  bullet1Es: 'Guías Certificados WFR',
  bullet1En: 'WFR Certified Guides',
  bullet2Es: 'Equipamiento de Alta Montaña',
  bullet2En: 'High Mountain Equipment',
  bullet3Es: 'Transporte Privado',
  bullet3En: 'Private Transport',
  labelNombreEs: 'Tu Nombre',
  labelNombreEn: 'Your Name',
  placeholderNombreEs: 'Ej: Juan Pérez',
  placeholderNombreEn: 'e.g. John Doe',
  labelEmailEs: 'Tu Email',
  labelEmailEn: 'Your Email',
  placeholderEmailEs: 'correo@ejemplo.com',
  placeholderEmailEn: 'email@example.com',
  labelTipoEs: 'Tipo de Aventura',
  labelTipoEn: 'Type of Adventure',
  labelMensajeEs: 'Mensaje / Fechas',
  labelMensajeEn: 'Message / Dates',
  placeholderMensajeEs: 'Cuéntanos más...',
  placeholderMensajeEn: 'Tell us more...',
  ctaEs: 'Solicitar Reserva',
  ctaEn: 'Request Reservation',
}

export default function AdminReservaForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<ReservaBlock>(defaultReserva)

  useEffect(() => {
    getHomeBlock('reserva')
      .then((raw) => setData({ ...defaultReserva, ...(raw as ReservaBlock) }))
      .catch(() => setData(defaultReserva))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateHomeBlock('reserva', data)
      sileo.success({ title: 'Guardado correctamente' })
    } catch (err) {
      console.error(err)
      sileo.error({ title: 'Error al guardar' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-sm font-heading uppercase tracking-widest text-brand-primary mb-2">
            Título y texto
          </h3>
        </div>
        <AdminInput
          label="Título (ES)"
          name="tituloEs"
          value={data.tituloEs ?? ''}
          onChange={handleChange}
          placeholder="Reserva tu Aventura"
          required
        />
        <AdminInput
          label="Título (EN)"
          name="tituloEn"
          value={data.tituloEn ?? ''}
          onChange={handleChange}
          placeholder="Book Your Adventure"
        />
        <div className="md:col-span-2">
          <AdminInput
            label="Párrafo (ES)"
            name="textoEs"
            as="textarea"
            rows={3}
            value={data.textoEs ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <AdminInput
            label="Párrafo (EN)"
            name="textoEn"
            as="textarea"
            rows={3}
            value={data.textoEn ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-sm font-heading uppercase tracking-widest text-brand-primary mt-6 mb-2">
            Lista (bullets)
          </h3>
        </div>
        <AdminInput
          label="Bullet 1 (ES)"
          name="bullet1Es"
          value={data.bullet1Es ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Bullet 1 (EN)"
          name="bullet1En"
          value={data.bullet1En ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Bullet 2 (ES)"
          name="bullet2Es"
          value={data.bullet2Es ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Bullet 2 (EN)"
          name="bullet2En"
          value={data.bullet2En ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Bullet 3 (ES)"
          name="bullet3Es"
          value={data.bullet3Es ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Bullet 3 (EN)"
          name="bullet3En"
          value={data.bullet3En ?? ''}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <h3 className="text-sm font-heading uppercase tracking-widest text-brand-primary mt-6 mb-2">
            Labels y placeholders del formulario
          </h3>
        </div>
        <AdminInput
          label="Label Nombre (ES)"
          name="labelNombreEs"
          value={data.labelNombreEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Label Nombre (EN)"
          name="labelNombreEn"
          value={data.labelNombreEn ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Placeholder Nombre (ES)"
          name="placeholderNombreEs"
          value={data.placeholderNombreEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Placeholder Nombre (EN)"
          name="placeholderNombreEn"
          value={data.placeholderNombreEn ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Label Email (ES)"
          name="labelEmailEs"
          value={data.labelEmailEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Label Email (EN)"
          name="labelEmailEn"
          value={data.labelEmailEn ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Placeholder Email (ES)"
          name="placeholderEmailEs"
          value={data.placeholderEmailEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Placeholder Email (EN)"
          name="placeholderEmailEn"
          value={data.placeholderEmailEn ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Label Tipo aventura (ES)"
          name="labelTipoEs"
          value={data.labelTipoEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Label Tipo aventura (EN)"
          name="labelTipoEn"
          value={data.labelTipoEn ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Label Mensaje (ES)"
          name="labelMensajeEs"
          value={data.labelMensajeEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Label Mensaje (EN)"
          name="labelMensajeEn"
          value={data.labelMensajeEn ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Placeholder Mensaje (ES)"
          name="placeholderMensajeEs"
          value={data.placeholderMensajeEs ?? ''}
          onChange={handleChange}
        />
        <AdminInput
          label="Placeholder Mensaje (EN)"
          name="placeholderMensajeEn"
          value={data.placeholderMensajeEn ?? ''}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <h3 className="text-sm font-heading uppercase tracking-widest text-brand-primary mt-6 mb-2">
            Botón CTA
          </h3>
        </div>
        <AdminInput
          label="Texto botón (ES)"
          name="ctaEs"
          value={data.ctaEs ?? ''}
          onChange={handleChange}
          placeholder="Solicitar Reserva"
        />
        <AdminInput
          label="Texto botón (EN)"
          name="ctaEn"
          value={data.ctaEn ?? ''}
          onChange={handleChange}
          placeholder="Request Reservation"
        />
      </div>
      <div className="flex gap-4">
        <AdminButton type="submit" loading={saving}>
          <i className="fas fa-save"></i>
          {saving ? 'Guardando...' : 'Guardar'}
        </AdminButton>
        <AdminButton href="/admin/home" variant="secondary" type="button">
          Cancelar
        </AdminButton>
      </div>
    </form>
  )
}
