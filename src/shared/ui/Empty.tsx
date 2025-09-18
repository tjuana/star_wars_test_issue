interface EmptyProps {
  message: string
}

export function Empty({ message }: EmptyProps) {
  return (
    <div className='text-center p-8'>
      <p className='text-lg text-gray-400'>{message}</p>
    </div>
  )
}
