import type { Person } from '@shared/api/swapi/types'
import type { PersonEdit } from '../model/store'

/**
 * Merge server person data with local edits
 */
export function mergePersonWithEdits(
  originalPerson: Person,
  edits?: PersonEdit
): Person {
  if (!edits) return originalPerson

  return {
    ...originalPerson,
    // Only apply edits for simple fields, not complex relations
    ...(edits.name !== undefined && { name: edits.name }),
    ...(edits.height !== undefined && { height: edits.height }),
    ...(edits.mass !== undefined && { mass: edits.mass }),
    ...(edits.hair_color !== undefined && { hair_color: edits.hair_color }),
    ...(edits.skin_color !== undefined && { skin_color: edits.skin_color }),
    ...(edits.eye_color !== undefined && { eye_color: edits.eye_color }),
    ...(edits.birth_year !== undefined && { birth_year: edits.birth_year }),
    ...(edits.gender !== undefined && { gender: edits.gender }),
    ...(edits.homeworld !== undefined && { homeworld: edits.homeworld }),
  }
}

/**
 * Check if any editable fields have been modified
 */
export function hasPersonEdits(edits?: PersonEdit): boolean {
  if (!edits) return false

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

  return editableFields.some(field => edits[field] !== undefined)
}
