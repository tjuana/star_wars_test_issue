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
    <div className={`space-y-4 ${className}`}>
      <button
        className="w-full flex items-center justify-between p-0 bg-transparent border-none text-left cursor-pointer hover:opacity-80 transition-opacity"
        onClick={toggle}
        aria-expanded={isExpanded}
      >
        <h2 className="text-xl font-semibold pb-2 border-b border-white/5">{title}</h2>
        <span className="text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full border border-white/20">
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      
      {isExpanded && (
        <div className="mt-4 overflow-hidden animate-in slide-in-from-top-2 duration-300">
          {isLoading ? (
            <div className="text-sm opacity-75">Loading...</div>
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
