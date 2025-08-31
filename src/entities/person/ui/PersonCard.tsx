import { Link } from 'react-router-dom'
import type { Person } from '@shared/api/swapi/types'

interface PersonCardProps {
  person: Person
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <Link 
      to={`/people/${person.id}`}
      className="person-card"
    >
      <h3 className="person-card__title">{person.name}</h3>
      
      <div className="person-card__details">
        <div className="person-card__row">
          <span className="person-card__label">Height:</span>
          <span className="person-card__value">{person.height}cm</span>
        </div>
        
        <div className="person-card__row">
          <span className="person-card__label">Gender:</span>
          <span className="person-card__value">{person.gender}</span>
        </div>
        
        <div className="person-card__row">
          <span className="person-card__label">Birth Year:</span>
          <span className="person-card__value">{person.birth_year}</span>
        </div>
        
        <div className="person-card__films">
          <span className="person-card__films-count">
            {person.films.length} films
          </span>
        </div>
      </div>
    </Link>
  )
}
