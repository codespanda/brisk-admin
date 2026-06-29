
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/shared/status-badge'
import { customerStatusMap } from '@/constants/status-maps'
import { formatCurrency, formatRelativeDate } from '@/lib/utils'
import type { Customer } from '@/types'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

interface CustomerColumnCallbacks {
  onEdit?: (customer: Customer) => void
  onDelete?: (customer: Customer) => void
}

export const CustomerActionsContext = createContext<CustomerColumnCallbacks>({})

function CustomerActions({ customer }: { customer: Customer }) {
  const { onEdit, onDelete } = useContext(CustomerActionsContext)
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none">
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onEdit?.(customer), 0) }}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onDelete?.(customer), 0) }}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const customerColumns: ColumnDef<Customer>[] = [
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
    id: 'customer',
    accessorKey: 'name',
    header: 'Customer',
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {customer.avatar && <AvatarImage src={customer.avatar} alt={customer.name} />}
            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{customer.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{customer.email}</p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'totalOrders',
    header: 'Orders',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.totalOrders}</span>
    ),
  },
  {
    accessorKey: 'totalSpent',
    header: 'Total Spent',
    cell: ({ row }) => (
      <span className="text-sm font-medium">{formatCurrency(row.original.totalSpent)}</span>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Order',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatRelativeDate(row.original.updatedAt)}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = customerStatusMap[row.original.status]
      return <StatusBadge label={status.label} variant={status.variant} />
    },
  },
  {
    id: 'actions',
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => <CustomerActions customer={row.original} />,
  },
]
