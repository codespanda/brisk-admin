import { H1, Lead, H2, H3, P, UL, LI, Code, CodeBlock, Callout } from '../components/DocsProse'

const colorTokens = [
  ['--background', 'Page background'],
  ['--foreground', 'Primary text'],
  ['--muted', 'Subtle backgrounds (cards, inputs)'],
  ['--muted-foreground', 'Secondary / placeholder text'],
  ['--primary', 'Brand accent, active states'],
  ['--primary-foreground', 'Text on primary-colored backgrounds'],
  ['--border', 'Borders and dividers'],
  ['--ring', 'Focus rings'],
  ['--destructive', 'Error states, delete actions'],
]

export function ThemingPage() {
  return (
    <div>
      <H1>Theming</H1>
      <Lead>Light and dark mode, CSS custom properties, and how to change the brand color.</Lead>

      <H2>Light & Dark Mode</H2>
      <P>
        The theme is controlled by the <Code>ThemeProvider</Code> in{' '}
        <Code>src/providers/theme-provider.tsx</Code>. It applies a <Code>dark</Code> class on the{' '}
        <Code>{'<html>'}</Code> element and persists the preference to <Code>localStorage</Code>.
      </P>
      <P>
        The header contains a theme toggle button. To change the default theme, update the{' '}
        <Code>defaultTheme</Code> prop on the <Code>ThemeProvider</Code>:
      </P>
      <CodeBlock>{`// src/providers/index.tsx
<ThemeProvider defaultTheme="dark" storageKey="brisk-theme">
  {children}
</ThemeProvider>`}</CodeBlock>

      <H2>CSS Custom Properties</H2>
      <P>
        All colors are defined as CSS custom properties in the global stylesheet and referenced via
        Tailwind's <Code>hsl(var(--token))</Code> pattern. Both light and dark values are declared
        in <Code>:root</Code> / <Code>.dark</Code> blocks.
      </P>
      <div className="mb-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-semibold text-foreground">Token</th>
              <th className="px-4 py-2.5 text-left font-semibold text-foreground">Usage</th>
            </tr>
          </thead>
          <tbody>
            {colorTokens.map(([token, usage], i) => (
              <tr key={i} className="border-t border-border">
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">{token}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Changing the Brand Color</H2>
      <P>
        Find the <Code>--primary</Code> variable in your global CSS file and update the HSL values:
      </P>
      <CodeBlock>{`:root {
  /* Default blue */
  --primary: 221.2 83.2% 53.3%;

  /* Example: indigo */
  --primary: 243 75% 59%;

  /* Example: emerald */
  --primary: 152 76% 40%;
}`}</CodeBlock>
      <Callout type="tip">
        Use a tool like{' '}
        <a
          href="https://www.tints.dev"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-2"
        >
          tints.dev
        </a>{' '}
        to generate a full HSL palette from a hex color.
      </Callout>

      <H2>Typography</H2>
      <P>
        The default font stack is the system font (<Code>font-sans</Code>). To change it, add a
        Google Font import in <Code>index.html</Code> and update the <Code>fontFamily.sans</Code>{' '}
        value in <Code>tailwind.config.ts</Code>.
      </P>
      <CodeBlock>{`// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
  },
}`}</CodeBlock>

      <H2>Scrollbar Styling</H2>
      <P>
        Slim, subtle scrollbars are applied globally via <Code>scrollbar-width: thin</Code> in the
        base styles. This keeps the UI clean without hiding scroll indicators completely.
      </P>
    </div>
  )
}
