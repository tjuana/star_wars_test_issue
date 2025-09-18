import { useState } from 'react'
import { usePeopleQuery } from '@entities/person/api/hooks'
import { SearchBox } from '@widgets/search-box'
import { PeopleList } from '@widgets/people-list'
import { Pagination } from '@widgets/pagination'
import { DevApiStatus } from '@widgets/dev-api-status/DevApiStatus'
import { useScrollToTop } from '@shared/lib/useScrollToTop'

export function HomePage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  
  // Reset page when search changes
  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch)
    // Only reset page if search actually changed and we're not on page 1
    if (newSearch !== search && page !== 1) {
      setPage(1)
    }
  }
  
  const { data, isLoading, error, isFetching } = usePeopleQuery(page, search)
  
  const people = data?.results || []
  const totalCount = data?.count || 0
  const hasNext = !!data?.next
  const hasPrevious = !!data?.previous

  // Scroll to top when page changes (but not on initial load)
  useScrollToTop(page, page > 1)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">
          {import.meta.env.VITE_APP_TITLE || 'Star Wars Characters'}
        </h1>
        
        <SearchBox 
          value={search}
          onChange={handleSearchChange}
          isLoading={isFetching}
        />
        
        <PeopleList 
          people={people}
          isLoading={isLoading}
          error={error}
        />
        
        {!isLoading && !error && people.length > 0 && (
          <Pagination
            currentPage={page}
            totalCount={totalCount}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onPageChange={setPage}
          />
        )}
        
        {import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true' && <DevApiStatus />}
      </div>
    </div>
  )
}
