interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: boolean
}

export function Skeleton({
  className = '',
  width,
  height,
  rounded = true,
}: SkeletonProps) {
  const style: React.CSSProperties = {}

  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`bg-gray-700 animate-pulse ${rounded ? 'rounded' : ''} ${className}`}
      style={style}
    />
  )
}
