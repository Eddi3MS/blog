import { cn } from '@/lib/utils'

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-2xl px-6 lg:max-w-5xl', className)}>
      {children}
    </div>
  )
}
