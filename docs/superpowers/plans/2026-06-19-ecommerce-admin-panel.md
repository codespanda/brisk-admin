# Ecommerce Admin Panel Template — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, production-grade ecommerce admin panel template with 10 feature modules, reusable component systems, and a Slack-inspired theme.

**Architecture:** Feature-first module organization. Server Components by default, Client Components only for interactivity. Thin route pages importing from `features/`. Shared UI in `components/`, mock data in `services/`.

**Tech Stack:** Next.js 15+ (App Router), TypeScript strict, Tailwind CSS v4, shadcn/ui (New York), Lucide React, React Hook Form, Zod, TanStack Table, Recharts, Zustand, next-themes.

## Global Constraints

- TypeScript strict mode — no `any` types
- Server Components by default; `"use client"` only when required
- Colors via CSS variables only — never hardcode hex in components
- All mock service functions are `async` and return typed data
- Tailwind CSS v4 — uses `@theme` in CSS, not `tailwind.config.ts`
- shadcn/ui New York style
- All files in `src/` directory

---

### Task 1: Project Setup & Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/globals.css`, `src/lib/utils.ts`, `components.json`

**Interfaces:**
- Consumes: nothing
- Produces: Working Next.js 15 project with Tailwind v4, shadcn/ui configured, `cn()` utility

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/ram.kumar/Documents/snippets/ecommerce-admin
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes
```

- [ ] **Step 2: Install all dependencies**

```bash
npm install zustand @tanstack/react-table react-hook-form @hookform/resolvers zod recharts next-themes lucide-react
```

- [ ] **Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init -d --style new-york --base-color neutral --css-variables true
```

- [ ] **Step 4: Install required shadcn components**

```bash
npx shadcn@latest add button input label card badge separator skeleton table dropdown-menu dialog alert-dialog sheet tabs avatar popover select textarea switch checkbox radio-group toast sonner command progress tooltip scroll-area
```

- [ ] **Step 5: Verify project builds**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project with dependencies and shadcn/ui"
```

---

### Task 2: Theme System & Global Styles

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Tailwind v4, shadcn/ui initialized
- Produces: CSS custom properties for Slack-inspired light/dark themes, all shadcn variables mapped

- [ ] **Step 1: Replace globals.css with the Slack-inspired theme**

Replace the contents of `src/app/globals.css` with:

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-surface: var(--surface);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-danger: var(--danger);
  --color-danger-foreground: var(--danger-foreground);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;

  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0.012 285);

  --surface: oklch(0.975 0.002 285);

  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0.012 285);

  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0.012 285);

  --primary: oklch(0.25 0.08 320);
  --primary-foreground: oklch(0.98 0.005 320);

  --secondary: oklch(0.32 0.09 320);
  --secondary-foreground: oklch(0.98 0.005 320);

  --accent: oklch(0.82 0.15 85);
  --accent-foreground: oklch(0.2 0.05 85);

  --muted: oklch(0.965 0.002 285);
  --muted-foreground: oklch(0.45 0.01 285);

  --destructive: oklch(0.55 0.2 15);
  --destructive-foreground: oklch(0.98 0.01 15);

  --success: oklch(0.68 0.17 160);
  --success-foreground: oklch(0.98 0.01 160);

  --warning: oklch(0.82 0.15 85);
  --warning-foreground: oklch(0.2 0.05 85);

  --info: oklch(0.72 0.13 210);
  --info-foreground: oklch(0.15 0.04 210);

  --danger: oklch(0.55 0.22 15);
  --danger-foreground: oklch(0.98 0.01 15);

  --border: oklch(0.922 0.004 285);
  --input: oklch(0.922 0.004 285);
  --ring: oklch(0.25 0.08 320);

  --chart-1: oklch(0.25 0.08 320);
  --chart-2: oklch(0.68 0.17 160);
  --chart-3: oklch(0.82 0.15 85);
  --chart-4: oklch(0.72 0.13 210);
  --chart-5: oklch(0.55 0.22 15);

  --sidebar: oklch(0.25 0.08 320);
  --sidebar-foreground: oklch(0.92 0.01 320);
  --sidebar-primary: oklch(0.82 0.15 85);
  --sidebar-primary-foreground: oklch(0.2 0.05 85);
  --sidebar-accent: oklch(0.32 0.09 320);
  --sidebar-accent-foreground: oklch(0.92 0.01 320);
  --sidebar-border: oklch(0.35 0.06 320);
  --sidebar-ring: oklch(0.82 0.15 85);
}

.dark {
  --background: oklch(0.17 0.01 260);
  --foreground: oklch(0.98 0 0);

  --surface: oklch(0.21 0.01 260);

  --card: oklch(0.21 0.01 260);
  --card-foreground: oklch(0.98 0 0);

  --popover: oklch(0.21 0.01 260);
  --popover-foreground: oklch(0.98 0 0);

  --primary: oklch(0.38 0.1 320);
  --primary-foreground: oklch(0.98 0.005 320);

  --secondary: oklch(0.42 0.1 320);
  --secondary-foreground: oklch(0.98 0.005 320);

  --accent: oklch(0.82 0.15 85);
  --accent-foreground: oklch(0.2 0.05 85);

  --muted: oklch(0.27 0.01 260);
  --muted-foreground: oklch(0.7 0.005 260);

  --destructive: oklch(0.55 0.2 15);
  --destructive-foreground: oklch(0.98 0.01 15);

  --success: oklch(0.68 0.17 160);
  --success-foreground: oklch(0.98 0.01 160);

  --warning: oklch(0.82 0.15 85);
  --warning-foreground: oklch(0.2 0.05 85);

  --info: oklch(0.72 0.13 210);
  --info-foreground: oklch(0.15 0.04 210);

  --danger: oklch(0.55 0.22 15);
  --danger-foreground: oklch(0.98 0.01 15);

  --border: oklch(0.3 0.01 260);
  --input: oklch(0.3 0.01 260);
  --ring: oklch(0.38 0.1 320);

  --chart-1: oklch(0.45 0.12 320);
  --chart-2: oklch(0.68 0.17 160);
  --chart-3: oklch(0.82 0.15 85);
  --chart-4: oklch(0.72 0.13 210);
  --chart-5: oklch(0.55 0.22 15);

  --sidebar: oklch(0.15 0.01 260);
  --sidebar-foreground: oklch(0.92 0.01 320);
  --sidebar-primary: oklch(0.82 0.15 85);
  --sidebar-primary-foreground: oklch(0.2 0.05 85);
  --sidebar-accent: oklch(0.22 0.015 260);
  --sidebar-accent-foreground: oklch(0.92 0.01 320);
  --sidebar-border: oklch(0.28 0.01 260);
  --sidebar-ring: oklch(0.82 0.15 85);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add Slack-inspired theme system with light/dark CSS variables"
```

---

### Task 3: Shared Types

**Files:**
- Create: `src/types/common.ts`, `src/types/product.ts`, `src/types/order.ts`, `src/types/customer.ts`, `src/types/inventory.ts`, `src/types/discount.ts`, `src/types/marketing.ts`, `src/types/settings.ts`, `src/types/analytics.ts`, `src/types/index.ts`

**Interfaces:**
- Consumes: nothing
- Produces: All shared TypeScript interfaces used across features and services

- [ ] **Step 1: Create src/types/common.ts**

```typescript
export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  sku: string
  price: number
  quantity: number
  total: number
}

export interface TimelineEvent {
  id: string
  status: string
  description: string
  timestamp: string
}

export interface CustomerNote {
  id: string
  content: string
  createdBy: string
  createdAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string | null
  role: 'admin' | 'manager' | 'support'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ChartDataPoint {
  label: string
  [key: string]: string | number
}

export interface KpiData {
  label: string
  value: string
  change: number
  changeLabel: string
  icon: string
  trend: 'up' | 'down' | 'neutral'
}
```

- [ ] **Step 2: Create src/types/product.ts**

```typescript
export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  description: string
  category: string
  brand: string
  price: number
  comparePrice: number | null
  costPrice: number | null
  stock: number
  images: string[]
  tags: string[]
  status: ProductStatus
  createdAt: string
  updatedAt: string
}

export type ProductStatus = 'draft' | 'active' | 'archived'

export interface ProductFormData {
  name: string
  slug: string
  sku: string
  description: string
  category: string
  brand: string
  price: number
  comparePrice: number | null
  costPrice: number | null
  stock: number
  images: string[]
  tags: string[]
  status: ProductStatus
}
```

- [ ] **Step 3: Create src/types/order.ts**

```typescript
import type { Address, OrderItem, TimelineEvent } from './common'

export interface Order {
  id: string
  orderNumber: string
  customer: OrderCustomer
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingAddress: Address
  billingAddress: Address
  timeline: TimelineEvent[]
  createdAt: string
  updatedAt: string
}

export interface OrderCustomer {
  id: string
  name: string
  email: string
  phone: string
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export type PaymentStatus = 'pending' | 'paid' | 'refunded'
```

- [ ] **Step 4: Create src/types/customer.ts**

```typescript
import type { Address, CustomerNote } from './common'

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar: string | null
  status: CustomerStatus
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  addresses: Address[]
  notes: CustomerNote[]
  createdAt: string
  updatedAt: string
}

export type CustomerStatus = 'active' | 'inactive'
```

- [ ] **Step 5: Create src/types/inventory.ts**

```typescript
export interface InventoryItem {
  id: string
  productId: string
  productName: string
  sku: string
  category: string
  inStock: number
  reserved: number
  available: number
  threshold: number
  updatedAt: string
}

export interface StockAdjustment {
  id: string
  productId: string
  productName: string
  sku: string
  type: AdjustmentType
  quantity: number
  reason: string
  adjustedBy: string
  createdAt: string
}

export type AdjustmentType = 'received' | 'sold' | 'returned' | 'adjusted'

export interface Warehouse {
  id: string
  name: string
  location: string
  productCount: number
  capacity: number
  utilization: number
  status: 'active' | 'inactive'
}
```

- [ ] **Step 6: Create src/types/discount.ts**

```typescript
export interface Discount {
  id: string
  code: string
  type: DiscountType
  value: number
  minOrderValue: number | null
  usageLimit: number | null
  perCustomerLimit: number | null
  usedCount: number
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type DiscountType = 'percentage' | 'fixed' | 'free_shipping'

export type DiscountStatus = 'active' | 'expired' | 'scheduled' | 'disabled'

export interface DiscountFormData {
  code: string
  type: DiscountType
  value: number
  minOrderValue: number | null
  usageLimit: number | null
  perCustomerLimit: number | null
  startDate: string
  endDate: string
  isActive: boolean
}
```

- [ ] **Step 7: Create src/types/marketing.ts**

```typescript
export interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  startDate: string
  endDate: string
  reach: number
  conversions: number
  revenue: number
  createdAt: string
}

export type CampaignType = 'email' | 'social' | 'promotion'
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed'

export interface EmailCampaign {
  id: string
  subject: string
  sentCount: number
  openCount: number
  clickCount: number
  openRate: number
  clickRate: number
  status: 'draft' | 'sent' | 'scheduled'
  sentAt: string | null
}
```

- [ ] **Step 8: Create src/types/settings.ts**

```typescript
export interface StoreSettings {
  name: string
  url: string
  description: string
  currency: string
  timezone: string
  dateFormat: string
  supportEmail: string
  phone: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string | null
  role: TeamRole
  status: 'active' | 'inactive'
  lastActiveAt: string
}

export type TeamRole = 'admin' | 'manager' | 'support'

export interface RolePermission {
  module: string
  admin: boolean
  manager: boolean
  support: boolean
}
```

- [ ] **Step 9: Create src/types/analytics.ts**

```typescript
export interface SalesAnalytics {
  kpis: SalesKpi[]
  revenueOverTime: { month: string; revenue: number; previousRevenue: number }[]
  ordersByStatus: { status: string; count: number }[]
  revenueByCategory: { category: string; revenue: number }[]
  dailyOrders: { date: string; orders: number }[]
  monthlySummary: MonthlySummary[]
}

export interface SalesKpi {
  label: string
  value: string
  change: number
  trend: 'up' | 'down' | 'neutral'
}

export interface MonthlySummary {
  month: string
  revenue: number
  orders: number
  averageOrderValue: number
  conversionRate: number
}

export interface ProductAnalytics {
  topProducts: { name: string; revenue: number }[]
  products: ProductPerformance[]
}

export interface ProductPerformance {
  id: string
  name: string
  unitsSold: number
  revenue: number
  returnRate: number
  avgRating: number
  stockRemaining: number
}

export interface CustomerAnalytics {
  kpis: SalesKpi[]
  newVsReturning: { month: string; new: number; returning: number }[]
  acquisitionBySource: { source: string; count: number }[]
  segments: CustomerSegment[]
}

export interface CustomerSegment {
  name: string
  customers: number
  revenue: number
  averageOrderValue: number
}
```

- [ ] **Step 10: Create src/types/index.ts**

