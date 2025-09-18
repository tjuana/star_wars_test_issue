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
      <h3 className="text-xl font-semibold mb-3 text-slate-100">{person.name}</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Height:</span>
          <span className="capitalize text-slate-200">{person.height}cm</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">Gender:</span>
          <span className="capitalize text-slate-200">{person.gender}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-slate-400">Birth Year:</span>
          <span className="capitalize text-slate-200">{person.birth_year}</span>
        </div>
        
        <div className="mt-3 pt-3 border-t border-slate-700">
          <span className="text-xs text-slate-500">
            {person.films.length} films
          </span>
        </div>
      </div>
    </Link>
  )
}
