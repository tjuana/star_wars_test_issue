export function CardSkeleton() {
  return (
    <div className='card-padded animate-pulse'>
      {/* Name placeholder */}
      <div className='h-6 bg-gray-700 rounded mb-3 w-3/4'></div>

      <div className='space-y-2 text-sm'>
        {/* Height placeholder */}
        <div className='flex justify-between'>
          <div className='h-4 bg-gray-700 rounded w-16'></div>
          <div className='h-4 bg-gray-700 rounded w-12'></div>
        </div>

        {/* Gender placeholder */}
        <div className='flex justify-between'>
          <div className='h-4 bg-gray-700 rounded w-16'></div>
          <div className='h-4 bg-gray-700 rounded w-12'></div>
        </div>

        {/* Birth Year placeholder */}
        <div className='flex justify-between'>
          <div className='h-4 bg-gray-700 rounded w-20'></div>
          <div className='h-4 bg-gray-700 rounded w-16'></div>
        </div>

        {/* Films count placeholder */}
        <div className='mt-3 pt-3 border-t border-gray-600'>
          <div className='h-3 bg-gray-700 rounded w-16'></div>
        </div>
      </div>
    </div>
  )
}
