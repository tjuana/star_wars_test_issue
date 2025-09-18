import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import type { ReactNode } from 'react'

// Create a new QueryClient for each test to avoid cache pollution
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in tests
        gcTime: 0, // Disable cache persistence in tests
      },
    },
  })
}

export function TestWrapper({
  children,
  queryClient,
  initialEntries = ['/'],
}: {
  children: ReactNode
  queryClient?: QueryClient
  initialEntries?: string[]
}) {
  const client = queryClient || createTestQueryClient()

  // Create memory router for testing
  const router = createMemoryRouter([{ path: '*', element: <>{children}</> }], {
    initialEntries,
  })

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
