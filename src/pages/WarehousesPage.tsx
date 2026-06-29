import { useEffect, useState } from 'react'
import { getWarehouses } from '@/services/inventory.service'
import { PageHeader } from '@/components/shared/page-header'
import { WarehouseCard } from '@/features/inventory/components/warehouse-card'
import type { Warehouse } from '@/types'

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])

  useEffect(() => {
    getWarehouses().then(setWarehouses)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader title="Warehouses" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {warehouses.map((warehouse) => (
          <WarehouseCard key={warehouse.id} warehouse={warehouse} />
        ))}
      </div>
    </div>
  )
}
