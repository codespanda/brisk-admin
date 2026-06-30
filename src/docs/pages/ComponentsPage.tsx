import { H1, Lead, H2, H3, P, UL, LI, Code, CodeBlock, Callout } from '../components/DocsProse'

export function ComponentsPage() {
  return (
    <div>
      <H1>Components</H1>
      <Lead>Shared, UI, and feature components — where they live and how to use them.</Lead>

      <H2>Component Layers</H2>
      <P>The project has three component layers in order of abstraction:</P>
      <UL>
        <LI>
          <strong>UI primitives</strong> — <Code>src/components/ui/</Code> — thin wrappers around
          shadcn/ui (Button, Input, Badge, Card, Skeleton, Textarea)
        </LI>
        <LI>
          <strong>Shared components</strong> — <Code>src/components/shared/</Code> — reusable
          building blocks used across multiple pages
        </LI>
        <LI>
          <strong>Feature components</strong> — <Code>src/features/*/components/</Code> — domain
          components used by one feature only
        </LI>
      </UL>

      <H2>UI Primitives</H2>
      <H3>Button</H3>
      <CodeBlock>{`import { Button } from '@/components/ui/button'

<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>`}</CodeBlock>

      <H3>Badge</H3>
      <CodeBlock>{`import { Badge } from '@/components/ui/badge'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>`}</CodeBlock>

      <H3>Card</H3>
      <CodeBlock>{`import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Body content here</CardContent>
</Card>`}</CodeBlock>

      <H2>Shared Components</H2>

      <H3>PageHeader</H3>
      <P>
        Used at the top of every page. Accepts a title, optional description, and optional action
        buttons.
      </P>
      <CodeBlock>{`import { PageHeader } from '@/components/shared/page-header'

<PageHeader
  title="Products"
  description="Manage your product catalogue"
  actions={<Button>Add product</Button>}
/>`}</CodeBlock>

      <H3>MetricCard</H3>
      <P>KPI card with value, label, trend indicator, and icon.</P>
      <CodeBlock>{`import { MetricCard } from '@/components/shared/metric-card'

<MetricCard
  label="Total Revenue"
  value="$48,295"
  trend={+12.5}
  icon={DollarSign}
/>`}</CodeBlock>

      <H3>StatusBadge</H3>
      <P>Renders a coloured badge from a status string (e.g. <Code>"active"</Code>, <Code>"pending"</Code>, <Code>"cancelled"</Code>).</P>
      <CodeBlock>{`import { StatusBadge } from '@/components/shared/status-badge'

<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="cancelled" />`}</CodeBlock>

      <H3>EmptyState</H3>
      <CodeBlock>{`import { EmptyState } from '@/components/shared/empty-state'

<EmptyState
  title="No products yet"
  description="Add your first product to get started."
  action={<Button>Add product</Button>}
/>`}</CodeBlock>

      <H3>ChartCard</H3>
      <P>Wrapper card for chart components with title and optional date-range controls.</P>

      <H2>Layout Components</H2>
      <P>
        Located in <Code>src/components/layouts/</Code>:
      </P>
      <UL>
        <LI>
          <Code>sidebar.tsx</Code> — collapsible nav sidebar, reads from{' '}
          <Code>src/constants/navigation.ts</Code>
        </LI>
        <LI>
          <Code>header.tsx</Code> — topbar with search, notifications, user avatar
        </LI>
        <LI>
          <Code>app-breadcrumbs.tsx</Code> — auto breadcrumb from current route
        </LI>
      </UL>

      <Callout type="tip">
        See all components, forms, and charts rendered interactively on the live app:{' '}
        {[
          ['/resources/components', 'Components'],
          ['/resources/forms', 'Forms'],
          ['/resources/charts', 'Charts'],
        ].map(([path, label], i, arr) => (
          <span key={path}>
            <a
              href={`https://codespanda.github.io/brisk-admin${path}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-2"
            >
              {label}
            </a>
            {i < arr.length - 1 && ' · '}
          </span>
        ))}
      </Callout>
    </div>
  )
}
