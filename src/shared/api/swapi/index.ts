// API client and types
export { swapi, ApiError } from './client'
export type {
  Person,
  SwapiList,
  ListPeopleParams,
  Film,
  Vehicle,
  Starship,
  Species,
} from './types'

// API functions
export { listPeople, getPersonById } from './people'
export {
  getFilmById,
  getFilmsByIds,
  getVehicleById,
  getVehiclesByIds,
  getStarshipById,
  getStarshipsByIds,
  getSpeciesById,
  getSpeciesByIds,
  extractIdsFromUrls,
} from './relations'

// Mappers and utilities
export {
  extractIdFromUrl,
  extractPersonId,
  extractIdsFromUrls as extractIds,
} from './mappers'

// Query keys
export { peopleKeys } from './keys'
