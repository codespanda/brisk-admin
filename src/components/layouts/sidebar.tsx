import { Link, useLocation } from 'react-router-dom'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useAuthStore } from '@/stores/auth-store'
import { navigation, type NavItem, type NavGroup } from '@/constants/navigation'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Search, Sparkles } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'

function CollapsedSubmenu({ item, pathname, isGroupActive }: {
  item: NavItem
  pathname: string
  isGroupActive: boolean | undefined
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setMenuPos({ top: rect.top, left: rect.right + 8 })
    }
    setOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className={cn(
          'flex w-full items-center justify-center rounded-lg px-2 py-2 transition-colors cursor-pointer',
          isGroupActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
        )}
      >
        <item.icon className="h-4 w-4 shrink-0" />
      </div>
      {open && (
        <div
          className="fixed z-[100] w-48 rounded-lg border bg-popover p-1 shadow-lg"
          style={{ top: menuPos.top, left: menuPos.left }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">{item.label}</p>
          {item.children?.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              {...(child.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center rounded-md px-2 py-1.5 text-sm transition-colors',
                pathname === child.href && !child.external
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {child.label}
              {child.external && <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function NavItemComponent({ item, isCollapsed, pathname }: {
  item: NavItem
  isCollapsed: boolean
  pathname: string
}) {
  const [isExpanded, setIsExpanded] = useState(
    item.children?.some((child) => pathname === child.href) ?? false
  )
  const isActive = pathname === item.href && !item.children
  const isGroupActive = item.children?.some((child) => pathname === child.href)

  if (item.children && isCollapsed) {
    return (
      <CollapsedSubmenu item={item} pathname={pathname} isGroupActive={isGroupActive} />
    )
  }

  if (item.children && !isCollapsed) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isGroupActive
              ? 'text-sidebar-accent-foreground'
              : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
          )}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isExpanded && 'rotate-180')} />
        </button>
        {isExpanded && (
          <div className="ml-7 mt-0.5 space-y-0.5">
            {item.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                {...(child.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={cn(
                  'flex items-center rounded-lg px-3 py-1.5 text-sm transition-colors',
                  pathname === child.href && !child.external
                    ? 'text-sidebar-primary font-medium'
                    : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
                )}
              >
                {child.label}
                {child.external && <ExternalLink className="ml-auto h-3 w-3 text-sidebar-foreground/40" />}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  const linkClassName = cn(
    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
    isCollapsed && 'justify-center px-2'
  )

  const externalProps = item.external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={<Link to={item.href} {...externalProps} className={linkClassName} />}
        >
          <item.icon className="h-4 w-4 shrink-0" />
        </TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Link to={item.href} {...externalProps} className={linkClassName}>
      <item.icon className="h-4 w-4 shrink-0" />
      <span>{item.label}</span>
      {item.external && <ExternalLink className="ml-auto h-3 w-3 text-sidebar-foreground/40" />}
    </Link>
  )
}

function SidebarContent({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle?: () => void }) {
  const { pathname } = useLocation()
  const { user } = useAuthStore()

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() ?? 'A'

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* User Profile */}
      <div className={cn(
        'flex items-center gap-3 border-b border-sidebar-border px-4 py-4',
        isCollapsed && 'justify-center px-2 py-4'
      )}>
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-white/20 text-white text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-sidebar-accent-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground truncate">{user?.email}</p>
          </div>
        )}
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sidebar-foreground" />
            <Input
              placeholder="Search..."
              className="h-8 bg-sidebar-accent/50 border-sidebar-border pl-8 text-sm text-sidebar-accent-foreground placeholder:text-sidebar-foreground"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
        <TooltipProvider delay={0}>
          <nav className="space-y-4">
            {navigation.map((group: NavGroup) => (
              <div key={group.label}>
                {!isCollapsed && (
                  <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                    {group.label}
                  </p>
                )}
                {isCollapsed && (
                  <div className="mb-2 mx-auto h-px w-6 bg-sidebar-border" />
                )}
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavItemComponent
                      key={item.href}
                      item={item}
                      isCollapsed={isCollapsed}
                      pathname={pathname}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </TooltipProvider>
      </div>

      {/* Upgrade CTA */}
      {!isCollapsed && (
        <div className="mx-3 mb-3 rounded-xl bg-white/10 border border-white/10 p-4 text-center backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
          <p className="mt-0.5 text-xs text-white/60">Unlock all features and modules</p>
          <button className="mt-3 w-full rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-sidebar transition-colors hover:bg-white/90">
            <Sparkles className="mr-1.5 inline h-3 w-3" />
            Upgrade Now
          </button>
        </div>
      )}

      {/* Collapse Toggle */}
      {onToggle && (
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={onToggle}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              isCollapsed && 'justify-center px-2'
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 shrink-0" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const { isCollapsed, toggle, isMobileOpen, setMobileOpen } = useSidebarStore()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (!isDesktop) {
    return (
      <Sheet open={isMobileOpen} onOpenChange={(open) => setMobileOpen(open)}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContent isCollapsed={false} />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside className={cn(
      'hidden h-screen border-r border-sidebar-border transition-all duration-300 lg:block',
      isCollapsed ? 'w-[72px]' : 'w-[260px]'
    )}>
      <SidebarContent isCollapsed={isCollapsed} onToggle={toggle} />
    </aside>
  )
}
