import { PageHeader } from '@/components/shared/page-header'
import { EmailDashboard } from '@/features/marketing/components/email-dashboard'
import { getEmailCampaigns } from '@/services/marketing.service'

export default async function EmailMarketingPage() {
  const campaigns = await getEmailCampaigns()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Email Marketing"
        description="Track your email campaign performance"
      />
      <EmailDashboard campaigns={campaigns} />
    </div>
  )
}
