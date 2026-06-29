import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { getOrder, getOrders } from '@/services/order.service'
import { OrderDetailsView } from '@/features/orders/components/order-details-view'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  const orders = await getOrders()
  return orders.map((order) => ({ id: order.id }))
}

interface OrderPageProps {
  params: Promise<{ id: string }>
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params
  const order = await getOrder(id)

  if (!order) notFound()

  return (
    <div className="space-y-6">
      <PageHeader
        title={order.orderNumber}
        description={`Placed on ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
        actions={
          <Link href="/orders">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        }
      />
      <OrderDetailsView order={order} />
    </div>
  )
}
