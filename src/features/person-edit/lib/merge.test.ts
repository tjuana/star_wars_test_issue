import { mergePersonWithEdits, hasPersonEdits } from './merge'
import type { Person } from '@shared/api/swapi/types'
import type { PersonEdit } from '../model/store'

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

describe('mergePersonWithEdits', () => {
  it('should return original person when no edits', () => {
    const result = mergePersonWithEdits(mockPerson, undefined)
    expect(result).toEqual(mockPerson)
  })

  it('should merge name edit', () => {
    const edits: PersonEdit = {
      id: '1',
      name: 'Anakin Skywalker',
    }

    const result = mergePersonWithEdits(mockPerson, edits)

    expect(result.name).toBe('Anakin Skywalker')
    expect(result.height).toBe('172') // Original value
    expect(result.id).toBe('1')
  })

  it('should merge multiple field edits', () => {
    const edits: PersonEdit = {
      id: '1',
      name: 'Anakin Skywalker',
      height: '188',
      mass: '84',
    }

    const result = mergePersonWithEdits(mockPerson, edits)

    expect(result.name).toBe('Anakin Skywalker')
    expect(result.height).toBe('188')
    expect(result.mass).toBe('84')
    expect(result.hair_color).toBe('blond') // Original value
  })

  it('should not modify complex relations', () => {
    const edits: PersonEdit = {
      id: '1',
      name: 'Anakin Skywalker',
      // @ts-expect-error - testing that complex relations are ignored
      films: ['fake-film'],
    }

    const result = mergePersonWithEdits(mockPerson, edits)

    expect(result.name).toBe('Anakin Skywalker')
    expect(result.films).toEqual([]) // Original value, not modified
  })

  it('should handle empty string edits', () => {
    const edits: PersonEdit = {
      id: '1',
      name: '',
      height: '188',
    }

    const result = mergePersonWithEdits(mockPerson, edits)

    expect(result.name).toBe('') // Empty string should be applied
    expect(result.height).toBe('188')
  })

  it('should preserve all original fields when merging', () => {
    const edits: PersonEdit = {
      id: '1',
      name: 'Anakin Skywalker',
    }

    const result = mergePersonWithEdits(mockPerson, edits)

    // Check that all original fields are preserved
    expect(result.id).toBe('1')
    expect(result.height).toBe('172')
    expect(result.mass).toBe('77')
    expect(result.hair_color).toBe('blond')
    expect(result.skin_color).toBe('fair')
    expect(result.eye_color).toBe('blue')
    expect(result.birth_year).toBe('19BBY')
    expect(result.gender).toBe('male')
    expect(result.homeworld).toBe('https://swapi.py4e.com/api/planets/1/')
    expect(result.films).toEqual([])
    expect(result.species).toEqual([])
    expect(result.vehicles).toEqual([])
    expect(result.starships).toEqual([])
    expect(result.created).toBe('2014-12-09T13:50:51.644000Z')
    expect(result.edited).toBe('2014-12-20T21:17:56.891000Z')
    expect(result.url).toBe('https://swapi.py4e.com/api/people/1/')
  })
})

describe('hasPersonEdits', () => {
  it('should return false when no edits', () => {
    expect(hasPersonEdits(undefined)).toBe(false)
  })

  it('should return false when edits has only id', () => {
    const edits: PersonEdit = {
      id: '1',
    }

    expect(hasPersonEdits(edits)).toBe(false)
  })

  it('should return true when name is edited', () => {
    const edits: PersonEdit = {
      id: '1',
      name: 'Anakin Skywalker',
    }

    expect(hasPersonEdits(edits)).toBe(true)
  })

  it('should return true when any editable field is modified', () => {
    const editableFields = [
      'name',
      'height',
      'mass',
      'hair_color',
      'skin_color',
      'eye_color',
      'birth_year',
      'gender',
      'homeworld',
    ] as const

    editableFields.forEach(field => {
      const edits: PersonEdit = {
        id: '1',
        [field]: 'test-value',
      }

      expect(hasPersonEdits(edits)).toBe(true)
    })
  })

  it('should return true when multiple fields are edited', () => {
    const edits: PersonEdit = {
      id: '1',
      name: 'Anakin Skywalker',
      height: '188',
      mass: '84',
    }

    expect(hasPersonEdits(edits)).toBe(true)
  })

  it('should return false when only undefined values are set', () => {
    const edits: PersonEdit = {
      id: '1',
      name: undefined,
      height: undefined,
    }

    expect(hasPersonEdits(edits)).toBe(false)
  })
})
