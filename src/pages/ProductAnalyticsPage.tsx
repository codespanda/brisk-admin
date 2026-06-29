import { useEffect, useState } from 'react'
import { getProductAnalytics } from '@/services/analytics.service'
import { PageHeader } from '@/components/shared/page-header'
import { ProductAnalyticsView } from '@/features/analytics/components/product-analytics-view'
import type { ProductAnalytics } from '@/types'

export default function ProductAnalyticsPage() {
  const [data, setData] = useState<ProductAnalytics | null>(null)

  useEffect(() => {
    getProductAnalytics().then(setData)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader title="Product Analytics" description="Performance metrics for your product catalog" />
      {data && <ProductAnalyticsView data={data} />}
    </div>
  )
}
