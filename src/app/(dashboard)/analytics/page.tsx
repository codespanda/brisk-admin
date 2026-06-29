import { PageHeader } from '@/components/shared/page-header'
import { SalesDashboard } from '@/features/analytics/components/sales-dashboard'
import { getSalesAnalytics } from '@/services/analytics.service'

export default async function AnalyticsPage() {
  const data = await getSalesAnalytics()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Analytics"
        description="Detailed overview of your sales performance"
      />
      <SalesDashboard data={data} />
    </div>
  )
}
