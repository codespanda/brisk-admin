"use client"

import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/tables/data-table'
import { inventoryColumns } from '@/features/inventory/components/inventory-columns'
import { FilterSelect } from '@/components/shared/filter-select'
import { Package, AlertTriangle, XCircle, DollarSign } from 'lucide-react'
import type { InventoryItem } from '@/types'

const categoryOptions = [
  { label: 'All', value: 'all' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Home & Kitchen', value: 'Home & Kitchen' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Footwear', value: 'Footwear' },
  { label: 'Accessories', value: 'Accessories' },
]

const stockStatusOptions = [
  { label: 'All', value: 'all' },
  { label: 'In Stock', value: 'in-stock' },
  { label: 'Low Stock', value: 'low-stock' },
  { label: 'Out of Stock', value: 'out-of-stock' },
]

interface InventoryPageClientProps {
  inventory: InventoryItem[]
  totalProducts: number
  lowStock: number
  outOfStock: number
}

export function InventoryPageClient({ inventory, totalProducts, lowStock, outOfStock }: InventoryPageClientProps) {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [stockStatusFilter, setStockStatusFilter] = useState('all')

  const filteredInventory = inventory.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false
    if (stockStatusFilter !== 'all') {
      const isOutOfStock = item.inStock === 0
      const isLowStock = item.inStock <= item.threshold && item.inStock > 0
      const isInStock = item.inStock > item.threshold
      if (stockStatusFilter === 'out-of-stock' && !isOutOfStock) return false
      if (stockStatusFilter === 'low-stock' && !isLowStock) return false
      if (stockStatusFilter === 'in-stock' && !isInStock) return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory" />

      {/* KPI Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">{totalProducts}</p>
              <p className="text-xs text-muted-foreground">Total Products</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">{lowStock}</p>
              <p className="text-xs text-muted-foreground">Low Stock</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
              <XCircle className="h-5 w-5 text-danger" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">{outOfStock}</p>
              <p className="text-xs text-muted-foreground">Out of Stock</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">$145,230</p>
              <p className="text-xs text-muted-foreground">Inventory Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4">
            <DataTable
              columns={inventoryColumns}
              data={filteredInventory}
              searchKey="productName"
              searchPlaceholder="Search inventory..."
              enablePagination
              filterContent={
                <div className="flex items-center gap-2">
                  <FilterSelect
                    label="All Categories"
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                    options={categoryOptions}
                  />
                  <FilterSelect
                    label="All Stock Status"
                    value={stockStatusFilter}
                    onValueChange={setStockStatusFilter}
                    options={stockStatusOptions}
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
