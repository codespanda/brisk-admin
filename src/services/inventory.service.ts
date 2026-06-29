import { mockApiCall } from './api-client'
import type { InventoryItem, StockAdjustment, Warehouse } from '@/types'

const mockInventory: InventoryItem[] = [
  { id: '1', productId: '1', productName: 'Wireless Bluetooth Headphones', sku: 'WBH-001', category: 'Electronics', inStock: 145, reserved: 12, available: 133, threshold: 20, updatedAt: '2026-06-18T14:00:00Z' },
  { id: '2', productId: '2', productName: 'Organic Cotton T-Shirt', sku: 'OCT-002', category: 'Clothing', inStock: 523, reserved: 45, available: 478, threshold: 50, updatedAt: '2026-06-17T10:00:00Z' },
  { id: '3', productId: '3', productName: 'Stainless Steel Water Bottle', sku: 'SSW-003', category: 'Home & Kitchen', inStock: 312, reserved: 8, available: 304, threshold: 30, updatedAt: '2026-06-16T08:00:00Z' },
  { id: '4', productId: '4', productName: 'Running Shoes Pro', sku: 'RSP-004', category: 'Footwear', inStock: 87, reserved: 5, available: 82, threshold: 15, updatedAt: '2026-06-18T12:00:00Z' },
  { id: '5', productId: '5', productName: 'Smart Watch Series X', sku: 'SWX-005', category: 'Electronics', inStock: 5, reserved: 2, available: 3, threshold: 10, updatedAt: '2026-06-19T08:00:00Z' },
  { id: '6', productId: '6', productName: 'Leather Laptop Bag', sku: 'LLB-006', category: 'Accessories', inStock: 0, reserved: 0, available: 0, threshold: 10, updatedAt: '2026-06-10T10:00:00Z' },
  { id: '7', productId: '7', productName: 'Aromatherapy Candle Set', sku: 'ACS-007', category: 'Home & Kitchen', inStock: 198, reserved: 15, available: 183, threshold: 25, updatedAt: '2026-06-15T14:00:00Z' },
  { id: '8', productId: '8', productName: 'Yoga Mat Premium', sku: 'YMP-008', category: 'Sports', inStock: 234, reserved: 0, available: 234, threshold: 20, updatedAt: '2026-06-14T16:00:00Z' },
  { id: '9', productId: '9', productName: 'Ceramic Coffee Mug Set', sku: 'CCM-009', category: 'Home & Kitchen', inStock: 67, reserved: 3, available: 64, threshold: 15, updatedAt: '2026-06-17T11:00:00Z' },
  { id: '10', productId: '10', productName: 'Wireless Charging Pad', sku: 'WCP-010', category: 'Electronics', inStock: 412, reserved: 20, available: 392, threshold: 40, updatedAt: '2026-06-18T09:00:00Z' },
  { id: '11', productId: '11', productName: 'Bamboo Cutting Board', sku: 'BCB-011', category: 'Home & Kitchen', inStock: 8, reserved: 2, available: 6, threshold: 15, updatedAt: '2026-06-19T07:00:00Z' },
  { id: '12', productId: '12', productName: 'Portable Bluetooth Speaker', sku: 'PBS-012', category: 'Electronics', inStock: 3, reserved: 1, available: 2, threshold: 10, updatedAt: '2026-06-18T16:00:00Z' },
  { id: '13', productId: '13', productName: 'Men\'s Slim Fit Chinos', sku: 'MSC-013', category: 'Clothing', inStock: 175, reserved: 14, available: 161, threshold: 25, updatedAt: '2026-06-15T10:00:00Z' },
  { id: '14', productId: '14', productName: 'Resistance Band Set', sku: 'RBS-014', category: 'Sports', inStock: 290, reserved: 22, available: 268, threshold: 30, updatedAt: '2026-06-14T12:00:00Z' },
  { id: '15', productId: '15', productName: 'Leather Wallet Slim', sku: 'LWS-015', category: 'Accessories', inStock: 132, reserved: 9, available: 123, threshold: 20, updatedAt: '2026-06-13T09:30:00Z' },
  { id: '16', productId: '16', productName: 'Air Purifier Compact', sku: 'APC-016', category: 'Home & Kitchen', inStock: 0, reserved: 0, available: 0, threshold: 5, updatedAt: '2026-05-30T10:00:00Z' },
  { id: '17', productId: '17', productName: 'Trail Hiking Boots', sku: 'THB-017', category: 'Footwear', inStock: 54, reserved: 6, available: 48, threshold: 15, updatedAt: '2026-06-17T08:00:00Z' },
  { id: '18', productId: '18', productName: 'Stainless Steel Cookware Set', sku: 'SSC-018', category: 'Home & Kitchen', inStock: 41, reserved: 4, available: 37, threshold: 10, updatedAt: '2026-06-12T11:00:00Z' },
  { id: '19', productId: '19', productName: 'Women\'s Sports Leggings', sku: 'WSL-019', category: 'Clothing', inStock: 348, reserved: 30, available: 318, threshold: 40, updatedAt: '2026-06-18T14:00:00Z' },
  { id: '20', productId: '20', productName: 'USB-C Hub 7-in-1', sku: 'UCH-020', category: 'Electronics', inStock: 210, reserved: 18, available: 192, threshold: 25, updatedAt: '2026-06-16T15:00:00Z' },
  { id: '21', productId: '21', productName: 'Foam Roller Pro', sku: 'FRP-021', category: 'Sports', inStock: 167, reserved: 7, available: 160, threshold: 20, updatedAt: '2026-06-11T10:00:00Z' },
  { id: '22', productId: '22', productName: 'Scented Linen Spray', sku: 'SLS-022', category: 'Home & Kitchen', inStock: 88, reserved: 3, available: 85, threshold: 15, updatedAt: '2026-06-10T09:00:00Z' },
  { id: '23', productId: '23', productName: 'Canvas Sneakers Classic', sku: 'CSC-023', category: 'Footwear', inStock: 220, reserved: 16, available: 204, threshold: 30, updatedAt: '2026-06-19T08:30:00Z' },
  { id: '24', productId: '24', productName: 'Polarized Sunglasses', sku: 'PSG-024', category: 'Accessories', inStock: 7, reserved: 2, available: 5, threshold: 10, updatedAt: '2026-06-18T13:00:00Z' },
]

