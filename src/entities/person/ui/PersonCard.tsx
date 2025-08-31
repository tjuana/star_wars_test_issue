import { Person } from '../api/types'

interface PersonCardProps {
  person: Person
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-2">{person.name}</h3>
      <p className="text-sm opacity-75">Card coming soon...</p>
    </div>
  )
}
