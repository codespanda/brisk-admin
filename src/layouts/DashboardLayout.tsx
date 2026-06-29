import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layouts/sidebar'
import { Header } from '@/components/layouts/header'
import { AppBreadcrumbs } from '@/components/layouts/app-breadcrumbs'

export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-surface p-4 lg:p-6">
          <AppBreadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
