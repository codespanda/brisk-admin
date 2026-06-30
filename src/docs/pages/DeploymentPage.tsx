import { H1, Lead, H2, H3, P, UL, LI, Code, CodeBlock, Callout } from '../components/DocsProse'

export function DeploymentPage() {
  return (
    <div>
      <H1>Deployment</H1>
      <Lead>Build for production and deploy to any static host or Node server.</Lead>

      <H2>Production Build</H2>
      <CodeBlock>{`npm run build`}</CodeBlock>
      <P>
        This runs TypeScript type-checking then Vite's production bundler. Output goes to{' '}
        <Code>dist/</Code>.
      </P>

      <H2>Preview the Build Locally</H2>
      <CodeBlock>{`npm run preview`}</CodeBlock>
      <P>
        Vite's preview server serves the <Code>dist/</Code> folder at{' '}
        <Code>http://localhost:4173</Code>.
      </P>

      <H2>Static Hosting</H2>
      <P>
        Since Brisk Admin is a pure client-side React app, it can be deployed to any static file
        host. The only requirement is that all routes must fall back to <Code>index.html</Code> so
        React Router handles navigation.
      </P>

      <H3>Vercel</H3>
      <P>Connect your repository and Vercel auto-detects Vite. No extra config needed.</P>

      <H3>Netlify</H3>
      <P>Add a <Code>_redirects</Code> file to <Code>public/</Code>:</P>
      <CodeBlock>{`/* /index.html 200`}</CodeBlock>

      <H3>GitHub Pages</H3>
      <P>
        A <Code>.github/workflows/deploy.yml</Code> is already included. Push to the{' '}
        <Code>master</Code> branch to trigger an automatic deploy via the <Code>gh-pages</Code>{' '}
        branch.
      </P>
      <Callout type="info">
        GitHub Pages deploys under a sub-path (e.g. <Code>/brisk-admin/</Code>). The{' '}
        <Code>base</Code> field in <Code>vite.config.ts</Code> is already set to handle this.
      </Callout>

      <H3>Nginx</H3>
      <CodeBlock>{`server {
  listen 80;
  root /var/www/brisk-admin/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}`}</CodeBlock>

      <H2>Docker</H2>
      <CodeBlock>{`# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80`}</CodeBlock>

      <H2>Environment Variables at Build Time</H2>
      <P>
        Vite embeds <Code>VITE_*</Code> variables at build time. Supply them as CI/CD secrets or a{' '}
        <Code>.env.production</Code> file (do not commit secrets).
      </P>
      <CodeBlock>{`# .env.production
VITE_API_BASE_URL=https://api.example.com`}</CodeBlock>

      <Callout type="warning">
        Never put secret keys in <Code>VITE_*</Code> variables — they are visible in the browser
        bundle. Only include public, safe values.
      </Callout>

      <H2>Removing the Docs from the Build</H2>
      <P>
        The docs add a small amount of bundle weight. If you want to exclude them from production:
      </P>
      <UL>
        <LI>
          Delete <Code>src/docs/</Code>
        </LI>
        <LI>
          Remove the <Code>/docs/*</Code> route from <Code>src/App.tsx</Code>
        </LI>
        <LI>
          Change the root redirect from <Code>/docs</Code> to <Code>/dashboard</Code> (or wherever
          your home page is)
        </LI>
      </UL>
    </div>
  )
}
