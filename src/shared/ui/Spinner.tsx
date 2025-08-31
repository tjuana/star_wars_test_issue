export function Spinner() {
  return (
    <div className="flex justify-center items-center p-8" role="status" aria-label="Loading">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
    </div>
  )
}