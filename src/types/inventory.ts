export interface InventoryItem {
  id: string
  productId: string
  productName: string
  sku: string
  category: string
  inStock: number
  reserved: number
  available: number
  threshold: number
  updatedAt: string
}

export interface StockAdjustment {
  id: string
  productId: string
  productName: string
  sku: string
  type: AdjustmentType
  quantity: number
  reason: string
  adjustedBy: string
  createdAt: string
}

export type AdjustmentType = 'received' | 'sold' | 'returned' | 'adjusted'

export interface Warehouse {
  id: string
  name: string
  location: string
  productCount: number
  capacity: number
  utilization: number
  status: 'active' | 'inactive'
}
