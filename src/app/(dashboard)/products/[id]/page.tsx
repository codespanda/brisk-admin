import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/shared/page-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getProduct } from '@/services/product.service'
import { productStatusMap } from '@/constants/status-maps'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ArrowLeft, Pencil } from 'lucide-react'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) notFound()

  const status = productStatusMap[product.status]

  return (
    <div className="space-y-6">
      <PageHeader
        title={product.name}
        description={`SKU: ${product.sku}`}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/products">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link href={`/products/${product.id}/edit`}>
              <Button>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Image area */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {product.images.length > 0 ? (
                  product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg border bg-muted flex items-center justify-center text-xs text-muted-foreground"
                    >
                      Image {idx + 1}
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 aspect-video rounded-lg border bg-muted flex items-center justify-center text-sm text-muted-foreground">
                    No images
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {product.description || 'No description provided.'}
              </p>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-lg font-semibold mt-1">{formatCurrency(product.price)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Compare Price</p>
                  <p className="text-lg font-semibold mt-1">
                    {product.comparePrice ? formatCurrency(product.comparePrice) : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cost Price</p>
                  <p className="text-lg font-semibold mt-1">
                    {product.costPrice ? formatCurrency(product.costPrice) : '—'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusBadge label={status.label} variant={status.variant} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">SKU</p>
                <p className="text-sm font-medium mt-0.5">{product.sku}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Stock</p>
                <p className="text-sm font-medium mt-0.5">{product.stock} units</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="text-sm font-medium mt-0.5">{product.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Brand</p>
                <p className="text-sm font-medium mt-0.5">{product.brand || '—'}</p>
              </div>
              {product.tags.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="text-sm font-medium mt-0.5">{formatDate(product.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Updated</p>
                <p className="text-sm font-medium mt-0.5">{formatDate(product.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
