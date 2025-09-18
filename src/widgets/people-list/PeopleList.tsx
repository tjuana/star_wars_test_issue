import { PersonCard } from '@entities/person/ui/PersonCard'
import { CardSkeleton } from '@shared/ui/CardSkeleton'
import { Empty } from '@shared/ui/Empty'
import type { Person } from '@shared/api/swapi/types'

interface PeopleListProps {
  people: Person[]
  isLoading: boolean
  error?: Error | null
}

export function PeopleList({ people, isLoading, error }: PeopleListProps) {
  if (isLoading) {
    return (
      <div
        className='grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        role='list'
        aria-label='Loading Star Wars characters'
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center p-8'>
        <p className='text-red-500 text-lg mb-2'>Failed to load characters</p>
        <p className='text-sm text-gray-400'>{error.message}</p>
      </div>
    )
  }

  if (!people.length) {
    return <Empty message='No characters found' />
  }

  // Show only first 9 items to create a nice 3x3 grid
  const displayPeople = people.slice(0, 9)

  return (
    <div
      className='grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      role='list'
      aria-label='Star Wars characters'
    >
      {displayPeople.map(person => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  )
}
