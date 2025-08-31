import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { peopleKeys } from '@shared/api/swapi/keys'
import { listPeople, getPersonById } from '@shared/api/swapi/people'
import type { SwapiList, Person } from '@shared/api/swapi/types'

export function usePeopleQuery(page = 1, search = '') {
  return useQuery<SwapiList<Person>>({
    queryKey: peopleKeys.list(page, search),
    queryFn: () => listPeople({ page, search }),
    placeholderData: keepPreviousData,
  })
}

export function usePersonQuery(id: string) {
  return useQuery<Person>({
    queryKey: peopleKeys.detail(id),
    queryFn: () => getPersonById(id),
    enabled: !!id,
  })
}
