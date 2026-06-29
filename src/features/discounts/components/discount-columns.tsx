"use client"

import { createContext, useContext, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StatusBadge } from '@/components/shared/status-badge'
import { discountTypeMap } from '@/constants/status-maps'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Discount } from '@/types'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

function getDiscountStatus(discount: Discount): { label: string; variant: 'success' | 'danger' | 'warning' | 'muted' } {
  if (!discount.isActive) return { label: 'Disabled', variant: 'muted' }
  const now = new Date()
  const endDate = new Date(discount.endDate)
  const startDate = new Date(discount.startDate)
  if (endDate < now) return { label: 'Expired', variant: 'danger' }
  if (startDate > now) return { label: 'Scheduled', variant: 'warning' }
  return { label: 'Active', variant: 'success' }
}

function formatDiscountValue(discount: Discount): string {
  if (discount.type === 'free_shipping') return 'Free'
  if (discount.type === 'percentage') return `${discount.value}%`
  return formatCurrency(discount.value)
}

interface DiscountColumnCallbacks {
  onEdit?: (discount: Discount) => void
  onDelete?: (discount: Discount) => void
}

export const DiscountActionsContext = createContext<DiscountColumnCallbacks>({})

function DiscountActions({ discount }: { discount: Discount }) {
  const { onEdit, onDelete } = useContext(DiscountActionsContext)
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none">
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onEdit?.(discount), 0) }}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onDelete?.(discount), 0) }}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const discountColumns: ColumnDef<Discount>[] = [
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
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => (
      <span className="font-mono font-medium text-sm">{row.original.code}</span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = discountTypeMap[row.original.type]
      return <StatusBadge label={type.label} variant={type.variant} />
    },
  },
  {
    id: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <span className="text-sm font-medium">{formatDiscountValue(row.original)}</span>
    ),
  },
  {
    id: 'usage',
    header: 'Usage',
    cell: ({ row }) => {
      const { usedCount, usageLimit } = row.original
      return (
        <span className="text-sm text-muted-foreground">
          {usedCount} / {usageLimit !== null ? usageLimit : 'Unlimited'}
        </span>
      )
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{formatDate(row.original.startDate)}</span>
    ),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{formatDate(row.original.endDate)}</span>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = getDiscountStatus(row.original)
      return <StatusBadge label={status.label} variant={status.variant} />
    },
  },
  {
    id: 'actions',
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => <DiscountActions discount={row.original} />,
  },
]
