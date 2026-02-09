import Link from 'next/link'

interface AdminButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
}

export default function AdminButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}: AdminButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-4 py-2 font-heading font-bold uppercase tracking-widest text-sm transition'
  const variantClasses = {
    primary: 'bg-brand-primary hover:bg-brand-dark text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-brand-dark',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
