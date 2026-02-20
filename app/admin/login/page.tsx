'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (result?.error) {
        setError('Email o contraseña incorrecta')
        return
      }
      router.push('/admin/dashboard')
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-light dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img
              src="/logos/che-color.svg"
              alt="Cherry Experience"
              className="h-16 mx-auto mb-4"
            />
          </Link>
          <h1 className="text-2xl font-heading font-bold uppercase text-brand-dark dark:text-white">
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
            Ingresa para gestionar el contenido
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 border-2 border-brand-primary dark:border-gray-600 rounded-lg p-8 shadow-lg"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cherryexperience.cl"
                required
                className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-lg px-4 py-3 focus:border-brand-primary focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark dark:text-gray-200 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 placeholder:dark:text-gray-500 rounded-lg px-4 py-3 focus:border-brand-primary focus:outline-none transition"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-lg bg-brand-primary hover:bg-brand-dark text-white font-heading font-bold uppercase tracking-widest py-4 transition disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <Link
            href="/"
            className="block mt-6 text-center text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Volver al sitio
          </Link>
        </form>
      </div>
    </div>
  )
}
