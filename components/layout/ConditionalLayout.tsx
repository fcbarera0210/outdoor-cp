'use client'

import { usePathname } from 'next/navigation'
import PageLayout from './PageLayout'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }
  return <PageLayout>{children}</PageLayout>
}
