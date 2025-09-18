import { Link } from 'react-router-dom'
import type { Person } from '@shared/api/swapi/types'

interface PersonCardProps {
  person: Person
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <Link 
      to={`/people/${person.id}`}
      className="card card-hover p-4 block transition-all duration-300 ease-out"
    >
      <h3 className="text-xl font-semibold mb-3 text-yellow-400 transition-colors duration-300 ease-out">{person.name}</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between transition-all duration-300 ease-out hover:bg-gray-700/30 px-2 py-1 rounded">
          <span className="text-cyan-300">Height:</span>
          <span className="capitalize text-white">{person.height}cm</span>
        </div>
        
        <div className="flex justify-between transition-all duration-300 ease-out hover:bg-gray-700/30 px-2 py-1 rounded">
          <span className="text-cyan-300">Gender:</span>
          <span className="capitalize text-white">{person.gender}</span>
        </div>
        
        <div className="flex justify-between transition-all duration-300 ease-out hover:bg-gray-700/30 px-2 py-1 rounded">
          <span className="text-cyan-300">Birth Year:</span>
          <span className="capitalize text-white">{person.birth_year}</span>
        </div>
        
        <div className="mt-3 pt-3 border-t border-cyan-400 transition-all duration-300 ease-out">
          <span className="text-xs text-gray-400">
            {person.films.length} films
          </span>
        </div>
      </div>
    </Link>
  )
}
