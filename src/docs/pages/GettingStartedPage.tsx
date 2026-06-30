import { H1, Lead, H2, H3, P, UL, LI, Code, CodeBlock, Callout } from '../components/DocsProse'

export function GettingStartedPage() {
  return (
    <div>
      <H1>Getting Started</H1>
      <Lead>Have Brisk Admin running locally in less than two minutes.</Lead>

      <H2>Prerequisites</H2>
      <UL>
        <LI>
          <strong>Node.js ≥ 18</strong> — <Code>node -v</Code> to check
        </LI>
        <LI>
          <strong>npm ≥ 9</strong> or pnpm / yarn
        </LI>
        <LI>Git</LI>
      </UL>

      <H2>Installation</H2>

      <H3>1. Clone the repository</H3>
      <CodeBlock>{`git clone https://github.com/codespanda/brisk-admin.git
cd brisk-admin`}</CodeBlock>

      <H3>2. Install dependencies</H3>
      <CodeBlock>{`npm install`}</CodeBlock>

      <H3>3. Start the dev server</H3>
      <CodeBlock>{`npm run dev`}</CodeBlock>
      <P>
        Open <Code>http://localhost:5173</Code> in your browser. The app will load the documentation
        at <Code>/docs</Code> by default.
      </P>

      <H2>Available Scripts</H2>
      <div className="mb-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-semibold text-foreground">Command</th>
              <th className="px-4 py-2.5 text-left font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['npm run dev', 'Start Vite dev server with HMR'],
              ['npm run build', 'Type-check and build for production'],
              ['npm run preview', 'Serve the production build locally'],
              ['npm run lint', 'Run ESLint across the project'],
            ].map(([cmd, desc], i) => (
              <tr key={i} className="border-t border-border">
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">{cmd}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Environment Variables</H2>
      <P>
        Create a <Code>.env.local</Code> file in the project root. Currently the app runs entirely
        on mock data so no variables are required to get started.
      </P>
      <CodeBlock>{`# .env.local (optional)
VITE_API_BASE_URL=https://your-api.example.com`}</CodeBlock>
      <Callout type="info">
        Any variable exposed to the browser must be prefixed with <Code>VITE_</Code>.
      </Callout>

      <H2>Folder Overview</H2>
      <CodeBlock>{`brisk-admin/
├── public/              # Static assets (favicon, etc.)
├── src/
│   ├── components/      # Shared & UI components
│   ├── constants/       # Navigation config, status maps
│   ├── docs/            # ← You are here (standalone docs)
│   ├── features/        # Domain feature modules
│   ├── layouts/         # DashboardLayout, AuthLayout
│   ├── lib/             # Utility helpers
│   ├── pages/           # Route-level page components
│   ├── providers/       # React context providers
│   ├── services/        # API/mock service layer
│   ├── stores/          # Zustand stores
│   └── types/           # Shared TypeScript types
├── index.html
├── vite.config.ts
└── tailwind.config.ts`}</CodeBlock>

      <H2>Removing the Docs</H2>
      <P>
        The entire documentation section lives in <Code>src/docs/</Code>. It is completely
        self-contained — the only coupling to the main app is two lines in <Code>src/App.tsx</Code>.
        To remove it:
      </P>
      <UL>
        <LI>
          Delete the <Code>src/docs/</Code> folder
        </LI>
        <LI>
          Remove the <Code>/docs/*</Code> route and the <Code>Navigate to="/docs"</Code> redirect
          from <Code>src/App.tsx</Code>
        </LI>
      </UL>
      <Callout type="warning">Nothing else in the app imports from src/docs/.</Callout>
    </div>
  )
}
