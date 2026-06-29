export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  description: string
  category: string
  brand: string
  price: number
  comparePrice: number | null
  costPrice: number | null
  stock: number
  images: string[]
  tags: string[]
  status: ProductStatus
  createdAt: string
  updatedAt: string
}

export type ProductStatus = 'draft' | 'active' | 'archived'

export interface ProductFormData {
  name: string
  slug: string
  sku: string
  description: string
  category: string
  brand: string
  price: number
  comparePrice: number | null
  costPrice: number | null
  stock: number
  images: string[]
  tags: string[]
  status: ProductStatus
}
