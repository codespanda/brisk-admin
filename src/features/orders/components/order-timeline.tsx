import { formatDateTime } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { TimelineEvent } from '@/types'

interface OrderTimelineProps {
  timeline: TimelineEvent[]
}

function getDotClass(status: string): string {
  const lower = status.toLowerCase()
  if (lower.includes('delivered')) return 'bg-success'
  if (lower.includes('shipped') || lower.includes('paid')) return 'bg-info'
  if (lower.includes('processing')) return 'bg-secondary'
  if (lower.includes('cancelled')) return 'bg-danger'
  return 'bg-muted-foreground'
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
  return (
    <div className="space-y-0">
      {timeline.map((event, index) => (
        <div key={event.id} className="flex gap-3">
          {/* Dot and line */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'h-3 w-3 rounded-full mt-1 shrink-0',
                getDotClass(event.status)
              )}
            />
            {index < timeline.length - 1 && (
              <div className="w-px flex-1 bg-border mt-1 mb-0 min-h-[1.5rem]" />
            )}
          </div>
          {/* Content */}
          <div className={cn('pb-4', index === timeline.length - 1 && 'pb-0')}>
            <p className="text-sm font-semibold leading-tight">{event.status}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{event.description}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{formatDateTime(event.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
