export interface SalesAnalytics {
  kpis: SalesKpi[]
  revenueOverTime: { month: string; revenue: number; previousRevenue: number }[]
  ordersByStatus: { status: string; count: number }[]
  revenueByCategory: { category: string; revenue: number }[]
  dailyOrders: { date: string; orders: number }[]
  monthlySummary: MonthlySummary[]
}

export interface SalesKpi {
  label: string
  value: string
  change: number
  trend: 'up' | 'down' | 'neutral'
}

export interface MonthlySummary {
  month: string
  revenue: number
  orders: number
  averageOrderValue: number
  conversionRate: number
}

export interface ProductAnalytics {
  topProducts: { name: string; revenue: number }[]
  products: ProductPerformance[]
}

export interface ProductPerformance {
  id: string
  name: string
  unitsSold: number
  revenue: number
  returnRate: number
  avgRating: number
  stockRemaining: number
}

export interface CustomerAnalytics {
  kpis: SalesKpi[]
  newVsReturning: { month: string; new: number; returning: number }[]
  acquisitionBySource: { source: string; count: number }[]
  segments: CustomerSegment[]
}

export interface CustomerSegment {
  name: string
  customers: number
  revenue: number
  averageOrderValue: number
}
