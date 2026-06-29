import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

const bestSellers = [
  { brand: 'AudioTech', name: 'Wireless Headphones', stock: 100, sold: 453, price: 129.99 },
  { brand: 'EcoWear', name: 'Cotton T-Shirt', stock: 83, sold: 218, price: 34.99 },
  { brand: 'SpeedStep', name: 'Running Shoes', stock: 56, sold: 195, price: 89.99 },
  { brand: 'TechPulse', name: 'Smart Watch X', stock: 70, sold: 140, price: 249.99 },
]

export function BestSellers() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Best Sellers</CardTitle>
        <Link to="/products">
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            View all <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {bestSellers.map((product) => (
            <div key={product.name} className="space-y-3">
              {/* Product Image Placeholder */}
              <div className="flex aspect-square items-center justify-center rounded-xl border bg-muted/50">
                <Package className="h-10 w-10 text-muted-foreground/40" />
              </div>
              {/* Product Info */}
              <div>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <p className="text-sm font-semibold leading-tight">{product.name}</p>
              </div>
              {/* Stats */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stock</span>
                  <span className="font-medium">{product.stock}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sold</span>
                  <span className="font-medium">{product.sold}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">${product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
