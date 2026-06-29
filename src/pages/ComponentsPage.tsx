import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/shared/status-badge'
import { StatCard } from '@/components/shared/stat-card'
import { MetricCard } from '@/components/shared/metric-card'
import { EmptyState } from '@/components/shared/empty-state'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { ChartCard } from '@/components/shared/chart-card'
import { SearchInput } from '@/components/shared/search-input'
import { FilterSelect } from '@/components/shared/filter-select'
import {
  DollarSign, ShoppingCart, Package, Trash2, Search, Plus, MoreVertical,
  Bell, Settings, User, LogOut, ChevronRight, Mail, Copy,
  Download, Share2, Heart, Star, Eye, ArrowRight, Loader2,
  AlertTriangle, CheckCircle, XCircle, Info, Home,
} from 'lucide-react'
import { toast } from 'sonner'

export default function ComponentsPage() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [switchVal, setSwitchVal] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [filterVal, setFilterVal] = useState('all')
  const [radioVal, setRadioVal] = useState('option1')

  return (
    <div className="space-y-8">
      <PageHeader title="Components" description="Reusable UI components used across the admin panel" />

      {/* Breadcrumbs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Breadcrumbs</CardTitle>
          <CardDescription>Navigation trail showing current page location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Default (auto-generated from route)</p>
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/resources/components" className="hover:text-foreground transition-colors">Resources</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">Components</span>
            </nav>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">With many levels</p>
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              {[
                { label: null, href: '/', icon: true },
                { label: 'Products', href: '/products' },
                { label: 'Electronics', href: '/products' },
                { label: 'Headphones', href: '/products' },
                { label: 'Edit', href: null },
              ].map((crumb, i) => (
                <Fragment key={i}>
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                  {crumb.icon ? (
                    <Link to={crumb.href!} className="hover:text-foreground transition-colors"><Home className="h-4 w-4" /></Link>
                  ) : crumb.href ? (
                    <Link to={crumb.href} className="hover:text-foreground transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="font-medium text-foreground">{crumb.label}</span>
                  )}
                </Fragment>
              ))}
            </nav>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Pill style</p>
            <nav className="flex items-center gap-1">
              {['Dashboard', 'Orders', 'ORD-1234'].map((label, i, arr) => (
                <Fragment key={i}>
                  {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                  <span className={`rounded-md px-2 py-1 text-xs ${i === arr.length - 1 ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted cursor-pointer'}`}>
                    {label}
                  </span>
                </Fragment>
              ))}
            </nav>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">With separator slash</p>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              {['Home', 'Settings', 'Users & Roles'].map((label, i, arr) => (
                <Fragment key={i}>
                  {i > 0 && <span className="text-border">/</span>}
                  {i === arr.length - 1 ? (
                    <span className="font-medium text-foreground">{label}</span>
                  ) : (
                    <span className="hover:text-foreground cursor-pointer transition-colors">{label}</span>
                  )}
                </Fragment>
              ))}
            </nav>
          </div>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Buttons</CardTitle>
          <CardDescription>Various button styles, sizes, and states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Variants</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">With Icons & States</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button className="gap-2"><Plus className="h-4 w-4" />Create</Button>
              <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
              <Button variant="secondary" className="gap-2"><Share2 className="h-4 w-4" />Share</Button>
              <Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Icon Buttons</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" className="h-9 w-9 p-0"><Heart className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0"><Star className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0"><Copy className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0"><MoreVertical className="h-4 w-4" /></Button>
              <Button variant="destructive" size="sm" className="h-9 w-9 p-0"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Badges & Status</CardTitle>
          <CardDescription>Labels, tags, and status indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Badge Variants</p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Status Badges</p>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge label="Active" variant="success" />
              <StatusBadge label="Pending" variant="warning" />
              <StatusBadge label="Processing" variant="info" />
              <StatusBadge label="Draft" variant="muted" />
              <StatusBadge label="Cancelled" variant="danger" />
              <StatusBadge label="Archived" variant="secondary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avatars */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Avatars</CardTitle>
          <CardDescription>User avatars with initials fallback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Sizes</p>
            <div className="flex items-end gap-4">
              {[{ size: 'h-8 w-8', label: '32px', text: 'SM', textSize: 'text-xs' }, { size: 'h-10 w-10', label: '40px', text: 'MD', textSize: 'text-sm' }, { size: 'h-12 w-12', label: '48px', text: 'LG', textSize: 'text-base' }, { size: 'h-16 w-16', label: '64px', text: 'XL', textSize: 'text-xl' }].map((a) => (
                <div key={a.label} className="text-center">
                  <Avatar className={a.size}><AvatarFallback className={a.textSize}>{a.text}</AvatarFallback></Avatar>
                  <p className="text-[10px] text-muted-foreground mt-1">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Colored</p>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary text-primary-foreground">AU</AvatarFallback></Avatar>
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-success text-success-foreground">JD</AvatarFallback></Avatar>
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-info text-info-foreground">MK</AvatarFallback></Avatar>
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-warning text-warning-foreground">RL</AvatarFallback></Avatar>
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-danger text-danger-foreground">CB</AvatarFallback></Avatar>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Avatar Group</p>
            <div className="flex -space-x-3">
              {['JD', 'AB', 'CK', 'MR', 'LS'].map((initials, i) => (
                <Avatar key={i} className="h-10 w-10 border-2 border-background">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">+3</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search & Filter</CardTitle>
          <CardDescription>Search input and filter dropdowns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput value={searchVal} onChange={setSearchVal} placeholder="Search items..." />
            <FilterSelect label="All" value={filterVal} onValueChange={setFilterVal} options={[
              { label: 'All', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]} />
          </div>
        </CardContent>
      </Card>

      {/* Switch, Checkbox, Radio */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Switch, Checkbox & Radio</CardTitle>
          <CardDescription>Toggle and selection controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Switch</p>
            <div className="flex items-center justify-between max-w-sm rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive order updates via email</p>
              </div>
              <Switch checked={switchVal} onCheckedChange={setSwitchVal} />
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Checkbox</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2"><Checkbox id="c1" defaultChecked /><Label htmlFor="c1" className="font-normal">Checked</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="c2" /><Label htmlFor="c2" className="font-normal">Unchecked</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="c3" disabled /><Label htmlFor="c3" className="font-normal text-muted-foreground">Disabled</Label></div>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Radio Group</p>
            <RadioGroup value={radioVal} onValueChange={setRadioVal} className="space-y-2">
              <div className="flex items-center space-x-2"><RadioGroupItem value="option1" id="r1" /><Label htmlFor="r1" className="font-normal">Option One</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="option2" id="r2" /><Label htmlFor="r2" className="font-normal">Option Two</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="option3" id="r3" /><Label htmlFor="r3" className="font-normal">Option Three</Label></div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Progress</CardTitle>
          <CardDescription>Progress bars and loading indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-lg">
          {[{ label: 'Complete', value: 100 }, { label: 'In Progress', value: 72 }, { label: 'Starting', value: 15 }, { label: 'Empty', value: 0 }].map((p) => (
            <div key={p.label} className="space-y-1">
              <div className="flex justify-between text-sm"><span>{p.label}</span><span>{p.value}%</span></div>
              <Progress value={p.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tooltips & Popovers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tooltips & Popovers</CardTitle>
          <CardDescription>Hover and click overlays</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Tooltips</p>
            <div className="flex flex-wrap gap-3">
              <TooltipProvider>
                {(['top', 'right', 'bottom'] as const).map((side) => (
                  <Tooltip key={side}>
                    <TooltipTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 h-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                      Hover me ({side})
                    </TooltipTrigger>
                    <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Popover</p>
            <Popover>
              <PopoverTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 h-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Open Popover</PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Popover Content</p>
                  <p className="text-xs text-muted-foreground">This is a popover with custom content. It can contain any elements.</p>
                  <div className="space-y-1.5"><Label className="text-xs">Email</Label><Input placeholder="email@example.com" className="h-8 text-sm" /></div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Dropdown Menu */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dropdown Menu</CardTitle>
          <CardDescription>Contextual action menus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 h-9 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none">
                Actions <ChevronRight className="h-4 w-4 rotate-90" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                <DropdownMenuItem><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
                <DropdownMenuItem><Download className="h-4 w-4" /> Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md h-9 w-9 p-0 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none">
                <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><User className="h-4 w-4" /> Profile</DropdownMenuItem>
                <DropdownMenuItem><Settings className="h-4 w-4" /> Settings</DropdownMenuItem>
                <DropdownMenuItem><Bell className="h-4 w-4" /> Notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><LogOut className="h-4 w-4" /> Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Dialog & Sheet */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dialog & Sheet</CardTitle>
          <CardDescription>Modal dialogs and side drawers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
            <Button variant="outline" onClick={() => setSheetOpen(true)}>Open Sheet</Button>
            <Button variant="outline" onClick={() => setConfirmOpen(true)}><Trash2 className="mr-2 h-4 w-4" />Confirm Dialog</Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Table</CardTitle>
          <CardDescription>Data tables with various cell types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: 'John Doe', email: 'john@example.com', status: 'Active', variant: 'success' as const, role: 'Admin', amount: '$2,450.00' },
                  { name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', variant: 'warning' as const, role: 'Manager', amount: '$1,890.00' },
                  { name: 'Bob Wilson', email: 'bob@example.com', status: 'Inactive', variant: 'muted' as const, role: 'Support', amount: '$542.00' },
                ].map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{row.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                        <div><p className="text-sm font-medium">{row.name}</p><p className="text-xs text-muted-foreground">{row.email}</p></div>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge label={row.status} variant={row.variant} /></TableCell>
                    <TableCell className="text-sm">{row.role}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stat Cards</CardTitle>
          <CardDescription>KPI cards with trend indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard data={{ label: 'Revenue', value: '$48,250', change: 12.5, changeLabel: 'vs last month', icon: 'DollarSign', trend: 'up' }} />
            <StatCard data={{ label: 'Orders', value: '1,234', change: -3.2, changeLabel: 'vs last month', icon: 'ShoppingCart', trend: 'down' }} />
            <StatCard data={{ label: 'Products', value: '856', change: 5.1, changeLabel: 'vs last month', icon: 'Package', trend: 'up' }} />
          </div>
        </CardContent>
      </Card>

      {/* Metric Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Metric Cards</CardTitle>
          <CardDescription>Simple metric display with icon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard label="Lifetime Value" value="$2,450" icon={DollarSign} />
            <MetricCard label="Total Orders" value="24" icon={ShoppingCart} />
            <MetricCard label="Products" value="856" icon={Package} />
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Alerts & Notifications</CardTitle>
          <CardDescription>Inline alert messages and banners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border p-4"><Info className="h-5 w-5 text-info shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Information</p><p className="text-sm text-muted-foreground">This is an informational message for the user.</p></div></div>
          <div className="flex items-start gap-3 rounded-lg border border-success/30 bg-success/5 p-4"><CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Success</p><p className="text-sm text-muted-foreground">Your changes have been saved successfully.</p></div></div>
          <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4"><AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Warning</p><p className="text-sm text-muted-foreground">Your trial period is about to expire in 3 days.</p></div></div>
          <div className="flex items-start gap-3 rounded-lg border border-danger/30 bg-danger/5 p-4"><XCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Error</p><p className="text-sm text-muted-foreground">Failed to process payment. Please try again.</p></div></div>
        </CardContent>
      </Card>

      {/* Toasts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Toast Notifications</CardTitle>
          <CardDescription>Temporary notification messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={() => toast.success('Changes saved successfully!')}>Success</Button>
            <Button variant="outline" size="sm" onClick={() => toast.error('Something went wrong!')}>Error</Button>
            <Button variant="outline" size="sm" onClick={() => toast.warning('Please review your changes')}>Warning</Button>
            <Button variant="outline" size="sm" onClick={() => toast.info('New update available')}>Info</Button>
            <Button variant="outline" size="sm" onClick={() => toast.promise(new Promise(r => setTimeout(r, 2000)), { loading: 'Saving...', success: 'Saved!', error: 'Failed!' })}>Promise</Button>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Empty State</CardTitle>
          <CardDescription>Placeholder when no data is available</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState icon={Search} title="No results found" description="Try adjusting your search or filters to find what you are looking for." action={<Button variant="outline" size="sm">Clear filters</Button>} />
        </CardContent>
      </Card>

      {/* Skeletons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Skeletons</CardTitle>
          <CardDescription>Loading placeholder animations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">User Row</p>
            <div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-48" /></div></div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Card Grid</p>
            <div className="grid grid-cols-3 gap-3"><Skeleton className="h-24 rounded-lg" /><Skeleton className="h-24 rounded-lg" /><Skeleton className="h-24 rounded-lg" /></div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Form</p>
            <div className="space-y-3 max-w-sm"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /><Skeleton className="h-4 w-20" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-24" /></div>
          </div>
        </CardContent>
      </Card>

      {/* Separator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Separator</CardTitle>
          <CardDescription>Visual divider for content sections</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">Content above separator</p>
          <Separator />
          <p className="text-sm">Content below separator</p>
          <div className="flex items-center gap-4 h-6">
            <span className="text-sm">Item 1</span><Separator orientation="vertical" /><span className="text-sm">Item 2</span><Separator orientation="vertical" /><span className="text-sm">Item 3</span>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Typography</CardTitle>
          <CardDescription>Text styles and hierarchy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Heading 1</h1>
          <h2 className="text-2xl font-bold tracking-tight">Heading 2</h2>
          <h3 className="text-xl font-semibold">Heading 3</h3>
          <h4 className="text-lg font-semibold">Heading 4</h4>
          <p className="text-sm">Body text — The quick brown fox jumps over the lazy dog.</p>
          <p className="text-sm text-muted-foreground">Muted text — Secondary information displayed here.</p>
          <p className="text-xs text-muted-foreground">Small text — Used for captions and timestamps.</p>
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Inline code</code>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Dialog Title</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This is a dialog component. It can be used for confirmations, forms, or displaying important information.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setDialogOpen(false); toast.success('Confirmed!') }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sheet */}
      <Sheet open={sheetOpen} onOpenChange={(open) => setSheetOpen(open)}>
        <SheetContent side="right" className="w-[400px] p-6">
          <h2 className="text-lg font-semibold mb-2">Sheet Panel</h2>
          <p className="text-sm text-muted-foreground mb-4">This is a side sheet / drawer component. It slides in from the right.</p>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name</Label><Input placeholder="Enter name" /></div>
            <div className="space-y-2"><Label>Email</Label><Input placeholder="Enter email" type="email" /></div>
            <Button className="w-full" onClick={() => { setSheetOpen(false); toast.success('Saved!') }}>Save</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => { setConfirmOpen(false); toast.success('Item deleted') }}
      />
    </div>
  )
}
