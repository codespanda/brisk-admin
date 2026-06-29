import { PageHeader } from '@/components/shared/page-header'
import { CustomerAnalyticsView } from '@/features/analytics/components/customer-analytics-view'
import { getCustomerAnalytics } from '@/services/analytics.service'

export default async function CustomerAnalyticsPage() {
  const data = await getCustomerAnalytics()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Analytics"
        description="Insights into your customer base and behavior"
      />
      <CustomerAnalyticsView data={data} />
    </div>
  )
}