```typescript
export * from './common'
export * from './product'
export * from './order'
export * from './customer'
export * from './inventory'
export * from './discount'
export * from './marketing'
export * from './settings'
export * from './analytics'
```

- [ ] **Step 11: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 12: Commit**

```bash
git add src/types/
git commit -m "feat: add all shared TypeScript type definitions"
```

---

### Task 4: Utilities, Hooks & Constants

**Files:**
- Modify: `src/lib/utils.ts`
- Create: `src/hooks/use-debounce.ts`, `src/hooks/use-media-query.ts`, `src/constants/navigation.ts`, `src/constants/status-maps.ts`

**Interfaces:**
- Consumes: Types from Task 3
- Produces: `cn()`, `formatCurrency()`, `formatDate()`, `formatNumber()`, `formatPercentage()`, `useDebounce()`, `useMediaQuery()`, navigation config, status maps

- [ ] **Step 1: Update src/lib/utils.ts with formatting utilities**

Keep the existing `cn` import, and add formatting functions:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('en-US', options ?? defaultOptions)
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}

export function formatRelativeDate(date: string | Date): string {
  const now = new Date()
  const target = new Date(date)
  const diff = now.getTime() - target.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 30) return formatDate(date)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
```

- [ ] **Step 2: Create src/hooks/use-debounce.ts**

```typescript
"use client"

import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

- [ ] **Step 3: Create src/hooks/use-media-query.ts**

```typescript
"use client"

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
```

- [ ] **Step 4: Create src/constants/navigation.ts**

```typescript
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
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  children?: NavItem[]
}

export const navigation: NavItem[] = [
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
      { label: 'Appearance', href: '/settings/appearance', icon: Settings },
    ],
  },
]
```

- [ ] **Step 5: Create src/constants/status-maps.ts**

```typescript
export const orderStatusMap = {
  pending: { label: 'Pending', variant: 'warning' as const },
  paid: { label: 'Paid', variant: 'info' as const },
  processing: { label: 'Processing', variant: 'secondary' as const },
  shipped: { label: 'Shipped', variant: 'info' as const },
  delivered: { label: 'Delivered', variant: 'success' as const },
  cancelled: { label: 'Cancelled', variant: 'danger' as const },
  refunded: { label: 'Refunded', variant: 'muted' as const },
} as const

export const paymentStatusMap = {
  pending: { label: 'Pending', variant: 'warning' as const },
  paid: { label: 'Paid', variant: 'success' as const },
  refunded: { label: 'Refunded', variant: 'muted' as const },
} as const

export const productStatusMap = {
  draft: { label: 'Draft', variant: 'muted' as const },
  active: { label: 'Active', variant: 'success' as const },
  archived: { label: 'Archived', variant: 'secondary' as const },
} as const

export const customerStatusMap = {
  active: { label: 'Active', variant: 'success' as const },
  inactive: { label: 'Inactive', variant: 'muted' as const },
} as const

export const adjustmentTypeMap = {
  received: { label: 'Received', variant: 'success' as const },
  sold: { label: 'Sold', variant: 'info' as const },
  returned: { label: 'Returned', variant: 'warning' as const },
  adjusted: { label: 'Adjusted', variant: 'secondary' as const },
} as const

export const discountTypeMap = {
  percentage: { label: 'Percentage', variant: 'info' as const },
  fixed: { label: 'Fixed Amount', variant: 'success' as const },
  free_shipping: { label: 'Free Shipping', variant: 'secondary' as const },
} as const

export const campaignStatusMap = {
  draft: { label: 'Draft', variant: 'muted' as const },
  active: { label: 'Active', variant: 'success' as const },
  paused: { label: 'Paused', variant: 'warning' as const },
  completed: { label: 'Completed', variant: 'info' as const },
} as const

export const campaignTypeMap = {
  email: { label: 'Email', variant: 'info' as const },
  social: { label: 'Social', variant: 'success' as const },
  promotion: { label: 'Promotion', variant: 'warning' as const },
} as const

export const teamRoleMap = {
  admin: { label: 'Admin', variant: 'danger' as const },
  manager: { label: 'Manager', variant: 'info' as const },
  support: { label: 'Support', variant: 'success' as const },
} as const

export type StatusVariant = 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'muted'
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/utils.ts src/hooks/ src/constants/
git commit -m "feat: add utilities, hooks, navigation config, and status maps"
```

---

### Task 5: Zustand Stores

**Files:**
- Create: `src/stores/auth-store.ts`, `src/stores/sidebar-store.ts`, `src/stores/notification-store.ts`

**Interfaces:**
- Consumes: `User` from `types/common`, `Notification` from `types/common`
- Produces: `useAuthStore`, `useSidebarStore`, `useNotificationStore`

- [ ] **Step 1: Create src/stores/auth-store.ts**

```typescript
import { create } from 'zustand'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '1',
    name: 'Admin User',
    email: 'admin@store.com',
    avatar: null,
    role: 'admin',
  },
  isAuthenticated: true,
  isLoading: false,
  login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}))
```

- [ ] **Step 2: Create src/stores/sidebar-store.ts**

```typescript
import { create } from 'zustand'

interface SidebarState {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggle: () => void
  setMobileOpen: (open: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  isMobileOpen: false,
  toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setMobileOpen: (isMobileOpen) => set({ isMobileOpen }),
}))
```

- [ ] **Step 3: Create src/stores/notification-store.ts**

```typescript
import { create } from 'zustand'
import type { Notification } from '@/types'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  add: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markRead: (id: string) => void
  markAllRead: () => void
  remove: (id: string) => void
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order',
    message: 'Order #ORD-1234 has been placed',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    message: 'Wireless Headphones is running low on stock',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of $299.00 received for Order #ORD-1230',
    type: 'success',
    read: true,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
]

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.read).length,
  add: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substring(2, 11),
        read: false,
        createdAt: new Date().toISOString(),
      }
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }
    }),
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  remove: (id) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id)
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.read
          ? state.unreadCount - 1
          : state.unreadCount,
      }
    }),
}))
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/stores/
git commit -m "feat: add Zustand stores for auth, sidebar, and notifications"
```

---

### Task 6: Service Layer & Mock Data

**Files:**
- Create: `src/services/api-client.ts`, `src/services/auth.service.ts`, `src/services/product.service.ts`, `src/services/order.service.ts`, `src/services/customer.service.ts`, `src/services/inventory.service.ts`, `src/services/discount.service.ts`, `src/services/marketing.service.ts`, `src/services/analytics.service.ts`

**Interfaces:**
- Consumes: All types from Task 3
- Produces: All service functions returning typed mock data (used by every feature module)

This task creates all service files with comprehensive mock data. Each service function is `async` and returns typed data after a simulated delay.

- [ ] **Step 1: Create src/services/api-client.ts**

```typescript
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function mockApiCall<T>(data: T, delayMs = 300): Promise<T> {
  await delay(delayMs)
  return data
}

export async function mockApiError(message: string, status = 400): Promise<never> {
  await delay(300)
  throw new ApiError(message, status)
}
```

- [ ] **Step 2: Create src/services/product.service.ts**

```typescript
import { mockApiCall } from './api-client'
import type { Product, ProductFormData } from '@/types'

const mockProducts: Product[] = [
  {
    id: '1', name: 'Wireless Bluetooth Headphones', slug: 'wireless-bluetooth-headphones',
    sku: 'WBH-001', description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    category: 'Electronics', brand: 'AudioTech', price: 129.99, comparePrice: 159.99,
    costPrice: 65.00, stock: 145, images: ['/placeholder.svg'], tags: ['wireless', 'bluetooth', 'audio'],
    status: 'active', createdAt: '2026-01-15T10:00:00Z', updatedAt: '2026-06-10T14:30:00Z',
  },
  {
    id: '2', name: 'Organic Cotton T-Shirt', slug: 'organic-cotton-t-shirt',
    sku: 'OCT-002', description: 'Soft organic cotton t-shirt available in multiple colors.',
    category: 'Clothing', brand: 'EcoWear', price: 34.99, comparePrice: null,
    costPrice: 12.00, stock: 523, images: ['/placeholder.svg'], tags: ['organic', 'cotton', 'sustainable'],
    status: 'active', createdAt: '2026-02-20T09:00:00Z', updatedAt: '2026-06-12T11:00:00Z',
  },
  {
    id: '3', name: 'Stainless Steel Water Bottle', slug: 'stainless-steel-water-bottle',
    sku: 'SSW-003', description: 'Double-walled insulated water bottle that keeps drinks cold for 24 hours.',
    category: 'Home & Kitchen', brand: 'HydroLife', price: 24.99, comparePrice: 29.99,
    costPrice: 8.50, stock: 312, images: ['/placeholder.svg'], tags: ['eco-friendly', 'insulated'],
    status: 'active', createdAt: '2026-03-05T08:00:00Z', updatedAt: '2026-06-08T16:45:00Z',
  },
  {
    id: '4', name: 'Running Shoes Pro', slug: 'running-shoes-pro',
    sku: 'RSP-004', description: 'Lightweight running shoes with advanced cushioning technology.',
    category: 'Footwear', brand: 'SpeedStep', price: 89.99, comparePrice: 119.99,
    costPrice: 35.00, stock: 87, images: ['/placeholder.svg'], tags: ['running', 'sports', 'comfort'],
    status: 'active', createdAt: '2026-01-28T07:30:00Z', updatedAt: '2026-06-15T09:20:00Z',
  },
  {
    id: '5', name: 'Smart Watch Series X', slug: 'smart-watch-series-x',
    sku: 'SWX-005', description: 'Advanced smartwatch with health monitoring and GPS.',
    category: 'Electronics', brand: 'TechPulse', price: 249.99, comparePrice: 299.99,
    costPrice: 120.00, stock: 5, images: ['/placeholder.svg'], tags: ['smartwatch', 'fitness', 'gps'],
    status: 'active', createdAt: '2026-04-10T12:00:00Z', updatedAt: '2026-06-18T08:00:00Z',
  },
  {
    id: '6', name: 'Leather Laptop Bag', slug: 'leather-laptop-bag',
    sku: 'LLB-006', description: 'Genuine leather laptop bag fits up to 15-inch laptops.',
    category: 'Accessories', brand: 'UrbanCarry', price: 79.99, comparePrice: null,
    costPrice: 32.00, stock: 0, images: ['/placeholder.svg'], tags: ['leather', 'laptop', 'business'],
    status: 'archived', createdAt: '2026-02-14T15:00:00Z', updatedAt: '2026-05-20T10:30:00Z',
  },
  {
    id: '7', name: 'Aromatherapy Candle Set', slug: 'aromatherapy-candle-set',
    sku: 'ACS-007', description: 'Set of 3 natural soy candles with essential oils.',
    category: 'Home & Kitchen', brand: 'ZenGlow', price: 42.99, comparePrice: 54.99,
    costPrice: 15.00, stock: 198, images: ['/placeholder.svg'], tags: ['candles', 'aromatherapy', 'gift'],
    status: 'active', createdAt: '2026-03-22T11:00:00Z', updatedAt: '2026-06-14T13:15:00Z',
  },
  {
    id: '8', name: 'Yoga Mat Premium', slug: 'yoga-mat-premium',
    sku: 'YMP-008', description: 'Extra thick non-slip yoga mat with carrying strap.',
    category: 'Sports', brand: 'FlexForm', price: 49.99, comparePrice: null,
    costPrice: 18.00, stock: 234, images: ['/placeholder.svg'], tags: ['yoga', 'fitness', 'exercise'],
    status: 'draft', createdAt: '2026-05-01T09:00:00Z', updatedAt: '2026-06-01T17:00:00Z',
  },
  {
    id: '9', name: 'Ceramic Coffee Mug Set', slug: 'ceramic-coffee-mug-set',
    sku: 'CCM-009', description: 'Set of 4 handcrafted ceramic coffee mugs.',
    category: 'Home & Kitchen', brand: 'ArtBrew', price: 38.99, comparePrice: 44.99,
    costPrice: 14.00, stock: 67, images: ['/placeholder.svg'], tags: ['ceramic', 'coffee', 'handmade'],
    status: 'active', createdAt: '2026-04-18T10:00:00Z', updatedAt: '2026-06-16T12:00:00Z',
  },
  {
    id: '10', name: 'Wireless Charging Pad', slug: 'wireless-charging-pad',
    sku: 'WCP-010', description: 'Fast wireless charging pad compatible with all Qi devices.',
    category: 'Electronics', brand: 'ChargeTech', price: 19.99, comparePrice: 24.99,
    costPrice: 7.00, stock: 412, images: ['/placeholder.svg'], tags: ['charging', 'wireless', 'tech'],
    status: 'active', createdAt: '2026-05-12T14:00:00Z', updatedAt: '2026-06-17T11:30:00Z',
  },
]

export async function getProducts(): Promise<Product[]> {
  return mockApiCall(mockProducts)
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return mockApiCall(mockProducts.find((p) => p.id === id))
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  const product: Product = {
    ...data,
    id: Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return mockApiCall(product)
}

export async function updateProduct(id: string, data: Partial<ProductFormData>): Promise<Product> {
  const existing = mockProducts.find((p) => p.id === id)
  if (!existing) throw new Error('Product not found')
  const updated = { ...existing, ...data, updatedAt: new Date().toISOString() }
  return mockApiCall(updated)
}

export async function deleteProduct(id: string): Promise<void> {
  return mockApiCall(undefined)
}
```

