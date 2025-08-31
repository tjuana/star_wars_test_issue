import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@pages/HomePage'
import { PersonPage } from '@pages/PersonPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/people/:id',
    element: <PersonPage />,
  },
])
