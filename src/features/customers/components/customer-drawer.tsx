
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { TextField, SelectField } from '@/components/forms'
import type { Customer } from '@/types'

const customerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone is required'),
  status: z.enum(['active', 'inactive']),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
})

type CustomerFormData = z.infer<typeof customerSchema>

const STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

interface CustomerDrawerProps {
  open: boolean
  onClose: () => void
  initialData?: Customer
  mode: 'create' | 'edit'
}

export function CustomerDrawer({ open, onClose, initialData, mode }: CustomerDrawerProps) {
  const methods = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema) as never,
    defaultValues: {
      name: '', email: '', phone: '', status: 'active',
      street: '', city: '', state: '', zip: '', country: 'US', notes: '',
    },
  })

  const { watch, formState: { isSubmitting }, reset } = methods
  const nameValue = watch('name')
  const emailValue = watch('email')
  const phoneValue = watch('phone')

  const isFormValid = nameValue?.length >= 2 && !!emailValue && !!phoneValue

  useEffect(() => {
    if (!open) return
    if (initialData) {
      const addr = initialData.addresses[0]
      reset({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        status: initialData.status,
        street: addr?.street ?? '',
        city: addr?.city ?? '',
        state: addr?.state ?? '',
        zip: addr?.zip ?? '',
        country: addr?.country ?? 'US',
        notes: '',
      })
    } else {
      reset({
        name: '', email: '', phone: '', status: 'active',
        street: '', city: '', state: '', zip: '', country: 'US', notes: '',
      })
    }
  }, [open, initialData, reset])

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500))
    toast.success(mode === 'create' ? 'Customer created' : 'Customer updated')
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
              {mode === 'create' ? 'Add New Customer' : `Edit ${initialData?.name ?? 'Customer'}`}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === 'create' ? 'Fill in the customer details' : 'Update customer information'}
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
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Personal Information</h3>
                  <TextField name="name" label="Full Name" placeholder="John Doe" required />
                  <TextField name="email" label="Email" placeholder="john@example.com" type="email" required />
                  <TextField name="phone" label="Phone" placeholder="+1 555-0100" required />
                  <SelectField name="status" label="Status" options={STATUS_OPTIONS} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Address</h3>
                  <TextField name="street" label="Street" placeholder="123 Main St" />
                  <div className="grid grid-cols-2 gap-3">
                    <TextField name="city" label="City" placeholder="New York" />
                    <TextField name="state" label="State" placeholder="NY" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField name="zip" label="ZIP Code" placeholder="10001" />
                    <TextField name="country" label="Country" placeholder="US" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notes</h3>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Internal Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any notes about this customer..."
                      rows={3}
                      {...methods.register('notes')}
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
                {mode === 'create' ? 'Create Customer' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
