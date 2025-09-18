interface PersonFieldProps {
  label: string
  value: string
  field: string
  isEditing: boolean
  onChange: (field: string, value: string) => void
  onEditClick?: (field: string) => void
  suffix?: string
}

export function PersonField({ 
  label, 
  value, 
  field, 
  isEditing, 
  onChange, 
  onEditClick,
  suffix 
}: PersonFieldProps) {
  if (isEditing) {
    return (
      <div className="person-field">
        <label className="person-field-label" htmlFor={field}>
          {label}
        </label>
        <div className="relative">
          <input
            id={field}
            type="text"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className="person-field-value-editing w-full"
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div className="person-field">
      <div className="person-field-label">{label}</div>
      <div 
        className="person-field-value"
        onClick={() => onEditClick?.(field)}
        title="Click to edit"
      >
        {value} {suffix}
      </div>
    </div>
  )
}
