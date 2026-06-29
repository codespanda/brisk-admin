"use client"

import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/tables/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { discountColumns, DiscountActionsContext } from '@/features/discounts/components/discount-columns'
import { DiscountDrawer } from '@/features/discounts/components/discount-drawer'
import { FilterSelect } from '@/components/shared/filter-select'
import { Plus, Tags, CheckCircle, BarChart3, Clock } from 'lucide-react'
import { toast } from 'sonner'
import type { Discount } from '@/types'

const typeOptions = [
  { label: 'All', value: 'all' },
  { label: 'Percentage', value: 'percentage' },
  { label: 'Fixed', value: 'fixed' },
  { label: 'Free Shipping', value: 'free_shipping' },
]

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Expired', value: 'expired' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Disabled', value: 'disabled' },
]

const kpis = [
  { label: 'Total Coupons', value: '18', icon: Tags },
  { label: 'Active', value: '10', icon: CheckCircle },
  { label: 'Total Used', value: '1,247', icon: BarChart3 },
  { label: 'Expired', value: '3', icon: Clock },
]

function getDiscountStatusKey(discount: Discount): string {
  if (!discount.isActive) return 'disabled'
  const now = new Date()
  if (new Date(discount.endDate) < now) return 'expired'
  if (new Date(discount.startDate) > now) return 'scheduled'
  return 'active'
}

interface DiscountsPageClientProps {
  discounts: Discount[]
}

export function DiscountsPageClient({ discounts: initialDiscounts }: DiscountsPageClientProps) {
  const [discountList, setDiscountList] = useState<Discount[]>(initialDiscounts)
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [editDiscount, setEditDiscount] = useState<Discount | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<Discount | null>(null)

  const handleCreate = () => {
    setEditDiscount(undefined)
    setDrawerMode('create')
    setDrawerOpen(true)
  }

  const handleEdit = (discount: Discount) => {
    setEditDiscount(discount)
    setDrawerMode('edit')
    setDrawerOpen(true)
  }

  const handleDelete = (discount: Discount) => {
    setDeleteTarget(discount)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await new Promise((r) => setTimeout(r, 300))
    setDiscountList((prev) => prev.filter((d) => d.id !== deleteTarget.id))
    toast.success(`Coupon "${deleteTarget.code}" has been deleted`)
    setDeleteTarget(null)
  }

  const filteredDiscounts = discountList.filter((d) => {
    if (typeFilter !== 'all' && d.type !== typeFilter) return false
    if (statusFilter !== 'all' && getDiscountStatusKey(d) !== statusFilter) return false
    return true
  })

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Discounts"
          actions={
            <Button className="gap-2" onClick={handleCreate}>
              <Plus className="h-4 w-4" />
              Add Coupon
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex shrink-0 items-center justify-center rounded-lg bg-primary/10 p-2.5">
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

        <DiscountActionsContext.Provider value={{ onEdit: handleEdit, onDelete: handleDelete }}>
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <DataTable
                columns={discountColumns}
                data={filteredDiscounts}
                searchKey="code"
                searchPlaceholder="Search by code..."
                enableSelection
                enablePagination
                filterContent={
                  <div className="flex items-center gap-2">
                    <FilterSelect label="All" value={typeFilter} onValueChange={setTypeFilter} options={typeOptions} />
                    <FilterSelect label="All" value={statusFilter} onValueChange={setStatusFilter} options={statusOptions} />
                  </div>
                }
              />
            </div>
          </CardContent>
        </Card>
        </DiscountActionsContext.Provider>
      </div>

      <DiscountDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mode={drawerMode}
        initialData={editDiscount}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        title="Delete Coupon"
        description={`Are you sure you want to delete coupon "${deleteTarget?.code}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </>
  )
}
