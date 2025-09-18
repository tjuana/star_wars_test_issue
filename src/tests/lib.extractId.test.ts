import { describe, it, expect } from 'vitest'
import { extractIdFromUrl } from '../shared/lib/id'

describe('extractIdFromUrl', () => {
  it('should extract ID from people URL', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/people/1/', 'people')).toBe('1')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/people/42', 'people')).toBe('42')
  })

  it('should extract ID from films URL', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/films/1/', 'films')).toBe('1')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/films/6', 'films')).toBe('6')
  })

  it('should extract ID from vehicles URL', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/vehicles/4/', 'vehicles')).toBe('4')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/vehicles/14', 'vehicles')).toBe('14')
  })

  it('should extract ID from starships URL', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/starships/2/', 'starships')).toBe('2')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/starships/12', 'starships')).toBe('12')
  })

  it('should extract ID from species URL', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/species/1/', 'species')).toBe('1')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/species/3', 'species')).toBe('3')
  })

  it('should extract ID from planets URL', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/planets/1/', 'planets')).toBe('1')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/planets/8', 'planets')).toBe('8')
  })

  it('should handle URLs with query parameters', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/people/1/?format=json', 'people')).toBe('1')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/films/2/?search=luke', 'films')).toBe('2')
  })

  it('should handle URLs without trailing slash', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/people/1', 'people')).toBe('1')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/vehicles/4', 'vehicles')).toBe('4')
  })

  it('should return empty string for invalid URLs', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/people/', 'people')).toBe('')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/people/abc', 'people')).toBe('')
    expect(extractIdFromUrl('not-a-url', 'people')).toBe('')
    expect(extractIdFromUrl('', 'people')).toBe('')
  })

  it('should work without resource parameter', () => {
    expect(extractIdFromUrl('https://swapi.py4e.com/api/people/1/')).toBe('1')
    expect(extractIdFromUrl('https://swapi.py4e.com/api/films/2')).toBe('2')
  })

  it('should warn on resource mismatch', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    extractIdFromUrl('https://swapi.py4e.com/api/people/1/', 'films')
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'Expected films URL but got: https://swapi.py4e.com/api/people/1/'
    )
    
    consoleSpy.mockRestore()
  })
})
