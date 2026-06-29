import { z } from 'zod'

export const discountSchema = z
  .object({
    code: z
      .string()
      .min(3, 'Code must be at least 3 characters')
      .regex(/^[A-Z0-9]+$/, 'Code must be uppercase alphanumeric characters only'),
    type: z.enum(['percentage', 'fixed', 'free_shipping']),
    value: z.number({ error: 'Value must be a number' }).min(0, 'Value must be 0 or more'),
    minOrderValue: z.number().min(0).nullable().optional(),
    usageLimit: z.number().int().min(1).nullable().optional(),
    perCustomerLimit: z.number().int().min(1).nullable().optional(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true
      return new Date(data.endDate) > new Date(data.startDate)
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  )

export type DiscountSchemaData = z.infer<typeof discountSchema>
