"use client"

import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartCard } from '@/components/shared/chart-card'
import { LineChart } from '@/components/charts/line-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { AreaChart } from '@/components/charts/area-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import { HorizontalBarChart } from '@/components/charts/horizontal-bar-chart'
import {
  ResponsiveContainer,
  RadarChart as RechartsRadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis,
  ComposedChart, Line, Bar, Area,
  Treemap,
  RadialBarChart as RechartsRadialBarChart, RadialBar, Legend,
  FunnelChart as RechartsFunnelChart, Funnel, Cell, LabelList,
} from 'recharts'

// --- Sample Data ---

const lineData = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 3800, expenses: 2600 },
  { month: 'Mar', revenue: 5100, expenses: 3100 },
  { month: 'Apr', revenue: 4600, expenses: 2900 },
  { month: 'May', revenue: 5800, expenses: 3400 },
  { month: 'Jun', revenue: 6200, expenses: 3600 },
  { month: 'Jul', revenue: 5900, expenses: 3500 },
  { month: 'Aug', revenue: 6800, expenses: 3800 },
]

const barData = [
  { category: 'Electronics', sales: 4500 },
  { category: 'Clothing', sales: 3200 },
  { category: 'Home', sales: 2800 },
  { category: 'Sports', sales: 2100 },
  { category: 'Books', sales: 1800 },
  { category: 'Toys', sales: 1500 },
]

const areaData = [
  { month: 'Jan', users: 120, sessions: 280 },
  { month: 'Feb', users: 135, sessions: 310 },
  { month: 'Mar', users: 148, sessions: 340 },
  { month: 'Apr', users: 162, sessions: 365 },
  { month: 'May', users: 175, sessions: 390 },
  { month: 'Jun', users: 186, sessions: 420 },
  { month: 'Jul', users: 198, sessions: 445 },
  { month: 'Aug', users: 215, sessions: 480 },
]

const donutData = [
  { name: 'Direct', value: 400, color: 'var(--color-primary)' },
  { name: 'Social', value: 300, color: 'var(--color-chart-2)' },
  { name: 'Email', value: 200, color: 'var(--color-chart-3)' },
  { name: 'Referral', value: 150, color: 'var(--color-chart-4)' },
  { name: 'Other', value: 100, color: 'var(--color-chart-5)' },
]

const horizontalBarData = [
  { name: 'Product A', revenue: 18750 },
  { name: 'Product B', revenue: 14560 },
  { name: 'Product C', revenue: 10800 },
  { name: 'Product D', revenue: 8745 },
  { name: 'Product E', revenue: 6450 },
]

const radarData = [
  { subject: 'Quality', A: 85, B: 65 },
  { subject: 'Price', A: 70, B: 80 },
  { subject: 'Design', A: 90, B: 75 },
  { subject: 'Support', A: 75, B: 85 },
  { subject: 'Delivery', A: 80, B: 70 },
  { subject: 'Features', A: 88, B: 72 },
]

