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
    <div className="min-h-screen bg-brand-light flex items-center justify-center">
      <div className="animate-pulse text-brand-primary">
        <i className="fas fa-circle-notch fa-spin text-4xl"></i>
      </div>
    </div>
  )
}
