type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

interface AdminInputProps {
  label: string
  name: string
  type?: string
  value?: string
  onChange?: (e: ChangeEvent) => void
  placeholder?: string
  required?: boolean
  className?: string
  as?: 'input' | 'textarea' | 'select'
  options?: { value: string; label: string }[]
  rows?: number
}

export default function AdminInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  className = '',
  as = 'input',
  options,
  rows = 3,
}: AdminInputProps) {
  const inputClasses =
    'w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-brand-primary focus:outline-none transition'

  return (
    <div className={`group ${className}`}>
      <label className="block text-xs font-heading uppercase tracking-widest text-brand-dark mb-2">
        {label}
        {required && <span className="text-brand-primary">*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={inputClasses}
        />
      ) : as === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClasses}
        >
          <option value="">Seleccionar...</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
        />
      )}
    </div>
  )
}
