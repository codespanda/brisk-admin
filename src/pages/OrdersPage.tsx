import { useEffect, useState } from 'react'
import { getOrders } from '@/services/order.service'
import { OrdersPageClient } from '@/features/orders/components/orders-page-client'
import type { Order } from '@/types'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    getOrders().then(setOrders)
  }, [])

  return <OrdersPageClient orders={orders} />
}
