"use client"

import { StatCard } from '@/components/shared/stat-card'
import { ChartCard } from '@/components/shared/chart-card'
import { LineChart } from '@/components/charts/line-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { AreaChart } from '@/components/charts/area-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import type { SalesAnalytics, SalesKpi } from '@/types'
import type { KpiData } from '@/types'

const ORDER_STATUS_COLORS: Record<string, string> = {
  Delivered: 'var(--color-success)',
  Shipped: 'var(--color-info)',
  Processing: 'var(--color-primary)',
  Pending: 'var(--color-warning)',
  Cancelled: 'var(--color-danger)',
  Refunded: 'var(--color-muted-foreground)',
}

function kpiToKpiData(kpi: SalesKpi): KpiData {
  const iconMap: Record<string, string> = {
    'Total Revenue': 'DollarSign',
    'Total Orders': 'ShoppingCart',
    'Conversion Rate': 'TrendingUp',
    'Repeat Purchase Rate': 'Repeat',
  }

  return {
    label: kpi.label,
    value: kpi.value,
    change: kpi.change,
    changeLabel: 'vs last period',
    icon: iconMap[kpi.label] ?? 'Package',
    trend: kpi.trend,
  }
}

interface SalesDashboardProps {
  data: SalesAnalytics
}

export function SalesDashboard({ data }: SalesDashboardProps) {
  const kpiData: KpiData[] = data.kpis.map(kpiToKpiData)

  const donutData = data.ordersByStatus.map((item) => ({
    name: item.status,
    value: item.count,
    color: ORDER_STATUS_COLORS[item.status] ?? 'var(--color-muted-foreground)',
  }))

  const revenueByCategoryData = data.revenueByCategory.map((item) => ({
    category: item.category,
    revenue: item.revenue,
  }))

  const dailyOrdersData = data.dailyOrders.map((item) => ({
    date: item.date,
    orders: item.orders,
  }))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <StatCard key={kpi.label} data={kpi} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Revenue Over Time"
          subtitle="Current vs previous period"
        >
          <LineChart
            data={data.revenueOverTime}
            xAxisKey="month"
            series={[
              { dataKey: 'revenue', label: 'Revenue', color: 'var(--color-primary)' },
              { dataKey: 'previousRevenue', label: 'Previous Period', color: 'var(--color-muted-foreground)', strokeDasharray: '4 4' },
            ]}
            height={280}
          />
        </ChartCard>

        <ChartCard
          title="Orders by Status"
          subtitle="Distribution of order statuses"
        >
          <DonutChart data={donutData} height={280} />
        </ChartCard>

        <ChartCard
          title="Revenue by Category"
          subtitle="Top performing categories"
        >
          <BarChart
            data={revenueByCategoryData}
            xAxisKey="category"
            dataKey="revenue"
            height={280}
          />
        </ChartCard>

        <ChartCard
          title="Daily Orders"
          subtitle="Order volume over the past 30 days"
        >
          <AreaChart
            data={dailyOrdersData}
            xAxisKey="date"
            series={[
              { dataKey: 'orders', label: 'Orders', color: 'var(--color-primary)', fillOpacity: 0.15 },
            ]}
            height={280}
          />
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Month</th>
                  <th className="pb-3 font-medium text-right">Revenue</th>
                  <th className="pb-3 font-medium text-right">Orders</th>
                  <th className="pb-3 font-medium text-right">AOV</th>
                  <th className="pb-3 font-medium text-right">Conversion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.monthlySummary.map((row) => (
                  <tr key={row.month}>
                    <td className="py-3 font-medium">{row.month}</td>
                    <td className="py-3 text-right text-muted-foreground">{formatCurrency(row.revenue)}</td>
                    <td className="py-3 text-right text-muted-foreground">{row.orders.toLocaleString()}</td>
                    <td className="py-3 text-right text-muted-foreground">{formatCurrency(row.averageOrderValue)}</td>
                    <td className="py-3 text-right text-muted-foreground">{row.conversionRate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
