import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, resetError: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.resetError)
      }

      return (
        <div className='min-h-screen p-6'>
          <div className='max-w-2xl mx-auto'>
            <div className='text-center p-8'>
              <h1 className='text-2xl font-bold text-red-500 mb-4'>
                Something went wrong
              </h1>
              <p className='mb-4 text-gray-300'>
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
              <button onClick={this.resetError} className='btn btn-primary'>
                Try again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
