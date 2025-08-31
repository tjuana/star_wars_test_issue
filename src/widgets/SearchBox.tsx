import { useEffect, useState } from 'react'
import { debounce } from '@shared/lib/debounce'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBox({ value, onChange, placeholder = "Search characters..." }: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(value)

  // Debounced onChange
  useEffect(() => {
    const debouncedChange = debounce(onChange, 400)
    debouncedChange(localValue)
  }, [localValue, onChange])

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <div className="max-w-md mx-auto mb-8">
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="input"
        aria-label="Search Star Wars characters"
      />
    </div>
  )
}
