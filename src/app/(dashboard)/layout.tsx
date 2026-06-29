import { Sidebar } from '@/components/layouts/sidebar'
import { Header } from '@/components/layouts/header'
import { AppBreadcrumbs } from '@/components/layouts/app-breadcrumbs'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-surface p-4 lg:p-6">
          <AppBreadcrumbs />
          {children}
        </main>
      </div>
    </div>
  )
}
