import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { ProductForm } from '@/features/products/components/product-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New Product"
        description="Add a new product to your catalog"
        actions={
          <Link to="/products">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        }
      />
      <ProductForm mode="create" />
    </div>
  )
}
