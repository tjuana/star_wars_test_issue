import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)

    // Should render the home page
    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument()
  })

  it('renders search box', () => {
    render(<App />)

    // Should render search functionality
    expect(
      screen.getByPlaceholderText('Search characters...')
    ).toBeInTheDocument()
  })
})
