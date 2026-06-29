import { getCampaigns } from '@/services/marketing.service'
import { CampaignsPageClient } from '@/features/marketing/components/campaigns-page-client'

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  return <CampaignsPageClient campaigns={campaigns} />
}
