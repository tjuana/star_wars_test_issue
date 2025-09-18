import { QueryClient } from '@tanstack/react-query'

// Query configuration constants
export const QUERY_CONFIG = {
  // Default stale times (in milliseconds)
  STALE_TIME: {
    DEFAULT: 60_000, // 1 minute
    PEOPLE: 5 * 60_000, // 5 minutes for people search results
    RELATIONS: 10 * 60_000, // 10 minutes for films, vehicles, etc.
  },
  // Garbage collection time
  GC_TIME: 300_000, // 5 minutes
  // Retry configuration
  RETRY: 2,
  // Refetch behavior
  REFETCH_ON_WINDOW_FOCUS: false,
} as const

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME.DEFAULT,
      gcTime: QUERY_CONFIG.GC_TIME,
      refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
      retry: QUERY_CONFIG.RETRY,
    },
  },
})
