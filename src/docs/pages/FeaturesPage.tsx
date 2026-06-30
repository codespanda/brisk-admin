import { H1, Lead, H2, H3, P, UL, LI, Code, Callout } from '../components/DocsProse'

export function FeaturesPage() {
  return (
    <div>
      <H1>Features & Pages</H1>
      <Lead>A tour of every section in the admin dashboard and what each page does.</Lead>

      <H2>Dashboard</H2>
      <P>Route: <Code>/</Code> → <Code>src/pages/DashboardPage.tsx</Code></P>
      <UL>
        <LI>KPI metric cards (revenue, orders, customers, growth)</LI>
        <LI>Product selling area/bar chart</LI>
        <LI>Best sellers table</LI>
        <LI>Orders by country map</LI>
        <LI>Live activity feed</LI>
      </UL>

      <H2>Products</H2>
      <H3>List — <Code>/products</Code></H3>
      <P>Paginated product table with search, status filter, and bulk actions.</P>

      <H3>Create — <Code>/products/new</Code></H3>
      <P>
        Full product form built with React Hook Form + Zod. Schema lives in{' '}
        <Code>src/features/products/schemas.ts</Code>.
      </P>

      <H3>Detail — <Code>/products/:id</Code></H3>
      <P>Read-only product overview with stats and variant breakdown.</P>

      <H3>Edit — <Code>/products/:id/edit</Code></H3>
      <P>Same form as Create, pre-populated from the service layer.</P>

      <H2>Orders</H2>
      <P>Route: <Code>/orders</Code> and <Code>/orders/:id</Code></P>
      <UL>
        <LI>Order table with status chips and date filters</LI>
        <LI>Order detail view with line items, customer info, and shipping</LI>
        <LI>Timeline component showing lifecycle events</LI>
      </UL>

      <H2>Customers</H2>
      <P>Route: <Code>/customers</Code></P>
      <UL>
        <LI>Customer list with lifetime value and order count</LI>
        <LI>Status badges (active, at-risk, churned)</LI>
      </UL>

      <H2>Inventory</H2>
      <UL>
        <LI><Code>/inventory</Code> — stock overview across all SKUs</LI>
        <LI><Code>/inventory/adjustments</Code> — manual stock adjustments log</LI>
        <LI><Code>/inventory/warehouses</Code> — warehouse cards with capacity indicators</LI>
      </UL>

      <H2>Discounts</H2>
      <P>Route: <Code>/discounts</Code></P>
      <P>
        Coupon and discount management with a Zod-validated creation form in{' '}
        <Code>src/features/discounts/</Code>.
      </P>

      <H2>Marketing</H2>
      <UL>
        <LI><Code>/marketing</Code> — marketing overview</LI>
        <LI><Code>/marketing/campaigns</Code> — campaign list with performance metrics</LI>
        <LI><Code>/marketing/email</Code> — email subscriber management</LI>
      </UL>

      <H2>Analytics</H2>
      <UL>
        <LI><Code>/analytics</Code> — sales analytics with revenue charts</LI>
        <LI><Code>/analytics/products</Code> — per-product performance</LI>
        <LI><Code>/analytics/customers</Code> — cohort and retention views</LI>
      </UL>

      <H2>Settings</H2>
      <UL>
        <LI><Code>/settings</Code> — store name, currency, timezone, notifications</LI>
        <LI><Code>/settings/users</Code> — user & role management table</LI>
      </UL>

      <H2>Resources (Dev Utilities)</H2>
      <UL>
        <LI><Code>/resources/components</Code> — component showcase</LI>
        <LI><Code>/resources/forms</Code> — form element examples</LI>
        <LI><Code>/resources/charts</Code> — chart type gallery</LI>
      </UL>

      <H2>Error Pages</H2>
      <UL>
        <LI><Code>/not-found-demo</Code> — 404 page preview</LI>
        <LI><Code>/error-demo</Code> — 500 server error page preview</LI>
      </UL>

      <Callout type="info">
        All data displayed on these pages is mock data returned from{' '}
        <Code>src/services/</Code>. Replace the service implementations to connect to a real
        backend.
      </Callout>
    </div>
  )
}
