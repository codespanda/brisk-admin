
import { StatCard } from '@/components/shared/stat-card'
import { ChartCard } from '@/components/shared/chart-card'
import { AreaChart } from '@/components/charts/area-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import type { CustomerAnalytics, SalesKpi } from '@/types'
import type { KpiData } from '@/types'

const CUSTOMER_KPI_ICONS: Record<string, string> = {
  'Total Customers': 'Users',
  'New This Month': 'TrendingUp',
  'Customer Retention': 'Repeat',
  'Avg Lifetime Value': 'DollarSign',
}

function kpiToKpiData(kpi: SalesKpi): KpiData {
  return {
    label: kpi.label,
    value: kpi.value,
    change: kpi.change,
    changeLabel: 'vs last period',
    icon: CUSTOMER_KPI_ICONS[kpi.label] ?? 'Package',
    trend: kpi.trend,
  }
}

interface CustomerAnalyticsViewProps {
  data: CustomerAnalytics
}

export function CustomerAnalyticsView({ data }: CustomerAnalyticsViewProps) {
  const kpiData: KpiData[] = data.kpis.map(kpiToKpiData)

  const acquisitionData = data.acquisitionBySource.map((item) => ({
    source: item.source,
    count: item.count,
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
          title="New vs Returning Customers"
          subtitle="Monthly customer breakdown"
        >
          <AreaChart
            data={data.newVsReturning}
            xAxisKey="month"
            series={[
              { dataKey: 'new', label: 'New', color: 'var(--color-primary)', fillOpacity: 0.2 },
              { dataKey: 'returning', label: 'Returning', color: 'var(--color-success)', fillOpacity: 0.2 },
            ]}
            stacked
            height={280}
          />
        </ChartCard>

        <ChartCard
          title="Acquisition by Source"
          subtitle="Where customers come from"
        >
          <BarChart
            data={acquisitionData}
            xAxisKey="source"
            dataKey="count"
            height={280}
          />
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Customer Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Segment</th>
                  <th className="pb-3 font-medium text-right">Customers</th>
                  <th className="pb-3 font-medium text-right">Revenue</th>
                  <th className="pb-3 font-medium text-right">AOV</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.segments.map((segment) => (
                  <tr key={segment.name}>
                    <td className="py-3 font-medium">{segment.name}</td>
                    <td className="py-3 text-right text-muted-foreground">{segment.customers.toLocaleString()}</td>
                    <td className="py-3 text-right text-muted-foreground">{formatCurrency(segment.revenue)}</td>
                    <td className="py-3 text-right text-muted-foreground">{formatCurrency(segment.averageOrderValue)}</td>
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
