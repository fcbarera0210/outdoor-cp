'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminAuthenticated } from '@/components/admin/AdminAuthGuard'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    if (isAdminAuthenticated()) {
      router.replace('/admin/dashboard')
    } else {
      router.replace('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-brand-light dark:bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse text-brand-primary dark:text-white">
        <i className="fas fa-circle-notch fa-spin text-4xl"></i>
      </div>
    </div>
  )
}
