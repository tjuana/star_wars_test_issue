export function CardSkeleton() {
  return (
    <div
      className='card card-hover p-4 block transition-all duration-300 ease-out animate-pulse'
      style={{ minHeight: '219px' }}
    >
      {/* Name placeholder - точно как h3 с text-xl */}
      <h3 className='text-xl font-semibold mb-3 text-yellow-400 transition-colors duration-300 ease-out'>
        <div className='h-7 bg-gray-700 rounded w-3/4'></div>
      </h3>

      <div className='space-y-2 text-sm'>
        {/* Height placeholder - точно как в PersonCard */}
        <div className='flex justify-between transition-all duration-300 ease-out hover:bg-gray-700/30 px-2 py-1 rounded'>
          <div className='h-4 bg-gray-700 rounded w-16'></div>
          <div className='h-4 bg-gray-700 rounded w-12'></div>
        </div>

        {/* Gender placeholder - точно как в PersonCard */}
        <div className='flex justify-between transition-all duration-300 ease-out hover:bg-gray-700/30 px-2 py-1 rounded'>
          <div className='h-4 bg-gray-700 rounded w-16'></div>
          <div className='h-4 bg-gray-700 rounded w-12'></div>
        </div>

        {/* Birth Year placeholder - точно как в PersonCard */}
        <div className='flex justify-between transition-all duration-300 ease-out hover:bg-gray-700/30 px-2 py-1 rounded'>
          <div className='h-4 bg-gray-700 rounded w-20'></div>
          <div className='h-4 bg-gray-700 rounded w-16'></div>
        </div>

        {/* Films count placeholder - точно как в PersonCard */}
        <div className='mt-3 pt-3 border-t border-cyan-400 transition-all duration-300 ease-out'>
          <span className='text-xs text-gray-400'>
            <div className='h-3 bg-gray-700 rounded w-16 inline-block'></div>
          </span>
        </div>
      </div>
    </div>
  )
}
