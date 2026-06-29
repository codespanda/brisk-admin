import { PageHeader } from '@/components/shared/page-header'
import { StoreSettingsForm } from '@/features/settings/components/store-settings-form'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Store Settings"
        description="Manage your store configuration and preferences"
      />
      <StoreSettingsForm />
    </div>
  )
}
