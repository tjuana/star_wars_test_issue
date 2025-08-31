import { useEffect, useState, useMemo } from 'react'
import { debounce } from '@shared/lib/debounce'
import './SearchBox.css'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBox({ value, onChange, placeholder = "Search characters..." }: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(value)

  // Create stable debounced function
  const debouncedOnChange = useMemo(
    () => debounce(onChange, 400),
    [onChange]
  )

  // Debounced onChange
  useEffect(() => {
    if (localValue !== value) {
      debouncedOnChange(localValue)
    }
  }, [localValue, debouncedOnChange, value])

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <div className="search-box">
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        aria-label="Search Star Wars characters"
      />
    </div>
  )
}
