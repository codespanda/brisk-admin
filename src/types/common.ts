export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  sku: string
  price: number
  quantity: number
  total: number
}

export interface TimelineEvent {
  id: string
  status: string
  description: string
  timestamp: string
}

export interface CustomerNote {
  id: string
  content: string
  createdBy: string
  createdAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string | null
  role: 'admin' | 'manager' | 'support'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ChartDataPoint {
  label: string
  [key: string]: string | number
}

export interface KpiData {
  label: string
  value: string
  change: number
  changeLabel: string
  icon: string
  trend: 'up' | 'down' | 'neutral'
}
