import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PeopleList } from './PeopleList'
import type { Person } from '@shared/api/swapi/types'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

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
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.py4e.com/api/people/1/',
}

describe('PeopleList', () => {
  it('should render skeleton loaders when loading', () => {
    render(<PeopleList people={[]} isLoading={true} />)

    // Check for skeleton elements
    const skeletonElements = screen.getAllByRole('generic')
    expect(skeletonElements.length).toBeGreaterThan(0)

    // Check for animate-pulse class
    const animatedElements = document.querySelectorAll('.animate-pulse')
    expect(animatedElements.length).toBeGreaterThan(0)
  })

  it('should render people cards when loaded', () => {
    renderWithRouter(<PeopleList people={[mockPerson]} isLoading={false} />)

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('172cm')).toBeInTheDocument()
    expect(screen.getByText('male')).toBeInTheDocument()
  })

  it('should render error message when error occurs', () => {
    const error = new Error('Failed to fetch')
    render(<PeopleList people={[]} isLoading={false} error={error} />)

    expect(screen.getByText('Failed to load characters')).toBeInTheDocument()
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
  })

  it('should render empty state when no people', () => {
    render(<PeopleList people={[]} isLoading={false} />)

    expect(screen.getByText('No characters found')).toBeInTheDocument()
  })

  it('should limit display to 9 people', () => {
    const manyPeople = Array.from({ length: 15 }, (_, i) => ({
      ...mockPerson,
      id: String(i + 1),
      name: `Person ${i + 1}`,
    }))

    renderWithRouter(<PeopleList people={manyPeople} isLoading={false} />)

    // Should only show first 9 people
    expect(screen.getByText('Person 1')).toBeInTheDocument()
    expect(screen.getByText('Person 9')).toBeInTheDocument()
    expect(screen.queryByText('Person 10')).not.toBeInTheDocument()
  })

  it('should have proper grid layout', () => {
    renderWithRouter(<PeopleList people={[mockPerson]} isLoading={false} />)

    const gridContainer = screen.getByRole('list')
    expect(gridContainer).toHaveClass(
      'grid',
      'gap-3',
      'md:gap-4',
      'grid-cols-1',
      'sm:grid-cols-2',
      'lg:grid-cols-3'
    )
  })
})
