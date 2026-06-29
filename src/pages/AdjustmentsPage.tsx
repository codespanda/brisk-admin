import { useEffect, useState } from 'react'
import { getAdjustments } from '@/services/inventory.service'
import { AdjustmentsPageClient } from '@/features/inventory/components/adjustments-page-client'
import type { StockAdjustment } from '@/types'

export default function AdjustmentsPage() {
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>([])

  useEffect(() => {
    getAdjustments().then(setAdjustments)
  }, [])

  return <AdjustmentsPageClient adjustments={adjustments} />
}
