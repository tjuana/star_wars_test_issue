import { useQuery } from '@tanstack/react-query'
import {
  getFilmsByIds,
  getVehiclesByIds,
  getStarshipsByIds,
  getSpeciesByIds,
  extractIdsFromUrls,
} from '@shared/api/swapi/relations'
import { QUERY_CONFIG } from '@app/providers/queryClient'
import type { Film, Vehicle, Starship, Species } from '@shared/api/swapi/types'

/**
 * Hook to get films for a person
 */
export function usePersonFilms(filmUrls: string[]) {
  const filmIds = extractIdsFromUrls(filmUrls)

  return useQuery<Film[]>({
    queryKey: ['films', filmIds],
    queryFn: () => getFilmsByIds(filmIds),
    enabled: filmIds.length > 0,
    staleTime: QUERY_CONFIG.STALE_TIME.RELATIONS,
  })
}

/**
 * Hook to get vehicles for a person
 */
export function usePersonVehicles(vehicleUrls: string[]) {
  const vehicleIds = extractIdsFromUrls(vehicleUrls)

  return useQuery<Vehicle[]>({
    queryKey: ['vehicles', vehicleIds],
    queryFn: () => getVehiclesByIds(vehicleIds),
    enabled: vehicleIds.length > 0,
    staleTime: QUERY_CONFIG.STALE_TIME.RELATIONS,
  })
}

/**
 * Hook to get starships for a person
 */
export function usePersonStarships(starshipUrls: string[]) {
  const starshipIds = extractIdsFromUrls(starshipUrls)

  return useQuery<Starship[]>({
    queryKey: ['starships', starshipIds],
    queryFn: () => getStarshipsByIds(starshipIds),
    enabled: starshipIds.length > 0,
    staleTime: QUERY_CONFIG.STALE_TIME.RELATIONS,
  })
}

/**
 * Hook to get species for a person
 */
export function usePersonSpecies(speciesUrls: string[]) {
  const speciesIds = extractIdsFromUrls(speciesUrls)

  return useQuery<Species[]>({
    queryKey: ['species', speciesIds],
    queryFn: () => getSpeciesByIds(speciesIds),
    enabled: speciesIds.length > 0,
    staleTime: QUERY_CONFIG.STALE_TIME.RELATIONS,
  })
}
