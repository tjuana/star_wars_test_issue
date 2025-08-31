interface PaginationProps {
  currentPage: number
  totalCount: number
  hasNext: boolean
  hasPrevious: boolean
  onPageChange: (page: number) => void
}

export function Pagination({ 
  currentPage, 
  totalCount, 
  hasNext, 
  hasPrevious, 
  onPageChange 
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / 10) // SWAPI returns 10 per page

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button 
        className="btn" 
        disabled={!hasPrevious}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        Previous
      </button>
      
      <span className="text-sm">
        Page {currentPage} of {totalPages} ({totalCount} total)
      </span>
      
      <button 
        className="btn" 
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  )
}
