// Keep mappers small and testable

/**
 * Extract ID from any SWAPI URL (people, films, vehicles, etc.)
 * Robust against trailing slashes or query strings
 * Works with both swapi.dev and swapi.py4e.com
 */
export const extractIdFromUrl = (url: string): string => {
  const m = url.match(/\/(\d+)(?:\/)?(?:\?.*)?$/)
  return m?.[1] ?? ''
}

/**
 * Extract person ID from URL (backward compatibility)
 * @deprecated Use extractIdFromUrl instead
 */
export const extractPersonId = (url: string): string => {
  return extractIdFromUrl(url)
}

/**
 * Extract IDs from array of SWAPI URLs
 */
export const extractIdsFromUrls = (urls: string[]): string[] => {
  return urls.map(extractIdFromUrl).filter(Boolean)
}
