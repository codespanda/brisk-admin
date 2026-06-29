import { getAdjustments } from '@/services/inventory.service'
import { AdjustmentsPageClient } from '@/features/inventory/components/adjustments-page-client'

export default async function AdjustmentsPage() {
  const adjustments = await getAdjustments()

  return <AdjustmentsPageClient adjustments={adjustments} />
}
