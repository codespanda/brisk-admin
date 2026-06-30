import { H1, Lead, H2, H3, P, UL, LI, Code, CodeBlock, Callout } from '../components/DocsProse'

export function ArchitecturePage() {
  return (
    <div>
      <H1>Architecture</H1>
      <Lead>How the project is structured and why.</Lead>

      <H2>Directory Structure</H2>
      <P>
        The project follows a <strong>feature-first</strong> approach inside <Code>src/features/</Code>{' '}
        combined with shared infrastructure at the top of <Code>src/</Code>.
      </P>

      <H3>src/features/</H3>
      <P>
        Each domain (products, orders, customers, etc.) lives in its own folder with co-located
        components, schemas, and any domain-specific hooks.
      </P>
      <CodeBlock>{`src/features/
├── auth/
│   ├── components/     # AuthCard, SocialLoginButtons
│   └── schemas.ts      # Zod schemas for login / register
├── dashboard/
│   └── components/     # KpiCards, RecentOrders, …
├── products/
│   ├── components/     # ProductForm, columns
│   └── schemas.ts
├── orders/
│   └── components/     # OrderColumns, OrderDetailsView, Timeline
├── discounts/
│   ├── components/
│   └── schemas.ts
├── inventory/
│   └── components/     # WarehouseCard
├── settings/
│   ├── mock-data.ts
│   └── schemas.ts
└── …`}</CodeBlock>

      <H3>src/pages/</H3>
      <P>
        Thin route-level wrappers. Pages import from <Code>features/</Code> and{' '}
        <Code>components/</Code> — they contain almost no logic themselves.
      </P>

      <H3>src/services/</H3>
      <P>
        One file per domain (<Code>product.service.ts</Code>, <Code>order.service.ts</Code>, …).
        Each service currently returns hardcoded mock data. Swap the implementation to hit a real
        API without touching any page or component.
      </P>
      <CodeBlock>{`// src/services/product.service.ts
export async function getProducts(): Promise<Product[]> {
  // Replace with: return api.get('/products')
  return mockProducts
}`}</CodeBlock>

      <H3>src/stores/</H3>
      <P>
        Zustand stores for cross-cutting state: <Code>auth-store.ts</Code>,{' '}
        <Code>sidebar-store.ts</Code>, <Code>notification-store.ts</Code>. Each store is tiny and
        self-contained.
      </P>

      <H2>Routing</H2>
      <P>
        React Router v6 is configured in <Code>src/App.tsx</Code>. There are three layout groups:
      </P>
      <UL>
        <LI>
          <Code>/docs/*</Code> — standalone docs (no DashboardLayout)
        </LI>
        <LI>
          <Code>/login</Code>, <Code>/register</Code>, … — wrapped in <Code>AuthLayout</Code>
        </LI>
        <LI>
          All other routes — wrapped in <Code>DashboardLayout</Code> (sidebar + header)
        </LI>
      </UL>
      <P>
        The root <Code>/</Code> redirects to <Code>/docs</Code>. To change the default landing page,
        update the <Code>Navigate</Code> target in <Code>App.tsx</Code>.
      </P>

      <H2>Data Flow</H2>
      <CodeBlock>{`Page component
  └─ calls service fn (async, returns typed data)
       └─ service returns mock data  ←  swap for real API here
  └─ passes data as props to feature components
       └─ feature components handle display + local state`}</CodeBlock>

      <Callout type="info">
        There is no global server-state cache (React Query, SWR) included by default. Add one if
        your app has real API calls that benefit from caching and background refetching.
      </Callout>

      <H2>Type System</H2>
      <P>
        All domain types live in <Code>src/types/</Code> and are re-exported from{' '}
        <Code>src/types/index.ts</Code>. Import from the index to avoid deep relative paths.
      </P>
      <CodeBlock>{`// Good
import type { Product, Order } from '@/types'

// Avoid
import type { Product } from '@/types/product'`}</CodeBlock>

      <H2>Path Aliases</H2>
      <P>
        The <Code>@/</Code> alias maps to <Code>src/</Code>. It is configured in both{' '}
        <Code>vite.config.ts</Code> and <Code>tsconfig.json</Code>.
      </P>
    </div>
  )
}
