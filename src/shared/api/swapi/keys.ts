export const peopleKeys = {
  all: ['people'] as const,
  list: (page: number, search: string) => [...peopleKeys.all, 'list', { page, search }] as const,
  detail: (id: string) => [...peopleKeys.all, 'detail', { id }] as const,
}
