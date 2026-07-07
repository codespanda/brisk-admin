/*
 * Brisk Admin — Template documentation
 * ==================================================================
 * This whole folder (`src/docs`) is INDEPENDENT and SELF-CONTAINED.
 * It imports nothing from the rest of the app (only React, lucide-react
 * and its own files), and nothing in the app imports from it (except
 * one clearly-marked route block in src/App.tsx).
 *
 * To remove the docs from your project:
 *   1. delete the `src/docs` folder
 *   2. remove the DOCS block + <Route path="/docs"> line in src/App.tsx
 *   3. change <Route index> to redirect to "/dashboard" instead
 */
import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Sun,
  Moon,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Palette,
  Compass,
  Lightbulb,
  TriangleAlert,
  Zap,
} from 'lucide-react'
import { CodeBlock } from './CodeBlock'
import './docs.css'

const BASE = 'https://brisk.codespanda.com'

const NAV = [
  {
    group: 'Getting started',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'quick-start', label: 'Quick start' },
      { id: 'scripts', label: 'Scripts' },
      { id: 'deploy', label: 'Deploy to GitHub Pages' },
    ],
  },
  {
    group: 'Build with it',
    items: [
      { id: 'structure', label: 'Project structure' },
      { id: 'pages', label: 'Pages & routes' },
      { id: 'components', label: 'Using components' },
      { id: 'forms', label: 'Forms & validation' },
      { id: 'theming', label: 'Theming & dark mode' },
    ],
  },
  {
    group: 'Housekeeping',
    items: [{ id: 'remove-docs', label: 'Removing these docs' }],
  },
]

function useDocsTheme(): [boolean, () => void] {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('brisk-docs-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    localStorage.setItem('brisk-docs-theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, () => setDark((d) => !d)]
}

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const scroller = document.querySelector('.brisk-docs') as HTMLElement | null
    if (!scroller) return
    const handleScroll = () => {
      const threshold = scroller.getBoundingClientRect().top + scroller.clientHeight * 0.25
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = id
        }
      }
      setActive(current)
    }
    scroller.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => scroller.removeEventListener('scroll', handleScroll)
  }, [ids])
  return active
}

