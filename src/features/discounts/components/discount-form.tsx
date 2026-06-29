"use client"

import { useForm, FormProvider, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  TextField,
  SelectField,
  CurrencyField,
  DateField,
  SwitchField,
} from '@/components/forms'
import { createDiscount, updateDiscount } from '@/services/discount.service'
import type { Discount } from '@/types'
import { discountSchema, type DiscountSchemaData } from '@/features/discounts/schemas'

const TYPE_OPTIONS = [
  { label: 'Percentage', value: 'percentage' },
  { label: 'Fixed Amount', value: 'fixed' },
  { label: 'Free Shipping', value: 'free_shipping' },
]

function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function toDatetimeLocal(isoString: string): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

interface DiscountFormProps {
  initialData?: Discount
  mode: 'create' | 'edit'
}

export function DiscountForm({ initialData, mode }: DiscountFormProps) {
  const router = useRouter()

  const methods = useForm<DiscountSchemaData>({
    resolver: zodResolver(discountSchema),
    defaultValues: initialData
      ? {
          code: initialData.code,
          type: initialData.type,
          value: initialData.value,
          minOrderValue: initialData.minOrderValue,
          usageLimit: initialData.usageLimit,
          perCustomerLimit: initialData.perCustomerLimit,
          startDate: toDatetimeLocal(initialData.startDate),
          endDate: toDatetimeLocal(initialData.endDate),
          isActive: initialData.isActive,
        }
      : {
          code: '',
          type: 'percentage',
          value: 0,
          minOrderValue: null,
          usageLimit: null,
          perCustomerLimit: null,
          startDate: '',
          endDate: '',
          isActive: true,
        },
  })

  const {
    watch,
    setValue,
    control,
    formState: { isSubmitting },
  } = methods

  const discountType = watch('type')

  const onSubmit = async (data: DiscountSchemaData) => {
    try {
      const payload = {
        code: data.code,
        type: data.type,
        value: data.type === 'free_shipping' ? 0 : data.value,
        minOrderValue: data.minOrderValue ?? null,
        usageLimit: data.usageLimit ?? null,
        perCustomerLimit: data.perCustomerLimit ?? null,
        startDate: data.startDate ? new Date(data.startDate).toISOString() : data.startDate,
        endDate: data.endDate ? new Date(data.endDate).toISOString() : data.endDate,
        isActive: data.isActive,
      }
      if (mode === 'edit' && initialData) {
        await updateDiscount(initialData.id, payload)
      } else {
        await createDiscount(payload)
      }
      toast.success(mode === 'create' ? 'Discount created' : 'Discount saved')
      router.push('/discounts')
    } catch {
      toast.error('Failed to save discount')
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-6 max-w-2xl">
          {/* Coupon Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Coupon Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Controller
                    name="code"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div className="space-y-2">
                        <Label htmlFor="code">Code</Label>
                        <Input
                          id="code"
                          placeholder="e.g. SUMMER20"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        />
                        {fieldState.error && (
                          <p className="text-sm text-danger">{fieldState.error.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setValue('code', generateCode())}
                >
                  Generate
                </Button>
              </div>

              <SelectField
                name="type"
                label="Discount Type"
                options={TYPE_OPTIONS}
                placeholder="Select type"
              />

              {discountType !== 'free_shipping' && (
                <Controller
                  name="value"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label htmlFor="value">
                        {discountType === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
                      </Label>
                      <Input
                        id="value"
                        type="number"
                        step={discountType === 'percentage' ? '1' : '0.01'}
                        min="0"
                        max={discountType === 'percentage' ? '100' : undefined}
                        placeholder={discountType === 'percentage' ? '0' : '0.00'}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(e.target.value ? parseFloat(e.target.value) : 0)
                        }
                      />
                      {fieldState.error && (
                        <p className="text-sm text-danger">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />
              )}
            </CardContent>
          </Card>

          {/* Validity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Validity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <DateField name="startDate" label="Start Date" />
                <DateField name="endDate" label="End Date" />
              </div>
            </CardContent>
          </Card>

          {/* Usage Limits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Usage Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="usageLimit"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label htmlFor="usageLimit">Total Usage Limit</Label>
                      <Input
                        id="usageLimit"
                        type="number"
                        min="1"
                        placeholder="Unlimited"
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(e.target.value ? parseInt(e.target.value, 10) : null)
                        }
                      />
                      {fieldState.error && (
                        <p className="text-sm text-danger">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="perCustomerLimit"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label htmlFor="perCustomerLimit">Per Customer Limit</Label>
                      <Input
                        id="perCustomerLimit"
                        type="number"
                        min="1"
                        placeholder="Unlimited"
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(e.target.value ? parseInt(e.target.value, 10) : null)
                        }
                      />
                      {fieldState.error && (
                        <p className="text-sm text-danger">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              <CurrencyField
                name="minOrderValue"
                label="Minimum Order Value"
                placeholder="0.00"
              />
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <SwitchField
                name="isActive"
                label="Active"
                description="Enable or disable this discount code"
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'create' ? 'Create Discount' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
