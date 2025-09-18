import { Link } from 'react-router-dom'
import type { Person } from '@shared/api/swapi/types'

interface PersonCardProps {
  person: Person
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <Link 
      to={`/people/${person.id}`}
      className="block rounded-lg p-3 hover:scale-105 bg-foreground shadow-md transition-transform"
    >
      <h3 className="text-xl font-semibold mb-3">{person.name}</h3>
      
      <div className="space-y-2 text-sm opacity-90">
        <div className="flex justify-between">
          <span className="text-white/80">Height:</span>
          <span className="capitalize opacity-90">{person.height}cm</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-white/80">Gender:</span>
          <span className="capitalize opacity-90">{person.gender}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-white/80">Birth Year:</span>
          <span className="capitalize opacity-90">{person.birth_year}</span>
        </div>
        
        <div className="mt-3 pt-3 border-t border-white/10">
          <span className="text-xs opacity-75 text-white/60">
            {person.films.length} films
          </span>
        </div>
      </div>
    </Link>
  )
}
