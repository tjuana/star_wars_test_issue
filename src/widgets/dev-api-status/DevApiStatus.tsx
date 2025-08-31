import { usePeopleQuery, usePersonQuery } from '@entities/person/api/hooks'

function Block({ title, ok, error }: { title: string; ok?: boolean; error?: string }) {
  return (
    <div className="p-2 border border-white/20 rounded-8">
      <strong>{title}</strong>
      <div style={{ marginTop: 4 }}>
        {ok ? '✅ OK' : error ? `❌ ${error}` : '…'}
      </div>
    </div>
  )
}

export function DevApiStatus() {
  const list = usePeopleQuery(1, '')
  const search = usePeopleQuery(1, 'luke')
  const detail = usePersonQuery('1')

  return (
    <section aria-label="API status" className="grid gap-2 mt-4">
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