- [ ] **Step 3: Create src/services/order.service.ts**

```typescript
import { mockApiCall } from './api-client'
import type { Order, OrderStatus } from '@/types'

const mockOrders: Order[] = [
  {
    id: '1', orderNumber: 'ORD-1234',
    customer: { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 555-0101' },
    items: [
      { id: '1', productId: '1', productName: 'Wireless Bluetooth Headphones', productImage: '/placeholder.svg', sku: 'WBH-001', price: 129.99, quantity: 1, total: 129.99 },
      { id: '2', productId: '3', productName: 'Stainless Steel Water Bottle', productImage: '/placeholder.svg', sku: 'SSW-003', price: 24.99, quantity: 2, total: 49.98 },
    ],
    subtotal: 179.97, shipping: 9.99, tax: 15.30, total: 205.26,
    status: 'delivered', paymentStatus: 'paid',
    shippingAddress: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
    billingAddress: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
    timeline: [
      { id: '1', status: 'Delivered', description: 'Package delivered', timestamp: '2026-06-19T14:30:00Z' },
      { id: '2', status: 'Shipped', description: 'Package shipped via UPS', timestamp: '2026-06-17T10:00:00Z' },
      { id: '3', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-16T09:15:00Z' },
      { id: '4', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-15T15:00:00Z' },
      { id: '5', status: 'Placed', description: 'Order placed', timestamp: '2026-06-15T14:45:00Z' },
    ],
    createdAt: '2026-06-15T14:45:00Z', updatedAt: '2026-06-19T14:30:00Z',
  },
  {
    id: '2', orderNumber: 'ORD-1235',
    customer: { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-0102' },
    items: [
      { id: '3', productId: '5', productName: 'Smart Watch Series X', productImage: '/placeholder.svg', sku: 'SWX-005', price: 249.99, quantity: 1, total: 249.99 },
    ],
    subtotal: 249.99, shipping: 0, tax: 21.25, total: 271.24,
    status: 'shipped', paymentStatus: 'paid',
    shippingAddress: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
    billingAddress: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
    timeline: [
      { id: '1', status: 'Shipped', description: 'Package shipped via FedEx', timestamp: '2026-06-18T11:00:00Z' },
      { id: '2', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-17T08:30:00Z' },
      { id: '3', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-16T16:20:00Z' },
      { id: '4', status: 'Placed', description: 'Order placed', timestamp: '2026-06-16T16:15:00Z' },
    ],
    createdAt: '2026-06-16T16:15:00Z', updatedAt: '2026-06-18T11:00:00Z',
  },
  {
    id: '3', orderNumber: 'ORD-1236',
    customer: { id: '3', name: 'Bob Wilson', email: 'bob@example.com', phone: '+1 555-0103' },
    items: [
      { id: '4', productId: '2', productName: 'Organic Cotton T-Shirt', productImage: '/placeholder.svg', sku: 'OCT-002', price: 34.99, quantity: 3, total: 104.97 },
      { id: '5', productId: '7', productName: 'Aromatherapy Candle Set', productImage: '/placeholder.svg', sku: 'ACS-007', price: 42.99, quantity: 1, total: 42.99 },
    ],
    subtotal: 147.96, shipping: 5.99, tax: 12.58, total: 166.53,
    status: 'processing', paymentStatus: 'paid',
    shippingAddress: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601', country: 'US' },
    billingAddress: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601', country: 'US' },
    timeline: [
      { id: '1', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-18T09:00:00Z' },
      { id: '2', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-17T20:10:00Z' },
      { id: '3', status: 'Placed', description: 'Order placed', timestamp: '2026-06-17T20:05:00Z' },
    ],
    createdAt: '2026-06-17T20:05:00Z', updatedAt: '2026-06-18T09:00:00Z',
  },
  {
    id: '4', orderNumber: 'ORD-1237',
    customer: { id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1 555-0104' },
    items: [
      { id: '6', productId: '4', productName: 'Running Shoes Pro', productImage: '/placeholder.svg', sku: 'RSP-004', price: 89.99, quantity: 1, total: 89.99 },
    ],
    subtotal: 89.99, shipping: 7.99, tax: 7.65, total: 105.63,
    status: 'pending', paymentStatus: 'pending',
    shippingAddress: { street: '321 Elm Blvd', city: 'Houston', state: 'TX', zip: '77001', country: 'US' },
    billingAddress: { street: '321 Elm Blvd', city: 'Houston', state: 'TX', zip: '77001', country: 'US' },
    timeline: [
      { id: '1', status: 'Placed', description: 'Order placed', timestamp: '2026-06-19T08:30:00Z' },
    ],
    createdAt: '2026-06-19T08:30:00Z', updatedAt: '2026-06-19T08:30:00Z',
  },
  {
    id: '5', orderNumber: 'ORD-1238',
    customer: { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1 555-0105' },
    items: [
      { id: '7', productId: '10', productName: 'Wireless Charging Pad', productImage: '/placeholder.svg', sku: 'WCP-010', price: 19.99, quantity: 2, total: 39.98 },
      { id: '8', productId: '9', productName: 'Ceramic Coffee Mug Set', productImage: '/placeholder.svg', sku: 'CCM-009', price: 38.99, quantity: 1, total: 38.99 },
    ],
    subtotal: 78.97, shipping: 5.99, tax: 6.71, total: 91.67,
    status: 'cancelled', paymentStatus: 'refunded',
    shippingAddress: { street: '654 Maple Dr', city: 'Phoenix', state: 'AZ', zip: '85001', country: 'US' },
    billingAddress: { street: '654 Maple Dr', city: 'Phoenix', state: 'AZ', zip: '85001', country: 'US' },
    timeline: [
      { id: '1', status: 'Cancelled', description: 'Order cancelled by customer', timestamp: '2026-06-14T16:00:00Z' },
      { id: '2', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-13T10:00:00Z' },
      { id: '3', status: 'Placed', description: 'Order placed', timestamp: '2026-06-13T09:45:00Z' },
    ],
    createdAt: '2026-06-13T09:45:00Z', updatedAt: '2026-06-14T16:00:00Z',
  },
  {
    id: '6', orderNumber: 'ORD-1239',
    customer: { id: '6', name: 'Diana Miller', email: 'diana@example.com', phone: '+1 555-0106' },
    items: [
      { id: '9', productId: '8', productName: 'Yoga Mat Premium', productImage: '/placeholder.svg', sku: 'YMP-008', price: 49.99, quantity: 1, total: 49.99 },
    ],
    subtotal: 49.99, shipping: 5.99, tax: 4.25, total: 60.23,
    status: 'paid', paymentStatus: 'paid',
    shippingAddress: { street: '987 Cedar Ln', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
    billingAddress: { street: '987 Cedar Ln', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
    timeline: [
      { id: '1', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-19T12:00:00Z' },
      { id: '2', status: 'Placed', description: 'Order placed', timestamp: '2026-06-19T11:50:00Z' },
    ],
    createdAt: '2026-06-19T11:50:00Z', updatedAt: '2026-06-19T12:00:00Z',
  },
]

export async function getOrders(): Promise<Order[]> {
  return mockApiCall(mockOrders)
}

export async function getOrder(id: string): Promise<Order | undefined> {
  return mockApiCall(mockOrders.find((o) => o.id === id))
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const order = mockOrders.find((o) => o.id === id)
  if (!order) throw new Error('Order not found')
  return mockApiCall({ ...order, status, updatedAt: new Date().toISOString() })
}
```

- [ ] **Step 4: Create src/services/customer.service.ts**

```typescript
import { mockApiCall } from './api-client'
import type { Customer } from '@/types'

const mockCustomers: Customer[] = [
  {
    id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 555-0101',
    avatar: null, status: 'active', totalOrders: 24, totalSpent: 2450.00, averageOrderValue: 102.08,
    addresses: [
      { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
    ],
    notes: [
      { id: '1', content: 'VIP customer, prefers express shipping.', createdBy: 'Admin', createdAt: '2026-03-15T10:00:00Z' },
    ],
    createdAt: '2025-01-10T08:00:00Z', updatedAt: '2026-06-18T14:00:00Z',
  },
  {
    id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-0102',
    avatar: null, status: 'active', totalOrders: 18, totalSpent: 1890.50, averageOrderValue: 105.03,
    addresses: [
      { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-03-22T09:00:00Z', updatedAt: '2026-06-16T16:20:00Z',
  },
  {
    id: '3', name: 'Bob Wilson', email: 'bob@example.com', phone: '+1 555-0103',
    avatar: null, status: 'active', totalOrders: 7, totalSpent: 542.30, averageOrderValue: 77.47,
    addresses: [
      { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-06-14T11:00:00Z', updatedAt: '2026-06-17T20:05:00Z',
  },
  {
    id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1 555-0104',
    avatar: null, status: 'active', totalOrders: 3, totalSpent: 289.97, averageOrderValue: 96.66,
    addresses: [
      { street: '321 Elm Blvd', city: 'Houston', state: 'TX', zip: '77001', country: 'US' },
    ],
    notes: [
      { id: '2', content: 'Requested size exchange on last order.', createdBy: 'Support', createdAt: '2026-05-20T14:00:00Z' },
    ],
    createdAt: '2025-09-05T07:00:00Z', updatedAt: '2026-06-19T08:30:00Z',
  },
  {
    id: '5', name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1 555-0105',
    avatar: null, status: 'inactive', totalOrders: 2, totalSpent: 158.97, averageOrderValue: 79.49,
    addresses: [
      { street: '654 Maple Dr', city: 'Phoenix', state: 'AZ', zip: '85001', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-11-28T13:00:00Z', updatedAt: '2026-06-14T16:00:00Z',
  },
  {
    id: '6', name: 'Diana Miller', email: 'diana@example.com', phone: '+1 555-0106',
    avatar: null, status: 'active', totalOrders: 12, totalSpent: 1245.80, averageOrderValue: 103.82,
    addresses: [
      { street: '987 Cedar Ln', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
      { street: '111 Work Blvd', city: 'Seattle', state: 'WA', zip: '98102', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-04-18T10:00:00Z', updatedAt: '2026-06-19T12:00:00Z',
  },
  {
    id: '7', name: 'Edward Taylor', email: 'edward@example.com', phone: '+1 555-0107',
    avatar: null, status: 'active', totalOrders: 31, totalSpent: 4120.00, averageOrderValue: 132.90,
    addresses: [
      { street: '222 River St', city: 'Denver', state: 'CO', zip: '80201', country: 'US' },
    ],
    notes: [
      { id: '3', content: 'Loyal customer since launch. Send holiday gift.', createdBy: 'Admin', createdAt: '2025-12-01T09:00:00Z' },
    ],
    createdAt: '2025-01-02T08:00:00Z', updatedAt: '2026-06-18T10:00:00Z',
  },
  {
    id: '8', name: 'Fiona Garcia', email: 'fiona@example.com', phone: '+1 555-0108',
    avatar: null, status: 'active', totalOrders: 9, totalSpent: 876.45, averageOrderValue: 97.38,
    addresses: [
      { street: '333 Lake Ave', city: 'Miami', state: 'FL', zip: '33101', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-07-20T15:00:00Z', updatedAt: '2026-06-15T09:20:00Z',
  },
]

export async function getCustomers(): Promise<Customer[]> {
  return mockApiCall(mockCustomers)
}

export async function getCustomer(id: string): Promise<Customer | undefined> {
  return mockApiCall(mockCustomers.find((c) => c.id === id))
}
```

- [ ] **Step 5: Create src/services/inventory.service.ts**

