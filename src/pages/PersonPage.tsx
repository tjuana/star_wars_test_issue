import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePersonQuery } from '@entities/person/api/hooks'
import { usePersonFilms, usePersonVehicles, usePersonStarships, usePersonSpecies } from '@entities/person/api/relations-hooks'
import { usePersonEditStore } from '@features/person-edit/model/store'
import { mergePersonWithEdits } from '@features/person-edit/lib/merge'
import { Spinner } from '@shared/ui/Spinner'

export function PersonPage() {
  const { id } = useParams<{ id: string }>()
  const [isEditing, setIsEditing] = useState(false)
  
  const { data: originalPerson, isLoading, error } = usePersonQuery(id!)
  const { edits, updatePerson, resetPerson, hasEdits } = usePersonEditStore()
  
  // Get related data
  const { data: films, isLoading: filmsLoading } = usePersonFilms(originalPerson?.films || [])
  const { data: vehicles, isLoading: vehiclesLoading } = usePersonVehicles(originalPerson?.vehicles || [])
  const { data: starships, isLoading: starshipsLoading } = usePersonStarships(originalPerson?.starships || [])
  const { data: species, isLoading: speciesLoading } = usePersonSpecies(originalPerson?.species || [])
  
  if (isLoading) {
    return <Spinner />
  }
  
  if (error || !originalPerson) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              Character Not Found
            </h1>
            <p className="mb-4">
              {error?.message || 'The character you are looking for does not exist.'}
            </p>
            <Link to="/" className="btn">
              ← Back to Characters
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  // Merge original data with local edits
  const person = mergePersonWithEdits(originalPerson, edits[id!])
  const hasLocalEdits = hasEdits(id!)
  
  const handleFieldChange = (field: string, value: string) => {
    updatePerson(id!, { [field]: value })
  }
  
  const handleReset = () => {
    resetPerson(id!)
    setIsEditing(false)
  }
  
  const handleCancel = () => {
    setIsEditing(false)
  }
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="btn">
            ← Back
          </Link>
          
          <div className="flex gap-2">
            {hasLocalEdits && (
              <button 
                onClick={handleReset}
                className="btn btn-danger"
                title="Reset to original"
              >
                Reset
              </button>
            )}
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="btn"
            >
              {isEditing ? 'View' : 'Edit'}
            </button>
          </div>
        </div>
        
        {/* Person Details */}
        <div className="person-detail">
          <div className="person-detail__header">
            <h1 className="person-detail__title">
              {person.name}
              {hasLocalEdits && (
                <span className="person-detail__edited-badge">
                  Edited
                </span>
              )}
            </h1>
          </div>
          
          <div className="person-detail__content">
            {/* Basic Info */}
            <div className="person-detail__section">
              <h2 className="person-detail__section-title">Basic Information</h2>
              
              <div className="person-detail__grid">
                <PersonField
                  label="Name"
                  value={person.name}
                  field="name"
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                />
                
                <PersonField
                  label="Height"
                  value={person.height}
                  field="height"
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  suffix="cm"
                />
                
                <PersonField
                  label="Mass"
                  value={person.mass}
                  field="mass"
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  suffix="kg"
                />
                
                <PersonField
                  label="Birth Year"
                  value={person.birth_year}
                  field="birth_year"
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                />
                
                <PersonField
                  label="Gender"
                  value={person.gender}
                  field="gender"
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            
            {/* Appearance */}
            <div className="person-detail__section">
              <h2 className="person-detail__section-title">Appearance</h2>
              
              <div className="person-detail__grid">
                <PersonField
                  label="Hair Color"
                  value={person.hair_color}
                  field="hair_color"
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                />
                
                <PersonField
                  label="Skin Color"
                  value={person.skin_color}
                  field="skin_color"
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                />
                
                <PersonField
                  label="Eye Color"
                  value={person.eye_color}
                  field="eye_color"
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            
            {/* Films */}
            {person.films.length > 0 && (
              <div className="person-detail__section">
                <h2 className="person-detail__section-title">
                  Films ({person.films.length})
                </h2>
                
                {filmsLoading ? (
                  <div className="text-sm opacity-75">Loading films...</div>
                ) : (
                  <div className="person-detail__items">
                    {films?.map((film) => (
                      <div key={film.id} className="person-detail__item">
                        <div className="person-detail__item-title">
                          Episode {film.episode_id}: {film.title}
                        </div>
                        <div className="person-detail__item-meta">
                          {film.release_date} • {film.director}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Vehicles */}
            {person.vehicles.length > 0 && (
              <div className="person-detail__section">
                <h2 className="person-detail__section-title">
                  Vehicles ({person.vehicles.length})
                </h2>
                
                {vehiclesLoading ? (
                  <div className="text-sm opacity-75">Loading vehicles...</div>
                ) : (
                  <div className="person-detail__items">
                    {vehicles?.map((vehicle) => (
                      <div key={vehicle.id} className="person-detail__item">
                        <div className="person-detail__item-title">
                          {vehicle.name}
                        </div>
                        <div className="person-detail__item-meta">
                          {vehicle.model} • {vehicle.manufacturer}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Starships */}
            {person.starships.length > 0 && (
              <div className="person-detail__section">
                <h2 className="person-detail__section-title">
                  Starships ({person.starships.length})
                </h2>
                
                {starshipsLoading ? (
                  <div className="text-sm opacity-75">Loading starships...</div>
                ) : (
                  <div className="person-detail__items">
                    {starships?.map((starship) => (
                      <div key={starship.id} className="person-detail__item">
                        <div className="person-detail__item-title">
                          {starship.name}
                        </div>
                        <div className="person-detail__item-meta">
                          {starship.model} • {starship.manufacturer}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Species Section */}
            {person.species.length > 0 && (
              <div className="person-detail__section">
                <h2 className="person-detail__section-title">Species ({person.species.length})</h2>
                {speciesLoading ? (
                  <div className="text-sm opacity-75">Loading species...</div>
                ) : (
                  <div className="person-detail__items">
                    {species?.map((spec) => (
                      <div key={spec.id} className="person-detail__item">
                        <div className="person-detail__item-title">{spec.name}</div>
                        <div className="person-detail__item-meta">
                          {spec.classification} • {spec.designation}
                          {spec.average_height !== 'n/a' && ` • ${spec.average_height} avg height`}
                          {spec.average_lifespan !== 'indefinite' && spec.average_lifespan !== 'unknown' && ` • ${spec.average_lifespan} lifespan`}
                        </div>
                        {spec.language && spec.language !== 'n/a' && (
                          <div className="person-detail__item-meta">Language: {spec.language}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Edit Actions */}
          {isEditing && (
            <div className="person-detail__actions">
              <button 
                onClick={handleCancel}
                className="btn"
              >
                Cancel
              </button>
              
              <button 
                onClick={() => setIsEditing(false)}
                className="btn"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Reusable field component
interface PersonFieldProps {
  label: string
  value: string
  field: string
  isEditing: boolean
  onChange: (field: string, value: string) => void
  suffix?: string
}

function PersonField({ 
  label, 
  value, 
  field, 
  isEditing, 
  onChange, 
  suffix 
}: PersonFieldProps) {
  if (isEditing) {
    return (
      <div className="person-field">
        <label className="person-field__label" htmlFor={field}>
          {label}:
        </label>
        <div className="person-field__input-wrapper">
          <input
            id={field}
            type="text"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className="person-field__input"
          />
          {suffix && (
            <span className="person-field__suffix">{suffix}</span>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div className="person-field">
      <span className="person-field__label">{label}:</span>
      <span className="person-field__value">
        {value} {suffix}
      </span>
    </div>
  )
}
