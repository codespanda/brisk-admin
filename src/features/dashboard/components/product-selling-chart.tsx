
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'

const data = [
  { date: 'Jun 3', sold: 45, returned: 8 },
  { date: 'Jun 6', sold: 52, returned: 12 },
  { date: 'Jun 9', sold: 38, returned: 5 },
  { date: 'Jun 12', sold: 65, returned: 15 },
  { date: 'Jun 15', sold: 48, returned: 10 },
  { date: 'Jun 18', sold: 72, returned: 18 },
  { date: 'Jun 21', sold: 58, returned: 8 },
  { date: 'Jun 24', sold: 80, returned: 12 },
  { date: 'Jun 27', sold: 68, returned: 14 },
  { date: 'Jun 30', sold: 90, returned: 20 },
]

export function ProductSellingChart() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Product Selling</CardTitle>
        <select className="rounded-lg border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
          <option>Sales and returns</option>
        </select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="date"
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
            />
            <Bar
              dataKey="sold"
              name="Products sold"
              fill="var(--color-primary)"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="returned"
              name="Products returned"
              fill="var(--color-chart-3)"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