```typescript
import { mockApiCall } from './api-client'
import type { InventoryItem, StockAdjustment, Warehouse } from '@/types'

const mockInventory: InventoryItem[] = [
  { id: '1', productId: '1', productName: 'Wireless Bluetooth Headphones', sku: 'WBH-001', category: 'Electronics', inStock: 145, reserved: 12, available: 133, threshold: 20, updatedAt: '2026-06-18T14:00:00Z' },
  { id: '2', productId: '2', productName: 'Organic Cotton T-Shirt', sku: 'OCT-002', category: 'Clothing', inStock: 523, reserved: 45, available: 478, threshold: 50, updatedAt: '2026-06-17T10:00:00Z' },
  { id: '3', productId: '3', productName: 'Stainless Steel Water Bottle', sku: 'SSW-003', category: 'Home & Kitchen', inStock: 312, reserved: 8, available: 304, threshold: 30, updatedAt: '2026-06-16T08:00:00Z' },
  { id: '4', productId: '4', productName: 'Running Shoes Pro', sku: 'RSP-004', category: 'Footwear', inStock: 87, reserved: 5, available: 82, threshold: 15, updatedAt: '2026-06-18T12:00:00Z' },
  { id: '5', productId: '5', productName: 'Smart Watch Series X', sku: 'SWX-005', category: 'Electronics', inStock: 5, reserved: 2, available: 3, threshold: 10, updatedAt: '2026-06-19T08:00:00Z' },
  { id: '6', productId: '6', productName: 'Leather Laptop Bag', sku: 'LLB-006', category: 'Accessories', inStock: 0, reserved: 0, available: 0, threshold: 10, updatedAt: '2026-06-10T10:00:00Z' },
  { id: '7', productId: '7', productName: 'Aromatherapy Candle Set', sku: 'ACS-007', category: 'Home & Kitchen', inStock: 198, reserved: 15, available: 183, threshold: 25, updatedAt: '2026-06-15T14:00:00Z' },
  { id: '8', productId: '8', productName: 'Yoga Mat Premium', sku: 'YMP-008', category: 'Sports', inStock: 234, reserved: 0, available: 234, threshold: 20, updatedAt: '2026-06-14T16:00:00Z' },
  { id: '9', productId: '9', productName: 'Ceramic Coffee Mug Set', sku: 'CCM-009', category: 'Home & Kitchen', inStock: 67, reserved: 3, available: 64, threshold: 15, updatedAt: '2026-06-17T11:00:00Z' },
  { id: '10', productId: '10', productName: 'Wireless Charging Pad', sku: 'WCP-010', category: 'Electronics', inStock: 412, reserved: 20, available: 392, threshold: 40, updatedAt: '2026-06-18T09:00:00Z' },
  { id: '11', productId: '11', productName: 'Bamboo Cutting Board', sku: 'BCB-011', category: 'Home & Kitchen', inStock: 8, reserved: 2, available: 6, threshold: 15, updatedAt: '2026-06-19T07:00:00Z' },
  { id: '12', productId: '12', productName: 'Portable Bluetooth Speaker', sku: 'PBS-012', category: 'Electronics', inStock: 3, reserved: 1, available: 2, threshold: 10, updatedAt: '2026-06-18T16:00:00Z' },
]

const mockAdjustments: StockAdjustment[] = [
  { id: '1', productId: '1', productName: 'Wireless Bluetooth Headphones', sku: 'WBH-001', type: 'received', quantity: 50, reason: 'New shipment from supplier', adjustedBy: 'Admin User', createdAt: '2026-06-18T14:00:00Z' },
  { id: '2', productId: '5', productName: 'Smart Watch Series X', sku: 'SWX-005', type: 'sold', quantity: -3, reason: 'Online orders', adjustedBy: 'System', createdAt: '2026-06-18T10:00:00Z' },
  { id: '3', productId: '2', productName: 'Organic Cotton T-Shirt', sku: 'OCT-002', type: 'returned', quantity: 5, reason: 'Customer return - wrong size', adjustedBy: 'Support Team', createdAt: '2026-06-17T15:00:00Z' },
  { id: '4', productId: '6', productName: 'Leather Laptop Bag', sku: 'LLB-006', type: 'adjusted', quantity: -12, reason: 'Damaged in warehouse', adjustedBy: 'Warehouse Mgr', createdAt: '2026-06-16T09:00:00Z' },
  { id: '5', productId: '10', productName: 'Wireless Charging Pad', sku: 'WCP-010', type: 'received', quantity: 100, reason: 'Bulk order received', adjustedBy: 'Admin User', createdAt: '2026-06-15T11:00:00Z' },
  { id: '6', productId: '4', productName: 'Running Shoes Pro', sku: 'RSP-004', type: 'sold', quantity: -8, reason: 'Weekend sale orders', adjustedBy: 'System', createdAt: '2026-06-14T17:00:00Z' },
]

const mockWarehouses: Warehouse[] = [
  { id: '1', name: 'Main Warehouse', location: 'New York, NY', productCount: 845, capacity: 1200, utilization: 72, status: 'active' },
  { id: '2', name: 'West Coast DC', location: 'Los Angeles, CA', productCount: 632, capacity: 1000, utilization: 58, status: 'active' },
  { id: '3', name: 'Midwest Hub', location: 'Chicago, IL', productCount: 421, capacity: 800, utilization: 45, status: 'active' },
  { id: '4', name: 'South Distribution', location: 'Dallas, TX', productCount: 0, capacity: 600, utilization: 0, status: 'inactive' },
]

export async function getInventory(): Promise<InventoryItem[]> {
  return mockApiCall(mockInventory)
}

export async function getAdjustments(): Promise<StockAdjustment[]> {
  return mockApiCall(mockAdjustments)
}

export async function getWarehouses(): Promise<Warehouse[]> {
  return mockApiCall(mockWarehouses)
}

export async function createAdjustment(data: Omit<StockAdjustment, 'id' | 'createdAt'>): Promise<StockAdjustment> {
  return mockApiCall({
    ...data,
    id: Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
  })
}
```

- [ ] **Step 6: Create src/services/discount.service.ts**

```typescript
import { mockApiCall } from './api-client'
import type { Discount, DiscountFormData } from '@/types'

const mockDiscounts: Discount[] = [
  { id: '1', code: 'SUMMER20', type: 'percentage', value: 20, minOrderValue: 50, usageLimit: 100, perCustomerLimit: 1, usedCount: 42, startDate: '2026-06-01T00:00:00Z', endDate: '2026-08-31T23:59:59Z', isActive: true, createdAt: '2026-05-25T10:00:00Z', updatedAt: '2026-06-18T14:00:00Z' },
  { id: '2', code: 'FLAT10', type: 'fixed', value: 10, minOrderValue: 30, usageLimit: 200, perCustomerLimit: 2, usedCount: 87, startDate: '2026-01-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2025-12-20T09:00:00Z', updatedAt: '2026-06-17T11:00:00Z' },
  { id: '3', code: 'FREESHIP', type: 'free_shipping', value: 0, minOrderValue: 75, usageLimit: null, perCustomerLimit: null, usedCount: 156, startDate: '2026-03-01T00:00:00Z', endDate: '2026-09-30T23:59:59Z', isActive: true, createdAt: '2026-02-28T08:00:00Z', updatedAt: '2026-06-19T09:00:00Z' },
  { id: '4', code: 'WELCOME15', type: 'percentage', value: 15, minOrderValue: null, usageLimit: null, perCustomerLimit: 1, usedCount: 234, startDate: '2025-01-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-06-18T10:00:00Z' },
  { id: '5', code: 'SPRING25', type: 'percentage', value: 25, minOrderValue: 100, usageLimit: 50, perCustomerLimit: 1, usedCount: 50, startDate: '2026-03-01T00:00:00Z', endDate: '2026-05-31T23:59:59Z', isActive: false, createdAt: '2026-02-15T10:00:00Z', updatedAt: '2026-06-01T00:00:00Z' },
  { id: '6', code: 'HOLIDAY50', type: 'fixed', value: 50, minOrderValue: 200, usageLimit: 25, perCustomerLimit: 1, usedCount: 0, startDate: '2026-12-20T00:00:00Z', endDate: '2026-12-31T23:59:59Z', isActive: true, createdAt: '2026-06-10T14:00:00Z', updatedAt: '2026-06-10T14:00:00Z' },
]

export async function getDiscounts(): Promise<Discount[]> {
  return mockApiCall(mockDiscounts)
}

export async function getDiscount(id: string): Promise<Discount | undefined> {
  return mockApiCall(mockDiscounts.find((d) => d.id === id))
}

export async function createDiscount(data: DiscountFormData): Promise<Discount> {
  return mockApiCall({
    ...data,
    id: Math.random().toString(36).substring(2, 11),
    usedCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

export async function updateDiscount(id: string, data: Partial<DiscountFormData>): Promise<Discount> {
  const existing = mockDiscounts.find((d) => d.id === id)
  if (!existing) throw new Error('Discount not found')
  return mockApiCall({ ...existing, ...data, updatedAt: new Date().toISOString() })
}
```

- [ ] **Step 7: Create src/services/marketing.service.ts**

```typescript
import { mockApiCall } from './api-client'
import type { Campaign, EmailCampaign } from '@/types'

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Summer Sale 2026', type: 'promotion', status: 'active', startDate: '2026-06-01T00:00:00Z', endDate: '2026-08-31T23:59:59Z', reach: 12500, conversions: 890, revenue: 34500, createdAt: '2026-05-20T10:00:00Z' },
  { id: '2', name: 'New Arrivals Newsletter', type: 'email', status: 'completed', startDate: '2026-05-15T00:00:00Z', endDate: '2026-05-30T23:59:59Z', reach: 8200, conversions: 412, revenue: 15800, createdAt: '2026-05-10T09:00:00Z' },
  { id: '3', name: 'Instagram Flash Sale', type: 'social', status: 'active', startDate: '2026-06-10T00:00:00Z', endDate: '2026-06-20T23:59:59Z', reach: 5600, conversions: 234, revenue: 8900, createdAt: '2026-06-05T14:00:00Z' },
  { id: '4', name: 'Back to School', type: 'promotion', status: 'draft', startDate: '2026-08-01T00:00:00Z', endDate: '2026-09-15T23:59:59Z', reach: 0, conversions: 0, revenue: 0, createdAt: '2026-06-15T11:00:00Z' },
  { id: '5', name: 'Customer Loyalty Rewards', type: 'email', status: 'paused', startDate: '2026-04-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', reach: 3200, conversions: 156, revenue: 6700, createdAt: '2026-03-25T08:00:00Z' },
]

const mockEmailCampaigns: EmailCampaign[] = [
  { id: '1', subject: 'Summer Sale is Here! Up to 50% Off', sentCount: 8200, openCount: 2952, clickCount: 492, openRate: 36.0, clickRate: 6.0, status: 'sent', sentAt: '2026-06-01T10:00:00Z' },
  { id: '2', subject: 'New Arrivals You Will Love', sentCount: 7500, openCount: 2325, clickCount: 375, openRate: 31.0, clickRate: 5.0, status: 'sent', sentAt: '2026-05-15T09:00:00Z' },
  { id: '3', subject: 'Exclusive: Early Access to Flash Sale', sentCount: 5000, openCount: 1750, clickCount: 300, openRate: 35.0, clickRate: 6.0, status: 'sent', sentAt: '2026-06-10T08:00:00Z' },
  { id: '4', subject: 'Your Weekly Style Guide', sentCount: 6800, openCount: 1904, clickCount: 272, openRate: 28.0, clickRate: 4.0, status: 'sent', sentAt: '2026-06-12T10:00:00Z' },
  { id: '5', subject: 'Flash Sale Reminder - Ends Tonight!', sentCount: 0, openCount: 0, clickCount: 0, openRate: 0, clickRate: 0, status: 'scheduled', sentAt: null },
]

export async function getCampaigns(): Promise<Campaign[]> {
  return mockApiCall(mockCampaigns)
}

export async function getEmailCampaigns(): Promise<EmailCampaign[]> {
  return mockApiCall(mockEmailCampaigns)
}
```

- [ ] **Step 8: Create src/services/auth.service.ts**

```typescript
import { mockApiCall, mockApiError } from './api-client'
import type { User } from '@/types'

export async function loginService(email: string, password: string): Promise<User> {
  if (email === 'admin@store.com' && password === 'password') {
    return mockApiCall({
      id: '1',
      name: 'Admin User',
      email: 'admin@store.com',
      avatar: null,
      role: 'admin' as const,
    }, 800)
  }
  return mockApiError('Invalid email or password', 401)
}

export async function registerService(name: string, email: string, password: string): Promise<User> {
  return mockApiCall({
    id: Math.random().toString(36).substring(2, 11),
    name,
    email,
    avatar: null,
    role: 'admin' as const,
  }, 800)
}

export async function forgotPasswordService(email: string): Promise<{ message: string }> {
  return mockApiCall({ message: 'Password reset link sent to your email.' }, 800)
}

export async function resetPasswordService(token: string, password: string): Promise<{ message: string }> {
  return mockApiCall({ message: 'Password has been reset successfully.' }, 800)
}

export async function verifyEmailService(code: string): Promise<{ message: string }> {
  if (code === '123456') {
    return mockApiCall({ message: 'Email verified successfully.' }, 800)
  }
  return mockApiError('Invalid verification code', 400)
}
```

- [ ] **Step 9: Create src/services/analytics.service.ts**

