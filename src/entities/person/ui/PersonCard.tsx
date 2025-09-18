import { Link } from 'react-router-dom'
import type { Person } from '@shared/api/swapi/types'

interface PersonCardProps {
  person: Person
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <Link 
      to={`/people/${person.id}`}
      className="card card-hover p-4 block"
    >
      <h3 className="text-xl font-semibold mb-3 text-yellow-400">{person.name}</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-cyan-300">Height:</span>
          <span className="capitalize text-white">{person.height}cm</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-cyan-300">Gender:</span>
          <span className="capitalize text-white">{person.gender}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-cyan-300">Birth Year:</span>
          <span className="capitalize text-white">{person.birth_year}</span>
        </div>
        
        <div className="mt-3 pt-3 border-t border-cyan-400">
          <span className="text-xs text-gray-400">
            {person.films.length} films
          </span>
        </div>
      </div>
    </Link>
  )
}
