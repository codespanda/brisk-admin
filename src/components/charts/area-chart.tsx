"use client"

import {
  ResponsiveContainer, AreaChart as RechartsAreaChart,
  Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

interface AreaChartSeries {
  dataKey: string
  label: string
  color: string
  fillOpacity?: number
}

interface AreaChartProps {
  data: Record<string, string | number>[]
  xAxisKey: string
  series: AreaChartSeries[]
  height?: number
  stacked?: boolean
}

export function AreaChart({ data, xAxisKey, series, height = 300, stacked }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
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
          <Area
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.label}
            stroke={s.color}
            fill={s.color}
            fillOpacity={s.fillOpacity ?? 0.1}
            stackId={stacked ? 'stack' : undefined}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}
