
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  TextField,
  SelectField,
} from '@/components/forms'
import type { Order, OrderStatus, PaymentStatus } from '@/types'

const orderSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(1, 'Phone is required'),
  shippingStreet: z.string().min(1, 'Street is required'),
  shippingCity: z.string().min(1, 'City is required'),
  shippingState: z.string().min(1, 'State is required'),
  shippingZip: z.string().min(1, 'ZIP is required'),
  shippingCountry: z.string().min(1, 'Country is required'),
  status: z.enum(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  paymentStatus: z.enum(['pending', 'paid', 'refunded']),
  notes: z.string().optional(),
})

type OrderFormData = z.infer<typeof orderSchema>

const STATUS_OPTIONS = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Refunded', value: 'refunded' },
]

const PAYMENT_OPTIONS = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Refunded', value: 'refunded' },
]

interface OrderDrawerProps {
  open: boolean
  onClose: () => void
  initialData?: Order
  mode: 'create' | 'edit'
}

export function OrderDrawer({ open, onClose, initialData, mode }: OrderDrawerProps) {
  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema) as never,
    defaultValues: initialData
      ? {
          customerName: initialData.customer.name,
          customerEmail: initialData.customer.email,
          customerPhone: initialData.customer.phone,
          shippingStreet: initialData.shippingAddress.street,
          shippingCity: initialData.shippingAddress.city,
          shippingState: initialData.shippingAddress.state,
          shippingZip: initialData.shippingAddress.zip,
          shippingCountry: initialData.shippingAddress.country,
          status: initialData.status,
          paymentStatus: initialData.paymentStatus,
          notes: '',
        }
      : {
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          shippingStreet: '',
          shippingCity: '',
          shippingState: '',
          shippingZip: '',
          shippingCountry: 'US',
          status: 'pending',
          paymentStatus: 'pending',
          notes: '',
        },
  })

  const { watch, formState: { isSubmitting }, reset } = methods
  const customerName = watch('customerName')
  const customerEmail = watch('customerEmail')
  const shippingStreet = watch('shippingStreet')
  const shippingCity = watch('shippingCity')

  const isFormValid = customerName?.length >= 2 && !!customerEmail && !!shippingStreet && !!shippingCity

  useEffect(() => {
    if (open && !initialData) {
      reset({
        customerName: '', customerEmail: '', customerPhone: '',
        shippingStreet: '', shippingCity: '', shippingState: '',
        shippingZip: '', shippingCountry: 'US',
        status: 'pending', paymentStatus: 'pending', notes: '',
      })
    }
    if (open && initialData) {
      reset({
        customerName: initialData.customer.name,
        customerEmail: initialData.customer.email,
        customerPhone: initialData.customer.phone,
        shippingStreet: initialData.shippingAddress.street,
        shippingCity: initialData.shippingAddress.city,
        shippingState: initialData.shippingAddress.state,
        shippingZip: initialData.shippingAddress.zip,
        shippingCountry: initialData.shippingAddress.country,
        status: initialData.status,
        paymentStatus: initialData.paymentStatus,
        notes: '',
      })
    }
  }, [open, initialData, reset])

  const onSubmit = async (data: OrderFormData) => {
    // Mock save
    await new Promise((r) => setTimeout(r, 500))
    toast.success(mode === 'create' ? 'Order created' : 'Order updated')
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
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {mode === 'create' ? 'Add New Order' : `Edit ${initialData?.orderNumber ?? 'Order'}`}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === 'create' ? 'Fill in the order details' : 'Update order information'}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Customer Information</h3>
                  <TextField name="customerName" label="Full Name" placeholder="John Doe" required />
                  <div className="grid grid-cols-2 gap-3">
                    <TextField name="customerEmail" label="Email" placeholder="john@example.com" type="email" required />
                    <TextField name="customerPhone" label="Phone" placeholder="+1 555-0100" required />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Shipping Address</h3>
                  <TextField name="shippingStreet" label="Street" placeholder="123 Main St" required />
                  <div className="grid grid-cols-2 gap-3">
                    <TextField name="shippingCity" label="City" placeholder="New York" required />
                    <TextField name="shippingState" label="State" placeholder="NY" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField name="shippingZip" label="ZIP Code" placeholder="10001" />
                    <TextField name="shippingCountry" label="Country" placeholder="US" />
                  </div>
                </div>

                {/* Order Status */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Order Status</h3>
                  <SelectField name="status" label="Order Status" options={STATUS_OPTIONS} />
                  <SelectField name="paymentStatus" label="Payment Status" options={PAYMENT_OPTIONS} />
                </div>

                {/* Notes */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notes</h3>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Internal Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any internal notes about this order..."
                      rows={3}
                      {...methods.register('notes')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 border-t px-6 py-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting || !isFormValid}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'create' ? 'Create Order' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
