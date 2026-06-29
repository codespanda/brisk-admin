import { mockApiCall } from './api-client'
import type { SalesAnalytics, ProductAnalytics, CustomerAnalytics, KpiData } from '@/types'

export async function getDashboardKpis(): Promise<KpiData[]> {
  return mockApiCall([
    { label: 'Revenue', value: '$48,250.00', change: 12.5, changeLabel: 'vs last month', icon: 'DollarSign', trend: 'up' as const },
    { label: 'Orders', value: '1,234', change: 8.2, changeLabel: 'vs last month', icon: 'ShoppingCart', trend: 'up' as const },
    { label: 'Customers', value: '856', change: 5.1, changeLabel: 'vs last month', icon: 'Users', trend: 'up' as const },
    { label: 'Conversion Rate', value: '3.2%', change: 0.4, changeLabel: 'vs last month', icon: 'TrendingUp', trend: 'up' as const },
    { label: 'Avg Order Value', value: '$39.10', change: 2.3, changeLabel: 'vs last month', icon: 'Receipt', trend: 'up' as const },
    { label: 'Products Sold', value: '2,847', change: 15.7, changeLabel: 'vs last month', icon: 'Package', trend: 'up' as const },
  ])
}

export async function getSalesAnalytics(): Promise<SalesAnalytics> {
  return mockApiCall({
    kpis: [
      { label: 'Total Revenue', value: '$148,250.00', change: 12.5, trend: 'up' as const },
      { label: 'Total Orders', value: '3,456', change: 8.2, trend: 'up' as const },
      { label: 'Conversion Rate', value: '3.2%', change: 0.4, trend: 'up' as const },
      { label: 'Repeat Purchase Rate', value: '28.4%', change: 3.1, trend: 'up' as const },
    ],
    revenueOverTime: [
      { month: 'Jul', revenue: 9800, previousRevenue: 8200 },
      { month: 'Aug', revenue: 10500, previousRevenue: 9100 },
      { month: 'Sep', revenue: 11200, previousRevenue: 9800 },
      { month: 'Oct', revenue: 10800, previousRevenue: 10200 },
      { month: 'Nov', revenue: 14500, previousRevenue: 12800 },
      { month: 'Dec', revenue: 18200, previousRevenue: 15600 },
      { month: 'Jan', revenue: 12100, previousRevenue: 11000 },
      { month: 'Feb', revenue: 11800, previousRevenue: 10500 },
      { month: 'Mar', revenue: 13200, previousRevenue: 11800 },
      { month: 'Apr', revenue: 12900, previousRevenue: 12200 },
      { month: 'May', revenue: 14800, previousRevenue: 13100 },
      { month: 'Jun', revenue: 16400, previousRevenue: 14200 },
    ],
    ordersByStatus: [
      { status: 'Delivered', count: 1845 },
      { status: 'Shipped', count: 423 },
      { status: 'Processing', count: 312 },
      { status: 'Pending', count: 198 },
      { status: 'Cancelled', count: 156 },
      { status: 'Refunded', count: 89 },
    ],
    revenueByCategory: [
      { category: 'Electronics', revenue: 45200 },
      { category: 'Clothing', revenue: 28900 },
      { category: 'Home & Kitchen', revenue: 22400 },
      { category: 'Sports', revenue: 18700 },
      { category: 'Footwear', revenue: 15800 },
      { category: 'Accessories', revenue: 12300 },
    ],
    dailyOrders: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2026, 4, 21 + i).toISOString().split('T')[0],
      orders: Math.floor(Math.random() * 60) + 30,
    })),
    monthlySummary: [
      { month: 'Jan 2026', revenue: 12100, orders: 298, averageOrderValue: 40.60, conversionRate: 2.8 },
      { month: 'Feb 2026', revenue: 11800, orders: 275, averageOrderValue: 42.91, conversionRate: 2.9 },
      { month: 'Mar 2026', revenue: 13200, orders: 310, averageOrderValue: 42.58, conversionRate: 3.0 },
      { month: 'Apr 2026', revenue: 12900, orders: 295, averageOrderValue: 43.73, conversionRate: 3.1 },
      { month: 'May 2026', revenue: 14800, orders: 342, averageOrderValue: 43.27, conversionRate: 3.2 },
      { month: 'Jun 2026', revenue: 16400, orders: 380, averageOrderValue: 43.16, conversionRate: 3.2 },
    ],
  })
}

