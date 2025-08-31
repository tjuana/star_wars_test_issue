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
      <div className="people-list__error">
        <p className="people-list__error-title">Failed to load characters</p>
        <p className="people-list__error-message">{error.message}</p>
      </div>
    )
  }

  if (!people.length) {
    return <Empty message="No characters found" />
  }

  return (
    <div 
      className="people-list"
      role="list"
      aria-label="Star Wars characters"
    >
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  )
}
