import { useEffect, useState } from 'react'
import { getCampaigns } from '@/services/marketing.service'
import { PageHeader } from '@/components/shared/page-header'
import { StatCard } from '@/components/shared/stat-card'
import { ChartCard } from '@/components/shared/chart-card'
import { BarChart } from '@/components/charts/bar-chart'
import { StatusBadge } from '@/components/shared/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { campaignStatusMap } from '@/constants/status-maps'
import { formatCurrency, formatNumber } from '@/lib/utils'
import type { KpiData, Campaign } from '@/types'

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    getCampaigns().then(setCampaigns)
  }, [])

  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length
  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0)

  const kpis: KpiData[] = [
    { label: 'Active Campaigns', value: String(activeCampaigns), change: 12, changeLabel: 'vs last month', icon: 'Megaphone', trend: 'up' },
    { label: 'Total Reach', value: formatNumber(totalReach), change: 8, changeLabel: 'vs last month', icon: 'Eye', trend: 'up' },
    { label: 'Avg Open Rate', value: '32.4%', change: 2, changeLabel: 'vs last month', icon: 'Mail', trend: 'up' },
    { label: 'Avg Click Rate', value: '4.8%', change: -1, changeLabel: 'vs last month', icon: 'MousePointer', trend: 'down' },
  ]

  const chartData = campaigns.map((c) => ({
    name: c.name.length > 18 ? c.name.slice(0, 18) + '…' : c.name,
    reach: c.reach,
    conversions: c.conversions,
  }))

  const recentCampaigns = campaigns.slice(0, 5)

  return (
    <div className="space-y-6">
      <PageHeader title="Marketing" description="Track your marketing campaigns and performance" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.label} data={kpi} />
        ))}
      </div>

      <ChartCard title="Campaign Performance" subtitle="Reach vs conversions per campaign">
        <BarChart data={chartData} xAxisKey="name" dataKey="reach" color="hsl(var(--primary))" height={280} />
      </ChartCard>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Reach</th>
                  <th className="pb-3 font-medium text-right">Conversions</th>
                  <th className="pb-3 font-medium text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentCampaigns.map((campaign) => {
                  const status = campaignStatusMap[campaign.status]
                  return (
                    <tr key={campaign.id}>
                      <td className="py-3 pr-4 font-medium">{campaign.name}</td>
                      <td className="py-3 pr-4"><StatusBadge label={status.label} variant={status.variant} /></td>
                      <td className="py-3 text-right text-muted-foreground">{formatNumber(campaign.reach)}</td>
                      <td className="py-3 text-right text-muted-foreground">{formatNumber(campaign.conversions)}</td>
                      <td className="py-3 text-right font-medium">{formatCurrency(campaign.revenue)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
