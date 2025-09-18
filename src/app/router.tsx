import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@pages/home-page'
import { PersonPage } from '@pages/person-page'
import { ErrorBoundary } from '@shared/ui'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <ErrorBoundary>
          <HomePage />
        </ErrorBoundary>
      ),
    },
    {
      path: '/people/:id',
      element: (
        <ErrorBoundary>
          <PersonPage />
        </ErrorBoundary>
      ),
    },
  ],
  {
    basename:
      import.meta.env.VITE_APP_BASE_PATH === '/'
        ? undefined
        : import.meta.env.VITE_APP_BASE_PATH?.replace(/\/$/, ''),
  }
)
