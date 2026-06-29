# Ecommerce Admin Panel Template — Design Spec

## Overview

A production-grade, reusable ecommerce admin panel template built with Next.js 15+ (App Router), TypeScript (strict mode), Tailwind CSS v4, shadcn/ui, and a Slack-inspired color system. Designed as a white-label template for multiple brands/stores.

**Visual inspiration:** Slack, Shopify Admin, Linear, Stripe Dashboard, Vercel Dashboard.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15+ (App Router) | Framework, routing, Server Components |
| TypeScript (strict) | Type safety |
| Tailwind CSS v4 | Styling via CSS-based config (`@theme`) |
| shadcn/ui (New York) | Component primitives |
| Lucide React | Icons |
| React Hook Form | Form state management |
| Zod | Schema validation |
| TanStack Table | Data tables |
| Recharts | Charts |
| Zustand | Client state management |
| next-themes | Dark/light/system theme |

---

## Architecture

**Approach:** Feature-First Modules

Each feature module (`features/<module>/`) is self-contained with its own components, types, mock data, and page-level logic. Shared UI lives in `components/ui/` (shadcn) and `components/shared/`. Pages in `app/` are thin wrappers importing from `features/`.

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── verify-email/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── edit/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── customers/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── inventory/
│   │   │   ├── page.tsx
│   │   │   ├── adjustments/page.tsx
│   │   │   └── warehouses/page.tsx
│   │   ├── discounts/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── marketing/
│   │   │   ├── page.tsx
│   │   │   ├── campaigns/page.tsx
│   │   │   └── email/page.tsx
│   │   ├── analytics/
│   │   │   ├── page.tsx
│   │   │   ├── products/page.tsx
│   │   │   └── customers/page.tsx
│   │   └── settings/
│   │       ├── page.tsx
│   │       ├── users/page.tsx
│   │       └── appearance/page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── ui/                  (shadcn primitives)
│   ├── shared/              (PageHeader, StatCard, StatusBadge, etc.)
│   ├── layouts/             (Sidebar, Header, Breadcrumbs)
│   ├── charts/              (Reusable Recharts wrappers)
│   ├── forms/               (FormField, TextField, SelectField, etc.)
│   └── tables/              (DataTable, column helpers)
├── features/
│   ├── dashboard/
│   ├── products/
│   ├── orders/
│   ├── customers/
│   ├── inventory/
│   ├── discounts/
│   ├── marketing/
│   ├── analytics/
│   ├── settings/
│   └── auth/
├── providers/               (ThemeProvider, root providers)
├── hooks/                   (useDebounce, useMediaQuery)
├── services/                (api-client, *.service.ts)
├── stores/                  (Zustand: auth, sidebar, notification)
├── types/                   (Product, Order, Customer, etc.)
├── constants/               (navigation config, status maps)
└── lib/                     (cn, formatCurrency, formatDate)
```

**Routing strategy:**
- `(auth)` route group: no sidebar, centered auth layout
- `(dashboard)` route group: full admin layout with sidebar + header

**Data flow:**
- Server Components by default; Client Components only for interactivity
- Services return typed mock data, async functions, replaceable with real API calls

---

## Theme System

### Color System (Slack-Inspired, CSS Variables)

Defined in `globals.css`, consumed via Tailwind v4 `@theme`.

| Token | Light | Dark |
|-------|-------|------|
| `--background` | #FFFFFF | #1A1D21 |
| `--surface` | #F8F8F8 | #222529 |
| `--primary` | #4A154B | #611F69 |
| `--secondary` | #611F69 | #7C3085 |
| `--accent` | #ECB22E | #ECB22E |
| `--success` | #2EB67D | #2EB67D |
| `--danger` | #E01E5A | #E01E5A |
| `--info` | #36C5F0 | #36C5F0 |
| `--text` | #1D1C1D | #FFFFFF |
| `--muted` | #616061 | #ABABAD |
| `--border` | #E5E7EB | #3F4042 |

shadcn/ui variables (`--card`, `--popover`, `--ring`, etc.) mapped to semantic tokens.

**Theme modes:** Light, Dark, System — via next-themes, persisted automatically.

---

## Admin Layout

### Desktop (>=1024px)
- **Sidebar:** 280px expanded, 80px collapsed (icons only). Collapsible via Zustand `sidebarStore`.
- **Header:** Global search input, notification bell with badge, user avatar dropdown.
- **Breadcrumbs:** Auto-generated from route segments.
- Navigation config driven from `constants/navigation.ts`.

### Mobile (<1024px)
- Sidebar becomes shadcn Sheet (drawer).
- Hamburger icon in header triggers drawer.
- Full-width content area.

### Sidebar Sections
Dashboard, Products, Orders, Customers, Inventory, Discounts, Marketing, Analytics, Settings. Lucide icons. Nested navigation support.

---

## Module Designs

### Authentication

**Layout:** Centered card, full-page background, no sidebar. Uses `(auth)` route group.

**Pages:**
| Page | Fields | Extras |
|------|--------|--------|
| Login | email, password | Remember me, password toggle, forgot link, social placeholders (Google, GitHub) |
| Register | name, email, password, confirm password | Password strength indicator, terms checkbox |
| Forgot Password | email | Success state ("Check your email") |
| Reset Password | new password, confirm password | Token from URL params |
| Verify Email | OTP/code input | Resend link with cooldown |

- All forms: RHF + Zod, loading/error states, Client Components
- Mock service functions simulate success/error with delays
- Shared: AuthCard wrapper, SocialLoginButtons, PasswordInput

---

### Dashboard

**KPI Cards (6, responsive grid: 3 cols desktop, 2 tablet, 1 mobile):**

| Card | Icon | Format |
|------|------|--------|
| Revenue | DollarSign | currency |
| Orders | ShoppingCart | number |
| Customers | Users | number |
| Conversion Rate | TrendingUp | percentage |
| Avg Order Value | Receipt | currency |
| Products Sold | Package | number |

Each card: icon, value, trend arrow, percentage change, "vs last month".

**Charts (2x2 grid):**
- Revenue Trend — Line chart, 12 months
- Sales by Category — Bar chart, 6-8 categories
- Order Status — Donut chart
- Customer Growth — Area chart, new vs returning

Each in ChartCard with title, optional time range selector.

**Below charts:**
- Recent Orders — compact table, last 5 orders
- Top Selling Products — horizontal bar chart, top 5

---

### Products

**List page:** TanStack Table — Image, Name (+ SKU subtitle), Category, Price, Stock, Status (Draft/Active/Archived), Updated, Actions (View/Edit/Delete). Search, filters (category, status), column visibility, bulk actions, pagination.

**Form (Create & Edit):** Two-column layout on desktop. Left: Name, Slug (auto-gen), Description, Pricing (Price/Compare/Cost), Inventory (SKU/Stock). Right: Status, Category, Brand, Tags, ImageUploader. RHF + Zod.

**Details page:** Read-only view, image gallery, edit button.

**Type:**
```typescript
interface Product {
  id: string; name: string; slug: string; sku: string; description: string;
  category: string; brand: string; price: number; comparePrice: number | null;
  costPrice: number | null; stock: number; images: string[]; tags: string[];
  status: 'draft' | 'active' | 'archived'; createdAt: string; updatedAt: string;
}
```

---

### Orders

**List page:** TanStack Table — Order #, Customer (name + email), Date, Items count, Total, Payment status, Order status (7 statuses), Actions. Search, filters (status, payment, date range). Color-coded status badges.

**Details page:** Three info cards (Customer, Shipping, Billing). Items table with subtotal/shipping/tax/total. Vertical timeline (most recent at top) with colored dots per status.

**Type:**
```typescript
interface Order {
  id: string; orderNumber: string;
  customer: { id: string; name: string; email: string; phone: string };
  items: OrderItem[]; subtotal: number; shipping: number; tax: number; total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  shippingAddress: Address; billingAddress: Address; timeline: TimelineEvent[];
  createdAt: string; updatedAt: string;
}
```

---

### Customers

**List page:** TanStack Table — Avatar + Name + Email, Orders count, Total Spent, Last Order, Status (Active/Inactive), Actions. Search, status filter.

**Details page:** Profile header (avatar, name, email, phone, member since). Three KPI cards (Lifetime Value, Total Orders, Avg Spend). Tabbed content: Orders (compact history table), Addresses (cards with default badge), Notes (list + add note textarea).

**Type:**
```typescript
interface Customer {
  id: string; name: string; email: string; phone: string; avatar: string | null;
  status: 'active' | 'inactive'; totalOrders: number; totalSpent: number;
  averageOrderValue: number; addresses: Address[]; notes: CustomerNote[];
  createdAt: string; updatedAt: string;
}
```

---

### Inventory

**Overview page:** 4 KPI cards (Total Products, Low Stock, Out of Stock, Inventory Value). Low stock alerts table (sorted by urgency). Full inventory table.

**Adjustments page:** Movement log table — Date, Product, Type (Received/Sold/Returned/Adjusted), Quantity (+/-), Reason, Adjusted By. Filters. "New Adjustment" dialog.

**Warehouses page:** Card grid — name, location, product count, utilization progress bar, status. Read-only.

**Types:**
```typescript
interface InventoryItem {
  id: string; productId: string; productName: string; sku: string; category: string;
  inStock: number; reserved: number; available: number; threshold: number; updatedAt: string;
}
interface StockAdjustment {
  id: string; productId: string; productName: string; sku: string;
  type: 'received' | 'sold' | 'returned' | 'adjusted';
  quantity: number; reason: string; adjustedBy: string; createdAt: string;
}
interface Warehouse {
  id: string; name: string; location: string; productCount: number;
  capacity: number; utilization: number; status: 'active' | 'inactive';
}
```

---

### Discounts

**List page:** TanStack Table — Code (monospace), Type (Percentage/Fixed/Free Shipping), Value, Usage (used/limit), Start Date, End Date, Status (Active/Expired/Scheduled/Disabled), Actions. Search, filters.

**Form (Create & Edit):** Single-column cards — Code (+ generate button), Type (radio), Value (conditional), Start/End dates, Usage limits (total, per customer, min order), Active toggle. RHF + Zod.

**Type:**
```typescript
interface Discount {
  id: string; code: string; type: 'percentage' | 'fixed' | 'free_shipping';
  value: number; minOrderValue: number | null; usageLimit: number | null;
  perCustomerLimit: number | null; usedCount: number;
  startDate: string; endDate: string; isActive: boolean;
  createdAt: string; updatedAt: string;
}
```

---

### Marketing

**Dashboard page:** 4 KPI cards (Active Campaigns, Total Reach, Avg Open Rate, Avg Click Rate). Campaign performance bar chart. Recent campaigns table.

**Campaigns page:** TanStack Table — Name, Type (Email/Social/Promotion), Status (Draft/Active/Paused/Completed), Dates, Reach, Conversions, Revenue. Read-only, placeholder "New Campaign" button.

**Email page:** 3 metric cards (Sent, Open Rate, Click Rate). Email performance area chart (Sent/Opened/Clicked). Recent emails table.

**Types:**
```typescript
interface Campaign {
  id: string; name: string; type: 'email' | 'social' | 'promotion';
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string; endDate: string; reach: number; conversions: number;
  revenue: number; createdAt: string;
}
interface EmailCampaign {
  id: string; subject: string; sentCount: number; openCount: number;
  clickCount: number; openRate: number; clickRate: number;
  status: 'draft' | 'sent' | 'scheduled'; sentAt: string | null;
}
```

---

### Analytics

**Sales page:** 4 KPIs (Revenue, Orders, Conversion Rate, Repeat Purchase Rate). 2x2 chart grid (Revenue line, Orders donut, Revenue by category bar, Daily orders area). Monthly summary table.

**Product analytics page:** Top selling horizontal bar chart. Product performance table (Name, Units, Revenue, Return Rate, Rating, Stock). Category filter.

**Customer analytics page:** 4 KPIs (Total, New This Month, Retention, LTV). New vs Returning stacked area chart. Acquisition by source bar chart. Customer segments table (VIP/Regular/New).

---

### Settings

**Store settings page:** Form — Store Name, URL, Description, Currency, Timezone, Date Format, Support Email, Phone. RHF + Zod. Mock save.

**Users & Roles page:** Users table (Name, Email, Role badge, Status, Last Active, Actions). "Invite User" dialog. Permission matrix card below (modules x roles, checkmarks).

**Appearance page:** Theme radio group (Light/Dark/System — functional via next-themes). Branding fields (logo/favicon upload placeholders, brand color input). Live preview card showing theme swatches.

**Types:**
```typescript
interface StoreSettings {
  name: string; url: string; description: string; currency: string;
  timezone: string; dateFormat: string; supportEmail: string; phone: string;
}
interface TeamMember {
  id: string; name: string; email: string; avatar: string | null;
  role: 'admin' | 'manager' | 'support'; status: 'active' | 'inactive';
  lastActiveAt: string;
}
interface RolePermission { module: string; admin: boolean; manager: boolean; support: boolean; }
```

---

## Shared Systems

### Reusable Components (`components/shared/`)

PageHeader, StatCard, MetricCard, StatusBadge, SearchInput, FilterBar, EmptyState, ConfirmDialog, ChartCard, FileUploader, ImageUploader, AppBreadcrumbs.

### Reusable Charts (`components/charts/`)

LineChart, BarChart, AreaChart, DonutChart, HorizontalBarChart — all accept `data`, `config`, `height`, `loading`. Theme-aware via CSS variables.

### DataTable (`components/tables/`)

Generic `DataTable<T>` wrapping TanStack Table. Accepts `columns`, `data`, `searchKey`, `filters`, `enableSelection`, `enablePagination`, `pageSize`, `onBulkAction`. Renders search + filters + table + pagination + bulk actions.

### Form Components (`components/forms/`)

FormField, TextField, SelectField, TextAreaField, CurrencyField, DateField, ImageUploadField, SwitchField. All wrap shadcn primitives + RHF Controller.

---

## State Management (Zustand)

| Store | State | Actions |
|-------|-------|---------|
| `authStore` | user, isAuthenticated, isLoading | login, logout, setUser |
| `sidebarStore` | isCollapsed, isMobileOpen | toggle, setMobileOpen |
| `notificationStore` | notifications[], unreadCount | add, markRead, markAllRead, remove |

No theme store — next-themes handles persistence via `useTheme()`.

---

## Service Layer

| File | Functions |
|------|-----------|
| `api-client.ts` | Base fetch wrapper, typed responses, error handling |
| `auth.service.ts` | login, register, forgotPassword (mock with delays) |
| `product.service.ts` | getProducts, getProduct, createProduct, updateProduct, deleteProduct |
| `order.service.ts` | getOrders, getOrder, updateOrderStatus |
| `customer.service.ts` | getCustomers, getCustomer |
| `inventory.service.ts` | getInventory, getAdjustments, getWarehouses, createAdjustment |
| `discount.service.ts` | getDiscounts, getDiscount, createDiscount, updateDiscount |
| `marketing.service.ts` | getCampaigns, getEmailCampaigns |
| `analytics.service.ts` | getSalesAnalytics, getProductAnalytics, getCustomerAnalytics, getDashboardKPIs |

All async, typed, mock data — trivially replaceable with real fetch calls.

---

## Error Handling & Loading

**Error handling:**
- `app/error.tsx` — Global error boundary, retry button
- `app/not-found.tsx` — 404 page, "Go Home" button
- `components/shared/error-boundary.tsx` — Feature-level error boundary

**Skeletons:**
- DashboardSkeleton, TableSkeleton, FormSkeleton, ChartSkeleton
- Match real component layout to avoid layout shift
- Use shadcn Skeleton primitive

---

## Shared Types (`types/common.ts`)

```typescript
interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  sku: string
  price: number
  quantity: number
  total: number
}

interface TimelineEvent {
  id: string
  status: string
  description: string
  timestamp: string
}

interface CustomerNote {
  id: string
  content: string
  createdBy: string
  createdAt: string
}
```

---

## Utilities (`lib/`)

- `cn()` — clsx + tailwind-merge
- `formatCurrency(value, currency)` — Intl.NumberFormat
- `formatDate(date, format)` — date formatting
- `formatNumber(value)` — number formatting with locale
- `formatPercentage(value)` — percentage formatting

## Hooks (`hooks/`)

- `useDebounce(value, delay)` — debounced value for search
- `useMediaQuery(query)` — responsive breakpoint detection
