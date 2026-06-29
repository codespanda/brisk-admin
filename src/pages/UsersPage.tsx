import { PageHeader } from '@/components/shared/page-header'
import { UsersTable } from '@/features/settings/components/users-table'

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Users & Roles" description="Manage team members and their permissions" />
      <UsersTable />
    </div>
  )
}
