'use client'

const baseClasses = 'animate-pulse rounded bg-gray-200 dark:bg-gray-700'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`${baseClasses} ${className}`} aria-hidden />
}

export function SkeletonLine({ className = '' }: SkeletonProps) {
  return <div className={`${baseClasses} h-4 ${className}`} aria-hidden />
}

export function SkeletonImage({ className = '', aspectRatio = 'aspect-[16/10]' }: SkeletonProps & { aspectRatio?: string }) {
  return <div className={`${baseClasses} w-full ${aspectRatio} ${className}`} aria-hidden />
}

export function SkeletonAvatar({ className = '', size = 'w-10 h-10' }: SkeletonProps & { size?: string }) {
  return <div className={`${baseClasses} rounded-full ${size} ${className}`} aria-hidden />
}
