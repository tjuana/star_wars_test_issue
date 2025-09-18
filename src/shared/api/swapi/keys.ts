export const peopleKeys = {
  all: ['people'] as const,
  list: (page: number, search: string) =>
    [...peopleKeys.all, 'list', { page, search }] as const,
  detail: (id: string) => [...peopleKeys.all, 'detail', { id }] as const,
}

export const relationKeys = {
  films: (ids: string[]) => ['films', ids] as const,
  vehicles: (ids: string[]) => ['vehicles', ids] as const,
  starships: (ids: string[]) => ['starships', ids] as const,
  species: (ids: string[]) => ['species', ids] as const,
}
