import { useState, useRef } from 'react'

interface AccordionProps {
  title: string
  children: React.ReactNode
  isLoading?: boolean
  className?: string
}

export function Accordion({ title, children, isLoading = false, className = '' }: AccordionProps) {
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
          block: 'nearest' 
        })
      }, 100)
    }
  }

  return (
    <div className={`accordion ${className}`}>
      <button
        className="accordion-header"
        onClick={toggle}
        aria-expanded={isExpanded}
      >
        <h2 className="text-xl font-semibold text-cyan-300 flex-1">{title}</h2>
        <span className="accordion-icon ml-3 flex-shrink-0">
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      
      {isExpanded && (
        <div 
          ref={contentRef}
          className="accordion-content overflow-hidden animate-in slide-in-from-top-2 duration-300"
        >
          {isLoading ? (
            <div className="text-sm text-gray-400">Loading...</div>
          ) : (
            <div className="space-y-3">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
