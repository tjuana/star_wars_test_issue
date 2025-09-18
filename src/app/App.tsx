import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/QueryProvider'
import { ErrorBoundary } from '@shared/ui'
import { router } from './router'

import './styles/tailwind.css'

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ErrorBoundary>
  )
}

export default App
