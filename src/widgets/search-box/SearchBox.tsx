import { useEffect, useState, useMemo } from 'react'
import { debounce } from '@shared/lib/debounce'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  isLoading?: boolean
}

export function SearchBox({
  value,
  onChange,
  placeholder = 'Search characters...',
  isLoading = false,
}: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(value)

  // Create stable debounced function
  const debouncedOnChange = useMemo(() => debounce(onChange, 400), [onChange])

  // Only call debounced function when user types (not when syncing from parent)
  useEffect(() => {
    // Skip if this is just syncing from parent component
    if (localValue === value) return

    debouncedOnChange(localValue)
  }, [localValue, debouncedOnChange, value])

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <div className='max-w-md mx-auto mb-8 transition-all duration-300 ease-out'>
      <div className='relative'>
        <input
          type='text'
          value={localValue}
          onChange={e => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className='input py-3 transition-all duration-300 ease-out'
          aria-label='Search Star Wars characters'
        />
        {isLoading && (
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out'>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400'></div>
          </div>
        )}
      </div>
    </div>
  )
}
