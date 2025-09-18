import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithProviders } from '@shared/lib/test-utils'
import { PersonPage } from './PersonPage'
import * as swapiPeople from '@shared/api/swapi/people'
import * as swapiRelations from '@shared/api/swapi/relations'
import type { Person, Film, Vehicle, Starship, Species } from '@shared/api/swapi/types'

// Mock data
const mockPerson: Person = {
  id: '1',
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.py4e.com/api/planets/1/',
  films: [
    'https://swapi.py4e.com/api/films/1/',
    'https://swapi.py4e.com/api/films/2/',
  ],
  species: ['https://swapi.py4e.com/api/species/1/'],
  vehicles: ['https://swapi.py4e.com/api/vehicles/14/'],
  starships: ['https://swapi.py4e.com/api/starships/12/'],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.py4e.com/api/people/1/',
}

const mockFilms: Film[] = [
  {
    id: '1',
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war...',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '2014-12-10T14:23:31.880000Z',
    edited: '2014-12-20T19:49:45.256000Z',
    url: 'https://swapi.py4e.com/api/films/1/',
  },
]

const mockVehicles: Vehicle[] = [
  {
    id: '14',
    name: 'Snowspeeder',
    model: 't-47 airspeeder',
    manufacturer: 'Incom corporation',
    cost_in_credits: 'unknown',
    length: '4.5',
    max_atmosphering_speed: '650',
    crew: '2',
    passengers: '0',
    cargo_capacity: '10',
    consumables: 'none',
    vehicle_class: 'airspeeder',
    pilots: [],
    films: [],
    created: '2014-12-15T12:22:12Z',
    edited: '2014-12-20T21:30:21.672000Z',
    url: 'https://swapi.py4e.com/api/vehicles/14/',
  },
]

const mockStarships: Starship[] = [
  {
    id: '12',
    name: 'X-wing',
    model: 'T-65 X-wing',
    manufacturer: 'Incom Corporation',
    cost_in_credits: '149999',
    length: '12.5',
    max_atmosphering_speed: '1050',
    crew: '1',
    passengers: '0',
    cargo_capacity: '110',
    consumables: '1 week',
    hyperdrive_rating: '1.0',
    MGLT: '100',
    starship_class: 'Starfighter',
    pilots: [],
    films: [],
    created: '2014-12-12T11:19:05.340000Z',
    edited: '2014-12-20T21:23:49.886000Z',
    url: 'https://swapi.py4e.com/api/starships/12/',
  },
]

const mockSpecies: Species[] = [
  {
    id: '1',
    name: 'Human',
    classification: 'mammal',
    designation: 'sentient',
    average_height: '180',
    skin_colors: 'caucasian, black, asian, hispanic',
    hair_colors: 'blonde, brown, black, red',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    average_lifespan: '120',
    homeworld: 'https://swapi.py4e.com/api/planets/9/',
    language: 'Galactic Basic',
    people: [],
    films: [],
    created: '2014-12-10T13:52:11.567000Z',
    edited: '2014-12-20T21:36:42.136000Z',
    url: 'https://swapi.py4e.com/api/species/1/',
  },
]

describe('PersonPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock API calls
    vi.spyOn(swapiPeople, 'getPersonById').mockResolvedValue(mockPerson)
    vi.spyOn(swapiRelations, 'getFilmsByIds').mockResolvedValue(mockFilms)
    vi.spyOn(swapiRelations, 'getVehiclesByIds').mockResolvedValue(mockVehicles)
    vi.spyOn(swapiRelations, 'getStarshipsByIds').mockResolvedValue(mockStarships)
    vi.spyOn(swapiRelations, 'getSpeciesByIds').mockResolvedValue(mockSpecies)
  })

  it('should render person details', async () => {
    renderWithProviders(<PersonPage />, { 
      initialEntries: ['/people/1'] 
    })
    
    // Should show loading first
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
    
    // Should show person data when loaded
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    expect(screen.getByText('172 cm')).toBeInTheDocument()
    expect(screen.getByText('77 kg')).toBeInTheDocument()
    expect(screen.getByText('blond')).toBeInTheDocument()
  })

  it('should show films, vehicles, starships, and species', async () => {
    renderWithProviders(<PersonPage />, { 
      initialEntries: ['/people/1'] 
    })
    
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    // Should show films
    await waitFor(() => {
      expect(screen.getByText('Episode 4: A New Hope')).toBeInTheDocument()
    })
    
    // Should show vehicles
    await waitFor(() => {
      expect(screen.getByText('Snowspeeder')).toBeInTheDocument()
    })
    
    // Should show starships
    await waitFor(() => {
      expect(screen.getByText('X-wing')).toBeInTheDocument()
    })
    
    // Should show species
    await waitFor(() => {
      expect(screen.getByText('Human')).toBeInTheDocument()
    })
    expect(screen.getByText('mammal • sentient')).toBeInTheDocument()
  })

  it('should toggle edit mode', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PersonPage />, { 
      initialEntries: ['/people/1'] 
    })
    
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    // Should have Edit button
    const editButton = screen.getByRole('button', { name: 'Edit' })
    expect(editButton).toBeInTheDocument()
    
    // Click Edit
    await user.click(editButton)
    
    // Should show View button and input fields
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
    expect(screen.getByLabelText('Name:')).toBeInTheDocument()
    expect(screen.getByLabelText('Height:')).toBeInTheDocument()
  })

  it('should handle field editing and local storage', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PersonPage />, { 
      initialEntries: ['/people/1'] 
    })
    
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    // Enter edit mode
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    
    // Edit name field
    const nameInput = screen.getByLabelText('Name:')
    await user.clear(nameInput)
    await user.type(nameInput, 'Luke Skywalker (Jedi)')
    
    // Save changes
    await user.click(screen.getByRole('button', { name: 'Save Changes' }))
    
    // Should show edited badge
    expect(screen.getByText('Edited')).toBeInTheDocument()
    
    // Should show updated name
    expect(screen.getByText('Luke Skywalker (Jedi)')).toBeInTheDocument()
  })

  it('should reset changes', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PersonPage />, { 
      initialEntries: ['/people/1'] 
    })
    
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    // Enter edit mode and make changes
    await user.click(screen.getByRole('button', { name: 'Edit' }))
    const nameInput = screen.getByLabelText('Name:')
    await user.clear(nameInput)
    await user.type(nameInput, 'Modified Name')
    await user.click(screen.getByRole('button', { name: 'Save Changes' }))
    
    // Should show edited badge and reset button
    expect(screen.getByText('Edited')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
    
    // Reset changes
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    
    // Should be back to original
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.queryByText('Edited')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument()
  })

  it('should handle person not found', async () => {
    vi.spyOn(swapiPeople, 'getPersonById').mockRejectedValue(
      new Error('Person not found')
    )
    
    renderWithProviders(<PersonPage />, { 
      initialEntries: ['/people/999'] 
    })
    
    await waitFor(() => {
      expect(screen.getByText('Character Not Found')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Person not found')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '← Back to Characters' })).toBeInTheDocument()
  })

  it('should navigate back to home', async () => {
    renderWithProviders(<PersonPage />, { 
      initialEntries: ['/people/1'] 
    })
    
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })
    
    // Should have back link
    const backLink = screen.getByRole('link', { name: '← Back' })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/')
  })
})
