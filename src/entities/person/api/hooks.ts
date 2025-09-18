import { useQuery } from '@tanstack/react-query'
import { peopleKeys } from '@shared/api/swapi/keys'
import { listPeople, getPersonById } from '@shared/api/swapi/people'
import { QUERY_CONFIG } from '@app/providers/queryClient'
import type { SwapiList, Person } from '@shared/api/swapi/types'

export function usePeopleQuery(page = 1, search = '') {
  return useQuery<SwapiList<Person>>({
    queryKey: peopleKeys.list(page, search),
    queryFn: () => listPeople({ page, search }),
    staleTime: QUERY_CONFIG.STALE_TIME.PEOPLE,
    // Keep previous data to prevent flashing
    placeholderData: previousData => previousData,
  })
}

export function usePersonQuery(id: string) {
  return useQuery<Person>({
    queryKey: peopleKeys.detail(id),
    queryFn: () => getPersonById(id),
    enabled: !!id,
  })
}
