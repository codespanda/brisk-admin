import { getOrders } from '@/services/order.service'
import { OrdersPageClient } from '@/features/orders/components/orders-page-client'

export default async function OrdersPage() {
  const orders = await getOrders()

  return <OrdersPageClient orders={orders} />
}
