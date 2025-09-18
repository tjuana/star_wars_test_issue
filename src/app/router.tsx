import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@pages/home-page'
import { PersonPage } from '@pages/person-page'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/people/:id',
      element: <PersonPage />,
    },
  ],
  {
    basename:
      import.meta.env.VITE_APP_BASE_PATH === '/'
        ? undefined
        : import.meta.env.VITE_APP_BASE_PATH?.replace(/\/$/, ''),
  }
)
