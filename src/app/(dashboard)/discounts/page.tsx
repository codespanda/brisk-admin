import { getDiscounts } from '@/services/discount.service'
import { DiscountsPageClient } from '@/features/discounts/components/discounts-page-client'

export default async function DiscountsPage() {
  const discounts = await getDiscounts()

  return <DiscountsPageClient discounts={discounts} />
}
