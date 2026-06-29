import type { Address, CustomerNote } from './common'

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar: string | null
  status: CustomerStatus
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  addresses: Address[]
  notes: CustomerNote[]
  createdAt: string
  updatedAt: string
}

export type CustomerStatus = 'active' | 'inactive'
