interface PaginationProps {
  currentPage: number
  totalCount: number
  hasNext: boolean
  hasPrevious: boolean
  onPageChange: (page: number) => void
}

function generatePageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = []
  
  // Always show first page
  pages.push(1)
  
  if (current > 3) {
    pages.push('ellipsis')
  }
  
  // Show current page and neighbors
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    if (!pages.includes(i)) {
      pages.push(i)
    }
  }
  
  if (current < total - 2) {
    pages.push('ellipsis')
  }
  
  // Always show last page if more than 1 page
  if (total > 1 && !pages.includes(total)) {
    pages.push(total)
  }
  
  return pages
}

export function Pagination({ 
  currentPage, 
  totalCount, 
  hasNext, 
  hasPrevious, 
  onPageChange 
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / 10) // SWAPI returns 10 per page
  const pageNumbers = generatePageNumbers(currentPage, totalPages)

  return (
    <div className="pagination">
      {/* Page numbers */}
      <div className="pagination-controls">
        {/* Previous button */}
        <button 
          className="pagination-btn" 
          disabled={!hasPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          ←
        </button>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              …
            </span>
          ) : (
            <button
              key={page}
              className={`pagination-btn ${page === currentPage ? 'pagination-btn--active' : ''}`}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
        
        {/* Next button */}
        <button 
          className="pagination-btn" 
          disabled={!hasNext}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          →
        </button>
      </div>
      
      {/* Page info */}
      <div className="pagination-info">
        Showing {Math.min(currentPage * 10, totalCount)} of {totalCount} characters
      </div>
    </div>
  )
}
