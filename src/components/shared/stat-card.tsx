
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  DollarSign, ShoppingCart, Users, TrendingUp, TrendingDown,
  Receipt, Package, AlertTriangle, XCircle, Megaphone, Eye, Mail, MousePointer,
  type LucideIcon,
} from 'lucide-react'
import type { KpiData } from '@/types'

const iconMap: Record<string, LucideIcon> = {
  DollarSign, ShoppingCart, Users, TrendingUp, Receipt, Package, AlertTriangle, XCircle,
  Megaphone, Eye, Mail, MousePointer,
}

interface StatCardProps {
  data: KpiData
}

export function StatCard({ data }: StatCardProps) {
  const Icon = iconMap[data.icon] ?? Package
  const isPositive = data.trend === 'up'

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            isPositive ? 'text-success' : 'text-danger'
          )}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {data.change > 0 ? '+' : ''}{data.change}%
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">{data.value}</p>
          <p className="text-muted-foreground text-sm mt-1">{data.label}</p>
        </div>
        <p className="text-muted-foreground text-xs mt-2">{data.changeLabel}</p>
      </CardContent>
    </Card>
  )
}
