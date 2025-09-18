import { usePeopleQuery, usePersonQuery } from '@entities/person/api/hooks'

function Block({ title, ok, error }: { title: string; ok?: boolean; error?: string }) {
  return (
    <div className="card p-3">
      <strong>{title}</strong>
      <div className="mt-1">
        {ok ? '✅ OK' : error ? `❌ ${error}` : '…'}
      </div>
    </div>
  )
}

export function DevApiStatus() {
  const list = usePeopleQuery(1, '')
  const search = usePeopleQuery(1, 'luke')
  const detail = usePersonQuery('1')
  
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'Unknown'

  return (
    <section aria-label="API status" className="grid gap-2 mt-4">
      <div className="text-xs text-white/50 mb-2">
        API: {apiUrl}
      </div>
      <Block
        title="GET /people?page=1"
        ok={!!list.data}
        error={list.error ? (list.error as Error).message : undefined}
      />
      <Block
        title='GET /people?page=1&search="luke"'
        ok={!!search.data}
        error={search.error ? (search.error as Error).message : undefined}
      />
      <Block
        title="GET /people/1"
        ok={!!detail.data}
        error={detail.error ? (detail.error as Error).message : undefined}
      />
    </section>
  )
}
