import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Person } from '@shared/api/swapi/types'

// Local edits for person fields
export interface PersonEdit {
  id: string
  name?: string
  height?: string
  mass?: string
  hair_color?: string
  skin_color?: string
  eye_color?: string
  birth_year?: string
  gender?: string
  homeworld?: string
  // Note: films, species, vehicles, starships are read-only (complex relations)
}

interface PersonEditStore {
  // State
  edits: Record<string, PersonEdit>

  // Actions
  updatePerson: (id: string, updates: Partial<PersonEdit>) => void
  resetPerson: (id: string) => void
  clearAllEdits: () => void

  // Getters
  getEditedPerson: (id: string, originalPerson: Person) => Person
  hasEdits: (id: string) => boolean
}

export const usePersonEditStore = create<PersonEditStore>()(
  persist(
    (set, get) => ({
      // Initial state
      edits: {},

      // Update person fields
      updatePerson: (id, updates) => {
        set(state => ({
          edits: {
            ...state.edits,
            [id]: {
              ...state.edits[id],
              id,
              ...updates,
            },
          },
        }))
      },

      // Reset person to original state
      resetPerson: id => {
        set(state => {
          const { [id]: _removed, ...remainingEdits } = state.edits
          void _removed // Mark as intentionally unused
          return { edits: remainingEdits }
        })
      },

      // Clear all local edits
      clearAllEdits: () => {
        set({ edits: {} })
      },

      // Get person with local edits applied
      getEditedPerson: (id, originalPerson) => {
        const edits = get().edits[id]
        if (!edits) return originalPerson

        return {
          ...originalPerson,
          ...edits,
        }
      },

      // Check if person has local edits
      hasEdits: id => {
        return !!get().edits[id]
      },
    }),
    {
      name: 'person-edits-storage',
      version: 1,
    }
  )
)
