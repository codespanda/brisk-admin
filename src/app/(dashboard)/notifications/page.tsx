"use client"

import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { useNotificationStore } from '@/stores/notification-store'
import { formatRelativeDate, cn } from '@/lib/utils'
import {
  CheckCircle, AlertTriangle, XCircle, Info, CheckCheck, Trash2, Bell,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Notification } from '@/types'

const notificationIcons: Record<Notification['type'], { icon: typeof Info; className: string }> = {
  info: { icon: Info, className: 'text-info bg-info/10' },
  success: { icon: CheckCircle, className: 'text-success bg-success/10' },
  warning: { icon: AlertTriangle, className: 'text-warning-foreground bg-warning/10' },
  error: { icon: XCircle, className: 'text-danger bg-danger/10' },
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead, remove, removeAll } = useNotificationStore()
  const [removeAllOpen, setRemoveAllOpen] = useState(false)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        actions={
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" className="gap-2" onClick={markAllRead}>
                <CheckCheck className="h-4 w-4" />
                Mark all as read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="outline" size="sm" className="gap-2 text-danger hover:text-danger" onClick={() => setRemoveAllOpen(true)}>
                <Trash2 className="h-4 w-4" />
                Remove all
              </Button>
            )}
          </div>
        }
      />

      {/* Summary */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{notifications.length} total</span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
        <span className={cn(unreadCount > 0 && 'text-primary font-medium')}>{unreadCount} unread</span>
      </div>

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-muted p-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
              <p className="mt-1 text-sm text-muted-foreground">You're all caught up!</p>
            </div>
          ) : (
            <div>
              {notifications.map((n, i) => {
                const iconConfig = notificationIcons[n.type]
                const Icon = iconConfig.icon
                return (
                  <div key={n.id}>
                    <div
                      className={cn(
                        'flex items-start gap-4 px-6 py-4 transition-colors',
                        !n.read && 'bg-primary/[0.03]'
                      )}
                    >
                      <div className={cn('mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full', iconConfig.className)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={cn('text-sm', !n.read ? 'font-semibold' : 'font-medium')}>{n.title}</p>
                          {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1.5">{formatRelativeDate(n.createdAt)}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1 mt-1">
                        {!n.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => markRead(n.id)}
                          >
                            <CheckCheck className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-danger"
                          onClick={() => {
                            remove(n.id)
                            toast.success('Notification removed')
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {i < notifications.length - 1 && <Separator />}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={removeAllOpen}
        onOpenChange={setRemoveAllOpen}
        title="Remove All Notifications"
        description="Are you sure you want to remove all notifications? This action cannot be undone."
        confirmLabel="Remove All"
        variant="destructive"
        onConfirm={() => {
          removeAll()
          setRemoveAllOpen(false)
          toast.success('All notifications removed')
        }}
      />
    </div>
  )
}
