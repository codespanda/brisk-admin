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
import { orderStatusMap, paymentStatusMap } from '@/constants/status-maps'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Order } from '@/types'
import { MoreVertical, Pencil, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface OrderColumnCallbacks {
  onEdit?: (order: Order) => void
  onDelete?: (order: Order) => void
}

export const OrderActionsContext = createContext<OrderColumnCallbacks>({})

function OrderActions({ order }: { order: Order }) {
  const { onEdit, onDelete } = useContext(OrderActionsContext)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none">
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => router.push(`/orders/${order.id}`), 0) }}
        >
          <Eye className="h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onEdit?.(order), 0) }}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onDelete?.(order), 0) }}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const orderColumns: ColumnDef<Order>[] = [
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
    accessorKey: 'orderNumber',
    header: 'Order #',
    cell: ({ row }) => (
      <Link
        href={`/orders/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.orderNumber}
      </Link>
    ),
  },
  {
    id: 'customer',
    header: 'Customer',
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.customer.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{row.original.customer.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    id: 'items',
    header: 'Items',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.items.length} items</span>
    ),
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => (
      <span className="text-sm font-medium">{formatCurrency(row.original.total)}</span>
    ),
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => {
      const payment = paymentStatusMap[row.original.paymentStatus]
      return <StatusBadge label={payment.label} variant={payment.variant} />
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = orderStatusMap[row.original.status]
      return <StatusBadge label={status.label} variant={status.variant} />
    },
  },
  {
    id: 'actions',
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => <OrderActions order={row.original} />,
  },
]
