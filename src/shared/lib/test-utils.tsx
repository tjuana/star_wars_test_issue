import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient } from '@tanstack/react-query'
import { TestWrapper } from './test-wrapper'
import type { ReactElement } from 'react'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
  initialEntries?: string[]
}

export function renderWithProviders(
  ui: ReactElement,
  { queryClient, initialEntries, ...renderOptions }: CustomRenderOptions = {}
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <TestWrapper queryClient={queryClient} initialEntries={initialEntries}>
        {children}
      </TestWrapper>
    ),
    ...renderOptions,
  })
}

// Only export the render function to avoid fast-refresh issues
