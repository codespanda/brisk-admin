
import type { ColumnDef } from '@tanstack/react-table'
import { Card, CardContent } from '@/components/ui/card'
import { ChartCard } from '@/components/shared/chart-card'
import { HorizontalBarChart } from '@/components/charts/horizontal-bar-chart'
import { DataTable } from '@/components/tables/data-table'
import { formatCurrency } from '@/lib/utils'
import type { ProductAnalytics, ProductPerformance } from '@/types'

const columns: ColumnDef<ProductPerformance>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span className="font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: 'unitsSold',
    header: 'Units Sold',
    cell: ({ row }) => row.original.unitsSold.toLocaleString(),
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: ({ row }) => formatCurrency(row.original.revenue),
  },
  {
    accessorKey: 'returnRate',
    header: 'Return Rate',
    cell: ({ row }) => `${row.original.returnRate.toFixed(1)}%`,
  },
  {
    accessorKey: 'avgRating',
    header: 'Avg Rating',
    cell: ({ row }) => (
      <span className="flex items-center gap-1">
        <span className="text-yellow-500">&#9733;</span>
        {row.original.avgRating.toFixed(1)}
      </span>
    ),
  },
  {
    accessorKey: 'stockRemaining',
    header: 'Stock Remaining',
    cell: ({ row }) => {
      const stock = row.original.stockRemaining
      return (
        <span className={stock === 0 ? 'text-danger font-medium' : ''}>
          {stock.toLocaleString()}
        </span>
      )
    },
  },
]

interface ProductAnalyticsViewProps {
  data: ProductAnalytics
}

export function ProductAnalyticsView({ data }: ProductAnalyticsViewProps) {
  const topProductsData = data.topProducts.map((p) => ({
    name: p.name,
    revenue: p.revenue,
  }))

  return (
    <div className="space-y-6">
      <ChartCard
        title="Top Products by Revenue"
        subtitle="Best performing products this period"
      >
        <HorizontalBarChart
          data={topProductsData}
          xAxisKey="name"
          dataKey="revenue"
          height={340}
        />
      </ChartCard>

      <Card>
        <CardContent className="p-0">
          <div className="p-4">
            <DataTable
              columns={columns}
              data={data.products}
              searchKey="name"
              searchPlaceholder="Search products..."
              enablePagination
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
