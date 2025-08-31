export function Pagination() {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button className="btn" disabled>
        Previous
      </button>
      <span className="text-sm">Page 1 of ?</span>
      <button className="btn" disabled>
        Next
      </button>
    </div>
  )
}
