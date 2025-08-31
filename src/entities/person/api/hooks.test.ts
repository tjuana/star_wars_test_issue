import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement, type ReactNode } from 'react'
import { usePeopleQuery, usePersonQuery } from './hooks'
import type { Person, SwapiList } from '@shared/api/swapi/types'
import { describe, beforeEach, it, expect, vi } from 'vitest'

// Mock data
const mockPerson: Person = {
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
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.py4e.com/api/people/1/',
  id: '1',
}

const mockPeopleList: SwapiList<Person> = {
  count: 1,
  next: null,
  previous: null,
  results: [mockPerson],
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  })
  
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient }, children)
  }
}

describe('usePeopleQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch people list successfully', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPeopleList),
    } as Response)

    const { result } = renderHook(() => usePeopleQuery(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockPeopleList)
    expect(mockFetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/')
  })

  it('should handle search and pagination params', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPeopleList),
    } as Response)

    const { result } = renderHook(
      () => usePeopleQuery(2, 'luke'),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(mockFetch).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/people/?page=2&search=luke'
    )
  })
})

describe('usePersonQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch person by ID successfully', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPerson),
    } as Response)

    const { result } = renderHook(() => usePersonQuery('1'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockPerson)
    expect(mockFetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/1/')
  })

  it('should not fetch when ID is empty', () => {
    const mockFetch = vi.mocked(fetch)

    const { result } = renderHook(() => usePersonQuery(''), {
      wrapper: createWrapper(),
    })

    expect(result.current.fetchStatus).toBe('idle')
    expect(mockFetch).not.toHaveBeenCalled()
  })
})
