"use client"

import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { TextField, SelectField, DateField, CurrencyField } from '@/components/forms'
import type { Campaign } from '@/types'

const campaignSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  type: z.enum(['email', 'social', 'promotion']),
  status: z.enum(['draft', 'active', 'paused', 'completed']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  budget: z.number().min(0).optional(),
  description: z.string().optional(),
})

type CampaignFormData = z.infer<typeof campaignSchema>

const TYPE_OPTIONS = [
  { label: 'Email', value: 'email' },
  { label: 'Social Media', value: 'social' },
  { label: 'Promotion', value: 'promotion' },
]

const STATUS_OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Completed', value: 'completed' },
]

interface CampaignDrawerProps {
  open: boolean
  onClose: () => void
  initialData?: Campaign
  mode: 'create' | 'edit'
}

export function CampaignDrawer({ open, onClose, initialData, mode }: CampaignDrawerProps) {
  const methods = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema) as never,
    defaultValues: {
      name: '', type: 'email', status: 'draft',
      startDate: '', endDate: '', budget: 0, description: '',
    },
  })

  const { watch, formState: { isSubmitting }, reset } = methods
  const nameValue = watch('name')
  const startDateValue = watch('startDate')

  const isFormValid = nameValue?.length >= 2 && !!startDateValue

  useEffect(() => {
    if (!open) return
    if (initialData) {
      reset({
        name: initialData.name,
        type: initialData.type,
        status: initialData.status,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        budget: 0,
        description: '',
      })
    } else {
      reset({
        name: '', type: 'email', status: 'draft',
        startDate: '', endDate: '', budget: 0, description: '',
      })
    }
  }, [open, initialData, reset])

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500))
    toast.success(mode === 'create' ? 'Campaign created' : 'Campaign updated')
    onClose()
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 transition-opacity" onClick={onClose} />
      )}

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[33.333%] min-w-[400px] flex-col border-l bg-background shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {mode === 'create' ? 'New Campaign' : `Edit ${initialData?.name ?? 'Campaign'}`}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === 'create' ? 'Set up a new marketing campaign' : 'Update campaign details'}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Campaign Details</h3>
                  <TextField name="name" label="Campaign Name" placeholder="e.g. Summer Sale 2026" required />
                  <SelectField name="type" label="Campaign Type" options={TYPE_OPTIONS} />
                  <SelectField name="status" label="Status" options={STATUS_OPTIONS} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Schedule</h3>
                  <DateField name="startDate" label="Start Date" required />
                  <DateField name="endDate" label="End Date" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Budget</h3>
                  <CurrencyField name="budget" label="Campaign Budget" placeholder="0.00" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Description</h3>
                  <div className="space-y-2">
                    <Label htmlFor="description">Campaign Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the campaign goals and target audience..."
                      rows={4}
                      {...methods.register('description')}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t px-6 py-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting || !isFormValid}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'create' ? 'Create Campaign' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
