import { mockApiCall } from './api-client'
import type { Campaign, EmailCampaign } from '@/types'

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Summer Sale 2026', type: 'promotion', status: 'active', startDate: '2026-06-01T00:00:00Z', endDate: '2026-08-31T23:59:59Z', reach: 12500, conversions: 890, revenue: 34500, createdAt: '2026-05-20T10:00:00Z' },
  { id: '2', name: 'New Arrivals Newsletter', type: 'email', status: 'completed', startDate: '2026-05-15T00:00:00Z', endDate: '2026-05-30T23:59:59Z', reach: 8200, conversions: 412, revenue: 15800, createdAt: '2026-05-10T09:00:00Z' },
  { id: '3', name: 'Instagram Flash Sale', type: 'social', status: 'active', startDate: '2026-06-10T00:00:00Z', endDate: '2026-06-20T23:59:59Z', reach: 5600, conversions: 234, revenue: 8900, createdAt: '2026-06-05T14:00:00Z' },
  { id: '4', name: 'Back to School', type: 'promotion', status: 'draft', startDate: '2026-08-01T00:00:00Z', endDate: '2026-09-15T23:59:59Z', reach: 0, conversions: 0, revenue: 0, createdAt: '2026-06-15T11:00:00Z' },
  { id: '5', name: 'Customer Loyalty Rewards', type: 'email', status: 'paused', startDate: '2026-04-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', reach: 3200, conversions: 156, revenue: 6700, createdAt: '2026-03-25T08:00:00Z' },
  { id: '6', name: 'Black Friday Blowout', type: 'promotion', status: 'completed', startDate: '2025-11-28T00:00:00Z', endDate: '2025-11-30T23:59:59Z', reach: 28400, conversions: 2150, revenue: 89300, createdAt: '2025-11-01T09:00:00Z' },
  { id: '7', name: 'Spring Collection Launch', type: 'email', status: 'completed', startDate: '2026-03-01T00:00:00Z', endDate: '2026-03-15T23:59:59Z', reach: 9100, conversions: 520, revenue: 22400, createdAt: '2026-02-22T10:00:00Z' },
  { id: '8', name: 'TikTok Brand Awareness', type: 'social', status: 'completed', startDate: '2026-04-10T00:00:00Z', endDate: '2026-04-30T23:59:59Z', reach: 41200, conversions: 890, revenue: 18700, createdAt: '2026-04-05T11:00:00Z' },
  { id: '9', name: 'Abandoned Cart Recovery', type: 'email', status: 'active', startDate: '2026-05-01T00:00:00Z', endDate: '2026-12-31T23:59:59Z', reach: 6800, conversions: 742, revenue: 31200, createdAt: '2026-04-28T08:00:00Z' },
  { id: '10', name: 'YouTube Product Reviews', type: 'social', status: 'active', startDate: '2026-05-20T00:00:00Z', endDate: '2026-08-20T23:59:59Z', reach: 18900, conversions: 634, revenue: 24500, createdAt: '2026-05-15T09:00:00Z' },
  { id: '11', name: 'Cyber Monday Deals', type: 'promotion', status: 'draft', startDate: '2026-11-30T00:00:00Z', endDate: '2026-11-30T23:59:59Z', reach: 0, conversions: 0, revenue: 0, createdAt: '2026-06-10T14:00:00Z' },
  { id: '12', name: 'Weekly VIP Newsletter', type: 'email', status: 'active', startDate: '2026-01-05T00:00:00Z', endDate: '2026-12-31T23:59:59Z', reach: 4500, conversions: 380, revenue: 14200, createdAt: '2026-01-02T08:00:00Z' },
  { id: '13', name: 'Pinterest Home Decor', type: 'social', status: 'paused', startDate: '2026-04-15T00:00:00Z', endDate: '2026-07-15T23:59:59Z', reach: 7300, conversions: 198, revenue: 6800, createdAt: '2026-04-10T10:00:00Z' },
  { id: '14', name: 'Father\'s Day Gift Guide', type: 'promotion', status: 'active', startDate: '2026-06-08T00:00:00Z', endDate: '2026-06-22T23:59:59Z', reach: 9800, conversions: 412, revenue: 19600, createdAt: '2026-06-01T09:00:00Z' },
  { id: '15', name: 'Re-engagement Win-back', type: 'email', status: 'active', startDate: '2026-05-10T00:00:00Z', endDate: '2026-09-30T23:59:59Z', reach: 2900, conversions: 87, revenue: 4200, createdAt: '2026-05-05T11:00:00Z' },
  { id: '16', name: 'End of Season Clearance', type: 'promotion', status: 'draft', startDate: '2026-07-01T00:00:00Z', endDate: '2026-07-31T23:59:59Z', reach: 0, conversions: 0, revenue: 0, createdAt: '2026-06-18T10:00:00Z' },
  { id: '17', name: 'Facebook Retargeting Ads', type: 'social', status: 'active', startDate: '2026-06-01T00:00:00Z', endDate: '2026-09-01T23:59:59Z', reach: 14600, conversions: 567, revenue: 23100, createdAt: '2026-05-28T08:00:00Z' },
]

const mockEmailCampaigns: EmailCampaign[] = [
  { id: '1', subject: 'Summer Sale is Here! Up to 50% Off', sentCount: 8200, openCount: 2952, clickCount: 492, openRate: 36.0, clickRate: 6.0, status: 'sent', sentAt: '2026-06-01T10:00:00Z' },
  { id: '2', subject: 'New Arrivals You Will Love', sentCount: 7500, openCount: 2325, clickCount: 375, openRate: 31.0, clickRate: 5.0, status: 'sent', sentAt: '2026-05-15T09:00:00Z' },
  { id: '3', subject: 'Exclusive: Early Access to Flash Sale', sentCount: 5000, openCount: 1750, clickCount: 300, openRate: 35.0, clickRate: 6.0, status: 'sent', sentAt: '2026-06-10T08:00:00Z' },
  { id: '4', subject: 'Your Weekly Style Guide', sentCount: 6800, openCount: 1904, clickCount: 272, openRate: 28.0, clickRate: 4.0, status: 'sent', sentAt: '2026-06-12T10:00:00Z' },
  { id: '5', subject: 'Flash Sale Reminder - Ends Tonight!', sentCount: 0, openCount: 0, clickCount: 0, openRate: 0, clickRate: 0, status: 'scheduled', sentAt: null },
]

export async function getCampaigns(): Promise<Campaign[]> {
  return mockApiCall(mockCampaigns)
}

export async function getEmailCampaigns(): Promise<EmailCampaign[]> {
  return mockApiCall(mockEmailCampaigns)
}
