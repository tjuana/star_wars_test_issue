// Keep mappers small and testable
export const extractPersonId = (url: string): string => {
  // robust against trailing slashes or query strings
  // works with both swapi.dev and swapi.py4e.com
  const m = url.match(/\/people\/(\d+)(?:\/)?(?:\?.*)?$/)
  return m?.[1] ?? ''
}
