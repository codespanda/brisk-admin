import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Menu, Search, LogOut, User, Settings, Store, ShoppingCart, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useNotificationStore } from '@/stores/notification-store'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatRelativeDate, cn } from '@/lib/utils'
import type { Notification } from '@/types'

const notificationIcons: Record<Notification['type'], { icon: typeof Info; className: string }> = {
  info: { icon: Info, className: 'text-info bg-info/10' },
  success: { icon: CheckCircle, className: 'text-success bg-success/10' },
  warning: { icon: AlertTriangle, className: 'text-warning-foreground bg-warning/10' },
  error: { icon: XCircle, className: 'text-danger bg-danger/10' },
}

export function Header() {
  const { setMobileOpen } = useSidebarStore()
  const { notifications, unreadCount, markAllRead, markRead } = useNotificationStore()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      {!isDesktop && (
        <Button variant="ghost" size="sm" onClick={() => setMobileOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Search bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search something..."
          className="max-w-xl pl-9 bg-transparent border-0 shadow-none focus-visible:ring-0 text-sm"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Popover open={notifOpen} onOpenChange={setNotifOpen}>
          <PopoverTrigger
            className="relative inline-flex items-center justify-center rounded-full h-9 w-9 text-sm transition-colors hover:bg-muted focus-visible:outline-none"
          >
            <Bell className="h-[18px] w-[18px] text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-danger-foreground">
                {unreadCount}
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent align="end" className="w-96 p-0">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Notifications</p>
                <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
              </div>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-auto text-xs p-0 text-primary" onClick={markAllRead}>
                  Mark all read
                </Button>
              )}
            </div>
            <Separator />
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.slice(0, 5).map((n) => {
                const iconConfig = notificationIcons[n.type]
                const Icon = iconConfig.icon
                return (
                  <button
                    key={n.id}
                    type="button"
                    className={cn(
                      'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50',
                      !n.read && 'bg-primary/[0.03]'
                    )}
                    onClick={() => {
                      if (!n.read) markRead(n.id)
                    }}
                  >
                    <div className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full', iconConfig.className)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={cn('text-sm truncate', !n.read ? 'font-semibold' : 'font-medium')}>{n.title}</p>
                        {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                      <p className="text-[11px] text-muted-foreground/70 mt-1">{formatRelativeDate(n.createdAt)}</p>
                    </div>
                  </button>
                )
              })}
            </div>
            <Separator />
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm text-primary hover:text-primary"
                onClick={() => {
                  setNotifOpen(false)
                  navigate('/notifications')
                }}
              >
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Divider */}
        <div className="hidden h-6 w-px bg-border lg:block" />

        {/* Brand */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              <Store className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-left focus-visible:outline-none">
              <p className="text-sm font-semibold leading-tight">Store Admin</p>
              <p className="text-xs text-muted-foreground leading-tight">Brand</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <User className="mr-2 h-4 w-4" />Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/login')}>
                <LogOut className="mr-2 h-4 w-4" />Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