const scatterData = [
  { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
  { x: 200, y: 350, z: 300 }, { x: 180, y: 150, z: 350 },
  { x: 230, y: 280, z: 420 }, { x: 160, y: 320, z: 380 },
]

const composedData = [
  { month: 'Jan', revenue: 4200, orders: 120, avg: 35 },
  { month: 'Feb', revenue: 3800, orders: 98, avg: 38.8 },
  { month: 'Mar', revenue: 5100, orders: 140, avg: 36.4 },
  { month: 'Apr', revenue: 4600, orders: 108, avg: 42.6 },
  { month: 'May', revenue: 5800, orders: 155, avg: 37.4 },
  { month: 'Jun', revenue: 6200, orders: 170, avg: 36.5 },
]

const radialBarData = [
  { name: 'Q1', value: 75, fill: 'var(--color-primary)' },
  { name: 'Q2', value: 62, fill: 'var(--color-chart-2)' },
  { name: 'Q3', value: 88, fill: 'var(--color-chart-3)' },
  { name: 'Q4', value: 45, fill: 'var(--color-chart-4)' },
]

const funnelData = [
  { name: 'Visited', value: 5000, fill: 'var(--color-primary)' },
  { name: 'Added to Cart', value: 3200, fill: 'var(--color-chart-2)' },
  { name: 'Checkout', value: 1800, fill: 'var(--color-chart-3)' },
  { name: 'Purchased', value: 1200, fill: 'var(--color-chart-4)' },
  { name: 'Repeat', value: 400, fill: 'var(--color-chart-5)' },
]

const treemapData = [
  { name: 'Electronics', size: 4500, fill: 'var(--color-primary)' },
  { name: 'Clothing', size: 3200, fill: 'var(--color-chart-2)' },
  { name: 'Home & Kitchen', size: 2800, fill: 'var(--color-chart-3)' },
  { name: 'Sports', size: 2100, fill: 'var(--color-chart-4)' },
  { name: 'Books', size: 1800, fill: 'var(--color-chart-5)' },
  { name: 'Toys', size: 1500, fill: 'var(--color-muted-foreground)' },
]

const tooltipStyle = {
  backgroundColor: 'var(--color-card)',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  fontSize: '12px',
}

export default function ChartsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Charts"
        description="Chart components available for data visualization"
      />

      {/* Line Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Line Chart" subtitle="Revenue vs Expenses over time">
          <LineChart
            data={lineData}
            xAxisKey="month"
            series={[
              { dataKey: 'revenue', label: 'Revenue', color: 'var(--color-primary)' },
              { dataKey: 'expenses', label: 'Expenses', color: 'var(--color-chart-5)', strokeDasharray: '5 5' },
            ]}
          />
        </ChartCard>

        <ChartCard title="Area Chart" subtitle="Users & Sessions growth">
          <AreaChart
            data={areaData}
            xAxisKey="month"
            series={[
              { dataKey: 'sessions', label: 'Sessions', color: 'var(--color-primary)', fillOpacity: 0.1 },
              { dataKey: 'users', label: 'Users', color: 'var(--color-chart-2)', fillOpacity: 0.15 },
            ]}
          />
        </ChartCard>
      </div>

      {/* Bar Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Bar Chart" subtitle="Sales by category">
          <BarChart
            data={barData}
            xAxisKey="category"
            dataKey="sales"
            color="var(--color-chart-2)"
          />
        </ChartCard>

        <ChartCard title="Horizontal Bar Chart" subtitle="Top products by revenue">
          <HorizontalBarChart
            data={horizontalBarData}
            xAxisKey="name"
            dataKey="revenue"
            color="var(--color-primary)"
          />
        </ChartCard>
      </div>

      {/* Donut & Stacked Area */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Donut Chart" subtitle="Traffic sources">
          <DonutChart data={donutData} />
        </ChartCard>

        <ChartCard title="Stacked Area Chart" subtitle="New vs Returning users">
          <AreaChart
            data={areaData}
            xAxisKey="month"
            stacked
            series={[
              { dataKey: 'users', label: 'New Users', color: 'var(--color-primary)', fillOpacity: 0.4 },
              { dataKey: 'sessions', label: 'Returning', color: 'var(--color-chart-3)', fillOpacity: 0.4 },
            ]}
          />
        </ChartCard>
      </div>

      {/* Radar & Scatter */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Radar Chart</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Compare multiple dimensions across datasets</p>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsRadarChart data={radarData}>
                <PolarGrid className="stroke-border" />
                <PolarAngleAxis dataKey="subject" className="text-xs fill-muted-foreground" />
                <PolarRadiusAxis angle={30} className="text-xs fill-muted-foreground" />
                <Radar name="Product A" dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.2} />
                <Radar name="Product B" dataKey="B" stroke="var(--color-chart-3)" fill="var(--color-chart-3)" fillOpacity={0.2} />
                <Legend />
                <Tooltip contentStyle={tooltipStyle} />
              </RechartsRadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Scatter Chart</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Visualize correlation between variables</p>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsScatterChart margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" dataKey="x" name="Price" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
                <YAxis type="number" dataKey="y" name="Sales" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
                <ZAxis type="number" dataKey="z" range={[40, 400]} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={scatterData} fill="var(--color-primary)" fillOpacity={0.7} />
              </RechartsScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Composed & Radial Bar */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Composed Chart</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Mix bar, line, and area in one chart</p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={composedData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="month" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" dataKey="avg" name="Avg Order" stroke="var(--color-chart-3)" strokeWidth={2} dot={{ r: 3 }} />
                <Area yAxisId="left" type="monotone" dataKey="orders" name="Orders" fill="var(--color-chart-2)" stroke="var(--color-chart-2)" fillOpacity={0.1} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Radial Bar Chart</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Quarterly performance targets</p>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsRadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialBarData} startAngle={180} endAngle={0}>
                <RadialBar background dataKey="value" cornerRadius={6} />
                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" />
                <Tooltip contentStyle={tooltipStyle} />
              </RechartsRadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Funnel & Treemap */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Funnel Chart</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Conversion funnel from visit to repeat purchase</p>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsFunnelChart>
                <Tooltip contentStyle={tooltipStyle} />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  {funnelData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                  <LabelList position="right" className="fill-foreground text-xs" />
                </Funnel>
              </RechartsFunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Treemap</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Category size by revenue contribution</p>
            <ResponsiveContainer width="100%" height={300}>
              <Treemap
                data={treemapData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="var(--color-background)"
                content={(props: Record<string, unknown>) => {
                  const { x, y, width, height, name, fill } = props as { x: number; y: number; width: number; height: number; name: string; fill: string }
                  return (
                    <g>
                      <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} opacity={0.85} />
                      {width > 50 && height > 30 && (
                        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central" className="fill-white text-xs font-medium">
                          {name}
                        </text>
                      )}
                    </g>
                  )
                }}
              />
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Multi-line & Multi-bar */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Multi-Series Line" subtitle="Multiple metrics over time">
          <LineChart
            data={lineData}
            xAxisKey="month"
            series={[
              { dataKey: 'revenue', label: 'Revenue', color: 'var(--color-primary)' },
              { dataKey: 'expenses', label: 'Expenses', color: 'var(--color-chart-4)' },
            ]}
            height={250}
          />
        </ChartCard>

        <ChartCard title="Single Area" subtitle="Smooth area with gradient">
          <AreaChart
            data={lineData}
            xAxisKey="month"
            series={[
              { dataKey: 'revenue', label: 'Revenue', color: 'var(--color-chart-2)', fillOpacity: 0.2 },
            ]}
            height={250}
          />
        </ChartCard>
      </div>
    </div>
  )
}
