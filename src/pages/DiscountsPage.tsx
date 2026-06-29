import { useEffect, useState } from 'react'
import { getDiscounts } from '@/services/discount.service'
import { DiscountsPageClient } from '@/features/discounts/components/discounts-page-client'
import type { Discount } from '@/types'

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([])

  useEffect(() => {
    getDiscounts().then(setDiscounts)
  }, [])

  return <DiscountsPageClient discounts={discounts} />
}
