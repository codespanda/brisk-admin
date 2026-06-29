import type { Address, OrderItem, TimelineEvent } from './common'

export interface Order {
  id: string
  orderNumber: string
  customer: OrderCustomer
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingAddress: Address
  billingAddress: Address
  timeline: TimelineEvent[]
  createdAt: string
  updatedAt: string
}

export interface OrderCustomer {
  id: string
  name: string
  email: string
  phone: string
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export type PaymentStatus = 'pending' | 'paid' | 'refunded'
