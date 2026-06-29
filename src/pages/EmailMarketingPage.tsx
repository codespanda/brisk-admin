import { useEffect, useState } from 'react'
import { getEmailCampaigns } from '@/services/marketing.service'
import { PageHeader } from '@/components/shared/page-header'
import { EmailDashboard } from '@/features/marketing/components/email-dashboard'
import type { EmailCampaign } from '@/types'

export default function EmailMarketingPage() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])

  useEffect(() => {
    getEmailCampaigns().then(setCampaigns)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader title="Email Marketing" description="Track your email campaign performance" />
      <EmailDashboard campaigns={campaigns} />
    </div>
  )
}
