import { Link } from 'react-router-dom'
import { H1, Lead, H2, H3, P, UL, LI, Code, Callout } from '../components/DocsProse'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Palette,
  Shield,
  Zap,
} from 'lucide-react'

const features = [
  { icon: LayoutDashboard, label: 'Dashboard', desc: 'KPIs, charts, activity feed' },
  { icon: Package, label: 'Products', desc: 'CRUD, variants, media' },
  { icon: ShoppingCart, label: 'Orders', desc: 'Lifecycle, timeline, fulfillment' },
  { icon: Users, label: 'Customers', desc: 'Profiles, history, segments' },
  { icon: BarChart3, label: 'Analytics', desc: 'Sales, products, customers' },
  { icon: Palette, label: 'Theming', desc: 'Light / dark, CSS variables' },
  { icon: Shield, label: 'Auth Pages', desc: 'Login, register, reset flow' },
  { icon: Zap, label: 'Fast & Typed', desc: 'Vite + React + TypeScript' },
]

export function IntroductionPage() {
  return (
    <div>
      <H1>Brisk Admin</H1>
      <Lead>
        A modern, fully-typed React admin dashboard template built with Vite, Tailwind CSS, and
        shadcn/ui components.
      </Lead>

      <Callout type="tip">
        New here? Jump to{' '}
        <Link to="/docs/getting-started" className="font-medium underline underline-offset-2">
          Getting Started
        </Link>{' '}
        to have the app running in under two minutes.
      </Callout>

      <H2>What is Brisk Admin?</H2>
      <P>
        Brisk Admin is a production-ready admin dashboard starter. It ships with a complete set of
        pages, components, and patterns so you can focus on your business logic instead of
        rebuilding common UI from scratch.
      </P>
      <P>
        The project was originally scaffolded with Next.js and later migrated to{' '}
        <strong>React + Vite</strong> for simpler deployment and faster development iteration.
      </P>

      <H2>Features at a Glance</H2>
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {features.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="flex flex-col gap-1.5 rounded-lg border border-border p-3.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>

      <H2>Tech Stack</H2>
      <UL>
        <LI>
          <strong>React 18</strong> — UI library
        </LI>
        <LI>
          <strong>Vite 5</strong> — build tool & dev server
        </LI>
        <LI>
          <strong>TypeScript</strong> — end-to-end type safety
        </LI>
        <LI>
          <strong>Tailwind CSS v4</strong> — utility-first styling
        </LI>
        <LI>
          <strong>shadcn/ui</strong> — accessible, unstyled component primitives
        </LI>
        <LI>
          <strong>React Router v6</strong> — client-side routing
        </LI>
        <LI>
          <strong>Zustand</strong> — lightweight global state (auth, sidebar, notifications)
        </LI>
        <LI>
          <strong>React Hook Form + Zod</strong> — form management & validation
        </LI>
        <LI>
          <strong>Recharts</strong> — composable charting
        </LI>
        <LI>
          <strong>Lucide React</strong> — icon library
        </LI>
      </UL>

      <H2>Project Goals</H2>
      <H3>Opinionated but not rigid</H3>
      <P>
        Brisk Admin makes sensible choices (folder structure, state library, component library) so
        that a new developer can be productive immediately. Every choice can be swapped out — nothing
        is magic.
      </P>
      <H3>Mock-data driven</H3>
      <P>
        All pages work out of the box using mock data returned by service files in{' '}
        <Code>src/services/</Code>. Replacing mock responses with real API calls is a single-file
        change per domain.
      </P>
      <H3>Standalone documentation</H3>
      <P>
        These docs live in <Code>src/docs/</Code> and are completely self-contained. Delete the
        folder and nothing else in the app breaks.
      </P>
    </div>
  )
}
