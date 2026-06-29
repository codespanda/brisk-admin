export interface Discount {
  id: string
  code: string
  type: DiscountType
  value: number
  minOrderValue: number | null
  usageLimit: number | null
  perCustomerLimit: number | null
  usedCount: number
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type DiscountType = 'percentage' | 'fixed' | 'free_shipping'

export type DiscountStatus = 'active' | 'expired' | 'scheduled' | 'disabled'

export interface DiscountFormData {
  code: string
  type: DiscountType
  value: number
  minOrderValue: number | null
  usageLimit: number | null
  perCustomerLimit: number | null
  startDate: string
  endDate: string
  isActive: boolean
}
