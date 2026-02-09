import Link from 'next/link'

interface AdminCardProps {
  title: string
  description: string
  href: string
  icon: string
}

export default function AdminCard({ title, description, href, icon }: AdminCardProps) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-brand-primary hover:shadow-lg transition"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
          <i className={`fas ${icon} text-xl text-brand-primary`}></i>
        </div>
        <div>
          <h3 className="font-heading font-bold uppercase text-brand-dark mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  )
}
