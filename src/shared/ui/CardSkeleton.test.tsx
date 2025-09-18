import { render, screen } from '@testing-library/react'
import { CardSkeleton } from './CardSkeleton'

describe('CardSkeleton', () => {
  it('should render skeleton elements', () => {
    render(<CardSkeleton />)

    // Check for skeleton elements
    const skeletonElements = screen.getAllByRole('generic')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })

  it('should have proper CSS classes for animation', () => {
    const { container } = render(<CardSkeleton />)

    // Check for animate-pulse class
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()

    // Check for card class
    expect(container.querySelector('.card')).toBeInTheDocument()
  })

  it('should render placeholder elements with correct structure', () => {
    const { container } = render(<CardSkeleton />)

    // Check for skeleton elements (now using Skeleton component)
    const skeletonElements = container.querySelectorAll(
      '[class*="bg-gray-700"]'
    )
    expect(skeletonElements.length).toBeGreaterThan(0)

    // Check for name placeholder
    const namePlaceholder = container.querySelector('h3 div')
    expect(namePlaceholder).toBeInTheDocument()

    // Check for detail placeholders (6 total: 3 labels + 3 values)
    const detailPlaceholders = container.querySelectorAll(
      '.space-y-2 > div > div'
    )
    expect(detailPlaceholders).toHaveLength(6)
  })

  it('should have proper spacing and layout', () => {
    const { container } = render(<CardSkeleton />)

    // Check for proper spacing classes
    expect(container.querySelector('.space-y-2')).toBeInTheDocument()
    expect(container.querySelector('.mb-3')).toBeInTheDocument()
    expect(container.querySelector('.mt-3.pt-3')).toBeInTheDocument()
  })
})
