import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { KpiCards } from '@/features/dashboard/components/kpi-cards'
import { ProductSellingChart } from '@/features/dashboard/components/product-selling-chart'
import { BestSellers } from '@/features/dashboard/components/best-sellers'
import { OrdersByCountry } from '@/features/dashboard/components/orders-by-country'
import { ActivityFeed } from '@/features/dashboard/components/activity-feed'
import { CalendarDays, Upload } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description="Detailed information about your store"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              This month
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Export
            </Button>
          </>
        }
      />

      {/* KPI Cards Row */}
      <KpiCards />

      {/* Product Selling + Best Sellers */}
      <div className="grid gap-4 lg:grid-cols-5">
        <ProductSellingChart />
        <BestSellers />
      </div>

      {/* Orders by Country + Activity */}
      <div className="grid gap-4 lg:grid-cols-5">
        <OrdersByCountry />
        <ActivityFeed />
      </div>
    </div>
  )
}
