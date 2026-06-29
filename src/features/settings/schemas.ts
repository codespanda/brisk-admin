import { z } from 'zod'

export const storeSettingsSchema = z.object({
  name: z.string().min(1, 'Store name is required'),
  url: z.string().url('Must be a valid URL'),
  description: z.string(),
  currency: z.string().min(1, 'Currency is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  dateFormat: z.string(),
  supportEmail: z.string().email('Must be a valid email address'),
  phone: z.string(),
})

export type StoreSettingsSchemaData = z.infer<typeof storeSettingsSchema>
