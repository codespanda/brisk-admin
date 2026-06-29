"use client"

import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/status-badge'
import { adjustmentTypeMap } from '@/constants/status-maps'
import { formatDateTime } from '@/lib/utils'
import type { StockAdjustment } from '@/types'
import { ArrowUpDown } from 'lucide-react'

export const adjustmentColumns: ColumnDef<StockAdjustment>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDateTime(row.original.createdAt)}
      </span>
    ),
  },
  {
    accessorKey: 'productName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Product
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.productName}</p>
        <p className="text-xs text-muted-foreground mt-0.5">SKU: {row.original.sku}</p>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const typeInfo = adjustmentTypeMap[row.original.type]
      return <StatusBadge label={typeInfo.label} variant={typeInfo.variant} />
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Quantity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const qty = row.original.quantity
      const isPositive = qty > 0
      return (
        <span className={isPositive ? 'text-success font-medium' : 'text-danger font-medium'}>
          {isPositive ? `+${qty}` : `${qty}`}
        </span>
      )
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.reason}</span>
    ),
  },
  {
    accessorKey: 'adjustedBy',
    header: 'Adjusted By',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.adjustedBy}</span>
    ),
  },
]
