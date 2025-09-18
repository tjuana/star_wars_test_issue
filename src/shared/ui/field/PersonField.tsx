interface PersonFieldProps {
  label: string
  value: string
  field: string
  isEditing: boolean
  onChange: (field: string, value: string) => void
  suffix?: string
}

export function PersonField({ 
  label, 
  value, 
  field, 
  isEditing, 
  onChange, 
  suffix 
}: PersonFieldProps) {
  if (isEditing) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium" htmlFor={field}>
          {label}:
        </label>
        <div className="relative">
          <input
            id={field}
            type="text"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-white/10 bg-input-background text-accent focus:outline-none focus:ring-2 focus:ring-secondary transition-colors"
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs opacity-50 pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-1">
      <span className="block text-sm font-medium">{label}:</span>
      <span className="capitalize opacity-90">
        {value} {suffix}
      </span>
    </div>
  )
}
