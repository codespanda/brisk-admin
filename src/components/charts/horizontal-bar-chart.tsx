"use client"

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'

interface HorizontalBarChartProps {
  data: Record<string, string | number>[]
  xAxisKey: string
  dataKey: string
  color?: string
  height?: number
}

export function HorizontalBarChart({ data, xAxisKey, dataKey, color = 'var(--color-primary)', height = 300 }: HorizontalBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
        <XAxis type="number" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey={xAxisKey}
          className="text-xs fill-muted-foreground"
          tickLine={false}
          axisLine={false}
          width={140}
          tick={({ x, y, payload }) => (
            <text x={x} y={y} dy={4} textAnchor="end" className="text-[11px] fill-muted-foreground">
              {String(payload.value).length > 20 ? String(payload.value).slice(0, 18) + '...' : payload.value}
            </text>
          )}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
