import Link from 'next/link'

interface AdminButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
  disabled?: boolean
  loading?: boolean
}

export default function AdminButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  loading = false,
}: AdminButtonProps) {
  const baseClasses =
    'rounded-lg inline-flex items-center justify-center gap-2 px-4 py-2 font-heading font-bold uppercase tracking-widest text-sm transition'
  const variantClasses = {
    primary: 'bg-brand-primary hover:bg-brand-dark text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-brand-dark dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600',
  }
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`
  const isDisabled = disabled || loading

  if (href) {
    return (
      <Link href={href} className={classes}>
        {loading && <i className="fas fa-circle-notch fa-spin" aria-hidden />}
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={isDisabled} className={classes}>
      {loading && <i className="fas fa-circle-notch fa-spin" aria-hidden />}
      {children}
    </button>
  )
}
