import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePeopleQuery, usePersonQuery } from './hooks'
import { listPeople, getPersonById } from '@shared/api/swapi/people'
import type { ReactNode } from 'react'

// Mock the API functions
vi.mock('@shared/api/swapi/people', () => ({
  listPeople: vi.fn(),
  getPersonById: vi.fn(),
}))

const mockListPeople = vi.mocked(listPeople)
const mockGetPersonById = vi.mocked(getPersonById)

// Test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  return ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}

describe('usePeopleQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch people list successfully', async () => {
    const mockData = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
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
        },
      ],
    }

    mockListPeople.mockResolvedValue(mockData)

    const { result } = renderHook(() => usePeopleQuery(1, ''), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBeNull()
    expect(mockListPeople).toHaveBeenCalledWith({ page: 1, search: '' })
  })

  it('should handle search query', async () => {
    const mockData = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
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
        },
      ],
    }

    mockListPeople.mockResolvedValue(mockData)

    const { result } = renderHook(() => usePeopleQuery(1, 'luke'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(mockListPeople).toHaveBeenCalledWith({ page: 1, search: 'luke' })
  })

  it('should handle error', async () => {
    const error = new Error('API Error')
    mockListPeople.mockRejectedValue(error)

    const { result } = renderHook(() => usePeopleQuery(1, ''), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toEqual(error)
    expect(result.current.data).toBeUndefined()
  })
})

describe('usePersonQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch person by id successfully', async () => {
    const mockPerson = {
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

    mockGetPersonById.mockResolvedValue(mockPerson)

    const { result } = renderHook(() => usePersonQuery('1'), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual(mockPerson)
    expect(result.current.error).toBeNull()
    expect(mockGetPersonById).toHaveBeenCalledWith('1')
  })

  it('should not fetch when id is empty', () => {
    const { result } = renderHook(() => usePersonQuery(''), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(mockGetPersonById).not.toHaveBeenCalled()
  })

  it('should handle error', async () => {
    const error = new Error('Person not found')
    mockGetPersonById.mockRejectedValue(error)

    const { result } = renderHook(() => usePersonQuery('999'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toEqual(error)
    expect(result.current.data).toBeUndefined()
  })
})
