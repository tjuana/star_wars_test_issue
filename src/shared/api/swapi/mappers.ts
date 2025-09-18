// Keep mappers small and testable
import { extractIdFromUrl } from '@shared/lib/id'

/**
 * Extract person ID from URL (backward compatibility)
 * @deprecated Use extractIdFromUrl from @shared/lib/id instead
 */
export const extractPersonId = (url: string): string => {
  return extractIdFromUrl(url, 'people')
}

/**
 * Extract IDs from array of SWAPI URLs
 */
export const extractIdsFromUrls = (urls: string[]): string[] => {
  return urls.map(extractIdFromUrl).filter(Boolean)
}
