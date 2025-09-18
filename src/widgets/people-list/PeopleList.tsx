import { PersonCard } from '@entities/person/ui/PersonCard'
import { Spinner } from '@shared/ui/Spinner'
import { Empty } from '@shared/ui/Empty'
import type { Person } from '@shared/api/swapi/types'

interface PeopleListProps {
  people: Person[]
  isLoading: boolean
  error?: Error | null
}

export function PeopleList({ people, isLoading, error }: PeopleListProps) {
  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 text-lg mb-2">Failed to load characters</p>
        <p className="text-sm text-gray-400">{error.message}</p>
      </div>
    )
  }

  if (!people.length) {
    return <Empty message="No characters found" />
  }

  // Show only first 9 items to create a nice 3x3 grid
  const displayPeople = people.slice(0, 9)

  return (
    <div 
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Star Wars characters"
    >
      {displayPeople.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  )
}
