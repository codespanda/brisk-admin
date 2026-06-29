import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { getOrder } from '@/services/order.service'
import { OrderDetailsView } from '@/features/orders/components/order-details-view'
import { ArrowLeft } from 'lucide-react'
import type { Order } from '@/types'

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getOrder(id).then((data) => {
        setOrder(data)
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Order not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={order.orderNumber}
        description={`Placed on ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
        actions={
          <Link to="/orders">
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
