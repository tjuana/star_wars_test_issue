import { useParams } from 'react-router-dom'

export function PersonPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Person #{id}
        </h1>
        <p className="text-lg">
          Person detail page coming soon...
        </p>
      </div>
    </div>
  )
}
