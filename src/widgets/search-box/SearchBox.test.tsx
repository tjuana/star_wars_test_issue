import { describe, it, expect, vi } from 'vitest'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../shared/lib/test-utils'
import { SearchBox } from './SearchBox'

describe('SearchBox', () => {
  it('should debounce onChange calls', async () => {
    const mockOnChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<SearchBox value='' onChange={mockOnChange} />)

    const input = screen.getByRole('textbox')

    // Type multiple characters quickly
    await user.type(input, 'luke')

    // Should not call onChange immediately
    expect(mockOnChange).not.toHaveBeenCalled()

    // Wait for debounce
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
    })

    // Should call onChange once with final value
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith('luke')
  })

  it('should not call onChange when syncing from parent', () => {
    const mockOnChange = vi.fn()

    const { rerender } = renderWithProviders(
      <SearchBox value='' onChange={mockOnChange} />
    )

    // Change value from parent
    rerender(<SearchBox value='luke' onChange={mockOnChange} />)

    // Should not trigger onChange
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('should show loading indicator when isLoading is true', () => {
    renderWithProviders(
      <SearchBox value='luke' onChange={vi.fn()} isLoading={true} />
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    // Check for spinner (it's a div with animate-spin class)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })
})
