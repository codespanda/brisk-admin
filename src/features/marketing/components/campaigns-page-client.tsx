"use client"

import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/tables/data-table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { campaignColumns, CampaignActionsContext } from '@/features/marketing/components/campaign-columns'
import { CampaignDrawer } from '@/features/marketing/components/campaign-drawer'
import { FilterSelect } from '@/components/shared/filter-select'
import { Plus, Megaphone, Play, CheckCircle, FileText } from 'lucide-react'
import { toast } from 'sonner'
import type { Campaign } from '@/types'

const typeOptions = [
  { label: 'All', value: 'all' },
  { label: 'Email', value: 'email' },
  { label: 'Social', value: 'social' },
  { label: 'Promotion', value: 'promotion' },
]

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Completed', value: 'completed' },
]

const kpis = [
  { label: 'Total Campaigns', value: '17', icon: Megaphone },
  { label: 'Active', value: '5', icon: Play },
  { label: 'Completed', value: '4', icon: CheckCircle },
  { label: 'Draft', value: '3', icon: FileText },
]

interface CampaignsPageClientProps {
  campaigns: Campaign[]
}

export function CampaignsPageClient({ campaigns: initialCampaigns }: CampaignsPageClientProps) {
  const [campaignList, setCampaignList] = useState<Campaign[]>(initialCampaigns)
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [editCampaign, setEditCampaign] = useState<Campaign | undefined>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<Campaign | null>(null)

  const handleCreate = () => {
    setEditCampaign(undefined)
    setDrawerMode('create')
    setDrawerOpen(true)
  }

  const handleEdit = (campaign: Campaign) => {
    setEditCampaign(campaign)
    setDrawerMode('edit')
    setDrawerOpen(true)
  }

  const handleDelete = (campaign: Campaign) => {
    setDeleteTarget(campaign)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await new Promise((r) => setTimeout(r, 300))
    setCampaignList((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    toast.success(`"${deleteTarget.name}" has been deleted`)
    setDeleteTarget(null)
  }

  const filteredCampaigns = campaignList.filter((c) => {
    if (typeFilter !== 'all' && c.type !== typeFilter) return false
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    return true
  })

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Campaigns"
          actions={
            <Button className="gap-2" onClick={handleCreate}>
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-lg bg-primary/10 p-2.5">
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

        <CampaignActionsContext.Provider value={{ onEdit: handleEdit, onDelete: handleDelete }}>
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <DataTable
                columns={campaignColumns}
                data={filteredCampaigns}
                searchKey="name"
                searchPlaceholder="Search campaigns..."
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
        </CampaignActionsContext.Provider>
      </div>

      <CampaignDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mode={drawerMode}
        initialData={editCampaign}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        title="Delete Campaign"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </>
  )
}