```typescript
import { mockApiCall } from './api-client'
import type { SalesAnalytics, ProductAnalytics, CustomerAnalytics, KpiData } from '@/types'

export async function getDashboardKpis(): Promise<KpiData[]> {
  return mockApiCall([
    { label: 'Revenue', value: '$48,250.00', change: 12.5, changeLabel: 'vs last month', icon: 'DollarSign', trend: 'up' as const },
    { label: 'Orders', value: '1,234', change: 8.2, changeLabel: 'vs last month', icon: 'ShoppingCart', trend: 'up' as const },
    { label: 'Customers', value: '856', change: 5.1, changeLabel: 'vs last month', icon: 'Users', trend: 'up' as const },
    { label: 'Conversion Rate', value: '3.2%', change: 0.4, changeLabel: 'vs last month', icon: 'TrendingUp', trend: 'up' as const },
    { label: 'Avg Order Value', value: '$39.10', change: 2.3, changeLabel: 'vs last month', icon: 'Receipt', trend: 'up' as const },
    { label: 'Products Sold', value: '2,847', change: 15.7, changeLabel: 'vs last month', icon: 'Package', trend: 'up' as const },
  ])
}

export async function getSalesAnalytics(): Promise<SalesAnalytics> {
  return mockApiCall({
    kpis: [
      { label: 'Total Revenue', value: '$148,250.00', change: 12.5, trend: 'up' as const },
      { label: 'Total Orders', value: '3,456', change: 8.2, trend: 'up' as const },
      { label: 'Conversion Rate', value: '3.2%', change: 0.4, trend: 'up' as const },
      { label: 'Repeat Purchase Rate', value: '28.4%', change: 3.1, trend: 'up' as const },
    ],
    revenueOverTime: [
      { month: 'Jul', revenue: 9800, previousRevenue: 8200 },
      { month: 'Aug', revenue: 10500, previousRevenue: 9100 },
      { month: 'Sep', revenue: 11200, previousRevenue: 9800 },
      { month: 'Oct', revenue: 10800, previousRevenue: 10200 },
      { month: 'Nov', revenue: 14500, previousRevenue: 12800 },
      { month: 'Dec', revenue: 18200, previousRevenue: 15600 },
      { month: 'Jan', revenue: 12100, previousRevenue: 11000 },
      { month: 'Feb', revenue: 11800, previousRevenue: 10500 },
      { month: 'Mar', revenue: 13200, previousRevenue: 11800 },
      { month: 'Apr', revenue: 12900, previousRevenue: 12200 },
      { month: 'May', revenue: 14800, previousRevenue: 13100 },
      { month: 'Jun', revenue: 16400, previousRevenue: 14200 },
    ],
    ordersByStatus: [
      { status: 'Delivered', count: 1845 },
      { status: 'Shipped', count: 423 },
      { status: 'Processing', count: 312 },
      { status: 'Pending', count: 198 },
      { status: 'Cancelled', count: 156 },
      { status: 'Refunded', count: 89 },
    ],
    revenueByCategory: [
      { category: 'Electronics', revenue: 45200 },
      { category: 'Clothing', revenue: 28900 },
      { category: 'Home & Kitchen', revenue: 22400 },
      { category: 'Sports', revenue: 18700 },
      { category: 'Footwear', revenue: 15800 },
      { category: 'Accessories', revenue: 12300 },
    ],
    dailyOrders: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2026, 4, 21 + i).toISOString().split('T')[0],
      orders: Math.floor(Math.random() * 60) + 30,
    })),
    monthlySummary: [
      { month: 'Jan 2026', revenue: 12100, orders: 298, averageOrderValue: 40.60, conversionRate: 2.8 },
      { month: 'Feb 2026', revenue: 11800, orders: 275, averageOrderValue: 42.91, conversionRate: 2.9 },
      { month: 'Mar 2026', revenue: 13200, orders: 310, averageOrderValue: 42.58, conversionRate: 3.0 },
      { month: 'Apr 2026', revenue: 12900, orders: 295, averageOrderValue: 43.73, conversionRate: 3.1 },
      { month: 'May 2026', revenue: 14800, orders: 342, averageOrderValue: 43.27, conversionRate: 3.2 },
      { month: 'Jun 2026', revenue: 16400, orders: 380, averageOrderValue: 43.16, conversionRate: 3.2 },
    ],
  })
}

export async function getProductAnalytics(): Promise<ProductAnalytics> {
  return mockApiCall({
    topProducts: [
      { name: 'Smart Watch Series X', revenue: 18750 },
      { name: 'Wireless Headphones', revenue: 14560 },
      { name: 'Running Shoes Pro', revenue: 10800 },
      { name: 'Organic Cotton T-Shirt', revenue: 8745 },
      { name: 'Aromatherapy Candle Set', revenue: 6450 },
      { name: 'Stainless Steel Water Bottle', revenue: 5620 },
      { name: 'Yoga Mat Premium', revenue: 4500 },
      { name: 'Ceramic Coffee Mug Set', revenue: 3900 },
      { name: 'Wireless Charging Pad', revenue: 3200 },
      { name: 'Leather Laptop Bag', revenue: 2400 },
    ],
    products: [
      { id: '5', name: 'Smart Watch Series X', unitsSold: 75, revenue: 18750, returnRate: 2.1, avgRating: 4.8, stockRemaining: 5 },
      { id: '1', name: 'Wireless Bluetooth Headphones', unitsSold: 112, revenue: 14560, returnRate: 3.2, avgRating: 4.5, stockRemaining: 145 },
      { id: '4', name: 'Running Shoes Pro', unitsSold: 120, revenue: 10800, returnRate: 5.8, avgRating: 4.3, stockRemaining: 87 },
      { id: '2', name: 'Organic Cotton T-Shirt', unitsSold: 250, revenue: 8745, returnRate: 8.4, avgRating: 4.1, stockRemaining: 523 },
      { id: '7', name: 'Aromatherapy Candle Set', unitsSold: 150, revenue: 6450, returnRate: 1.3, avgRating: 4.7, stockRemaining: 198 },
      { id: '3', name: 'Stainless Steel Water Bottle', unitsSold: 225, revenue: 5620, returnRate: 0.9, avgRating: 4.6, stockRemaining: 312 },
      { id: '8', name: 'Yoga Mat Premium', unitsSold: 90, revenue: 4500, returnRate: 2.2, avgRating: 4.4, stockRemaining: 234 },
      { id: '9', name: 'Ceramic Coffee Mug Set', unitsSold: 100, revenue: 3900, returnRate: 4.0, avgRating: 4.2, stockRemaining: 67 },
      { id: '10', name: 'Wireless Charging Pad', unitsSold: 160, revenue: 3200, returnRate: 1.9, avgRating: 4.0, stockRemaining: 412 },
      { id: '6', name: 'Leather Laptop Bag', unitsSold: 30, revenue: 2400, returnRate: 6.7, avgRating: 3.8, stockRemaining: 0 },
    ],
  })
}

export async function getCustomerAnalytics(): Promise<CustomerAnalytics> {
  return mockApiCall({
    kpis: [
      { label: 'Total Customers', value: '2,450', change: 12.0, trend: 'up' as const },
      { label: 'New This Month', value: '186', change: 12.0, trend: 'up' as const },
      { label: 'Customer Retention', value: '68.5%', change: 2.3, trend: 'up' as const },
      { label: 'Avg Lifetime Value', value: '$342.00', change: 8.1, trend: 'up' as const },
    ],
    newVsReturning: [
      { month: 'Jul', new: 120, returning: 280 },
      { month: 'Aug', new: 135, returning: 295 },
      { month: 'Sep', new: 142, returning: 310 },
      { month: 'Oct', new: 128, returning: 322 },
      { month: 'Nov', new: 168, returning: 345 },
      { month: 'Dec', new: 195, returning: 380 },
      { month: 'Jan', new: 148, returning: 335 },
      { month: 'Feb', new: 138, returning: 342 },
      { month: 'Mar', new: 155, returning: 358 },
      { month: 'Apr', new: 162, returning: 365 },
      { month: 'May', new: 175, returning: 372 },
      { month: 'Jun', new: 186, returning: 385 },
    ],
    acquisitionBySource: [
      { source: 'Direct', count: 680 },
      { source: 'Social Media', count: 520 },
      { source: 'Email', count: 445 },
      { source: 'Referral', count: 380 },
      { source: 'Organic Search', count: 325 },
      { source: 'Paid Ads', count: 100 },
    ],
    segments: [
      { name: 'VIP (>$500 spent)', customers: 124, revenue: 82400, averageOrderValue: 156 },
      { name: 'Regular ($100-$500)', customers: 856, revenue: 48200, averageOrderValue: 89 },
      { name: 'New (<$100)', customers: 1470, revenue: 17650, averageOrderValue: 42 },
    ],
  })
}
```

- [ ] **Step 10: Verify build**

```bash
npm run build
```

- [ ] **Step 11: Commit**

```bash
git add src/services/
git commit -m "feat: add service layer with comprehensive mock data"
```

---

### Task 7: Providers & Root Layout

**Files:**
- Create: `src/providers/theme-provider.tsx`, `src/providers/index.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: next-themes, Sonner (toast)
- Produces: `Providers` wrapper component, configured root layout

- [ ] **Step 1: Create src/providers/theme-provider.tsx**

```typescript
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
```

- [ ] **Step 2: Create src/providers/index.tsx**

```typescript
"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  )
}
```

- [ ] **Step 3: Update src/app/layout.tsx**

```typescript
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/providers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Ecommerce Admin Panel Template",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/providers/ src/app/layout.tsx
git commit -m "feat: add theme provider, Sonner toaster, and root layout"
```

---

### Task 8: Shared UI Components

**Files:**
- Create: `src/components/shared/page-header.tsx`, `src/components/shared/stat-card.tsx`, `src/components/shared/metric-card.tsx`, `src/components/shared/status-badge.tsx`, `src/components/shared/search-input.tsx`, `src/components/shared/empty-state.tsx`, `src/components/shared/confirm-dialog.tsx`, `src/components/shared/chart-card.tsx`, `src/components/shared/error-boundary.tsx`, `src/components/shared/skeletons.tsx`

**Interfaces:**
- Consumes: shadcn/ui primitives, `cn()`, `StatusVariant` from constants
- Produces: All shared components used by feature modules

- [ ] **Step 1: Create src/components/shared/page-header.tsx**

```typescript
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
```

- [ ] **Step 2: Create src/components/shared/stat-card.tsx**

```typescript
"use client"

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  DollarSign, ShoppingCart, Users, TrendingUp, TrendingDown,
  Receipt, Package, type LucideIcon,
} from 'lucide-react'
import type { KpiData } from '@/types'

const iconMap: Record<string, LucideIcon> = {
  DollarSign, ShoppingCart, Users, TrendingUp, Receipt, Package,
}

interface StatCardProps {
  data: KpiData
}

export function StatCard({ data }: StatCardProps) {
  const Icon = iconMap[data.icon] ?? Package
  const isPositive = data.trend === 'up'

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            isPositive ? 'text-success' : 'text-danger'
          )}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {data.change > 0 ? '+' : ''}{data.change}%
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">{data.value}</p>
          <p className="text-muted-foreground text-sm mt-1">{data.label}</p>
        </div>
        <p className="text-muted-foreground text-xs mt-2">{data.changeLabel}</p>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 3: Create src/components/shared/metric-card.tsx**

```typescript
import { Card, CardContent } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  icon: LucideIcon
  iconClassName?: string
}

export function MetricCard({ label, value, icon: Icon, iconClassName }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Icon className={iconClassName ?? 'h-5 w-5 text-primary'} />
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-muted-foreground text-sm">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 4: Create src/components/shared/status-badge.tsx**

```typescript
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { StatusVariant } from '@/constants/status-maps'

interface StatusBadgeProps {
  label: string
  variant: StatusVariant
}

const variantClasses: Record<StatusVariant, string> = {
  success: 'bg-success/10 text-success hover:bg-success/20 border-success/20',
  danger: 'bg-danger/10 text-danger hover:bg-danger/20 border-danger/20',
  warning: 'bg-warning/10 text-warning-foreground hover:bg-warning/20 border-warning/20',
  info: 'bg-info/10 text-info-foreground hover:bg-info/20 border-info/20',
  secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20',
  muted: 'bg-muted text-muted-foreground hover:bg-muted/80 border-muted',
}

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn('font-medium', variantClasses[variant])}>
      {label}
    </Badge>
  )
}
```

- [ ] **Step 5: Create src/components/shared/search-input.tsx**

```typescript
"use client"

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
          onClick={() => onChange('')}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Create src/components/shared/empty-state.tsx**

```typescript
import type { LucideIcon } from 'lucide-react'
import { Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon = Package, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-md">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
```

- [ ] **Step 7: Create src/components/shared/confirm-dialog.tsx**

```typescript
"use client"

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void
}

export function ConfirmDialog({
  open, onOpenChange, title, description,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  variant = 'default', onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={variant === 'destructive' ? 'bg-danger text-danger-foreground hover:bg-danger/90' : ''}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

- [ ] **Step 8: Create src/components/shared/chart-card.tsx**

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
}

export function ChartCard({ title, subtitle, children, action }: ChartCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
```

- [ ] **Step 9: Create src/components/shared/error-boundary.tsx**

```typescript
"use client"

import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertTriangle className="h-12 w-12 text-danger" />
          <h3 className="mt-4 text-lg font-semibold">Something went wrong</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-md">
            {this.state.error?.message ?? 'An unexpected error occurred'}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
```

- [ ] **Step 10: Create src/components/shared/skeletons.tsx**

