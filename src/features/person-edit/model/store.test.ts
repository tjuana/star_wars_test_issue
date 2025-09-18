import { describe, it, expect, beforeEach } from 'vitest'
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

describe('PersonEditStore', () => {
  beforeEach(() => {
    // Clear store before each test
    usePersonEditStore.getState().clearAllEdits()
  })

  it('should start with empty edits', () => {
    const { edits, hasEdits } = usePersonEditStore.getState()
    
    expect(edits).toEqual({})
    expect(hasEdits('1')).toBe(false)
  })

  it('should update person fields', () => {
    const { updatePerson, hasEdits } = usePersonEditStore.getState()
    
    updatePerson('1', { name: 'Luke Skywalker (Jedi)' })
    
    const { edits } = usePersonEditStore.getState()
    expect(edits['1']).toEqual({
      id: '1',
      name: 'Luke Skywalker (Jedi)',
    })
    expect(hasEdits('1')).toBe(true)
  })

  it('should merge multiple field updates', () => {
    const { updatePerson } = usePersonEditStore.getState()
    
    updatePerson('1', { name: 'Luke Skywalker (Jedi)' })
    updatePerson('1', { height: '175' })
    updatePerson('1', { mass: '80' })
    
    const { edits } = usePersonEditStore.getState()
    expect(edits['1']).toEqual({
      id: '1',
      name: 'Luke Skywalker (Jedi)',
      height: '175',
      mass: '80',
    })
  })

  it('should get edited person with merged data', () => {
    const { updatePerson, getEditedPerson } = usePersonEditStore.getState()
    
    updatePerson('1', { 
      name: 'Luke Skywalker (Jedi)',
      height: '175' 
    })
    
    const editedPerson = getEditedPerson('1', mockPerson)
    
    expect(editedPerson).toEqual({
      ...mockPerson,
      name: 'Luke Skywalker (Jedi)',
      height: '175',
    })
  })

  it('should return original person when no edits', () => {
    const { getEditedPerson } = usePersonEditStore.getState()
    
    const result = getEditedPerson('1', mockPerson)
    
    expect(result).toEqual(mockPerson)
  })

  it('should reset person edits', () => {
    const { updatePerson, resetPerson, hasEdits } = usePersonEditStore.getState()
    
    // Make some edits
    updatePerson('1', { name: 'Modified Name' })
    expect(hasEdits('1')).toBe(true)
    
    // Reset
    resetPerson('1')
    
    const { edits } = usePersonEditStore.getState()
    expect(edits['1']).toBeUndefined()
    expect(hasEdits('1')).toBe(false)
  })

  it('should clear all edits', () => {
    const { updatePerson, clearAllEdits, hasEdits } = usePersonEditStore.getState()
    
    // Make edits for multiple people
    updatePerson('1', { name: 'Luke Modified' })
    updatePerson('2', { name: 'Leia Modified' })
    
    expect(hasEdits('1')).toBe(true)
    expect(hasEdits('2')).toBe(true)
    
    // Clear all
    clearAllEdits()
    
    const { edits } = usePersonEditStore.getState()
    expect(edits).toEqual({})
    expect(hasEdits('1')).toBe(false)
    expect(hasEdits('2')).toBe(false)
  })

  it('should handle multiple people independently', () => {
    const { updatePerson, hasEdits } = usePersonEditStore.getState()
    
    updatePerson('1', { name: 'Luke Modified' })
    updatePerson('2', { name: 'Leia Modified' })
    
    const { edits } = usePersonEditStore.getState()
    expect(edits['1']).toEqual({ id: '1', name: 'Luke Modified' })
    expect(edits['2']).toEqual({ id: '2', name: 'Leia Modified' })
    expect(hasEdits('1')).toBe(true)
    expect(hasEdits('2')).toBe(true)
    expect(hasEdits('3')).toBe(false)
  })
})
