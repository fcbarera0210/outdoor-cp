import AdminAuthGuard from '@/components/admin/AdminAuthGuard'
import AdminToaster from '@/components/admin/AdminToaster'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-body text-gray-700 dark:text-gray-200">
      <AdminToaster />
      <AdminAuthGuard>{children}</AdminAuthGuard>
    </div>
  )
}
