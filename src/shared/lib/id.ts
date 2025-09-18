/**
 * Extract ID from SWAPI URL for any resource type
 * @param url - The SWAPI URL (e.g., "https://swapi.py4e.com/api/people/1/")
 * @param resource - The resource type for validation (optional)
 * @returns The extracted ID as string, or empty string if not found
 */
export function extractIdFromUrl(
  url: string,
  resource?: 'people' | 'films' | 'planets' | 'species' | 'vehicles' | 'starships'
): string {
  // Robust regex that handles trailing slashes and query strings
  const match = url.match(/\/(\d+)(?:\/)?(?:\?.*)?$/)
  const id = match?.[1] ?? ''
  
  // Optional resource validation
  if (resource && id) {
    const expectedPath = `/${resource}/`
    if (!url.includes(expectedPath)) {
      console.warn(`Expected ${resource} URL but got: ${url}`)
    }
  }
  
  return id
}
