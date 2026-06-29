
import { Mail, Eye, MousePointer } from 'lucide-react'
import { MetricCard } from '@/components/shared/metric-card'
import { ChartCard } from '@/components/shared/chart-card'
import { AreaChart } from '@/components/charts/area-chart'
import { StatusBadge } from '@/components/shared/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { EmailCampaign } from '@/types'

interface EmailDashboardProps {
  campaigns: EmailCampaign[]
}

const emailStatusMap = {
  draft: { label: 'Draft', variant: 'muted' as const },
  sent: { label: 'Sent', variant: 'success' as const },
  scheduled: { label: 'Scheduled', variant: 'info' as const },
}

export function EmailDashboard({ campaigns }: EmailDashboardProps) {
  const totalSent = campaigns.reduce((sum, c) => sum + c.sentCount, 0)
  const avgOpenRate =
    campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length
      : 0
  const avgClickRate =
    campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + c.clickRate, 0) / campaigns.length
      : 0

  const chartData = campaigns
    .filter((c) => c.sentCount > 0)
    .map((c) => ({
      subject: c.subject.length > 20 ? c.subject.slice(0, 20) + 'â€¦' : c.subject,
      sent: c.sentCount,
      opened: c.openCount,
      clicked: c.clickCount,
    }))

  const recentCampaigns = campaigns.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Total Sent"
          value={totalSent.toLocaleString()}
          icon={Mail}
        />
        <MetricCard
          label="Avg Open Rate"
          value={`${avgOpenRate.toFixed(1)}%`}
          icon={Eye}
        />
        <MetricCard
          label="Avg Click Rate"
          value={`${avgClickRate.toFixed(1)}%`}
          icon={MousePointer}
        />
      </div>

      <ChartCard
        title="Email Performance Over Time"
        subtitle="Sent, opened, and clicked counts per campaign"
      >
        <AreaChart
          data={chartData}
          xAxisKey="subject"
          series={[
            { dataKey: 'sent', label: 'Sent', color: 'var(--color-primary)' },
            { dataKey: 'opened', label: 'Opened', color: 'var(--color-success)' },
            { dataKey: 'clicked', label: 'Clicked', color: 'var(--color-info)' },
          ]}
          height={280}
        />
      </ChartCard>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Email Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Subject</th>
                  <th className="pb-3 font-medium text-right">Sent</th>
                  <th className="pb-3 font-medium text-right">Open Rate</th>
                  <th className="pb-3 font-medium text-right">Click Rate</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="py-3">
                    <td className="py-3 pr-4 max-w-[240px] truncate font-medium">{campaign.subject}</td>
                    <td className="py-3 text-right text-muted-foreground">{campaign.sentCount.toLocaleString()}</td>
                    <td className="py-3 text-right text-muted-foreground">{campaign.openRate.toFixed(1)}%</td>
                    <td className="py-3 text-right text-muted-foreground">{campaign.clickRate.toFixed(1)}%</td>
                    <td className="py-3 text-right">
                      <StatusBadge
                        label={emailStatusMap[campaign.status].label}
                        variant={emailStatusMap[campaign.status].variant}
                      />
                    </td>
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
