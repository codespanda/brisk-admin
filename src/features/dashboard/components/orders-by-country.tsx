import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const countries = [
  { name: 'United States', values: [30, 30, 33, 30, 25, 30] },
  { name: 'Germany', values: [20, 25, 22, 28, 20, 22] },
  { name: 'United Kingdom', values: [15, 12, 18, 14, 16, 15] },
  { name: 'Canada', values: [10, 15, 12, 10, 18, 14] },
  { name: 'Australia', values: [8, 10, 8, 12, 10, 9] },
]

const dateLabels = ['Jun 5', 'Jun 10', 'Jun 15', 'Jun 20', 'Jun 25', 'Jun 30']

function getVariant(value: number): string {
  if (value >= 30) return 'bg-success text-success-foreground'
  if (value >= 20) return 'bg-chart-2 text-foreground'
  if (value >= 15) return 'bg-info/20 text-info-foreground'
  return 'bg-muted text-muted-foreground'
}

export function OrdersByCountry() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Orders by country</CardTitle>
        <select className="rounded-lg border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
          <option>Percentage</option>
          <option>Count</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground">
                <th className="pb-3 text-left font-medium">Country</th>
                {dateLabels.map((d) => (
                  <th key={d} className="pb-3 text-center font-medium">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.name} className="border-t border-border">
                  <td className="py-3 pr-4 font-medium">{country.name}</td>
                  {country.values.map((val, i) => (
                    <td key={i} className="py-3 text-center">
                      <span className={cn(
                        'inline-block rounded-md px-3 py-1 text-xs font-semibold',
                        getVariant(val)
                      )}>
                        {val}%
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
