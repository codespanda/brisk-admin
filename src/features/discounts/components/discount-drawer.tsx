
import { useEffect } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2, X, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextField, SelectField, DateField, CurrencyField, SwitchField } from '@/components/forms'
import { discountSchema, type DiscountSchemaData } from '@/features/discounts/schemas'
import { createDiscount, updateDiscount } from '@/services/discount.service'
import type { Discount } from '@/types'

const TYPE_OPTIONS = [
  { label: 'Percentage', value: 'percentage' },
  { label: 'Fixed Amount', value: 'fixed' },
  { label: 'Free Shipping', value: 'free_shipping' },
]

interface DiscountDrawerProps {
  open: boolean
  onClose: () => void
  initialData?: Discount
  mode: 'create' | 'edit'
}

function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export function DiscountDrawer({ open, onClose, initialData, mode }: DiscountDrawerProps) {
  const methods = useForm<DiscountSchemaData>({
    resolver: zodResolver(discountSchema) as never,
    defaultValues: {
      code: '', type: 'percentage', value: 0, minOrderValue: null,
      usageLimit: null, perCustomerLimit: null, startDate: '', endDate: '', isActive: true,
    },
  })

  const { watch, setValue, formState: { isSubmitting }, reset } = methods
  const codeValue = watch('code')
  const typeValue = watch('type')
  const startDateValue = watch('startDate')

  const isFormValid = codeValue?.length >= 3 && !!startDateValue

  useEffect(() => {
    if (!open) return
    if (initialData) {
      reset({
        code: initialData.code,
        type: initialData.type,
        value: initialData.value,
        minOrderValue: initialData.minOrderValue,
        usageLimit: initialData.usageLimit,
        perCustomerLimit: initialData.perCustomerLimit,
        startDate: initialData.startDate.slice(0, 16),
        endDate: initialData.endDate.slice(0, 16),
        isActive: initialData.isActive,
      })
    } else {
      reset({
        code: '', type: 'percentage', value: 0, minOrderValue: null,
        usageLimit: null, perCustomerLimit: null, startDate: '', endDate: '', isActive: true,
      })
    }
  }, [open, initialData, reset])

  const onSubmit = async (data: DiscountSchemaData) => {
    try {
      const payload = {
        ...data,
        minOrderValue: data.minOrderValue ?? null,
        usageLimit: data.usageLimit ?? null,
        perCustomerLimit: data.perCustomerLimit ?? null,
      }
      if (mode === 'edit' && initialData) {
        await updateDiscount(initialData.id, payload)
      } else {
        await createDiscount(payload)
      }
      toast.success(mode === 'create' ? 'Coupon created' : 'Coupon updated')
      onClose()
    } catch {
      toast.error('Failed to save coupon')
    }
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
              {mode === 'create' ? 'Add New Coupon' : `Edit ${initialData?.code ?? 'Coupon'}`}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === 'create' ? 'Create a new discount coupon' : 'Update coupon details'}
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
                {/* Coupon Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Coupon Details</h3>
                  <div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <TextField name="code" label="Coupon Code" placeholder="e.g. SUMMER20" required />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-7"
                        onClick={() => setValue('code', generateCode())}
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                        Generate
                      </Button>
                    </div>
                  </div>
                  <SelectField name="type" label="Discount Type" options={TYPE_OPTIONS} />
                  {typeValue !== 'free_shipping' && (
                    <CurrencyField
                      name="value"
                      label={typeValue === 'percentage' ? 'Percentage Value' : 'Discount Amount'}
                      currency={typeValue === 'percentage' ? '%' : '$'}
                    />
                  )}
                </div>

                {/* Validity */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Validity</h3>
                  <DateField name="startDate" label="Start Date" required />
                  <DateField name="endDate" label="End Date" required />
                </div>

                {/* Usage Limits */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Usage Limits</h3>
                  <TextField name="usageLimit" label="Total Usage Limit" type="number" placeholder="Unlimited" />
                  <TextField name="perCustomerLimit" label="Per Customer Limit" type="number" placeholder="Unlimited" />
                  <CurrencyField name="minOrderValue" label="Minimum Order Value" />
                </div>

                {/* Status */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status</h3>
                  <SwitchField name="isActive" label="Active" description="Enable or disable this coupon" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t px-6 py-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting || !isFormValid}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'create' ? 'Create Coupon' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
