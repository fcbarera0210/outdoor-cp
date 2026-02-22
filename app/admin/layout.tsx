import AdminAuthGuard from '@/components/admin/AdminAuthGuard'
import { AdminConfirmProvider } from '@/components/admin/AdminConfirmContext'
import AdminToaster from '@/components/admin/AdminToaster'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-body text-gray-700 dark:text-gray-200">
      <AdminToaster />
      <AdminConfirmProvider>
        <AdminAuthGuard>{children}</AdminAuthGuard>
      </AdminConfirmProvider>
    </div>
  )
}
