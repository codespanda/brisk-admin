import { useEffect, useState } from 'react'
import { getSalesAnalytics } from '@/services/analytics.service'
import { PageHeader } from '@/components/shared/page-header'
import { SalesDashboard } from '@/features/analytics/components/sales-dashboard'
import type { SalesAnalytics } from '@/types'

export default function AnalyticsPage() {
  const [data, setData] = useState<SalesAnalytics | null>(null)

  useEffect(() => {
    getSalesAnalytics().then(setData)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader title="Sales Analytics" description="Detailed overview of your sales performance" />
      {data && <SalesDashboard data={data} />}
    </div>
  )
}
