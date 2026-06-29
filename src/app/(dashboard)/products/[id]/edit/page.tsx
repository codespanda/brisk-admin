"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from '@/components/shared/page-header'
import { ProductForm } from '@/features/products/components/product-form'
import { Button } from '@/components/ui/button'
import { getProduct } from '@/services/product.service'
import type { Product } from '@/types'
import { ArrowLeft } from 'lucide-react'

export default function EditProductPage() {
  const params = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProduct(params.id).then((data) => {
      setProduct(data)
      setLoading(false)
    })
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Product"
        description={`Editing: ${product.name}`}
        actions={
          <Link href={`/products/${product.id}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Product
            </Button>
          </Link>
        }
      />
      <ProductForm mode="edit" initialData={product} />
    </div>
  )
}
