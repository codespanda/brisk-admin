import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  Tags,
  Megaphone,
  BarChart3,
  Settings,
  FileText,
  LogIn,
  UserPlus,
  KeyRound,
  MailCheck,
  ShieldAlert,
  FileQuestion,
  ServerCrash,
  Component,
  FormInput,
  ChartLine,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  children?: NavItem[]
  external?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navigation: NavGroup[] = [
  {
    label: 'Main',
    items: [
      {
        label: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
      },
      {
        label: 'Products',
        href: '/products',
        icon: Package,
      },
      {
        label: 'Orders',
        href: '/orders',
        icon: ShoppingCart,
      },
      {
        label: 'Customers',
        href: '/customers',
        icon: Users,
      },
      {
        label: 'Inventory',
        href: '/inventory',
        icon: Warehouse,
        children: [
          { label: 'Overview', href: '/inventory', icon: Warehouse },
          { label: 'Adjustments', href: '/inventory/adjustments', icon: Warehouse },
          { label: 'Warehouses', href: '/inventory/warehouses', icon: Warehouse },
        ],
      },
      {
        label: 'Discounts',
        href: '/discounts',
        icon: Tags,
      },
      {
        label: 'Marketing',
        href: '/marketing',
        icon: Megaphone,
        children: [
          { label: 'Overview', href: '/marketing', icon: Megaphone },
          { label: 'Campaigns', href: '/marketing/campaigns', icon: Megaphone },
          { label: 'Email', href: '/marketing/email', icon: Megaphone },
        ],
      },
      {
        label: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        children: [
          { label: 'Sales', href: '/analytics', icon: BarChart3 },
          { label: 'Products', href: '/analytics/products', icon: BarChart3 },
          { label: 'Customers', href: '/analytics/customers', icon: BarChart3 },
        ],
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
        children: [
          { label: 'Store', href: '/settings', icon: Settings },
          { label: 'Users & Roles', href: '/settings/users', icon: Settings },
        ],
      },
    ],
  },
  {
    label: 'Pages',
    items: [
      {
        label: 'Authentication',
        href: '/login',
        icon: FileText,
        children: [
          { label: 'Login', href: '/login', icon: LogIn, external: true },
          { label: 'Register', href: '/register', icon: UserPlus, external: true },
          { label: 'Forgot Password', href: '/forgot-password', icon: KeyRound, external: true },
          { label: 'Reset Password', href: '/reset-password', icon: ShieldAlert, external: true },
          { label: 'Verify Email', href: '/verify-email', icon: MailCheck, external: true },
        ],
      },
      {
        label: '404 Not Found',
        href: '/not-found-demo',
        icon: FileQuestion,
        external: true,
      },
      {
        label: '500 Server Error',
        href: '/error-demo',
        icon: ServerCrash,
        external: true,
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      {
        label: 'Components',
        href: '/resources/components',
        icon: Component,
      },
      {
        label: 'Forms',
        href: '/resources/forms',
        icon: FormInput,
      },
      {
        label: 'Charts',
        href: '/resources/charts',
        icon: ChartLine,
      },
    ],
  },
]
