import { H1, Lead, H2, H3, P, UL, LI, Code, CodeBlock, Callout } from '../components/DocsProse'

export function AuthPage() {
  return (
    <div>
      <H1>Authentication</H1>
      <Lead>Auth pages, the Zustand auth store, and how to wire up a real auth provider.</Lead>

      <H2>Auth Pages</H2>
      <P>Five auth pages ship out of the box, all wrapped in the minimal AuthLayout:</P>
      <div className="mb-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-semibold text-foreground">Route</th>
              <th className="px-4 py-2.5 text-left font-semibold text-foreground">Page file</th>
              <th className="px-4 py-2.5 text-left font-semibold text-foreground">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['/login', 'LoginPage.tsx', 'Email + password sign-in'],
              ['/register', 'RegisterPage.tsx', 'New account creation'],
              ['/forgot-password', 'ForgotPasswordPage.tsx', 'Send reset link'],
              ['/reset-password', 'ResetPasswordPage.tsx', 'Set new password with token'],
              ['/verify-email', 'VerifyEmailPage.tsx', 'Confirm email address'],
            ].map(([route, file, purpose], i) => (
              <tr key={i} className="border-t border-border">
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">{route}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{file}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Auth Store</H2>
      <P>
        <Code>src/stores/auth-store.ts</Code> holds the current user and session state using
        Zustand.
      </P>
      <CodeBlock>{`import { useAuthStore } from '@/stores/auth-store'

// Read state
const user = useAuthStore((s) => s.user)
const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

// Actions
const { login, logout } = useAuthStore()`}</CodeBlock>

      <H2>Protecting Routes</H2>
      <P>
        The current template does not include a route guard — all dashboard routes are accessible
        without auth. To add protection, create an <Code>AuthGuard</Code> component and wrap the
        dashboard routes:
      </P>
      <CodeBlock>{`// src/components/AuthGuard.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'

export function AuthGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

// In App.tsx, wrap the DashboardLayout route:
<Route element={<AuthGuard />}>
  <Route element={<DashboardLayout />}>
    {/* ... dashboard routes */}
  </Route>
</Route>`}</CodeBlock>

      <H2>Connecting a Real Auth Provider</H2>
      <H3>Option A — REST API</H3>
      <P>
        Update <Code>src/services/auth.service.ts</Code> to call your backend. The service already
        exports <Code>login</Code>, <Code>logout</Code>, and <Code>getUser</Code> — just replace
        the mock implementations.
      </P>

      <H3>Option B — Supabase / Firebase / Auth0</H3>
      <P>Install your provider's SDK and initialise it in a new provider file, then call the SDK from auth-store actions.</P>
      <CodeBlock>{`// src/stores/auth-store.ts  (example with Supabase)
import { supabase } from '@/lib/supabase'

login: async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  set({ user: data.user, isAuthenticated: true })
},`}</CodeBlock>

      <Callout type="warning">
        Never store raw JWT tokens in <Code>localStorage</Code> in production. Use{' '}
        <Code>httpOnly</Code> cookies or the provider's recommended session strategy.
      </Callout>

      <H2>Form Validation</H2>
      <P>
        Auth forms use <strong>React Hook Form</strong> with <strong>Zod</strong> schemas defined in{' '}
        <Code>src/features/auth/schemas.ts</Code>. Extend or tighten the schemas to match your API's
        requirements.
      </P>
    </div>
  )
}
