import { swapi, ApiError } from './client'
import { extractIdFromUrl } from '@shared/lib/id'
import type { SwapiList, Person, ListPeopleParams } from './types'

export async function listPeople({
  page = 1,
  search = '',
}: ListPeopleParams = {}): Promise<SwapiList<Person>> {
  try {
    const { data } = await swapi.get<SwapiList<Omit<Person, 'id'>>>(
      '/people/',
      {
        params: { page, ...(search && { search }) },
      }
    )
    return {
      ...data,
      results: data.results.map(p => ({
        ...p,
        id: extractIdFromUrl(p.url, 'people'),
      })),
    }
  } catch (e: unknown) {
    const status =
      (e as { response?: { status?: number } })?.response?.status ?? 500
    throw new ApiError(`SWAPI /people failed (${status})`, status)
  }
}

export async function getPersonById(id: string): Promise<Person> {
  try {
    const { data } = await swapi.get<Omit<Person, 'id'>>(`/people/${id}/`)
    return { ...data, id: extractIdFromUrl(data.url, 'people') }
  } catch (e: unknown) {
    const status =
      (e as { response?: { status?: number } })?.response?.status ?? 500
    throw new ApiError(`SWAPI /people/${id} failed (${status})`, status)
  }
}
