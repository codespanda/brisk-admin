"use client"

import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/tables/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { customerColumns, CustomerActionsContext } from '@/features/customers/components/customer-columns'
import { CustomerDrawer } from '@/features/customers/components/customer-drawer'
import { FilterSelect } from '@/components/shared/filter-select'
import { Plus, Users, UserCheck, UserPlus, UserX } from 'lucide-react'
import { toast } from 'sonner'
import type { Customer } from '@/types'

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const kpis = [
  { label: 'Total Customers', value: '2,450', icon: Users },
  { label: 'Active', value: '2,118', icon: UserCheck },
  { label: 'New This Month', value: '186', icon: UserPlus },
  { label: 'Inactive', value: '332', icon: UserX },
]

interface CustomersPageClientProps {
  customers: Customer[]
}

export function CustomersPageClient({ customers: initialCustomers }: CustomersPageClientProps) {
  const [customerList, setCustomerList] = useState<Customer[]>(initialCustomers)
  const [statusFilter, setStatusFilter] = useState('all')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [editCustomer, setEditCustomer] = useState<Customer | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null)

  const handleCreate = () => {
    setEditCustomer(undefined)
    setDrawerMode('create')
    setDrawerOpen(true)
  }

  const handleEdit = (customer: Customer) => {
    setEditCustomer(customer)
    setDrawerMode('edit')
    setDrawerOpen(true)
  }

  const handleDelete = (customer: Customer) => {
    setDeleteTarget(customer)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await new Promise((r) => setTimeout(r, 300))
    setCustomerList((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    toast.success(`"${deleteTarget.name}" has been deleted`)
    setDeleteTarget(null)
  }

  const filteredCustomers = customerList.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    return true
  })

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Customers"
          actions={
            <Button className="gap-2" onClick={handleCreate}>
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          }
        />

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

        <CustomerActionsContext.Provider value={{ onEdit: handleEdit, onDelete: handleDelete }}>
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <DataTable
                columns={customerColumns}
                data={filteredCustomers}
                searchKey="name"
                searchPlaceholder="Search customers..."
                enableSelection
                enablePagination
                filterContent={
                  <div className="flex items-center gap-2">
                    <FilterSelect
                      label="All"
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                      options={statusOptions}
                    />
                  </div>
                }
              />
            </div>
          </CardContent>
        </Card>
        </CustomerActionsContext.Provider>
      </div>

      <CustomerDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mode={drawerMode}
        initialData={editCustomer}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        title="Delete Customer"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </>
  )
}
