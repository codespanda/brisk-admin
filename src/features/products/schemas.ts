import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(1, 'Slug is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string(),
  category: z.string().min(1, 'Category is required'),
  brand: z.string(),
  price: z.number({ error: 'Price must be a number' }).positive('Price must be greater than 0'),
  comparePrice: z.number().positive().nullable(),
  costPrice: z.number().positive().nullable(),
  stock: z.number({ error: 'Stock must be a number' }).int().min(0, 'Stock must be 0 or more'),
  status: z.enum(['draft', 'active', 'archived']),
  images: z.array(z.string()),
  tags: z.array(z.string()),
})

export type ProductSchemaData = z.infer<typeof productSchema>
