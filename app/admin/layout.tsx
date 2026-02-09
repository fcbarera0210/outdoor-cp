import AdminAuthGuard from '@/components/admin/AdminAuthGuard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-body text-gray-700">
      <AdminAuthGuard>{children}</AdminAuthGuard>
    </div>
  )
}
