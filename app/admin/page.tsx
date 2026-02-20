'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function AdminPage() {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/admin/dashboard')
    } else if (status === 'unauthenticated') {
      router.replace('/admin/login')
    }
  }, [status, router])

  return (
    <div className="min-h-screen bg-brand-light dark:bg-gray-900 flex items-center justify-center">
      <div className="animate-pulse text-brand-primary dark:text-white">
        <i className="fas fa-circle-notch fa-spin text-4xl"></i>
      </div>
    </div>
  )
}
