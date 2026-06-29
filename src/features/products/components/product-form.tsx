import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TextField,
  SelectField,
  TextAreaField,
  CurrencyField,
  ImageUploadField,
} from '@/components/forms'
import { createProduct, updateProduct } from '@/services/product.service'
import type { Product, ProductFormData } from '@/types'
import { productSchema } from '@/features/products/schemas'
import { slugify } from '@/lib/utils'

const CATEGORY_OPTIONS = [
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Home & Kitchen', value: 'Home & Kitchen' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Footwear', value: 'Footwear' },
  { label: 'Accessories', value: 'Accessories' },
]

const STATUS_OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
]

interface ProductFormProps {
  initialData?: Product
  mode: 'create' | 'edit'
}

export function ProductForm({ initialData, mode }: ProductFormProps) {
  const navigate = useNavigate()

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as never,
    defaultValues: initialData
      ? {
          name: initialData.name,
          slug: initialData.slug,
          sku: initialData.sku,
          description: initialData.description,
          category: initialData.category,
          brand: initialData.brand,
          price: initialData.price,
          comparePrice: initialData.comparePrice,
          costPrice: initialData.costPrice,
          stock: initialData.stock,
          status: initialData.status,
          images: initialData.images,
          tags: initialData.tags,
        }
      : {
          name: '',
          slug: '',
          sku: '',
          description: '',
          category: '',
          brand: '',
          price: 0,
          comparePrice: null,
          costPrice: null,
          stock: 0,
          status: 'draft',
          images: [],
          tags: [],
        },
  })

  const { watch, setValue, formState: { isSubmitting } } = methods
  const nameValue = watch('name')
  const imagesValue = watch('images')

  useEffect(() => {
    if (mode === 'create') {
      setValue('slug', slugify(nameValue))
    }
  }, [nameValue, mode, setValue])

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (mode === 'edit' && initialData) {
        await updateProduct(initialData.id, data)
      } else {
        await createProduct(data)
      }
      toast.success('Product saved')
      navigate('/products')
    } catch {
      toast.error('Failed to save product')
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid gap-6 md:grid-cols-[1fr_350px]">
          {/* Left column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TextField name="name" label="Product Name" placeholder="Enter product name" />
                <TextField name="slug" label="Slug" placeholder="product-slug" />
                <TextAreaField name="description" label="Description" placeholder="Describe your product..." rows={5} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <CurrencyField name="price" label="Price" />
                  <CurrencyField name="comparePrice" label="Compare Price" />
                  <CurrencyField name="costPrice" label="Cost Price" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField name="sku" label="SKU" placeholder="e.g. ABC-001" />
                  <TextField name="stock" label="Stock" type="number" placeholder="0" />
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
                <SelectField name="status" label="Status" options={STATUS_OPTIONS} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SelectField name="category" label="Category" options={CATEGORY_OPTIONS} placeholder="Select category" />
                <TextField name="brand" label="Brand" placeholder="Brand name" />
                <TextField name="tags" label="Tags" placeholder="wireless, bluetooth, audio" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Images</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploadField
                  name="images"
                  label="Product Images"
                  images={imagesValue ?? []}
                  onImagesChange={(imgs) => setValue('images', imgs)}
                />
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'create' ? 'Create Product' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