const mockAdjustments: StockAdjustment[] = [
  { id: '1', productId: '1', productName: 'Wireless Bluetooth Headphones', sku: 'WBH-001', type: 'received', quantity: 50, reason: 'New shipment from supplier', adjustedBy: 'Admin User', createdAt: '2026-06-18T14:00:00Z' },
  { id: '2', productId: '5', productName: 'Smart Watch Series X', sku: 'SWX-005', type: 'sold', quantity: -3, reason: 'Online orders', adjustedBy: 'System', createdAt: '2026-06-18T10:00:00Z' },
  { id: '3', productId: '2', productName: 'Organic Cotton T-Shirt', sku: 'OCT-002', type: 'returned', quantity: 5, reason: 'Customer return - wrong size', adjustedBy: 'Support Team', createdAt: '2026-06-17T15:00:00Z' },
  { id: '4', productId: '6', productName: 'Leather Laptop Bag', sku: 'LLB-006', type: 'adjusted', quantity: -12, reason: 'Damaged in warehouse', adjustedBy: 'Warehouse Mgr', createdAt: '2026-06-16T09:00:00Z' },
  { id: '5', productId: '10', productName: 'Wireless Charging Pad', sku: 'WCP-010', type: 'received', quantity: 100, reason: 'Bulk order received', adjustedBy: 'Admin User', createdAt: '2026-06-15T11:00:00Z' },
  { id: '6', productId: '4', productName: 'Running Shoes Pro', sku: 'RSP-004', type: 'sold', quantity: -8, reason: 'Weekend sale orders', adjustedBy: 'System', createdAt: '2026-06-14T17:00:00Z' },
  { id: '7', productId: '19', productName: 'Women\'s Sports Leggings', sku: 'WSL-019', type: 'received', quantity: 120, reason: 'Restocking from supplier', adjustedBy: 'Admin User', createdAt: '2026-06-13T09:00:00Z' },
  { id: '8', productId: '24', productName: 'Polarized Sunglasses', sku: 'PSG-024', type: 'adjusted', quantity: -5, reason: 'Quality control rejection', adjustedBy: 'Warehouse Mgr', createdAt: '2026-06-12T14:00:00Z' },
  { id: '9', productId: '14', productName: 'Resistance Band Set', sku: 'RBS-014', type: 'received', quantity: 75, reason: 'New shipment from supplier', adjustedBy: 'Admin User', createdAt: '2026-06-11T10:00:00Z' },
  { id: '10', productId: '17', productName: 'Trail Hiking Boots', sku: 'THB-017', type: 'returned', quantity: 3, reason: 'Customer returns - sizing issues', adjustedBy: 'Support Team', createdAt: '2026-06-10T11:00:00Z' },
  { id: '11', productId: '20', productName: 'USB-C Hub 7-in-1', sku: 'UCH-020', type: 'sold', quantity: -15, reason: 'Flash sale orders', adjustedBy: 'System', createdAt: '2026-06-09T18:00:00Z' },
  { id: '12', productId: '11', productName: 'Bamboo Cutting Board', sku: 'BCB-011', type: 'adjusted', quantity: -3, reason: 'Damaged during transit', adjustedBy: 'Warehouse Mgr', createdAt: '2026-06-08T09:30:00Z' },
  { id: '13', productId: '13', productName: 'Men\'s Slim Fit Chinos', sku: 'MSC-013', type: 'received', quantity: 60, reason: 'New season stock arrival', adjustedBy: 'Admin User', createdAt: '2026-06-07T14:00:00Z' },
]

const mockWarehouses: Warehouse[] = [
  { id: '1', name: 'Main Warehouse', location: 'New York, NY', productCount: 845, capacity: 1200, utilization: 72, status: 'active' },
  { id: '2', name: 'West Coast DC', location: 'Los Angeles, CA', productCount: 632, capacity: 1000, utilization: 58, status: 'active' },
  { id: '3', name: 'Midwest Hub', location: 'Chicago, IL', productCount: 421, capacity: 800, utilization: 45, status: 'active' },
  { id: '4', name: 'South Distribution', location: 'Dallas, TX', productCount: 0, capacity: 600, utilization: 0, status: 'inactive' },
]

export async function getInventory(): Promise<InventoryItem[]> {
  return mockApiCall(mockInventory)
}

export async function getAdjustments(): Promise<StockAdjustment[]> {
  return mockApiCall(mockAdjustments)
}

export async function getWarehouses(): Promise<Warehouse[]> {
  return mockApiCall(mockWarehouses)
}

export async function createAdjustment(data: Omit<StockAdjustment, 'id' | 'createdAt'>): Promise<StockAdjustment> {
  return mockApiCall({
    ...data,
    id: Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
  })
}
