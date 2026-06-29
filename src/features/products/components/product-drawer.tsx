"use client"

import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

interface ProductDrawerProps {
  open: boolean
  onClose: () => void
  initialData?: Product
  mode: 'create' | 'edit'
}

export function ProductDrawer({ open, onClose, initialData, mode }: ProductDrawerProps) {
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

  const { watch, setValue, formState: { isSubmitting }, reset } = methods
  const nameValue = watch('name')
  const skuValue = watch('sku')
  const categoryValue = watch('category')
  const priceValue = watch('price')
  const imagesValue = watch('images')

  const isFormValid = nameValue?.length >= 2 && !!skuValue && !!categoryValue && priceValue > 0

  useEffect(() => {
    if (mode === 'create') {
      setValue('slug', slugify(nameValue))
    }
  }, [nameValue, mode, setValue])

  // Reset form when drawer opens or initialData changes
  useEffect(() => {
    if (!open) return
    if (initialData) {
      reset({
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
      })
    } else {
      reset({
        name: '', slug: '', sku: '', description: '', category: '', brand: '',
        price: 0, comparePrice: null, costPrice: null, stock: 0,
        status: 'draft', images: [], tags: [],
      })
    }
  }, [open, initialData, reset])

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (mode === 'edit' && initialData) {
        await updateProduct(initialData.id, data)
      } else {
        await createProduct(data)
      }
      toast.success(mode === 'create' ? 'Product created' : 'Product saved')
      onClose()
    } catch {
      toast.error('Failed to save product')
    }
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[33.333%] min-w-[400px] flex-col border-l bg-background shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {mode === 'create' ? 'Add New Product' : 'Edit Product'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === 'create' ? 'Fill in the details to create a new product' : 'Update the product information'}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Basic Information</h3>
                  <TextField name="name" label="Product Name" placeholder="Enter product name" required />
                  <TextField name="slug" label="Slug" placeholder="product-slug" />
                  <TextAreaField name="description" label="Description" placeholder="Describe your product..." rows={3} />
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pricing</h3>
                  <CurrencyField name="price" label="Price" required />
                  <div className="grid grid-cols-2 gap-3">
                    <CurrencyField name="comparePrice" label="Compare Price" />
                    <CurrencyField name="costPrice" label="Cost Price" />
                  </div>
                </div>

                {/* Inventory */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Inventory</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField name="sku" label="SKU" placeholder="e.g. ABC-001" required />
                    <TextField name="stock" label="Stock" type="number" placeholder="0" />
                  </div>
                </div>

                {/* Organization */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Organization</h3>
                  <SelectField name="status" label="Status" options={STATUS_OPTIONS} />
                  <SelectField name="category" label="Category" options={CATEGORY_OPTIONS} placeholder="Select category" required />
                  <TextField name="brand" label="Brand" placeholder="Brand name" />
                  <TextField name="tags" label="Tags" placeholder="wireless, bluetooth, audio" />
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Images</h3>
                  <ImageUploadField
                    name="images"
                    label="Product Images"
                    images={imagesValue ?? []}
                    onImagesChange={(imgs) => setValue('images', imgs)}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 border-t px-6 py-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting || !isFormValid}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'create' ? 'Create Product' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
