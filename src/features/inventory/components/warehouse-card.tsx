import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { StatusBadge } from '@/components/shared/status-badge'
import type { Warehouse } from '@/types'
import { MapPin } from 'lucide-react'

interface WarehouseCardProps {
  warehouse: Warehouse
}

export function WarehouseCard({ warehouse }: WarehouseCardProps) {
  const statusVariant = warehouse.status === 'active' ? 'success' : 'muted'

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-bold">{warehouse.name}</CardTitle>
          <StatusBadge
            label={warehouse.status === 'active' ? 'Active' : 'Inactive'}
            variant={statusVariant}
          />
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{warehouse.location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Products</span>
          <span className="font-medium">{warehouse.productCount.toLocaleString()}</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Utilization</span>
            <span className="font-medium">{warehouse.utilization}%</span>
          </div>
          <Progress value={warehouse.utilization} />
        </div>
      </CardContent>
    </Card>
  )
}
