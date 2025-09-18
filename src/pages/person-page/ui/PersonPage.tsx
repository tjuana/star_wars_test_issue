import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePersonQuery } from '@entities/person/api/hooks'
import { usePersonFilms, usePersonVehicles, usePersonStarships, usePersonSpecies } from '@entities/person/api/relations-hooks'
import { usePersonEditStore } from '@features/person-edit/model/store'
import { mergePersonWithEdits } from '@features/person-edit/lib/merge'
import { Spinner } from '@shared/ui/Spinner'
import { PersonField } from '@shared/ui/field'
import { Accordion } from '@shared/ui/accordion'

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
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Character Not Found
            </h1>
            <p className="mb-4 text-gray-300">
              {error?.message || 'The character you are looking for does not exist.'}
            </p>
            <Link to="/" className="btn btn-primary">
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
          <Link to="/" className="btn btn-outline">
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
              className="btn btn-primary"
            >
              {isEditing ? 'View' : 'Edit'}
            </button>
          </div>
        </div>
        
        {/* Person Details */}
        <div className="section">
          <div className="mb-6 pb-4 border-b border-cyan-400">
            <h1 className="text-3xl font-bold flex items-center gap-3 text-yellow-400">
              {person.name}
              {hasLocalEdits && (
                <span className="badge">
                  Edited
                </span>
              )}
            </h1>
          </div>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="section-title">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="space-y-4">
              <h2 className="section-title">Appearance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="accordion">
                <Accordion
                  title={`Films (${person.films.length})`}
                  isLoading={filmsLoading}
                >
                  {films?.map((film) => (
                    <div key={film.id} className="card p-3">
                      <div className="font-medium mb-1 text-white">
                        Episode {film.episode_id}: {film.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        {film.release_date} • {film.director}
                      </div>
                    </div>
                  ))}
                </Accordion>
              </div>
            )}
            
            {/* Vehicles */}
            {person.vehicles.length > 0 && (
              <div className="accordion">
                <Accordion
                  title={`Vehicles (${person.vehicles.length})`}
                  isLoading={vehiclesLoading}
                >
                  {vehicles?.map((vehicle) => (
                    <div key={vehicle.id} className="card p-3">
                      <div className="font-medium mb-1 text-white">
                        {vehicle.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {vehicle.model} • {vehicle.manufacturer}
                      </div>
                    </div>
                  ))}
                </Accordion>
              </div>
            )}
            
            {/* Starships */}
            {person.starships.length > 0 && (
              <div className="accordion">
                <Accordion
                  title={`Starships (${person.starships.length})`}
                  isLoading={starshipsLoading}
                >
                  {starships?.map((starship) => (
                    <div key={starship.id} className="card p-3">
                      <div className="font-medium mb-1 text-white">
                        {starship.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {starship.model} • {starship.manufacturer}
                      </div>
                    </div>
                  ))}
                </Accordion>
              </div>
            )}
            
            {/* Species Section */}
            {person.species.length > 0 && (
              <div className="accordion">
                <Accordion
                  title={`Species (${person.species.length})`}
                  isLoading={speciesLoading}
                >
                  {species?.map((spec) => (
                    <div key={spec.id} className="card p-3 space-y-2">
                      <div className="font-medium mb-1 text-white">{spec.name}</div>
                      
                      {/* Species Description */}
                      <div className="text-sm text-gray-300 leading-relaxed">
                        A {spec.designation} {spec.classification} species
                        {spec.average_height !== 'n/a' && ` with an average height of ${spec.average_height}cm`}
                        {spec.average_lifespan !== 'indefinite' && spec.average_lifespan !== 'unknown' && ` and lifespan of ${spec.average_lifespan} years`}.
                        {spec.language && spec.language !== 'n/a' && ` They primarily speak ${spec.language}.`}
                      </div>
                      
                      {/* Physical Characteristics */}
                      <div className="text-xs text-gray-400">
                        <strong>Physical traits:</strong> {spec.skin_colors} skin, {spec.hair_colors} hair, {spec.eye_colors} eyes
                      </div>
                    </div>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
          
          {/* Edit Actions */}
          {isEditing && (
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-cyan-400">
              <button 
                onClick={handleCancel}
                className="btn btn-outline"
              >
                Cancel
              </button>
              
              <button 
                onClick={() => setIsEditing(false)}
                className="btn btn-primary"
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

