import { getProducts } from '@/services/product.service'
import { ProductsPageClient } from '@/features/products/components/products-page-client'

export default async function ProductsPage() {
  const products = await getProducts()

  return <ProductsPageClient products={products} />
}
