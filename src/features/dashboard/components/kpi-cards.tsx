
import { Card, CardContent } from '@/components/ui/card'
import {
  ResponsiveContainer, LineChart, Line,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts'

const revenueSparkline = [
  { v: 18 }, { v: 22 }, { v: 19 }, { v: 25 }, { v: 21 }, { v: 28 },
  { v: 24 }, { v: 30 }, { v: 27 }, { v: 35 }, { v: 32 }, { v: 38 },
  { v: 34 }, { v: 40 }, { v: 36 }, { v: 42 }, { v: 48 },
]

const ordersBarData = [
  { v: 30 }, { v: 45 }, { v: 35 }, { v: 50 }, { v: 40 }, { v: 55 },
  { v: 60 }, { v: 48 }, { v: 65 }, { v: 52 }, { v: 70 }, { v: 58 },
  { v: 75 }, { v: 62 }, { v: 80 },
]

const customerDonut = [
  { name: 'Men', value: 63, color: 'var(--color-primary)' },
  { name: 'Women', value: 37, color: 'var(--color-chart-3)' },
]

export function KpiCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Total Revenue */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">$27,430</p>
              <p className="mt-1 text-xs font-medium text-success">+12.3% vs last month</p>
            </div>
            <div className="h-16 w-28">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueSparkline}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Customers</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">1,562</p>
              <p className="mt-1 text-xs font-medium text-success">+3.3% vs last month</p>
            </div>
            <div className="h-16 w-16">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerDonut}
                    cx="50%"
                    cy="50%"
                    innerRadius={18}
                    outerRadius={30}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {customerDonut.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--color-primary)' }} />
              Men
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--color-chart-3)' }} />
              Women
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Orders */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Orders</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">18,491</p>
              <p className="mt-1 text-xs font-medium text-success">+7.1% vs last month</p>
            </div>
            <div className="h-16 w-28">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersBarData}>
                  <Bar dataKey="v" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
