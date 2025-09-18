import { useState } from 'react'

interface AccordionProps {
  title: string
  children: React.ReactNode
  isLoading?: boolean
  className?: string
}

export function Accordion({ title, children, isLoading = false, className = '' }: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={`accordion ${className}`}>
      <button
        className="accordion-header"
        onClick={toggle}
        aria-expanded={isExpanded}
      >
        <h2 className="text-xl font-semibold text-slate-100 flex-1">{title}</h2>
        <span className="accordion-icon ml-3 flex-shrink-0">
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      
      {isExpanded && (
        <div className="accordion-content overflow-hidden animate-in slide-in-from-top-2 duration-300">
          {isLoading ? (
            <div className="text-sm text-slate-400">Loading...</div>
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
