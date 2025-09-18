import { useState, useRef } from 'react'

interface AccordionProps {
  title: string
  children: React.ReactNode
  isLoading?: boolean
  className?: string
}

export function Accordion({
  title,
  children,
  isLoading = false,
  className = '',
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const toggle = () => {
    const newExpanded = !isExpanded
    setIsExpanded(newExpanded)

    // Auto-scroll to content when opening
    if (newExpanded && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }, 150) // Slightly longer delay to allow animation to start
    }
  }

  return (
    <div className={`accordion ${className}`}>
      <button
        className='accordion-header'
        onClick={toggle}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h2
          id={`accordion-header-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className='text-xl font-semibold text-cyan-300 flex-1'
        >
          {title}
        </h2>
        <span className='accordion-icon ml-3 flex-shrink-0'>
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      <div
        ref={contentRef}
        id={`accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`accordion-content overflow-hidden transition-all duration-300 ease-out ${
          isExpanded
            ? 'max-h-screen opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2'
        }`}
        role='region'
        aria-labelledby={`accordion-header-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className='space-y-3'>
          {isLoading ? (
            <div className='text-sm text-gray-400'>Loading...</div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}
