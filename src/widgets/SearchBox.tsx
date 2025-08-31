export function SearchBox() {
  return (
    <div className="max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Search characters..."
        className="input"
        aria-label="Search Star Wars characters"
      />
    </div>
  )
}
