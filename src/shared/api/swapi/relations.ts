import { swapi } from './client'
import { extractIdFromUrl } from './mappers'
import type { Film, Vehicle, Starship, Species } from './types'

// Add ID to object from URL
function addId<T extends { url: string }>(item: T): T & { id: string } {
  return {
    ...item,
    id: extractIdFromUrl(item.url),
  }
}

/**
 * Get film by ID
 */
export async function getFilmById(id: string): Promise<Film> {
  const response = await swapi.get<Film>(`/films/${id}/`)
  return addId(response.data)
}

/**
 * Get multiple films by IDs
 */
export async function getFilmsByIds(ids: string[]): Promise<Film[]> {
  if (ids.length === 0) return []

  const promises = ids.map(id => getFilmById(id))
  const results = await Promise.allSettled(promises)

  return results
    .filter(
      (result): result is PromiseFulfilledResult<Film> =>
        result.status === 'fulfilled'
    )
    .map(result => result.value)
}

/**
 * Get vehicle by ID
 */
export async function getVehicleById(id: string): Promise<Vehicle> {
  const response = await swapi.get<Vehicle>(`/vehicles/${id}/`)
  return addId(response.data)
}

/**
 * Get multiple vehicles by IDs
 */
export async function getVehiclesByIds(ids: string[]): Promise<Vehicle[]> {
  if (ids.length === 0) return []

  const promises = ids.map(id => getVehicleById(id))
  const results = await Promise.allSettled(promises)

  return results
    .filter(
      (result): result is PromiseFulfilledResult<Vehicle> =>
        result.status === 'fulfilled'
    )
    .map(result => result.value)
}

/**
 * Get starship by ID
 */
export async function getStarshipById(id: string): Promise<Starship> {
  const response = await swapi.get<Starship>(`/starships/${id}/`)
  return addId(response.data)
}

/**
 * Get multiple starships by IDs
 */
export async function getStarshipsByIds(ids: string[]): Promise<Starship[]> {
  if (ids.length === 0) return []

  const promises = ids.map(id => getStarshipById(id))
  const results = await Promise.allSettled(promises)

  return results
    .filter(
      (result): result is PromiseFulfilledResult<Starship> =>
        result.status === 'fulfilled'
    )
    .map(result => result.value)
}

/**
 * Get species by ID
 */
export async function getSpeciesById(id: string): Promise<Species> {
  const response = await swapi.get<Species>(`/species/${id}/`)
  return addId(response.data)
}

/**
 * Get multiple species by IDs
 */
export async function getSpeciesByIds(ids: string[]): Promise<Species[]> {
  if (ids.length === 0) return []

  const promises = ids.map(id => getSpeciesById(id))
  const results = await Promise.allSettled(promises)

  return results
    .filter(
      (result): result is PromiseFulfilledResult<Species> =>
        result.status === 'fulfilled'
    )
    .map(result => result.value)
}

// Re-export for convenience
export { extractIdsFromUrls } from './mappers'
