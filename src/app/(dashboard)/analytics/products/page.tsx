import { PageHeader } from '@/components/shared/page-header'
import { ProductAnalyticsView } from '@/features/analytics/components/product-analytics-view'
import { getProductAnalytics } from '@/services/analytics.service'

export default async function ProductAnalyticsPage() {
  const data = await getProductAnalytics()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Analytics"
        description="Performance metrics for your product catalog"
      />
      <ProductAnalyticsView data={data} />
    </div>
  )
}
