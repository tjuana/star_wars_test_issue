interface EmptyProps {
  message: string
}

export function Empty({ message }: EmptyProps) {
  return (
    <div className="text-center p-8">
      <p className="text-lg opacity-75">{message}</p>
    </div>
  )
}