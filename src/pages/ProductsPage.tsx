import { useEffect, useState } from 'react'
import { getProducts } from '@/services/product.service'
import { ProductsPageClient } from '@/features/products/components/products-page-client'
import type { Product } from '@/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return <ProductsPageClient products={products} />
}
