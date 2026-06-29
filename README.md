# Brisk Admin

A modern e-commerce admin dashboard built with React, Vite, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **React 19** + **TypeScript 5**
- **Vite 6** — build tool & dev server
- **React Router DOM v7** — client-side routing (HashRouter for GitHub Pages)
- **Tailwind CSS v4** — utility-first styling with OkLCH color system
- **shadcn/ui** — accessible component primitives
- **Zustand** — state management
- **React Hook Form** + **Zod** — form handling and validation
- **Recharts** — data visualization
- **TanStack Table** — powerful data tables
- **next-themes** — dark/light mode
- **Sonner** — toast notifications

## Features

- Dashboard with KPI cards and charts
- Products management (CRUD)
- Orders management
- Customer management
- Inventory with warehouses and adjustments
- Marketing (email campaigns)
- Analytics (sales, products, customers)
- Notifications center
- Settings and user management
- Auth pages (login, register, forgot/reset password, email verify)
- Resource pages (charts showcase, forms showcase, components showcase)
- Dark/light/system theme toggle

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

## Deployment

This project is configured for deployment to GitHub Pages via GitHub Actions. Every push to `master` triggers the workflow which builds with Vite and deploys the `dist/` folder.

The app uses `HashRouter` so all routes work correctly on static hosting (URLs like `/#/products`).

Live: [https://codespanda.github.io/brisk-admin/](https://codespanda.github.io/brisk-admin/)
