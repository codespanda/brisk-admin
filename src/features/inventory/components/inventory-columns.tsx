
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { formatRelativeDate } from '@/lib/utils'
import type { InventoryItem } from '@/types'
import { ArrowUpDown } from 'lucide-react'

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
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
    accessorKey: 'category',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Category
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.original.category}</span>
    ),
  },
  {
    accessorKey: 'inStock',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        In Stock
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const { inStock, threshold } = row.original
      const colorClass =
        inStock === 0
          ? 'text-danger font-medium'
          : inStock <= threshold
            ? 'text-warning-foreground font-medium'
            : 'text-success font-medium'
      return <span className={colorClass}>{inStock}</span>
    },
  },
  {
    accessorKey: 'reserved',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Reserved
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.original.reserved}</span>
    ),
  },
  {
    accessorKey: 'available',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Available
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.original.available}</span>
    ),
  },
  {
    accessorKey: 'threshold',
    header: 'Threshold',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.threshold}</span>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Updated
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatRelativeDate(row.original.updatedAt)}
      </span>
    ),
  },
]