export default function DocsPage() {
  const [dark, toggleTheme] = useDocsTheme()
  const allIds = NAV.flatMap((g) => g.items.map((i) => i.id))
  const active = useActiveSection(allIds)

  const dashboardHref = `${import.meta.env.BASE_URL}dashboard`

  return (
    <div className={`brisk-docs${dark ? ' dark' : ''}`}>
      <div className="brisk-docs__shell">
        {/* ---- Sidebar ------------------------------------------ */}
        <aside className="brisk-docs__sidebar">
          <div className="brisk-docs__brand">
            <span className="brisk-docs__brand-mark">
              <LayoutDashboard size={17} />
            </span>
            Brisk Admin
          </div>
          <div className="brisk-docs__brand-sub">Documentation</div>
          <nav className="brisk-docs__nav">
            {NAV.map((g) => (
              <div key={g.group}>
                <div className="brisk-docs__nav-group-title">{g.group}</div>
                {g.items.map((i) => (
                  <a
                    key={i.id}
                    href={`#${i.id}`}
                    className={active === i.id ? 'is-active' : ''}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {i.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* ---- Main --------------------------------------------- */}
        <main className="brisk-docs__main">
          <div className="brisk-docs__topbar">
            <span className="brisk-docs__pill">v1.0 · React + Vite template</span>
            <div className="brisk-docs__actions">
              <button className="brisk-docs__btn" onClick={toggleTheme} type="button">
                {dark ? <Sun size={16} /> : <Moon size={16} />}
                {dark ? 'Light' : 'Dark'}
              </button>
              <a
                className="brisk-docs__btn brisk-docs__btn--primary"
                href={dashboardHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Dashboard
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Hero */}
          <header className="brisk-docs__hero">
            <span className="brisk-docs__pill">
              <BookOpen size={14} />
              Template docs
            </span>
            <h1>
              Ship your admin in <span className="grad">minutes</span>, not months.
            </h1>
            <p>
              Everything you need to install <strong>Brisk Admin</strong> and build with its
              component library — a modern e-commerce dashboard built on React 18, Vite 5,
              Tailwind v4, and shadcn/ui.
            </p>
            <div className="brisk-docs__hero-cta">
              <a
                className="brisk-docs__btn brisk-docs__btn--primary"
                href={`${BASE}/dashboard`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Rocket size={16} />
                Open the live dashboard
                <ArrowUpRight size={16} />
              </a>
              <a
                className="brisk-docs__btn"
                href="#quick-start"
                onClick={(e) => { e.preventDefault(); document.getElementById('quick-start')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                Read the quick start
                <ArrowRight size={16} />
              </a>
            </div>
          </header>

          {/* Overview */}
          <section id="overview" className="brisk-docs__section">
            <h2>Overview</h2>
            <p className="brisk-docs__lead">
              A production-ready e-commerce admin starter with 30+ pages, a reusable component
              kit, charts, data tables, forms, and authentication screens — fully responsive with
              dark mode.
            </p>
            <div className="brisk-docs__grid">
              <a className="brisk-docs__card" href={`${BASE}/dashboard`} target="_blank" rel="noreferrer">
                <span className="brisk-docs__card-icon"><Zap size={20} /></span>
                <h4>React 18 + Vite 5</h4>
                <p>Instant HMR in dev and a tiny, fast production build.</p>
              </a>
              <a className="brisk-docs__card" href={`${BASE}/resources/components`} target="_blank" rel="noreferrer">
                <span className="brisk-docs__card-icon"><Palette size={20} /></span>
                <h4>Tailwind v4 + shadcn/ui</h4>
                <p>Accessible, themeable components you actually own.</p>
              </a>
              <a className="brisk-docs__card" href={`${BASE}/products`} target="_blank" rel="noreferrer">
                <span className="brisk-docs__card-icon"><Package size={20} /></span>
                <h4>Products & Orders</h4>
                <p>Full CRUD flows with form validation and tables.</p>
              </a>
              <a className="brisk-docs__card" href={`${BASE}/analytics`} target="_blank" rel="noreferrer">
                <span className="brisk-docs__card-icon"><BarChart3 size={20} /></span>
                <h4>Charts & analytics</h4>
                <p>Recharts wrappers ready to plug real data into.</p>
              </a>
            </div>
          </section>

          {/* Quick start */}
          <section id="quick-start" className="brisk-docs__section">
            <h2>Quick start</h2>
            <p className="brisk-docs__lead">
              You'll need <strong>Node 18+</strong> (Node 20 or 22 recommended) and npm.
            </p>
            <ol className="brisk-docs__steps">
              <li>
                <span className="brisk-docs__step-title">Get the code</span>
                Clone the repository (or download it as a ZIP).
                <CodeBlock
                  lang="bash"
                  code={`git clone https://github.com/codespanda/brisk-admin.git\ncd brisk-admin`}
                />
              </li>
              <li>
                <span className="brisk-docs__step-title">Install dependencies</span>
                <CodeBlock lang="bash" code={`npm install`} />
              </li>
              <li>
                <span className="brisk-docs__step-title">Start the dev server</span>
                Vite serves the app at <code>http://localhost:5173</code> with hot reload.
                <CodeBlock lang="bash" code={`npm run dev`} />
              </li>
            </ol>
            <div className="brisk-docs__callout">
              <span className="brisk-docs__callout-icon"><Lightbulb size={18} /></span>
              <p>
                The <code>@</code> alias points to <code>src/</code>, so imports look like{' '}
                <code>{'import { Button } from \'@/components/ui/button\''}</code>.
              </p>
            </div>
          </section>

          {/* Scripts */}
          <section id="scripts" className="brisk-docs__section">
            <h2>Scripts</h2>
            <table className="brisk-docs__table">
              <thead>
                <tr>
                  <th>Command</th>
                  <th>What it does</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>npm run dev</code></td>
                  <td>Start the Vite dev server with HMR.</td>
                </tr>
                <tr>
                  <td><code>npm run build</code></td>
                  <td>Type-check and build to <code>dist/</code>.</td>
                </tr>
                <tr>
                  <td><code>npm run preview</code></td>
                  <td>Serve the production build locally.</td>
                </tr>
                <tr>
                  <td><code>npm run lint</code></td>
                  <td>Run ESLint across the project.</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Deploy */}
          <section id="deploy" className="brisk-docs__section">
            <h2>Deploy to GitHub Pages</h2>
            <p className="brisk-docs__lead">
              The template ships with a GitHub Actions workflow that builds and deploys on every
              push to <code>master</code>.
            </p>
            <ol className="brisk-docs__steps">
              <li>
                <span className="brisk-docs__step-title">Set the base path</span>
                In <code>vite.config.ts</code>, set <code>base</code> to your repository name.
                <CodeBlock
                  lang="ts"
                  code={`// vite.config.ts\nbase: '/brisk-admin/',`}
                />
              </li>
              <li>
                <span className="brisk-docs__step-title">Enable Pages</span>
                In your repo: <strong>Settings → Pages → Source → GitHub Actions</strong>.
              </li>
              <li>
                <span className="brisk-docs__step-title">Push</span>
                The workflow in <code>.github/workflows/deploy.yml</code> handles the rest.
                <CodeBlock lang="bash" code={`git push origin master`} />
              </li>
            </ol>
            <div className="brisk-docs__callout">
              <span className="brisk-docs__callout-icon"><Compass size={18} /></span>
              <p>
                The <code>base</code> in <code>vite.config.ts</code> is already set to{' '}
                <code>/brisk-admin/</code> so assets resolve correctly under the GitHub Pages
                sub-path.
              </p>
            </div>
          </section>

          {/* Structure */}
          <section id="structure" className="brisk-docs__section">
            <h2>Project structure</h2>
            <p className="brisk-docs__lead">A quick map of where things live.</p>
            <div
              className="brisk-docs__tree"
              dangerouslySetInnerHTML={{
                __html: `src/
├─ App.tsx              <span class="c"># route table</span>
├─ main.tsx             <span class="c"># app entry (BrowserRouter)</span>
├─ pages/               <span class="c"># route-level page components</span>
├─ components/
│  ├─ ui/               <span class="c"># shadcn primitives (Button, Card…)</span>
│  ├─ shared/           <span class="c"># PageHeader, MetricCard, StatusBadge…</span>
│  ├─ charts/           <span class="c"># Recharts wrappers</span>
│  └─ layouts/          <span class="c"># Sidebar, Header, Breadcrumbs</span>
├─ features/            <span class="c"># domain modules (products, orders…)</span>
├─ constants/           <span class="c"># navigation config, status maps</span>
├─ layouts/             <span class="c"># DashboardLayout, AuthLayout</span>
├─ providers/           <span class="c"># ThemeProvider, etc.</span>
├─ services/            <span class="c"># API client + mock service layer</span>
├─ stores/              <span class="c"># Zustand stores (auth, sidebar)</span>
├─ types/               <span class="c"># shared TypeScript types</span>
└─ docs/                <span class="c"># this documentation (deletable)</span>`,
              }}
            />
          </section>

          {/* Pages & routes */}
          <section id="pages" className="brisk-docs__section">
            <h2>Pages & routes</h2>
            <p className="brisk-docs__lead">Every route in the template and what it renders.</p>
            <table className="brisk-docs__table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['/dashboard', 'KPIs, charts, best sellers, activity feed', '/dashboard'],
                  ['/products', 'Product list with search & filters', '/products'],
                  ['/products/new', 'Create product form', '/products/new'],
                  ['/products/:id', 'Product detail view', '/products'],
                  ['/orders', 'Order table with status & date filters', '/orders'],
                  ['/orders/:id', 'Order detail with timeline', '/orders'],
                  ['/customers', 'Customer list with LTV & status', '/customers'],
                  ['/inventory', 'Stock overview across SKUs', '/inventory'],
                  ['/inventory/adjustments', 'Stock adjustment log', '/inventory/adjustments'],
                  ['/inventory/warehouses', 'Warehouse cards', '/inventory/warehouses'],
                  ['/discounts', 'Coupon & discount management', '/discounts'],
                  ['/marketing', 'Marketing overview', '/marketing'],
                  ['/marketing/campaigns', 'Campaign performance', '/marketing/campaigns'],
                  ['/marketing/email', 'Email subscriber list', '/marketing/email'],
                  ['/analytics', 'Sales analytics', '/analytics'],
                  ['/analytics/products', 'Per-product performance', '/analytics/products'],
                  ['/analytics/customers', 'Cohort & retention', '/analytics/customers'],
                  ['/settings', 'Store settings', '/settings'],
                  ['/settings/users', 'User & role management', '/settings/users'],
                  ['/resources/components', 'Component showcase', '/resources/components'],
                  ['/resources/forms', 'Form element examples', '/resources/forms'],
                  ['/resources/charts', 'Chart type gallery', '/resources/charts'],
                ].map(([route, desc, path], i) => (
                  <tr key={i}>
                    <td>
                      <a href={`${BASE}${path}`} target="_blank" rel="noreferrer">
                        {route}
                      </a>
                    </td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Components */}
          <section id="components" className="brisk-docs__section">
            <h2>Using components</h2>
            <p className="brisk-docs__lead">
              Components live under <code>src/components</code>. Import what you need and compose.
            </p>

            <h3>Buttons</h3>
            <CodeBlock
              lang="tsx"
              code={`import { Button } from '@/components/ui/button';

<Button>Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="sm">Ghost</Button>`}
            />

            <h3>PageHeader</h3>
            <CodeBlock
              lang="tsx"
              code={`import { PageHeader } from '@/components/shared/page-header';

<PageHeader
  title="Products"
  description="Manage your catalogue"
  actions={<Button>Add product</Button>}
/>`}
            />

            <h3>MetricCard</h3>
            <CodeBlock
              lang="tsx"
              code={`import { MetricCard } from '@/components/shared/metric-card';
import { DollarSign } from 'lucide-react';

<MetricCard
  label="Total Revenue"
  value="$48,295"
  trend={+12.5}
  icon={DollarSign}
/>`}
            />

            <h3>StatusBadge</h3>
            <CodeBlock
              lang="tsx"
              code={`import { StatusBadge } from '@/components/shared/status-badge';

<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="cancelled" />`}
            />

            <div className="brisk-docs__callout">
              <span className="brisk-docs__callout-icon"><Compass size={18} /></span>
              <p>
                See every component rendered interactively on the live app —{' '}
                <a href={`${BASE}/resources/components`} target="_blank" rel="noreferrer">Components</a>{' · '}
                <a href={`${BASE}/resources/forms`} target="_blank" rel="noreferrer">Forms</a>{' · '}
                <a href={`${BASE}/resources/charts`} target="_blank" rel="noreferrer">Charts</a>.
              </p>
            </div>
          </section>

          {/* Forms */}
          <section id="forms" className="brisk-docs__section">
            <h2>Forms & validation</h2>
            <p className="brisk-docs__lead">
              Forms use <strong>react-hook-form</strong> + <strong>Zod</strong>. Define a schema,
              infer the type, and wire it up.
            </p>
            <CodeBlock
              lang="tsx"
              code={`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  price: z.number().positive(),
});

type FormValues = z.infer<typeof schema>;

function ProductForm() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input placeholder="Product name" {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}
      <Button type="submit">Save</Button>
    </form>
  );
}`}
            />
            <p>
              Domain-specific Zod schemas live in{' '}
              <code>src/features/{'<domain>'}/schemas.ts</code> (e.g.{' '}
              <code>src/features/products/schemas.ts</code>).
            </p>
          </section>

          {/* Theming */}
          <section id="theming" className="brisk-docs__section">
            <h2>Theming & dark mode</h2>
            <p className="brisk-docs__lead">
              Theming uses Tailwind's <code>dark</code> class strategy. Colors are CSS custom
              properties defined in the global stylesheet and toggled by the{' '}
              <code>ThemeProvider</code> in <code>src/providers/theme-provider.tsx</code>.
            </p>
            <CodeBlock
              lang="css"
              code={`:root {
  --primary: 221.2 83.2% 53.3%;   /* blue */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}
.dark {
  --primary: 217.2 91.2% 59.8%;
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}`}
            />
            <p>
              To change the brand color, update the <code>--primary</code> HSL values in your
              global CSS file. Use{' '}
              <a href="https://www.tints.dev" target="_blank" rel="noreferrer">tints.dev</a>{' '}
              to generate a full palette from a hex color.
            </p>
          </section>

          {/* Remove docs */}
          <section id="remove-docs" className="brisk-docs__section">
            <h2>Removing these docs</h2>
            <p className="brisk-docs__lead">
              This documentation is intentionally isolated — it imports nothing from your app, and
              nothing in your app imports from it. Removing it is a 2-step job:
            </p>
            <ol className="brisk-docs__steps">
              <li>
                <span className="brisk-docs__step-title">Delete the folder</span>
                Remove the entire <code>src/docs</code> directory.
                <CodeBlock lang="bash" code={`rm -rf src/docs`} />
              </li>
              <li>
                <span className="brisk-docs__step-title">Unwire the routes</span>
                In <code>src/App.tsx</code>, delete the <code>DocsPage</code> import and the{' '}
                <code>/docs</code> route. Change the root <code>index</code> redirect target from{' '}
                <code>/docs</code> to <code>/dashboard</code>. Both are marked with a{' '}
                <code>DOCS</code> comment.
              </li>
            </ol>
            <div className="brisk-docs__callout brisk-docs__callout--warn">
              <span className="brisk-docs__callout-icon"><TriangleAlert size={18} /></span>
              <p>
                That's it — no other file references the docs, so the rest of the template keeps
                working untouched.
              </p>
            </div>
          </section>

          <footer className="brisk-docs__footer">
            <span>Brisk Admin · React + Vite template</span>
            <a
              href="#overview"
              className="brisk-docs__toplink"
              onClick={(e) => { e.preventDefault(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Back to top
              <ArrowUp size={14} />
            </a>
          </footer>
        </main>
      </div>
    </div>
  )
}
