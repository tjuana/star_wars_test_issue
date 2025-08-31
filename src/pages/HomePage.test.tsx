import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../shared/lib/test-utils'
import { HomePage } from './HomePage'
import * as swapiPeople from '../shared/api/swapi/people'

// Mock SWAPI data
const mockPeopleData = {
  count: 87,
  next: 'https://swapi.py4e.com/api/people/?page=2',
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.py4e.com/api/planets/1/',
      films: ['https://swapi.py4e.com/api/films/1/'],
      species: ['https://swapi.py4e.com/api/species/1/'],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.py4e.com/api/people/1/',
      id: '1',
    },
    {
      name: 'C-3PO',
      height: '167',
      mass: '75',
      hair_color: 'n/a',
      skin_color: 'gold',
      eye_color: 'yellow',
      birth_year: '112BBY',
      gender: 'n/a',
      homeworld: 'https://swapi.py4e.com/api/planets/1/',
      films: ['https://swapi.py4e.com/api/films/1/'],
      species: ['https://swapi.py4e.com/api/species/2/'],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:10:51.357000Z',
      edited: '2014-12-20T21:17:50.309000Z',
      url: 'https://swapi.py4e.com/api/people/2/',
      id: '2',
    },
  ],
}

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock SWAPI API functions
    vi.spyOn(swapiPeople, 'listPeople').mockResolvedValue(mockPeopleData)
    vi.spyOn(swapiPeople, 'getPersonById').mockResolvedValue(mockPeopleData.results[0])
  })

  it('should render page title and search box', () => {
    renderWithProviders(<HomePage />)
    
    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument()
  })

  it('should display character cards when data loads', async () => {
    renderWithProviders(<HomePage />)
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    expect(screen.getByText('C-3PO')).toBeInTheDocument()
    expect(screen.getByText('172cm')).toBeInTheDocument() // height
    expect(screen.getAllByText('1 films')).toHaveLength(2) // film count for both characters
  })

  it('should show pagination controls', async () => {
    renderWithProviders(<HomePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Showing 10 of 87 characters')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Go to page 1' })).toHaveAttribute('aria-current', 'page')
  })

  it('should handle search input with debouncing', async () => {
    const user = userEvent.setup()
    renderWithProviders(<HomePage />)
    
    const searchInput = screen.getByPlaceholderText('Search characters...')
    
    // Type search term
    await user.type(searchInput, 'luke')
    
    // Wait for debounce
    await waitFor(() => {
      expect(swapiPeople.listPeople).toHaveBeenCalledWith({ page: 1, search: 'luke' })
    }, { timeout: 1000 })
  })

  it('should handle search clearing without excessive API calls', async () => {
    const user = userEvent.setup()
    renderWithProviders(<HomePage />)
    
    const searchInput = screen.getByPlaceholderText('Search characters...')
    
    // Type and then clear
    await user.type(searchInput, 'luke')
    await user.clear(searchInput)
    
    // Wait for final debounce
    await waitFor(() => {
      expect(swapiPeople.listPeople).toHaveBeenCalledWith({ page: 1, search: '' })
    }, { timeout: 1000 })
    
    // Should not have excessive calls - clear doesn't trigger if value is already empty
    expect(swapiPeople.listPeople).toHaveBeenCalledTimes(2) // initial + search (clear is optimized away)
  })

  it('should handle pagination clicks', async () => {
    const user = userEvent.setup()
    renderWithProviders(<HomePage />)
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    // Click next page arrow
    const nextButton = screen.getByRole('button', { name: 'Next page' })
    await user.click(nextButton)
    
    // Should call API with page=2
    await waitFor(() => {
      expect(swapiPeople.listPeople).toHaveBeenCalledWith({ page: 2, search: '' })
    })
  })

  it('should handle direct page number clicks', async () => {
    const user = userEvent.setup()
    renderWithProviders(<HomePage />)
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    // Click page 2 directly
    const page2Button = screen.getByRole('button', { name: 'Go to page 2' })
    await user.click(page2Button)
    
    // Should call API with page=2
    await waitFor(() => {
      expect(swapiPeople.listPeople).toHaveBeenCalledWith({ page: 2, search: '' })
    })
  })

  it('should show loading state', () => {
    // Mock slow response
    vi.spyOn(swapiPeople, 'listPeople').mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockPeopleData), 1000))
    )
    
    renderWithProviders(<HomePage />)
    
    expect(screen.getByRole('status')).toBeInTheDocument() // spinner
  })

  it('should show error state when API fails', async () => {
    // Mock API error
    vi.spyOn(swapiPeople, 'listPeople').mockRejectedValue(new Error('API Error'))
    
    renderWithProviders(<HomePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load characters')).toBeInTheDocument()
    })
    
    expect(screen.getByText('API Error')).toBeInTheDocument()
  })
})
