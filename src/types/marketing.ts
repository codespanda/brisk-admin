export interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  startDate: string
  endDate: string
  reach: number
  conversions: number
  revenue: number
  createdAt: string
}

export type CampaignType = 'email' | 'social' | 'promotion'
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed'

export interface EmailCampaign {
  id: string
  subject: string
  sentCount: number
  openCount: number
  clickCount: number
  openRate: number
  clickRate: number
  status: 'draft' | 'sent' | 'scheduled'
  sentAt: string | null
}
