import { useEffect, useState } from 'react'
import { getCustomerAnalytics } from '@/services/analytics.service'
import { PageHeader } from '@/components/shared/page-header'
import { CustomerAnalyticsView } from '@/features/analytics/components/customer-analytics-view'
import type { CustomerAnalytics } from '@/types'

export default function CustomerAnalyticsPage() {
  const [data, setData] = useState<CustomerAnalytics | null>(null)

  useEffect(() => {
    getCustomerAnalytics().then(setData)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader title="Customer Analytics" description="Insights into your customer base and behavior" />
      {data && <CustomerAnalyticsView data={data} />}
    </div>
  )
}
