"use client"

import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/tables/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { orderColumns, OrderActionsContext } from '@/features/orders/components/order-columns'
import { OrderDrawer } from '@/features/orders/components/order-drawer'
import { FilterSelect } from '@/components/shared/filter-select'
import { Plus, ShoppingCart, Clock, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { Order } from '@/types'

const orderStatusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
]

const paymentOptions = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Refunded', value: 'refunded' },
]

const kpis = [
  { label: 'Total Orders', value: '2,847', icon: ShoppingCart },
  { label: 'Pending', value: '198', icon: Clock },
  { label: 'Delivered', value: '1,845', icon: CheckCircle },
  { label: 'Cancelled', value: '156', icon: XCircle },
]

interface OrdersPageClientProps {
  orders: Order[]
}

export function OrdersPageClient({ orders }: OrdersPageClientProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [editOrder, setEditOrder] = useState<Order | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    if (paymentFilter !== 'all' && o.paymentStatus !== paymentFilter) return false
    return true
  })

  const handleCreate = () => {
    setEditOrder(undefined)
    setDrawerMode('create')
    setDrawerOpen(true)
  }

  const handleEdit = (order: Order) => {
    setEditOrder(order)
    setDrawerMode('edit')
    setDrawerOpen(true)
  }

  const handleDelete = (order: Order) => {
    setDeleteTarget(order)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await new Promise((r) => setTimeout(r, 300))
    toast.success(`Order ${deleteTarget.orderNumber} has been deleted`)
    setDeleteTarget(null)
  }

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Orders"
          actions={
            <Button className="gap-2" onClick={handleCreate}>
              <Plus className="h-4 w-4" />
              Add New Order
            </Button>
          }
        />

        {/* KPI Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <kpi.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table */}
        <OrderActionsContext.Provider value={{ onEdit: handleEdit, onDelete: handleDelete }}>
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <DataTable
                columns={orderColumns}
                data={filteredOrders}
                searchKey="orderNumber"
                searchPlaceholder="Search orders..."
                enableSelection
                enablePagination
                filterContent={
                  <div className="flex items-center gap-2">
                    <FilterSelect label="All Statuses" value={statusFilter} onValueChange={setStatusFilter} options={orderStatusOptions} />
                    <FilterSelect label="All Payments" value={paymentFilter} onValueChange={setPaymentFilter} options={paymentOptions} />
                  </div>
                }
              />
            </div>
          </CardContent>
        </Card>
        </OrderActionsContext.Provider>
      </div>

      <OrderDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mode={drawerMode}
        initialData={editOrder}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        title="Delete Order"
        description={`Are you sure you want to delete order ${deleteTarget?.orderNumber}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </>
  )
}
