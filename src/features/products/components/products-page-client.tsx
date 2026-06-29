"use client"

import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/tables/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { productColumns, ProductActionsContext } from '@/features/products/components/product-columns'
import { ProductDrawer } from '@/features/products/components/product-drawer'
import { deleteProduct } from '@/services/product.service'
import { FilterSelect } from '@/components/shared/filter-select'
import { Plus, Package, TrendingUp, CheckCircle, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/types'

const categoryOptions = [
  { label: 'All', value: 'all' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Home & Kitchen', value: 'Home & Kitchen' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Footwear', value: 'Footwear' },
  { label: 'Accessories', value: 'Accessories' },
]

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' },
]

const kpis = [
  { label: 'Total products', value: '11,207', icon: Package },
  { label: 'Total Sales Products', value: '09,107', icon: TrendingUp },
  { label: 'Available Products', value: '1,997', icon: CheckCircle },
  { label: 'Return products', value: '103', icon: RotateCcw },
]

interface ProductsPageClientProps {
  products: Product[]
}

export function ProductsPageClient({ products: initialProducts }: ProductsPageClientProps) {
  const [productList, setProductList] = useState<Product[]>(initialProducts)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [editProduct, setEditProduct] = useState<Product | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredProducts = productList.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    return true
  })

  const handleCreate = () => {
    setEditProduct(undefined)
    setDrawerMode('create')
    setDrawerOpen(true)
  }

  const handleEdit = (product: Product) => {
    setEditProduct(product)
    setDrawerMode('edit')
    setDrawerOpen(true)
  }

  const handleDelete = (product: Product) => {
    setDeleteTarget(product)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deleteProduct(deleteTarget.id)
    setProductList((prev) => prev.filter((p) => p.id !== deleteTarget.id))
    toast.success(`"${deleteTarget.name}" has been deleted`)
    setDeleteTarget(null)
  }

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Products"
          actions={
            <Button className="gap-2" onClick={handleCreate}>
              <Plus className="h-4 w-4" />
              Add New Product
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

        {/* Products Table */}
        <ProductActionsContext.Provider value={{ onEdit: handleEdit, onDelete: handleDelete }}>
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <DataTable
                columns={productColumns}
                data={filteredProducts}
                searchKey="name"
                searchPlaceholder="Search products..."
                enableSelection
                enablePagination
                filterContent={
                  <div className="flex items-center gap-2">
                    <FilterSelect label="All Products" value={categoryFilter} onValueChange={setCategoryFilter} options={categoryOptions} />
                    <FilterSelect label="All Status" value={statusFilter} onValueChange={setStatusFilter} options={statusOptions} />
                  </div>
                }
              />
            </div>
          </CardContent>
        </Card>
        </ProductActionsContext.Provider>
      </div>

      <ProductDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mode={drawerMode}
        initialData={editProduct}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </>
  )
}