export async function getProductAnalytics(): Promise<ProductAnalytics> {
  return mockApiCall({
    topProducts: [
      { name: 'Smart Watch Series X', revenue: 18750 },
      { name: 'Wireless Headphones', revenue: 14560 },
      { name: 'Running Shoes Pro', revenue: 10800 },
      { name: 'Organic Cotton T-Shirt', revenue: 8745 },
      { name: 'Aromatherapy Candle Set', revenue: 6450 },
      { name: 'Stainless Steel Water Bottle', revenue: 5620 },
      { name: 'Yoga Mat Premium', revenue: 4500 },
      { name: 'Ceramic Coffee Mug Set', revenue: 3900 },
      { name: 'Wireless Charging Pad', revenue: 3200 },
      { name: 'Leather Laptop Bag', revenue: 2400 },
    ],
    products: [
      { id: '5', name: 'Smart Watch Series X', unitsSold: 75, revenue: 18750, returnRate: 2.1, avgRating: 4.8, stockRemaining: 5 },
      { id: '1', name: 'Wireless Bluetooth Headphones', unitsSold: 112, revenue: 14560, returnRate: 3.2, avgRating: 4.5, stockRemaining: 145 },
      { id: '4', name: 'Running Shoes Pro', unitsSold: 120, revenue: 10800, returnRate: 5.8, avgRating: 4.3, stockRemaining: 87 },
      { id: '2', name: 'Organic Cotton T-Shirt', unitsSold: 250, revenue: 8745, returnRate: 8.4, avgRating: 4.1, stockRemaining: 523 },
      { id: '7', name: 'Aromatherapy Candle Set', unitsSold: 150, revenue: 6450, returnRate: 1.3, avgRating: 4.7, stockRemaining: 198 },
      { id: '3', name: 'Stainless Steel Water Bottle', unitsSold: 225, revenue: 5620, returnRate: 0.9, avgRating: 4.6, stockRemaining: 312 },
      { id: '8', name: 'Yoga Mat Premium', unitsSold: 90, revenue: 4500, returnRate: 2.2, avgRating: 4.4, stockRemaining: 234 },
      { id: '9', name: 'Ceramic Coffee Mug Set', unitsSold: 100, revenue: 3900, returnRate: 4.0, avgRating: 4.2, stockRemaining: 67 },
      { id: '10', name: 'Wireless Charging Pad', unitsSold: 160, revenue: 3200, returnRate: 1.9, avgRating: 4.0, stockRemaining: 412 },
      { id: '6', name: 'Leather Laptop Bag', unitsSold: 30, revenue: 2400, returnRate: 6.7, avgRating: 3.8, stockRemaining: 0 },
    ],
  })
}

export async function getCustomerAnalytics(): Promise<CustomerAnalytics> {
  return mockApiCall({
    kpis: [
      { label: 'Total Customers', value: '2,450', change: 12.0, trend: 'up' as const },
      { label: 'New This Month', value: '186', change: 12.0, trend: 'up' as const },
      { label: 'Customer Retention', value: '68.5%', change: 2.3, trend: 'up' as const },
      { label: 'Avg Lifetime Value', value: '$342.00', change: 8.1, trend: 'up' as const },
    ],
    newVsReturning: [
      { month: 'Jul', new: 120, returning: 280 },
      { month: 'Aug', new: 135, returning: 295 },
      { month: 'Sep', new: 142, returning: 310 },
      { month: 'Oct', new: 128, returning: 322 },
      { month: 'Nov', new: 168, returning: 345 },
      { month: 'Dec', new: 195, returning: 380 },
      { month: 'Jan', new: 148, returning: 335 },
      { month: 'Feb', new: 138, returning: 342 },
      { month: 'Mar', new: 155, returning: 358 },
      { month: 'Apr', new: 162, returning: 365 },
      { month: 'May', new: 175, returning: 372 },
      { month: 'Jun', new: 186, returning: 385 },
    ],
    acquisitionBySource: [
      { source: 'Direct', count: 680 },
      { source: 'Social Media', count: 520 },
      { source: 'Email', count: 445 },
      { source: 'Referral', count: 380 },
      { source: 'Organic Search', count: 325 },
      { source: 'Paid Ads', count: 100 },
    ],
    segments: [
      { name: 'VIP (>$500 spent)', customers: 124, revenue: 82400, averageOrderValue: 156 },
      { name: 'Regular ($100-$500)', customers: 856, revenue: 48200, averageOrderValue: 89 },
      { name: 'New (<$100)', customers: 1470, revenue: 17650, averageOrderValue: 42 },
    ],
  })
}
