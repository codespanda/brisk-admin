import { H1, Lead, H2, H3, P, UL, LI, Code, Callout } from '../components/DocsProse'

const BASE = 'https://codespanda.github.io/brisk-admin'

function LiveLink({ path, children }: { path: string; children: React.ReactNode }) {
  return (
    <a
      href={`${BASE}${path}`}
      target="_blank"
      rel="noreferrer"
      className="font-mono text-[13px] text-primary underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  )
}

export function FeaturesPage() {
  return (
    <div>
      <H1>Features & Pages</H1>
      <Lead>A tour of every section in the admin dashboard and what each page does.</Lead>

      <H2>Dashboard</H2>
      <P>
        Route: <LiveLink path="/dashboard">/dashboard</LiveLink> →{' '}
        <Code>src/pages/DashboardPage.tsx</Code>
      </P>
      <UL>
        <LI>KPI metric cards (revenue, orders, customers, growth)</LI>
        <LI>Product selling area/bar chart</LI>
        <LI>Best sellers table</LI>
        <LI>Orders by country map</LI>
        <LI>Live activity feed</LI>
      </UL>

      <H2>Products</H2>
      <H3>
        List — <LiveLink path="/products">/products</LiveLink>
      </H3>
      <P>Paginated product table with search, status filter, and bulk actions.</P>

      <H3>
        Create — <LiveLink path="/products/new">/products/new</LiveLink>
      </H3>
      <P>
        Full product form built with React Hook Form + Zod. Schema lives in{' '}
        <Code>src/features/products/schemas.ts</Code>.
      </P>

      <H3>Detail — <Code>/products/:id</Code></H3>
      <P>Read-only product overview with stats and variant breakdown.</P>

      <H3>Edit — <Code>/products/:id/edit</Code></H3>
      <P>Same form as Create, pre-populated from the service layer.</P>

      <H2>Orders</H2>
      <P>
        Route: <LiveLink path="/orders">/orders</LiveLink> and <Code>/orders/:id</Code>
      </P>
      <UL>
        <LI>Order table with status chips and date filters</LI>
        <LI>Order detail view with line items, customer info, and shipping</LI>
        <LI>Timeline component showing lifecycle events</LI>
      </UL>

      <H2>Customers</H2>
      <P>
        Route: <LiveLink path="/customers">/customers</LiveLink>
      </P>
      <UL>
        <LI>Customer list with lifetime value and order count</LI>
        <LI>Status badges (active, at-risk, churned)</LI>
      </UL>

      <H2>Inventory</H2>
      <UL>
        <LI>
          <LiveLink path="/inventory">/inventory</LiveLink> — stock overview across all SKUs
        </LI>
        <LI>
          <LiveLink path="/inventory/adjustments">/inventory/adjustments</LiveLink> — manual stock
          adjustments log
        </LI>
        <LI>
          <LiveLink path="/inventory/warehouses">/inventory/warehouses</LiveLink> — warehouse cards
          with capacity indicators
        </LI>
      </UL>

      <H2>Discounts</H2>
      <P>
        Route: <LiveLink path="/discounts">/discounts</LiveLink>
      </P>
      <P>
        Coupon and discount management with a Zod-validated creation form in{' '}
        <Code>src/features/discounts/</Code>.
      </P>

      <H2>Marketing</H2>
      <UL>
        <LI>
          <LiveLink path="/marketing">/marketing</LiveLink> — marketing overview
        </LI>
        <LI>
          <LiveLink path="/marketing/campaigns">/marketing/campaigns</LiveLink> — campaign list with
          performance metrics
        </LI>
        <LI>
          <LiveLink path="/marketing/email">/marketing/email</LiveLink> — email subscriber
          management
        </LI>
      </UL>

      <H2>Analytics</H2>
      <UL>
        <LI>
          <LiveLink path="/analytics">/analytics</LiveLink> — sales analytics with revenue charts
        </LI>
        <LI>
          <LiveLink path="/analytics/products">/analytics/products</LiveLink> — per-product
          performance
        </LI>
        <LI>
          <LiveLink path="/analytics/customers">/analytics/customers</LiveLink> — cohort and
          retention views
        </LI>
      </UL>

      <H2>Settings</H2>
      <UL>
        <LI>
          <LiveLink path="/settings">/settings</LiveLink> — store name, currency, timezone,
          notifications
        </LI>
        <LI>
          <LiveLink path="/settings/users">/settings/users</LiveLink> — user & role management table
        </LI>
      </UL>

      <H2>Resources (Dev Utilities)</H2>
      <UL>
        <LI>
          <LiveLink path="/resources/components">/resources/components</LiveLink> — component
          showcase
        </LI>
        <LI>
          <LiveLink path="/resources/forms">/resources/forms</LiveLink> — form element examples
        </LI>
        <LI>
          <LiveLink path="/resources/charts">/resources/charts</LiveLink> — chart type gallery
        </LI>
      </UL>

      <H2>Error Pages</H2>
      <UL>
        <LI>
          <LiveLink path="/not-found-demo">/not-found-demo</LiveLink> — 404 page preview
        </LI>
        <LI>
          <LiveLink path="/error-demo">/error-demo</LiveLink> — 500 server error page preview
        </LI>
      </UL>

      <Callout type="info">
        All data displayed on these pages is mock data returned from <Code>src/services/</Code>.
        Replace the service implementations to connect to a real backend.
      </Callout>
    </div>
  )
}
