'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setAdminAuthenticated } from '@/components/admin/AdminAuthGuard'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAdminAuthenticated()
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img
              src="/logos/che-color.svg"
              alt="Cherry Experience"
              className="h-16 mx-auto mb-4"
            />
          </Link>
          <h1 className="text-2xl font-heading font-bold uppercase text-brand-dark">
            Panel de Administración
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Ingresa para gestionar el contenido
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-brand-primary rounded-lg p-8 shadow-lg"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cherryexperience.cl"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand-primary focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand-primary focus:outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase tracking-widest py-4 rounded-lg transition"
          >
            Ingresar
          </button>

          <Link
            href="/"
            className="block mt-6 text-center text-sm text-gray-600 hover:text-brand-primary transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Volver al sitio
          </Link>
        </form>
      </div>
    </div>
  )
}
