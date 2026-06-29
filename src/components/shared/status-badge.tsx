import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { StatusVariant } from '@/constants/status-maps'

interface StatusBadgeProps {
  label: string
  variant: StatusVariant
}

const variantClasses: Record<StatusVariant, string> = {
  success: 'bg-success/10 text-success hover:bg-success/20 border-success/20',
  danger: 'bg-danger/10 text-danger hover:bg-danger/20 border-danger/20',
  warning: 'bg-warning/10 text-warning-foreground hover:bg-warning/20 border-warning/20',
  info: 'bg-info/10 text-info-foreground hover:bg-info/20 border-info/20',
  secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20',
  muted: 'bg-muted text-muted-foreground hover:bg-muted/80 border-muted',
}

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn('font-medium', variantClasses[variant])}>
      {label}
    </Badge>
  )
}
