"use client"

import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/tables/data-table'
import { adjustmentColumns } from '@/features/inventory/components/adjustment-columns'
import { FilterSelect } from '@/components/shared/filter-select'
import type { StockAdjustment } from '@/types'

const typeOptions = [
  { label: 'All', value: 'all' },
  { label: 'Received', value: 'received' },
  { label: 'Sold', value: 'sold' },
  { label: 'Returned', value: 'returned' },
  { label: 'Adjusted', value: 'adjusted' },
]

interface AdjustmentsPageClientProps {
  adjustments: StockAdjustment[]
}

export function AdjustmentsPageClient({ adjustments }: AdjustmentsPageClientProps) {
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredAdjustments = adjustments.filter((a) => {
    if (typeFilter !== 'all' && a.type !== typeFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Stock Adjustments" />

      <Card>
        <CardContent className="p-0">
          <div className="p-4">
            <DataTable
              columns={adjustmentColumns}
              data={filteredAdjustments}
              searchKey="productName"
              searchPlaceholder="Search adjustments..."
              enablePagination
              filterContent={
                <div className="flex items-center gap-2">
                  <FilterSelect
                    label="All Types"
                    value={typeFilter}
                    onValueChange={setTypeFilter}
                    options={typeOptions}
                  />
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
