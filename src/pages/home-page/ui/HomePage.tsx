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
    <div className='min-h-screen p-6'>
      <div className='max-w-6xl mx-auto space-y-4'>
        <div className='flex flex-col items-center justify-center text-center gap-4'>
          <h1 className='star-wars-title'>
            {import.meta.env.VITE_APP_TITLE || 'Star Wars Characters'}
          </h1>
          <p className='star-wars-subtitle'>
            {import.meta.env.VITE_APP_SUBTITLE || 'Character Database'}
          </p>
        </div>
        <SearchBox
          value={search}
          onChange={handleSearchChange}
          isLoading={isFetching}
        />

        <PeopleList people={people} isLoading={isLoading} error={error} />

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
