'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'

const AUTH_KEY = 'admin-authenticated'

export function setAdminAuthenticated() {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(AUTH_KEY, 'true')
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(AUTH_KEY) === 'true'
  }
  return false
}

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    setAuthenticated(isAdminAuthenticated())
  }, [mounted, pathname])

  useEffect(() => {
    if (!mounted) return
    if (!isLoginPage && !isAdminAuthenticated()) {
      router.replace('/admin/login')
    }
  }, [mounted, isLoginPage, router])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="animate-pulse text-brand-primary">
          <i className="fas fa-circle-notch fa-spin text-4xl"></i>
        </div>
      </div>
    )
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-brand-light font-body">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
