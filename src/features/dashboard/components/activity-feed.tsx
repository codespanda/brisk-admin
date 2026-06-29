import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const activities = [
  { name: 'Jane Cooper', action: 'Purchased', product: 'Cotton T-Shirt', time: '2m ago', initials: 'JC' },
  { name: 'Jeremy Wilson', action: 'Purchased', product: 'Smart Watch X', time: '15m ago', initials: 'JW' },
  { name: 'Alice Brown', action: 'Returned', product: 'Running Shoes', time: '1h ago', initials: 'AB' },
  { name: 'Bob Wilson', action: 'Purchased', product: 'Wireless Headphones', time: '2h ago', initials: 'BW' },
  { name: 'Diana Miller', action: 'Purchased', product: 'Candle Set', time: '3h ago', initials: 'DM' },
]

export function ActivityFeed() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Activity</CardTitle>
        <Link href="/orders">
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            View all <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{activity.name}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.action}{' '}
                  <span className="font-medium text-primary">{activity.product}</span>
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
