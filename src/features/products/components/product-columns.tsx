"use client"

import { createContext, useContext, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Product } from '@/types'
import { ArrowUpDown, MoreVertical, Pencil, Trash2, Package } from 'lucide-react'

interface ProductColumnCallbacks {
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
}

export const ProductActionsContext = createContext<ProductColumnCallbacks>({})

function ProductActions({ product }: { product: Product }) {
  const { onEdit, onDelete } = useContext(ProductActionsContext)
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none">
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onEdit?.(product), 0) }}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onDelete?.(product), 0) }}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const productColumns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Product List',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
          <Package className="h-5 w-5 text-muted-foreground/60" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.category}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'sku',
    header: 'ID Number',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground font-mono">{row.original.sku}</span>
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
        Last Uploaded
        <ArrowUpDown className="ml-1.5 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{formatDate(row.original.updatedAt)}</span>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'In Stocks',
    cell: ({ row }) => {
      const stock = row.original.stock
      const max = 500
      const pct = Math.min((stock / max) * 100, 100)
      return (
        <div className="flex items-center gap-2.5 min-w-[120px]">
          <Progress value={pct} className="h-1.5 flex-1" />
          <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
            {stock}/{max}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'tags',
    header: 'Variation',
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">
        {String(row.original.tags.length).padStart(3, '0')}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Switch
        checked={row.original.status === 'active'}
        aria-label="Toggle status"
      />
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Price
        <ArrowUpDown className="ml-1.5 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium">{formatCurrency(row.original.price)}</span>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => <ProductActions product={row.original} />,
  },
]
