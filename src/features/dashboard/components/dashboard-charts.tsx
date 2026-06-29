"use client"

import { ChartCard } from '@/components/shared/chart-card'
import { LineChart } from '@/components/charts/line-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { AreaChart } from '@/components/charts/area-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import type { SalesAnalytics } from '@/types'

interface DashboardChartsProps {
  analytics: SalesAnalytics
}

export function DashboardCharts({ analytics }: DashboardChartsProps) {
  const donutData = analytics.ordersByStatus.map((item, i) => ({
    name: item.status,
    value: item.count,
    color: [
      'var(--color-primary)',
      'var(--color-chart-2)',
      'var(--color-chart-3)',
      'var(--color-chart-4)',
      'var(--color-chart-5)',
      'var(--color-muted-foreground)',
    ][i % 6],
  }))

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ChartCard title="Revenue Trend" subtitle="Last 12 months">
        <LineChart
          data={analytics.revenueOverTime}
          xAxisKey="month"
          series={[
            { dataKey: 'revenue', label: 'Revenue', color: 'var(--color-primary)' },
            { dataKey: 'previousRevenue', label: 'Previous', color: 'var(--color-muted-foreground)', strokeDasharray: '5 5' },
          ]}
        />
      </ChartCard>

      <ChartCard title="Sales by Category">
        <BarChart
          data={analytics.revenueByCategory}
          xAxisKey="category"
          dataKey="revenue"
          color="var(--color-chart-2)"
        />
      </ChartCard>

      <ChartCard title="Order Status Distribution">
        <DonutChart data={donutData} />
      </ChartCard>

      <ChartCard title="Daily Orders" subtitle="Last 30 days">
        <AreaChart
          data={analytics.dailyOrders}
          xAxisKey="date"
          series={[
            { dataKey: 'orders', label: 'Orders', color: 'var(--color-chart-4)' },
          ]}
        />
      </ChartCard>
    </div>
  )
}
