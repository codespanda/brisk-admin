import { useEffect, useState } from 'react'
import { getCampaigns } from '@/services/marketing.service'
import { CampaignsPageClient } from '@/features/marketing/components/campaigns-page-client'
import type { Campaign } from '@/types'

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    getCampaigns().then(setCampaigns)
  }, [])

  return <CampaignsPageClient campaigns={campaigns} />
}
