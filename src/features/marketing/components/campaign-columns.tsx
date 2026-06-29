
import { createContext, useContext, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StatusBadge } from '@/components/shared/status-badge'
import { campaignStatusMap, campaignTypeMap } from '@/constants/status-maps'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import type { Campaign } from '@/types'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

interface CampaignColumnCallbacks {
  onEdit?: (campaign: Campaign) => void
  onDelete?: (campaign: Campaign) => void
}

export const CampaignActionsContext = createContext<CampaignColumnCallbacks>({})

function CampaignActions({ campaign }: { campaign: Campaign }) {
  const { onEdit, onDelete } = useContext(CampaignActionsContext)
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none">
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onEdit?.(campaign), 0) }}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          closeOnClick
          onClick={() => { setOpen(false); setTimeout(() => onDelete?.(campaign), 0) }}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const campaignColumns: ColumnDef<Campaign>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = campaignTypeMap[row.original.type]
      return <StatusBadge label={type.label} variant={type.variant} />
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = campaignStatusMap[row.original.status]
      return <StatusBadge label={status.label} variant={status.variant} />
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
    accessorKey: 'reach',
    header: 'Reach',
    cell: ({ row }) => (
      <span className="text-sm">{formatNumber(row.original.reach)}</span>
    ),
  },
  {
    accessorKey: 'conversions',
    header: 'Conversions',
    cell: ({ row }) => (
      <span className="text-sm">{formatNumber(row.original.conversions)}</span>
    ),
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: ({ row }) => (
      <span className="text-sm font-medium">{formatCurrency(row.original.revenue)}</span>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => <CampaignActions campaign={row.original} />,
  },
]
