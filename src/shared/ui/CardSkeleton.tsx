import { Skeleton } from './Skeleton'

export function CardSkeleton() {
  return (
    <div
      className='card card-hover p-4 block transition-all duration-300 ease-out'
      style={{ minHeight: '219px' }}
    >
      {/* Name placeholder - точно как h3 с text-xl */}
      <h3 className='text-xl font-semibold mb-3 text-yellow-400 transition-colors duration-300 ease-out'>
        <Skeleton height={28} width='75%' />
      </h3>

      <div className='space-y-2 text-sm'>
        {/* Height placeholder - точно как в PersonCard */}
        <div className='flex justify-between transition-all duration-300 ease-out hover:bg-gray-700/30 px-2 py-1 rounded'>
          <Skeleton height={16} width={64} />
          <Skeleton height={16} width={48} />
        </div>

        {/* Gender placeholder - точно как в PersonCard */}
        <div className='flex justify-between transition-all duration-300 ease-out hover:bg-gray-700/30 px-2 py-1 rounded'>
          <Skeleton height={16} width={64} />
          <Skeleton height={16} width={48} />
        </div>

        {/* Birth Year placeholder - точно как в PersonCard */}
        <div className='flex justify-between transition-all duration-300 ease-out hover:bg-gray-700/30 px-2 py-1 rounded'>
          <Skeleton height={16} width={80} />
          <Skeleton height={16} width={64} />
        </div>

        {/* Films count placeholder - точно как в PersonCard */}
        <div className='mt-3 pt-3 border-t border-cyan-400 transition-all duration-300 ease-out'>
          <span className='text-xs text-gray-400'>
            <Skeleton height={12} width={64} className='inline-block' />
          </span>
        </div>
      </div>
    </div>
  )
}
