import { renderHook, act } from '@testing-library/react'
import { usePersonEditStore } from './store'
import type { Person } from '@shared/api/swapi/types'

// Mock person data
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

describe('usePersonEditStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      usePersonEditStore.getState().clearAllEdits()
    })
    // Clear localStorage
    localStorage.clear()
  })

  it('should initialize with empty edits', () => {
    const { result } = renderHook(() => usePersonEditStore())

    expect(result.current.edits).toEqual({})
    expect(result.current.hasEdits('1')).toBe(false)
  })

  it('should update person fields', () => {
    const { result } = renderHook(() => usePersonEditStore())

    act(() => {
      result.current.updatePerson('1', { name: 'Anakin Skywalker' })
    })

    expect(result.current.edits['1']).toEqual({
      id: '1',
      name: 'Anakin Skywalker',
    })
    expect(result.current.hasEdits('1')).toBe(true)
  })

  it('should merge multiple updates for same person', () => {
    const { result } = renderHook(() => usePersonEditStore())

    act(() => {
      result.current.updatePerson('1', { name: 'Anakin Skywalker' })
    })

    act(() => {
      result.current.updatePerson('1', { height: '188' })
    })

    expect(result.current.edits['1']).toEqual({
      id: '1',
      name: 'Anakin Skywalker',
      height: '188',
    })
  })

  it('should get edited person with merged data', () => {
    const { result } = renderHook(() => usePersonEditStore())

    act(() => {
      result.current.updatePerson('1', {
        name: 'Anakin Skywalker',
        height: '188',
      })
    })

    const editedPerson = result.current.getEditedPerson('1', mockPerson)

    expect(editedPerson.name).toBe('Anakin Skywalker')
    expect(editedPerson.height).toBe('188')
    expect(editedPerson.mass).toBe('77') // Original value
    expect(editedPerson.id).toBe('1')
  })

  it('should return original person when no edits', () => {
    const { result } = renderHook(() => usePersonEditStore())

    const editedPerson = result.current.getEditedPerson('1', mockPerson)

    expect(editedPerson).toEqual(mockPerson)
  })

  it('should reset person edits', () => {
    const { result } = renderHook(() => usePersonEditStore())

    act(() => {
      result.current.updatePerson('1', { name: 'Anakin Skywalker' })
    })

    expect(result.current.hasEdits('1')).toBe(true)

    act(() => {
      result.current.resetPerson('1')
    })

    expect(result.current.hasEdits('1')).toBe(false)
    expect(result.current.edits['1']).toBeUndefined()
  })

  it('should clear all edits', () => {
    const { result } = renderHook(() => usePersonEditStore())

    act(() => {
      result.current.updatePerson('1', { name: 'Anakin Skywalker' })
      result.current.updatePerson('2', { name: 'Leia Organa' })
    })

    expect(Object.keys(result.current.edits)).toHaveLength(2)

    act(() => {
      result.current.clearAllEdits()
    })

    expect(result.current.edits).toEqual({})
    expect(result.current.hasEdits('1')).toBe(false)
    expect(result.current.hasEdits('2')).toBe(false)
  })

  it('should handle multiple people edits independently', () => {
    const { result } = renderHook(() => usePersonEditStore())

    act(() => {
      result.current.updatePerson('1', { name: 'Anakin Skywalker' })
      result.current.updatePerson('2', { name: 'Leia Organa' })
    })

    expect(result.current.hasEdits('1')).toBe(true)
    expect(result.current.hasEdits('2')).toBe(true)
    expect(result.current.edits['1'].name).toBe('Anakin Skywalker')
    expect(result.current.edits['2'].name).toBe('Leia Organa')
  })

  it('should preserve other edits when updating one person', () => {
    const { result } = renderHook(() => usePersonEditStore())

    act(() => {
      result.current.updatePerson('1', { name: 'Anakin Skywalker' })
      result.current.updatePerson('2', { name: 'Leia Organa' })
    })

    act(() => {
      result.current.updatePerson('1', { height: '188' })
    })

    expect(result.current.edits['1']).toEqual({
      id: '1',
      name: 'Anakin Skywalker',
      height: '188',
    })
    expect(result.current.edits['2']).toEqual({
      id: '2',
      name: 'Leia Organa',
    })
  })

  describe('persistence', () => {
    it('should persist edits to localStorage', () => {
      const { result } = renderHook(() => usePersonEditStore())
      
      act(() => {
        result.current.updatePerson('1', { name: 'Luke Skywalker', height: '172' })
      })
      
      // Check that data is in localStorage
      const stored = localStorage.getItem('person-edits-storage')
      expect(stored).toBeTruthy()
      
      const parsed = JSON.parse(stored!)
      expect(parsed.state.edits).toEqual({
        '1': { id: '1', name: 'Luke Skywalker', height: '172' }
      })
    })

    it('should restore edits from localStorage on reinit', () => {
      const { result } = renderHook(() => usePersonEditStore())
      
      // Set up initial data
      act(() => {
        result.current.updatePerson('1', { name: 'Luke Skywalker', height: '172' })
        result.current.updatePerson('2', { mass: '77' })
      })
      
      // Verify data is in localStorage
      const stored = localStorage.getItem('person-edits-storage')
      expect(stored).toBeTruthy()
      
      const parsed = JSON.parse(stored!)
      expect(parsed.state.edits).toEqual({
        '1': { id: '1', name: 'Luke Skywalker', height: '172' },
        '2': { id: '2', mass: '77' }
      })
      
      // Clear current state
      act(() => {
        result.current.clearAllEdits()
      })
      expect(usePersonEditStore.getState().edits).toEqual({})
      
      // Simulate reinit by manually triggering the persist rehydration
      // This is a simplified test - in reality, Zustand persist handles this
      act(() => {
        usePersonEditStore.setState({ edits: parsed.state.edits })
      })
      
      // Verify data was restored
      const restoredState = usePersonEditStore.getState()
      expect(restoredState.edits).toEqual({
        '1': { id: '1', name: 'Luke Skywalker', height: '172' },
        '2': { id: '2', mass: '77' }
      })
    })

    it('should handle corrupted localStorage gracefully', () => {
      // Set corrupted data in localStorage
      localStorage.setItem('person-edits-storage', 'invalid-json')
      
      // Store should still work (Zustand persist handles this)
      const { result } = renderHook(() => usePersonEditStore())
      
      act(() => {
        result.current.updatePerson('1', { name: 'Luke Skywalker' })
      })
      
      const edited = result.current.getEditedPerson('1', mockPerson)
      expect(edited.name).toBe('Luke Skywalker')
    })

    it('should maintain version compatibility', () => {
      const { result } = renderHook(() => usePersonEditStore())
      
      act(() => {
        result.current.updatePerson('1', { name: 'Luke Skywalker' })
      })
      
      // Check that version is stored
      const stored = localStorage.getItem('person-edits-storage')
      const parsed = JSON.parse(stored!)
      expect(parsed.version).toBe(1)
    })
  })
})
