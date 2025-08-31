import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    
    // Should render the home page
    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument()
  })
  
  it('shows dev API status in development', () => {
    // Mock dev environment
    const originalEnv = import.meta.env.DEV
    vi.stubGlobal('import.meta', { env: { DEV: true } })
    
    render(<App />)
    
    expect(screen.getByLabelText('API status')).toBeInTheDocument()
    
    // Restore
    vi.stubGlobal('import.meta', { env: { DEV: originalEnv } })
  })
})
