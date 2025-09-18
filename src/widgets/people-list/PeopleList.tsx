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
        <p className="text-red-400 text-lg mb-2">Failed to load characters</p>
        <p className="text-sm opacity-75">{error.message}</p>
      </div>
    )
  }

  if (!people.length) {
    return <Empty message="No characters found" />
  }

  return (
    <div 
      className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-fill minmax(280px, 1fr)"
      role="list"
      aria-label="Star Wars characters"
    >
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  )
}