```typescript
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="mt-4 h-7 w-24" />
              <Skeleton className="mt-2 h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
            <CardContent><Skeleton className="h-[250px] w-full" /></CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="rounded-md border">
        <div className="border-b p-4">
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-24" />
            ))}
          </div>
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b p-4 last:border-0">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-10 w-10 rounded" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return <Skeleton className="h-[300px] w-full" />
}
```

- [ ] **Step 11: Verify build**

```bash
npm run build
```

- [ ] **Step 12: Commit**

```bash
git add src/components/shared/
git commit -m "feat: add shared UI components (PageHeader, StatCard, StatusBadge, skeletons, etc.)"
```

---

### Task 9: Form Components

**Files:**
- Create: `src/components/forms/text-field.tsx`, `src/components/forms/select-field.tsx`, `src/components/forms/textarea-field.tsx`, `src/components/forms/currency-field.tsx`, `src/components/forms/date-field.tsx`, `src/components/forms/switch-field.tsx`, `src/components/forms/image-upload-field.tsx`, `src/components/forms/index.ts`

**Interfaces:**
- Consumes: shadcn/ui primitives, RHF Controller
- Produces: Reusable form field components wrapping RHF

- [ ] **Step 1: Create src/components/forms/text-field.tsx**

```typescript
"use client"

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TextFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  disabled?: boolean
}

export function TextField({ name, label, placeholder, type = 'text', disabled }: TextFieldProps) {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
      />
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create src/components/forms/select-field.tsx**

```typescript
"use client"

import { useFormContext, Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

interface SelectOption {
  label: string
  value: string
}

interface SelectFieldProps {
  name: string
  label: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}

export function SelectField({ name, label, options, placeholder = 'Select...', disabled }: SelectFieldProps) {
  const { control, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger id={name}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create src/components/forms/textarea-field.tsx**

```typescript
"use client"

import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface TextAreaFieldProps {
  name: string
  label: string
  placeholder?: string
  rows?: number
  disabled?: boolean
}

export function TextAreaField({ name, label, placeholder, rows = 4, disabled }: TextAreaFieldProps) {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...register(name)}
      />
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create src/components/forms/currency-field.tsx**

```typescript
"use client"

import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CurrencyFieldProps {
  name: string
  label: string
  placeholder?: string
  currency?: string
  disabled?: boolean
}

export function CurrencyField({ name, label, placeholder = '0.00', currency = '$', disabled }: CurrencyFieldProps) {
  const { control, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          {currency}
        </span>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              id={name}
              type="number"
              step="0.01"
              min="0"
              placeholder={placeholder}
              disabled={disabled}
              className="pl-7"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
            />
          )}
        />
      </div>
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Create src/components/forms/date-field.tsx**

```typescript
"use client"

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DateFieldProps {
  name: string
  label: string
  disabled?: boolean
}

export function DateField({ name, label, disabled }: DateFieldProps) {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="datetime-local"
        disabled={disabled}
        {...register(name)}
      />
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Create src/components/forms/switch-field.tsx**

```typescript
"use client"

import { useFormContext, Controller } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface SwitchFieldProps {
  name: string
  label: string
  description?: string
  disabled?: boolean
}

export function SwitchField({ name, label, description, disabled }: SwitchFieldProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor={name}>{label}</Label>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <Switch
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
        </div>
      )}
    />
  )
}
```

- [ ] **Step 7: Create src/components/forms/image-upload-field.tsx**

```typescript
"use client"

