'use client';

interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  circle?: boolean;
}

export default function LoadingSkeleton({
  width = '100%',
  height = 200,
  className = '',
  count = 1,
  circle = false,
}: LoadingSkeletonProps) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const skeletons = [...Array(count)].map((_, i) => (
    <div
      key={i}
      style={style}
      className={`
        ${circle ? 'rounded-full' : 'rounded-lg'}
        bg-gradient-to-r from-gray-200 to-gray-100
        dark:from-gray-700 dark:to-gray-600
        animate-pulse
        ${className}
      `}
    />
  ));

  return count === 1 ? skeletons[0] : <div className="space-y-4">{skeletons}</div>;
}
