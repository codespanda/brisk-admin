
import {
  ResponsiveContainer, LineChart as RechartsLineChart,
  Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

interface LineChartSeries {
  dataKey: string
  label: string
  color: string
  strokeDasharray?: string
}

interface LineChartProps {
  data: Record<string, string | number>[]
  xAxisKey: string
  series: LineChartSeries[]
  height?: number
}

export function LineChart({ data, xAxisKey, series, height = 300 }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey={xAxisKey} className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
        <YAxis className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Legend />
        {series.map((s) => (
          <Line
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            strokeDasharray={s.strokeDasharray}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
