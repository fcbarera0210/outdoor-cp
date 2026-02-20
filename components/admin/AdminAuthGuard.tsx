'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import AdminSidebar from './AdminSidebar'

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { status } = useSession()

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoginPage) {
      router.replace('/admin/login')
    }
  }, [status, isLoginPage, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-brand-light dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-brand-primary dark:text-white">
          <i className="fas fa-circle-notch fa-spin text-4xl"></i>
        </div>
      </div>
    )
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  if (status !== 'authenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-brand-light dark:bg-gray-900 font-body">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
