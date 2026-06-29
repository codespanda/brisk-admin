import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/status-badge'
import { orderStatusMap, paymentStatusMap } from '@/constants/status-maps'
import { formatCurrency } from '@/lib/utils'
import type { Order } from '@/types'
import { OrderTimeline } from './order-timeline'

interface OrderDetailsViewProps {
  order: Order
}

function AddressBlock({ label, address }: { label: string; address: Order['shippingAddress'] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <address className="not-italic text-sm text-muted-foreground space-y-0.5">
          <p>{address.street}</p>
          <p>{address.city}, {address.state} {address.zip}</p>
          <p>{address.country}</p>
        </address>
      </CardContent>
    </Card>
  )
}

export function OrderDetailsView({ order }: OrderDetailsViewProps) {
  const orderStatus = orderStatusMap[order.status]
  const paymentStatus = paymentStatusMap[order.paymentStatus]

  return (
    <div className="space-y-6">
      {/* Top: order number + badges */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold">{order.orderNumber}</h2>
        <StatusBadge label={orderStatus.label} variant={orderStatus.variant} />
        <StatusBadge label={paymentStatus.label} variant={paymentStatus.variant} />
      </div>

      {/* Three info cards: Customer, Shipping, Billing */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Customer Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-medium">{order.customer.name}</p>
            <p className="text-muted-foreground">{order.customer.email}</p>
            <p className="text-muted-foreground">{order.customer.phone}</p>
          </CardContent>
        </Card>
        <AddressBlock label="Shipping Address" address={order.shippingAddress} />
        <AddressBlock label="Billing Address" address={order.billingAddress} />
      </div>

      {/* Items table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order Items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Product</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">SKU</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">Qty</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">Unit Price</th>
                  <th className="px-6 py-3 text-right font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
                          IMG
                        </div>
                        <span className="font-medium">{item.productName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{item.sku}</td>
                    <td className="px-6 py-3 text-right">{item.quantity}</td>
                    <td className="px-6 py-3 text-right">{formatCurrency(item.price)}</td>
                    <td className="px-6 py-3 text-right">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t px-6 py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTimeline timeline={order.timeline} />
        </CardContent>
      </Card>
    </div>
  )
}
