import { getInventory } from '@/services/inventory.service'
import { InventoryPageClient } from '@/features/inventory/components/inventory-page-client'

export default async function InventoryPage() {
  const inventory = await getInventory()

  const totalProducts = inventory.length
  const lowStock = inventory.filter((item) => item.inStock <= item.threshold && item.inStock > 0).length
  const outOfStock = inventory.filter((item) => item.inStock === 0).length

  return (
    <InventoryPageClient
      inventory={inventory}
      totalProducts={totalProducts}
      lowStock={lowStock}
      outOfStock={outOfStock}
    />
  )
}
