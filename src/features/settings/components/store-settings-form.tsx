"use client"

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TextField, SelectField, TextAreaField } from '@/components/forms'
import { mockStoreSettings } from '@/features/settings/mock-data'
import { storeSettingsSchema, type StoreSettingsSchemaData } from '@/features/settings/schemas'

const CURRENCY_OPTIONS = [
  { label: 'US Dollar (USD)', value: 'USD' },
  { label: 'Euro (EUR)', value: 'EUR' },
  { label: 'British Pound (GBP)', value: 'GBP' },
  { label: 'Canadian Dollar (CAD)', value: 'CAD' },
  { label: 'Australian Dollar (AUD)', value: 'AUD' },
]

const TIMEZONE_OPTIONS = [
  { label: 'Eastern Time (ET)', value: 'America/New_York' },
  { label: 'Central Time (CT)', value: 'America/Chicago' },
  { label: 'Mountain Time (MT)', value: 'America/Denver' },
  { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { label: 'UTC', value: 'UTC' },
  { label: 'London (GMT)', value: 'Europe/London' },
  { label: 'Paris (CET)', value: 'Europe/Paris' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
]

const DATE_FORMAT_OPTIONS = [
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  { label: 'MMM D, YYYY', value: 'MMM D, YYYY' },
]

export function StoreSettingsForm() {
  const methods = useForm<StoreSettingsSchemaData>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: mockStoreSettings,
  })

  const { formState: { isSubmitting } } = methods

  const onSubmit = async (_data: StoreSettingsSchemaData) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    toast.success('Settings saved')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField name="name" label="Store Name" placeholder="Enter store name" required />
            <TextField name="url" label="Store URL" placeholder="https://mystore.com" required />
            <TextAreaField
              name="description"
              label="Description"
              placeholder="Describe your store..."
              rows={3}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Regional Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <SelectField
                name="currency"
                label="Currency"
                options={CURRENCY_OPTIONS}
                placeholder="Select currency"
                required
              />
              <SelectField
                name="timezone"
                label="Timezone"
                options={TIMEZONE_OPTIONS}
                placeholder="Select timezone"
                required
              />
              <SelectField
                name="dateFormat"
                label="Date Format"
                options={DATE_FORMAT_OPTIONS}
                placeholder="Select format"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                name="supportEmail"
                label="Support Email"
                placeholder="support@mystore.com"
                type="email"
                required
              />
              <TextField
                name="phone"
                label="Phone Number"
                placeholder="+1 555-0100"
                type="tel"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Settings
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
