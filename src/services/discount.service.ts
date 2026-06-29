import { mockApiCall } from './api-client'
import type { Discount, DiscountFormData } from '@/types'

const mockDiscounts: Discount[] = [
  { id: '1', code: 'SUMMER20', type: 'percentage', value: 20, minOrderValue: 50, usageLimit: 100, perCustomerLimit: 1, usedCount: 42, startDate: '2026-06-01T00:00:00Z', endDate: '2026-08-31T23:59:59Z', isActive: true, createdAt: '2026-05-25T10:00:00Z', updatedAt: '2026-06-18T14:00:00Z' },
  { id: '2', code: 'FLAT10', type: 'fixed', value: 10, minOrderValue: 30, usageLimit: 200, perCustomerLimit: 2, usedCount: 87, startDate: '2026-01-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2025-12-20T09:00:00Z', updatedAt: '2026-06-17T11:00:00Z' },
  { id: '3', code: 'FREESHIP', type: 'free_shipping', value: 0, minOrderValue: 75, usageLimit: null, perCustomerLimit: null, usedCount: 156, startDate: '2026-03-01T00:00:00Z', endDate: '2026-09-30T23:59:59Z', isActive: true, createdAt: '2026-02-28T08:00:00Z', updatedAt: '2026-06-19T09:00:00Z' },
  { id: '4', code: 'WELCOME15', type: 'percentage', value: 15, minOrderValue: null, usageLimit: null, perCustomerLimit: 1, usedCount: 234, startDate: '2025-01-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-06-18T10:00:00Z' },
  { id: '5', code: 'SPRING25', type: 'percentage', value: 25, minOrderValue: 100, usageLimit: 50, perCustomerLimit: 1, usedCount: 50, startDate: '2026-03-01T00:00:00Z', endDate: '2026-05-31T23:59:59Z', isActive: false, createdAt: '2026-02-15T10:00:00Z', updatedAt: '2026-06-01T00:00:00Z' },
  { id: '6', code: 'HOLIDAY50', type: 'fixed', value: 50, minOrderValue: 200, usageLimit: 25, perCustomerLimit: 1, usedCount: 0, startDate: '2026-12-20T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2026-06-10T14:00:00Z', updatedAt: '2026-06-10T14:00:00Z' },
  { id: '7', code: 'FLASH30', type: 'percentage', value: 30, minOrderValue: 80, usageLimit: 75, perCustomerLimit: 1, usedCount: 75, startDate: '2026-05-01T00:00:00Z', endDate: '2026-05-03T23:59:59Z', isActive: false, createdAt: '2026-04-28T09:00:00Z', updatedAt: '2026-05-04T00:00:00Z' },
  { id: '8', code: 'LOYALTY10', type: 'percentage', value: 10, minOrderValue: null, usageLimit: null, perCustomerLimit: null, usedCount: 312, startDate: '2025-06-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2025-05-25T10:00:00Z', updatedAt: '2026-06-18T09:00:00Z' },
  { id: '9', code: 'SHIP5', type: 'free_shipping', value: 0, minOrderValue: 50, usageLimit: 500, perCustomerLimit: 3, usedCount: 198, startDate: '2026-04-01T00:00:00Z', endDate: '2026-07-31T23:59:59Z', isActive: true, createdAt: '2026-03-28T08:00:00Z', updatedAt: '2026-06-17T12:00:00Z' },
  { id: '10', code: 'NEWUSER20', type: 'percentage', value: 20, minOrderValue: null, usageLimit: null, perCustomerLimit: 1, usedCount: 87, startDate: '2026-01-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2025-12-28T10:00:00Z', updatedAt: '2026-06-15T14:00:00Z' },
  { id: '11', code: 'FALL15', type: 'percentage', value: 15, minOrderValue: 60, usageLimit: 150, perCustomerLimit: 2, usedCount: 0, startDate: '2026-09-01T00:00:00Z', endDate: '2026-11-30T23:59:59Z', isActive: true, createdAt: '2026-06-15T11:00:00Z', updatedAt: '2026-06-15T11:00:00Z' },
  { id: '12', code: 'BUNDLE25', type: 'fixed', value: 25, minOrderValue: 150, usageLimit: 60, perCustomerLimit: 1, usedCount: 33, startDate: '2026-05-15T00:00:00Z', endDate: '2026-08-15T23:59:59Z', isActive: true, createdAt: '2026-05-10T09:00:00Z', updatedAt: '2026-06-18T11:00:00Z' },
  { id: '13', code: 'VIPSHIP', type: 'free_shipping', value: 0, minOrderValue: 25, usageLimit: null, perCustomerLimit: null, usedCount: 445, startDate: '2025-01-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-06-19T08:00:00Z' },
  { id: '14', code: 'BIRTHDAY30', type: 'percentage', value: 30, minOrderValue: null, usageLimit: null, perCustomerLimit: 1, usedCount: 56, startDate: '2025-01-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-06-18T10:00:00Z' },
  { id: '15', code: 'CYBER40', type: 'percentage', value: 40, minOrderValue: 120, usageLimit: 100, perCustomerLimit: 1, usedCount: 100, startDate: '2025-11-29T00:00:00Z', endDate: '2025-12-01T23:59:59Z', isActive: false, createdAt: '2025-11-20T10:00:00Z', updatedAt: '2025-12-02T00:00:00Z' },
  { id: '16', code: 'SPORT5OFF', type: 'fixed', value: 5, minOrderValue: 30, usageLimit: 300, perCustomerLimit: 5, usedCount: 142, startDate: '2026-03-15T00:00:00Z', endDate: '2026-09-15T23:59:59Z', isActive: true, createdAt: '2026-03-10T11:00:00Z', updatedAt: '2026-06-16T09:00:00Z' },
  { id: '17', code: 'WINTER10', type: 'fixed', value: 10, minOrderValue: 50, usageLimit: 200, perCustomerLimit: 2, usedCount: 0, startDate: '2026-12-01T00:00:00Z', endDate: '2027-01-31T23:59:59Z', isActive: true, createdAt: '2026-06-12T14:00:00Z', updatedAt: '2026-06-12T14:00:00Z' },
  { id: '18', code: 'CLEARANCE50', type: 'percentage', value: 50, minOrderValue: 40, usageLimit: 30, perCustomerLimit: 1, usedCount: 22, startDate: '2026-06-05T00:00:00Z', endDate: '2026-06-30T23:59:59Z', isActive: true, createdAt: '2026-06-04T10:00:00Z', updatedAt: '2026-06-19T08:00:00Z' },
]

export async function getDiscounts(): Promise<Discount[]> {
  return mockApiCall(mockDiscounts)
}

export async function getDiscount(id: string): Promise<Discount | undefined> {
  return mockApiCall(mockDiscounts.find((d) => d.id === id))
}

export async function createDiscount(data: DiscountFormData): Promise<Discount> {
  return mockApiCall({
    ...data,
    id: Math.random().toString(36).substring(2, 11),
    usedCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

export async function updateDiscount(id: string, data: Partial<DiscountFormData>): Promise<Discount> {
  const existing = mockDiscounts.find((d) => d.id === id)
  if (!existing) throw new Error('Discount not found')
  return mockApiCall({ ...existing, ...data, updatedAt: new Date().toISOString() })
}