import { Upload, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface ImageUploadFieldProps {
  name: string
  label: string
  images: string[]
  onImagesChange: (images: string[]) => void
}

export function ImageUploadField({ name, label, images, onImagesChange }: ImageUploadFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square rounded-lg border bg-muted overflow-hidden">
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              Image {idx + 1}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-6 w-6 p-0"
              onClick={() => onImagesChange(images.filter((_, i) => i !== idx))}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onImagesChange([...images, '/placeholder.svg'])}
          className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors"
        >
          <div className="text-center">
            <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
            <span className="mt-1 block text-xs text-muted-foreground">Upload</span>
          </div>
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Create src/components/forms/index.ts**

```typescript
export { TextField } from './text-field'
export { SelectField } from './select-field'
export { TextAreaField } from './textarea-field'
export { CurrencyField } from './currency-field'
export { DateField } from './date-field'
export { SwitchField } from './switch-field'
export { ImageUploadField } from './image-upload-field'
```

- [ ] **Step 9: Verify build**

```bash
npm run build
```

- [ ] **Step 10: Commit**

```bash
git add src/components/forms/
git commit -m "feat: add reusable form components (TextField, SelectField, CurrencyField, etc.)"
```

---

### Task 10: DataTable Component

**Files:**
- Create: `src/components/tables/data-table.tsx`, `src/components/tables/index.ts`

**Interfaces:**
- Consumes: TanStack Table, shadcn/ui Table, SearchInput
- Produces: Generic `DataTable<T>` component used by all list pages

- [ ] **Step 1: Create src/components/tables/data-table.tsx**

```typescript
"use client"

import { useState } from 'react'
import {
  type ColumnDef, type ColumnFiltersState, type SortingState,
  type VisibilityState, flexRender, getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SearchInput } from '@/components/shared/search-input'
import { EmptyState } from '@/components/shared/empty-state'
import { ChevronLeft, ChevronRight, Settings2 } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  enableSelection?: boolean
  enablePagination?: boolean
  pageSize?: number
  filterContent?: React.ReactNode
  bulkActions?: React.ReactNode
}

export function DataTable<TData, TValue>({
  columns, data, searchKey, searchPlaceholder = 'Search...',
  enablePagination = true, pageSize = 10, filterContent, bulkActions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
    initialState: { pagination: { pageSize } },
  })

  const selectedCount = table.getFilteredSelectedRowModel().rows.length

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          {searchKey !== undefined && (
            <SearchInput
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder={searchPlaceholder}
            />
          )}
          {filterContent}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings2 className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedCount > 0 && bulkActions && (
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-2">
          <span className="text-sm text-muted-foreground">
            {selectedCount} row(s) selected
          </span>
          {bulkActions}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState
                    title="No results found"
                    description="Try adjusting your search or filters."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            {' '}-{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
            {' '}of {table.getFilteredRowModel().rows.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create src/components/tables/index.ts**

```typescript
export { DataTable } from './data-table'
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/tables/
git commit -m "feat: add generic DataTable component with search, sort, filter, pagination"
```

---

### Task 11: Chart Components

**Files:**
- Create: `src/components/charts/line-chart.tsx`, `src/components/charts/bar-chart.tsx`, `src/components/charts/area-chart.tsx`, `src/components/charts/donut-chart.tsx`, `src/components/charts/horizontal-bar-chart.tsx`, `src/components/charts/index.ts`

**Interfaces:**
- Consumes: Recharts, CSS variables for theme colors
- Produces: Reusable chart components used by dashboard and analytics modules

- [ ] **Step 1: Create src/components/charts/line-chart.tsx**

```typescript
"use client"

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
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
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
```

- [ ] **Step 2: Create src/components/charts/bar-chart.tsx**

```typescript
"use client"

import {
  ResponsiveContainer, BarChart as RechartsBarChart,
  Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'

interface BarChartProps {
  data: Record<string, string | number>[]
  xAxisKey: string
  dataKey: string
  color?: string
  height?: number
}

export function BarChart({ data, xAxisKey, dataKey, color = 'hsl(var(--primary))', height = 300 }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey={xAxisKey} className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
        <YAxis className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
```

- [ ] **Step 3: Create src/components/charts/area-chart.tsx**

```typescript
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
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
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
```

- [ ] **Step 4: Create src/components/charts/donut-chart.tsx**

```typescript
"use client"

import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts'

interface DonutChartDataItem {
  name: string
  value: number
  color: string
}

interface DonutChartProps {
  data: DonutChartDataItem[]
  height?: number
}

export function DonutChart({ data, height = 300 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
```

- [ ] **Step 5: Create src/components/charts/horizontal-bar-chart.tsx**

```typescript
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

export function HorizontalBarChart({ data, xAxisKey, dataKey, color = 'hsl(var(--primary))', height = 300 }: HorizontalBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis type="number" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey={xAxisKey} className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} width={75} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

- [ ] **Step 6: Create src/components/charts/index.ts**

```typescript
export { LineChart } from './line-chart'
export { BarChart } from './bar-chart'
export { AreaChart } from './area-chart'
export { DonutChart } from './donut-chart'
export { HorizontalBarChart } from './horizontal-bar-chart'
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/components/charts/
git commit -m "feat: add reusable chart components (Line, Bar, Area, Donut, HorizontalBar)"
```

---

### Task 12: Admin Layout (Sidebar, Header, Breadcrumbs)

**Files:**
- Create: `src/components/layouts/sidebar.tsx`, `src/components/layouts/header.tsx`, `src/components/layouts/app-breadcrumbs.tsx`, `src/app/(dashboard)/layout.tsx`

**Interfaces:**
- Consumes: `navigation` from constants, `useSidebarStore`, `useAuthStore`, `useNotificationStore`, shadcn Sheet
- Produces: Complete admin layout with sidebar, header, breadcrumbs — wraps all dashboard pages

- [ ] **Step 1: Create src/components/layouts/sidebar.tsx**

```typescript
"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebar-store'
import { navigation, type NavItem } from '@/constants/navigation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip'
import { ChevronDown, ChevronLeft, ChevronRight, Store } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'

function NavItemComponent({ item, isCollapsed, pathname }: {
  item: NavItem
  isCollapsed: boolean
  pathname: string
}) {
  const [isExpanded, setIsExpanded] = useState(
    item.children?.some((child) => pathname === child.href) ?? false
  )
  const isActive = pathname === item.href ||
    item.children?.some((child) => pathname === child.href)

  if (item.children && !isCollapsed) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
            isActive
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
          )}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
        </button>
        {isExpanded && (
          <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors',
                  pathname === child.href
                    ? 'text-sidebar-primary font-medium'
                    : 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  const linkContent = (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
        isCollapsed && 'justify-center px-2'
      )}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      {!isCollapsed && <span>{item.label}</span>}
    </Link>
  )

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    )
  }

  return linkContent
}

function SidebarContent({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className={cn(
        'flex h-16 items-center border-b border-sidebar-border px-4',
        isCollapsed && 'justify-center px-2'
      )}>
        <Link href="/" className="flex items-center gap-2">
          <Store className="h-6 w-6 text-sidebar-primary" />
          {!isCollapsed && (
            <span className="text-lg font-bold text-sidebar-foreground">Store Admin</span>
          )}
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <TooltipProvider>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavItemComponent
                key={item.href}
                item={item}
                isCollapsed={isCollapsed}
                pathname={pathname}
              />
            ))}
          </nav>
        </TooltipProvider>
      </ScrollArea>
    </div>
  )
}

export function Sidebar() {
  const { isCollapsed, toggle, isMobileOpen, setMobileOpen } = useSidebarStore()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (!isDesktop) {
    return (
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContent isCollapsed={false} />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside className={cn(
      'relative hidden h-screen border-r border-sidebar-border transition-all duration-300 lg:block',
      isCollapsed ? 'w-[72px]' : 'w-[280px]'
    )}>
      <SidebarContent isCollapsed={isCollapsed} />
      <Button
        variant="outline"
        size="sm"
        className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full p-0 shadow-md"
        onClick={toggle}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </aside>
  )
}
```

- [ ] **Step 2: Create src/components/layouts/header.tsx**

```typescript
"use client"

import { Bell, Menu, Search, LogOut, User, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useAuthStore } from '@/stores/auth-store'
import { useNotificationStore } from '@/stores/notification-store'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatRelativeDate } from '@/lib/utils'
import Link from 'next/link'

export function Header() {
  const { setMobileOpen } = useSidebarStore()
  const { user } = useAuthStore()
  const { notifications, unreadCount, markAllRead } = useNotificationStore()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() ?? 'A'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      {!isDesktop && (
        <Button variant="ghost" size="sm" onClick={() => setMobileOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="relative hidden flex-1 md:flex">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="max-w-md pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center bg-danger text-danger-foreground">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-auto text-xs p-0" onClick={markAllRead}>
                  Mark all read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, 5).map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3">
                <div className="flex items-center gap-2">
                  {!n.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                  <span className="font-medium text-sm">{n.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{n.message}</span>
                <span className="text-xs text-muted-foreground">{formatRelativeDate(n.createdAt)}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {isDesktop && <span className="text-sm">{user?.name}</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings"><User className="mr-2 h-4 w-4" />Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login"><LogOut className="mr-2 h-4 w-4" />Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Create src/components/layouts/app-breadcrumbs.tsx**

```typescript
"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { Fragment } from 'react'

export function AppBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label = segment
      .replace(/\[.*\]/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
    return { href, label }
  })

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
      <Link href="/" className="hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {crumbs.map((crumb, index) => (
        <Fragment key={crumb.href}>
          <ChevronRight className="h-3.5 w-3.5" />
          {index === crumbs.length - 1 ? (
            <span className="font-medium text-foreground">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-foreground transition-colors">
              {crumb.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
```

- [ ] **Step 4: Create src/app/(dashboard)/layout.tsx**

```typescript
import { Sidebar } from '@/components/layouts/sidebar'
import { Header } from '@/components/layouts/header'
import { AppBreadcrumbs } from '@/components/layouts/app-breadcrumbs'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <AppBreadcrumbs />
          {children}
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/layouts/ src/app/\(dashboard\)/layout.tsx
git commit -m "feat: add admin layout with collapsible sidebar, header, and breadcrumbs"
```

---

### Task 13: Error Handling & Root Pages

**Files:**
- Create: `src/app/error.tsx`, `src/app/not-found.tsx`

**Interfaces:**
- Consumes: Lucide icons, Button
- Produces: Global error boundary and 404 page

- [ ] **Step 1: Create src/app/error.tsx**

```typescript
"use client"

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-danger" />
        <h1 className="mt-6 text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <Button onClick={reset} className="mt-6">
          Try again
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create src/app/not-found.tsx**

```typescript
import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <FileQuestion className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-4xl font-bold">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">Page not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/error.tsx src/app/not-found.tsx
git commit -m "feat: add global error boundary and 404 page"
```

---

### Task 14: Auth Module

**Files:**
- Create: `src/app/(auth)/layout.tsx`, `src/features/auth/schemas.ts`, `src/features/auth/components/auth-card.tsx`, `src/features/auth/components/password-input.tsx`, `src/features/auth/components/social-login-buttons.tsx`, `src/app/(auth)/login/page.tsx`, `src/app/(auth)/register/page.tsx`, `src/app/(auth)/forgot-password/page.tsx`, `src/app/(auth)/reset-password/page.tsx`, `src/app/(auth)/verify-email/page.tsx`

**Interfaces:**
- Consumes: RHF, Zod, auth schemas, auth.service, shadcn components
- Produces: Complete auth flow (login, register, forgot password, reset password, verify email)

- [ ] **Step 1: Create src/features/auth/schemas.ts**

```typescript
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((v) => v, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type RegisterFormData = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const verifyEmailSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
})

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>
```

- [ ] **Step 2: Create src/features/auth/components/auth-card.tsx**

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Store } from 'lucide-react'
import type { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
          <Store className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Store Admin</h1>
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
      {footer && <div className="mt-4 text-center text-sm text-muted-foreground">{footer}</div>}
    </div>
  )
}
```

- [ ] **Step 3: Create src/features/auth/components/password-input.tsx**

```typescript
"use client"

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  name: string
  label: string
  placeholder?: string
}

export function PasswordInput({ name, label, placeholder = 'Enter password' }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          id={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create src/features/auth/components/social-login-buttons.tsx**

```typescript
import { Button } from '@/components/ui/button'

export function SocialLoginButtons() {
  return (
    <div className="space-y-2">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" type="button" disabled>
          Google
        </Button>
        <Button variant="outline" type="button" disabled>
          GitHub
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create src/app/(auth)/layout.tsx**

```typescript
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-4">
      {children}
    </div>
  )
}
```

- [ ] **Step 6: Create src/app/(auth)/login/page.tsx**

```typescript
"use client"

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthCard } from '@/features/auth/components/auth-card'
import { PasswordInput } from '@/features/auth/components/password-input'
import { SocialLoginButtons } from '@/features/auth/components/social-login-buttons'
import { loginSchema, type LoginFormData } from '@/features/auth/schemas'
import { loginService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth-store'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const router = useRouter()
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    try {
      const user = await loginService(data.email, data.password)
      login(user)
      router.push('/')
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your account"
      footer={
        <span>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">Sign up</Link>
        </span>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@store.com" {...methods.register('email')} />
            {methods.formState.errors.email && (
              <p className="text-sm text-danger">{methods.formState.errors.email.message}</p>
            )}
          </div>
          <PasswordInput name="password" label="Password" />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" {...methods.register('rememberMe')} />
              <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
          <SocialLoginButtons />
        </form>
      </FormProvider>
    </AuthCard>
  )
}
```

- [ ] **Step 7: Create src/app/(auth)/register/page.tsx**

```typescript
"use client"

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthCard } from '@/features/auth/components/auth-card'
import { PasswordInput } from '@/features/auth/components/password-input'
import { SocialLoginButtons } from '@/features/auth/components/social-login-buttons'
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas'
import { registerService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth-store'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const router = useRouter()
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', acceptTerms: false },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setError('')
    try {
      const user = await registerService(data.name, data.email, data.password)
      login(user)
      router.push('/')
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <AuthCard
      title="Create an account"
      description="Get started with your admin panel"
      footer={
        <span>
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">Sign in</Link>
        </span>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...methods.register('name')} />
            {methods.formState.errors.name && (
              <p className="text-sm text-danger">{methods.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" {...methods.register('email')} />
            {methods.formState.errors.email && (
              <p className="text-sm text-danger">{methods.formState.errors.email.message}</p>
            )}
          </div>
          <PasswordInput name="password" label="Password" />
          <PasswordInput name="confirmPassword" label="Confirm Password" />
          <div className="flex items-center space-x-2">
            <Checkbox id="acceptTerms" {...methods.register('acceptTerms')} />
            <Label htmlFor="acceptTerms" className="text-sm font-normal">
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>
          {methods.formState.errors.acceptTerms && (
            <p className="text-sm text-danger">{methods.formState.errors.acceptTerms.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
          <SocialLoginButtons />
        </form>
      </FormProvider>
    </AuthCard>
  )
}
```

- [ ] **Step 8: Create src/app/(auth)/forgot-password/page.tsx**

```typescript
"use client"

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthCard } from '@/features/auth/components/auth-card'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/features/auth/schemas'
import { forgotPasswordService } from '@/services/auth.service'
import { Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const methods = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await forgotPasswordService(data.email)
    setSent(true)
  }

  if (sent) {
    return (
      <AuthCard title="Check your email" description="We sent a password reset link to your email">
        <div className="flex flex-col items-center py-4">
          <CheckCircle className="h-12 w-12 text-success" />
          <p className="mt-4 text-sm text-muted-foreground text-center">
            If an account exists with that email, you will receive a password reset link.
          </p>
          <Button variant="outline" className="mt-6" asChild>
            <Link href="/login">Back to sign in</Link>
          </Button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Forgot password?"
      description="Enter your email and we'll send you a reset link"
      footer={
        <Link href="/login" className="text-primary hover:underline">Back to sign in</Link>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@store.com" {...methods.register('email')} />
            {methods.formState.errors.email && (
              <p className="text-sm text-danger">{methods.formState.errors.email.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send reset link
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  )
}
```

- [ ] **Step 9: Create src/app/(auth)/reset-password/page.tsx**

```typescript
"use client"

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { AuthCard } from '@/features/auth/components/auth-card'
import { PasswordInput } from '@/features/auth/components/password-input'
import { resetPasswordSchema, type ResetPasswordFormData } from '@/features/auth/schemas'
import { resetPasswordService } from '@/services/auth.service'
import { Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [success, setSuccess] = useState(false)
  const methods = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetPasswordService('mock-token', data.password)
    setSuccess(true)
  }

  if (success) {
    return (
      <AuthCard title="Password reset" description="Your password has been successfully reset">
        <div className="flex flex-col items-center py-4">
          <CheckCircle className="h-12 w-12 text-success" />
          <Button className="mt-6" asChild>
            <Link href="/login">Sign in with new password</Link>
          </Button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Reset password" description="Enter your new password">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <PasswordInput name="password" label="New Password" />
          <PasswordInput name="confirmPassword" label="Confirm Password" />
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset password
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  )
}
```

- [ ] **Step 10: Create src/app/(auth)/verify-email/page.tsx**

```typescript
"use client"

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthCard } from '@/features/auth/components/auth-card'
import { verifyEmailSchema, type VerifyEmailFormData } from '@/features/auth/schemas'
import { verifyEmailService } from '@/services/auth.service'
import { Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const methods = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: '' },
  })

  const onSubmit = async (data: VerifyEmailFormData) => {
    setError('')
    try {
      await verifyEmailService(data.code)
      setVerified(true)
    } catch {
      setError('Invalid verification code. Try 123456.')
    }
  }

  if (verified) {
    return (
      <AuthCard title="Email verified" description="Your email has been successfully verified">
        <div className="flex flex-col items-center py-4">
          <CheckCircle className="h-12 w-12 text-success" />
          <Button className="mt-6" asChild>
            <Link href="/">Go to Dashboard</Link>
          </Button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Verify your email" description="Enter the 6-digit code sent to your email">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>
          )}
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              placeholder="123456"
              maxLength={6}
              className="text-center text-lg tracking-widest"
              {...methods.register('code')}
            />
            {methods.formState.errors.code && (
              <p className="text-sm text-danger">{methods.formState.errors.code.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive a code?{' '}
            <button type="button" className="text-primary hover:underline">Resend</button>
          </p>
        </form>
      </FormProvider>
    </AuthCard>
  )
}
```

- [ ] **Step 11: Verify build**

```bash
npm run build
```

- [ ] **Step 12: Commit**

```bash
git add src/app/\(auth\)/ src/features/auth/
git commit -m "feat: add auth module (login, register, forgot/reset password, verify email)"
```

---

### Task 15: Dashboard Module

**Files:**
- Create: `src/features/dashboard/components/dashboard-charts.tsx`, `src/features/dashboard/components/recent-orders.tsx`, `src/app/(dashboard)/page.tsx`

**Interfaces:**
- Consumes: `getDashboardKpis`, `getSalesAnalytics`, `getOrders` services, StatCard, ChartCard, chart components
- Produces: Complete dashboard page with KPIs, charts, and recent orders

This task and all subsequent feature-module tasks (16-23) follow the same pattern: create feature components in `features/`, then wire them into thin page files in `app/(dashboard)/`. Each task creates all files for its module and verifies the build.

Since the remaining tasks (15-23) follow the established pattern, the implementer should:

1. Create feature components that compose shared UI (`StatCard`, `ChartCard`, `DataTable`, charts)
2. Create page files that import feature components and call services for data
3. Use Server Components for pages, Client Components for interactive features
4. Verify build after each task
5. Commit

- [ ] **Step 1: Create src/features/dashboard/components/dashboard-charts.tsx**

```typescript
"use client"

import { ChartCard } from '@/components/shared/chart-card'
import { LineChart } from '@/components/charts/line-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { AreaChart } from '@/components/charts/area-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import type { SalesAnalytics } from '@/types'

interface DashboardChartsProps {
  analytics: SalesAnalytics
}

export function DashboardCharts({ analytics }: DashboardChartsProps) {
  const donutData = analytics.ordersByStatus.map((item, i) => ({
    name: item.status,
    value: item.count,
    color: [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
      'hsl(var(--muted-foreground))',
    ][i % 6],
  }))

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ChartCard title="Revenue Trend" subtitle="Last 12 months">
        <LineChart
          data={analytics.revenueOverTime}
          xAxisKey="month"
          series={[
            { dataKey: 'revenue', label: 'Revenue', color: 'hsl(var(--chart-1))' },
            { dataKey: 'previousRevenue', label: 'Previous', color: 'hsl(var(--muted-foreground))', strokeDasharray: '5 5' },
          ]}
        />
      </ChartCard>

      <ChartCard title="Sales by Category">
        <BarChart
          data={analytics.revenueByCategory}
          xAxisKey="category"
          dataKey="revenue"
          color="hsl(var(--chart-2))"
        />
      </ChartCard>

      <ChartCard title="Order Status Distribution">
        <DonutChart data={donutData} />
      </ChartCard>

      <ChartCard title="Daily Orders" subtitle="Last 30 days">
        <AreaChart
          data={analytics.dailyOrders}
          xAxisKey="date"
          series={[
            { dataKey: 'orders', label: 'Orders', color: 'hsl(var(--chart-4))' },
          ]}
        />
      </ChartCard>
    </div>
  )
}
```

- [ ] **Step 2: Create src/features/dashboard/components/recent-orders.tsx**

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/shared/status-badge'
import { orderStatusMap } from '@/constants/status-maps'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Order } from '@/types'

interface RecentOrdersProps {
  orders: Order[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/orders">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.slice(0, 5).map((order) => {
              const status = orderStatusMap[order.status]
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      {order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <StatusBadge label={status.label} variant={status.variant} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 3: Create src/app/(dashboard)/page.tsx**

```typescript
import { PageHeader } from '@/components/shared/page-header'
import { StatCard } from '@/components/shared/stat-card'
import { DashboardCharts } from '@/features/dashboard/components/dashboard-charts'
import { RecentOrders } from '@/features/dashboard/components/recent-orders'
import { getDashboardKpis, getSalesAnalytics } from '@/services/analytics.service'
import { getOrders } from '@/services/order.service'

export default async function DashboardPage() {
  const [kpis, analytics, orders] = await Promise.all([
    getDashboardKpis(),
    getSalesAnalytics(),
    getOrders(),
  ])

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your store performance" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <StatCard key={kpi.label} data={kpi} />
        ))}
      </div>

      <DashboardCharts analytics={analytics} />

      <RecentOrders orders={orders} />
    </div>
  )
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/features/dashboard/ src/app/\(dashboard\)/page.tsx
git commit -m "feat: add dashboard with KPI cards, charts, and recent orders"
```

---

### Task 16: Products Module

**Files:**
- Create: `src/features/products/components/product-columns.tsx`, `src/features/products/components/product-form.tsx`, `src/features/products/schemas.ts`, `src/app/(dashboard)/products/page.tsx`, `src/app/(dashboard)/products/new/page.tsx`, `src/app/(dashboard)/products/[id]/page.tsx`, `src/app/(dashboard)/products/[id]/edit/page.tsx`

**Interfaces:**
- Consumes: `DataTable`, `PageHeader`, product service, product types, form components
- Produces: Complete product CRUD pages

The implementer should create:
1. `product-columns.tsx` — TanStack Table column definitions with image, name+SKU, category badge, price, stock (with low-stock warning), status badge, relative date, actions dropdown (View/Edit/Delete links)
2. `schemas.ts` — Zod schema for product form validation (name required, price > 0, SKU alphanumeric)
3. `product-form.tsx` — Two-column RHF form using `TextField`, `SelectField`, `TextAreaField`, `CurrencyField`, `ImageUploadField`. Slug auto-generates from name via `slugify()`. Categories: Electronics, Clothing, Home & Kitchen, Sports, Footwear, Accessories. Status: draft/active/archived.
4. Product list page — Server Component calling `getProducts()`, renders `PageHeader` with "Add Product" button + `DataTable` with product columns
5. Create product page — Client Component with `ProductForm` in create mode
6. Product details page — Server Component calling `getProduct(id)`, renders read-only product info with image gallery placeholder, edit button
7. Edit product page — Client Component pre-filling `ProductForm` with existing data

- [ ] **Step 1: Create all product module files as described above**

Follow the pattern established in Tasks 8-14 for each file.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/features/products/ src/app/\(dashboard\)/products/
git commit -m "feat: add products module with list, create, edit, details pages"
```

---

### Task 17: Orders Module

**Files:**
- Create: `src/features/orders/components/order-columns.tsx`, `src/features/orders/components/order-timeline.tsx`, `src/features/orders/components/order-details-view.tsx`, `src/app/(dashboard)/orders/page.tsx`, `src/app/(dashboard)/orders/[id]/page.tsx`

**Interfaces:**
- Consumes: `DataTable`, `PageHeader`, order service, order types, StatusBadge
- Produces: Orders list page and order details page with timeline

The implementer should create:
1. `order-columns.tsx` — Columns: checkbox, order number (link), customer name+email, date, items count, total (currency), payment status badge, order status badge (7 colors), actions dropdown
2. `order-timeline.tsx` — Vertical timeline component with colored dots per status, timestamps, descriptions, most recent at top
3. `order-details-view.tsx` — Three info cards (customer, shipping address, billing address), items table with image+name+SKU+qty+price+total rows, subtotal/shipping/tax/total summary, timeline component
4. Orders list page — Server Component, `getOrders()`, `PageHeader`, `DataTable` with order columns, search + status filter + payment filter
5. Order details page — Server Component, `getOrder(id)`, `OrderDetailsView`

- [ ] **Step 1: Create all order module files as described above**

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/features/orders/ src/app/\(dashboard\)/orders/
git commit -m "feat: add orders module with list and detail pages including timeline"
```

---

### Task 18: Customers Module

**Files:**
- Create: `src/features/customers/components/customer-columns.tsx`, `src/features/customers/components/customer-details-view.tsx`, `src/app/(dashboard)/customers/page.tsx`, `src/app/(dashboard)/customers/[id]/page.tsx`

**Interfaces:**
- Consumes: `DataTable`, `PageHeader`, customer service, customer types, `MetricCard`, shadcn Tabs
- Produces: Customer list and details pages with tabs

The implementer should create:
1. `customer-columns.tsx` — Columns: checkbox, avatar+name+email, orders count, total spent (currency), last order (relative date), status badge, actions
2. `customer-details-view.tsx` — Client Component with: profile header (avatar fallback, name, email, phone, member since), 3 KPI MetricCards (Lifetime Value, Total Orders, Avg Spend), shadcn Tabs for Orders (compact table), Addresses (cards with default badge), Notes (list + add note textarea with local state)
3. Customer list page — Server Component
4. Customer details page — Server Component calling `getCustomer(id)`, rendering `CustomerDetailsView`

- [ ] **Step 1: Create all customer module files as described above**

- [ ] **Step 2: Verify build & commit**

```bash
npm run build
git add src/features/customers/ src/app/\(dashboard\)/customers/
git commit -m "feat: add customers module with list and detail pages"
```

---

### Task 19: Inventory Module

**Files:**
- Create: `src/features/inventory/components/inventory-columns.tsx`, `src/features/inventory/components/adjustment-columns.tsx`, `src/features/inventory/components/warehouse-card.tsx`, `src/app/(dashboard)/inventory/page.tsx`, `src/app/(dashboard)/inventory/adjustments/page.tsx`, `src/app/(dashboard)/inventory/warehouses/page.tsx`

**Interfaces:**
- Consumes: `DataTable`, `PageHeader`, `StatCard`, `MetricCard`, inventory service, types, `Progress` (shadcn)
- Produces: Inventory overview, stock adjustments, and warehouses pages

The implementer should create:
1. `inventory-columns.tsx` — Full inventory table columns with stock level color coding
2. `adjustment-columns.tsx` — Movement log columns with colored quantity (+green/-red)
3. `warehouse-card.tsx` — Card component with name, location, product count, Progress bar for utilization, status badge
4. Overview page — 4 KPIs (Total Products, Low Stock warning, Out of Stock danger, Inventory Value), low stock alerts table, full inventory table
5. Adjustments page — DataTable with adjustment columns, "New Adjustment" dialog placeholder
6. Warehouses page — Card grid layout

- [ ] **Step 1: Create all inventory module files as described above**

- [ ] **Step 2: Verify build & commit**

```bash
npm run build
git add src/features/inventory/ src/app/\(dashboard\)/inventory/
git commit -m "feat: add inventory module with overview, adjustments, and warehouses"
```

---

### Task 20: Discounts Module

**Files:**
- Create: `src/features/discounts/components/discount-columns.tsx`, `src/features/discounts/components/discount-form.tsx`, `src/features/discounts/schemas.ts`, `src/app/(dashboard)/discounts/page.tsx`, `src/app/(dashboard)/discounts/new/page.tsx`, `src/app/(dashboard)/discounts/[id]/edit/page.tsx`

**Interfaces:**
- Consumes: `DataTable`, `PageHeader`, form components, discount service, types
- Produces: Discount list, create, and edit pages

The implementer should create:
1. `discount-columns.tsx` — Columns: checkbox, code (monospace font-mono), type badge, value (formatted: "20%" or "$10.00" or "Free"), usage "used/limit", start date, end date, computed status badge (Active/Expired/Scheduled/Disabled), actions
2. `schemas.ts` — Zod schema: code required (uppercase alphanumeric), value required for % and $ types, end date after start date
3. `discount-form.tsx` — Single-column card layout. Code + generate button. Type radio (percentage/fixed/free_shipping). Conditional value field. Date fields. Usage limit fields. Active toggle switch. Uses `SwitchField`, `DateField`, `TextField`, `CurrencyField`.
4. List page — Server Component
5. Create/Edit pages — Client Components with `DiscountForm`

- [ ] **Step 1: Create all discount module files as described above**

- [ ] **Step 2: Verify build & commit**

```bash
npm run build
git add src/features/discounts/ src/app/\(dashboard\)/discounts/
git commit -m "feat: add discounts module with list, create, and edit pages"
```

---

### Task 21: Marketing Module

**Files:**
- Create: `src/features/marketing/components/campaign-columns.tsx`, `src/features/marketing/components/email-dashboard.tsx`, `src/app/(dashboard)/marketing/page.tsx`, `src/app/(dashboard)/marketing/campaigns/page.tsx`, `src/app/(dashboard)/marketing/email/page.tsx`

**Interfaces:**
- Consumes: `DataTable`, `PageHeader`, `StatCard`, `MetricCard`, `ChartCard`, chart components, marketing service
- Produces: Marketing overview, campaigns list, email marketing pages

The implementer should create:
1. `campaign-columns.tsx` — Columns: name, type badge, status badge, dates, reach, conversions, revenue
2. `email-dashboard.tsx` — Client Component: 3 MetricCards, email performance AreaChart, recent emails compact table
3. Marketing overview page — 4 KPI StatCards, campaign performance BarChart, recent campaigns compact table
4. Campaigns page — DataTable with campaign columns, "New Campaign" placeholder button
5. Email page — EmailDashboard component

- [ ] **Step 1: Create all marketing module files as described above**

- [ ] **Step 2: Verify build & commit**

```bash
npm run build
git add src/features/marketing/ src/app/\(dashboard\)/marketing/
git commit -m "feat: add marketing module with overview, campaigns, and email pages"
```

---

### Task 22: Analytics Module

**Files:**
- Create: `src/features/analytics/components/sales-dashboard.tsx`, `src/features/analytics/components/product-analytics-view.tsx`, `src/features/analytics/components/customer-analytics-view.tsx`, `src/app/(dashboard)/analytics/page.tsx`, `src/app/(dashboard)/analytics/products/page.tsx`, `src/app/(dashboard)/analytics/customers/page.tsx`

**Interfaces:**
- Consumes: `StatCard`, `ChartCard`, chart components, `DataTable`, analytics service
- Produces: Sales, product, and customer analytics pages

The implementer should create:
1. `sales-dashboard.tsx` — Client Component: 4 KPIs, 2x2 chart grid (revenue line with previous period dashed, orders donut, revenue by category bar, daily orders area), monthly summary table
2. `product-analytics-view.tsx` — Client Component: top products HorizontalBarChart, product performance DataTable (units, revenue, return rate, rating, stock)
3. `customer-analytics-view.tsx` — Client Component: 4 KPIs, new vs returning stacked AreaChart, acquisition by source BarChart, customer segments table
4. Three pages — each Server Component calling respective analytics service, rendering the feature component

- [ ] **Step 1: Create all analytics module files as described above**

- [ ] **Step 2: Verify build & commit**

```bash
npm run build
git add src/features/analytics/ src/app/\(dashboard\)/analytics/
git commit -m "feat: add analytics module with sales, product, and customer analytics"
```

---

### Task 23: Settings Module

**Files:**
- Create: `src/features/settings/components/store-settings-form.tsx`, `src/features/settings/components/users-table.tsx`, `src/features/settings/components/appearance-settings.tsx`, `src/features/settings/schemas.ts`, `src/features/settings/mock-data.ts`, `src/app/(dashboard)/settings/page.tsx`, `src/app/(dashboard)/settings/users/page.tsx`, `src/app/(dashboard)/settings/appearance/page.tsx`

**Interfaces:**
- Consumes: Form components, `DataTable`, `PageHeader`, settings types, next-themes `useTheme()`
- Produces: Store settings, users & roles, and appearance pages

The implementer should create:
1. `schemas.ts` — Zod schemas for store settings (name required, url url format, email format)
2. `mock-data.ts` — Mock store settings, team members, role permissions
3. `store-settings-form.tsx` — Client Component: RHF form with store info (name, url, description), regional settings (currency select, timezone select, date format select), contact (email, phone). Mock save with toast.
4. `users-table.tsx` — Client Component: DataTable with avatar+name, email, role badge, status badge, last active (relative), actions. "Invite User" Dialog with name, email, role select. Permission matrix card below table (modules x roles checkmarks).
5. `appearance-settings.tsx` — Client Component: theme RadioGroup (Light/Dark/System) wired to `useTheme()`. Branding section (logo/favicon upload placeholders, color input). Live preview card showing current theme color swatches.
6. Three pages — each rendering its feature component with PageHeader

- [ ] **Step 1: Create all settings module files as described above**

- [ ] **Step 2: Verify build & commit**

```bash
npm run build
git add src/features/settings/ src/app/\(dashboard\)/settings/
git commit -m "feat: add settings module with store, users/roles, and appearance pages"
```

---

### Task 24: Final Integration & Verification

**Files:**
- No new files — verification only

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified, building, running application

- [ ] **Step 1: Full build verification**

```bash
npm run build
```

Expected: Build succeeds with no errors, all pages statically generated or server-rendered.

- [ ] **Step 2: Start dev server and smoke test**

```bash
npm run dev
```

Verify in browser:
- Dashboard loads with KPIs and charts at `http://localhost:3000`
- Sidebar navigation works, collapses/expands
- Dark mode toggle works (Settings → Appearance)
- Products list → create → edit flow works
- Orders list → details with timeline works
- All other module pages render without errors
- Mobile responsive: sidebar becomes drawer
- Login page renders at `/login`

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final integration verification"
```
