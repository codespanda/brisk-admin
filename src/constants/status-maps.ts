export const orderStatusMap = {
  pending: { label: 'Pending', variant: 'warning' as const },
  paid: { label: 'Paid', variant: 'info' as const },
  processing: { label: 'Processing', variant: 'secondary' as const },
  shipped: { label: 'Shipped', variant: 'info' as const },
  delivered: { label: 'Delivered', variant: 'success' as const },
  cancelled: { label: 'Cancelled', variant: 'danger' as const },
  refunded: { label: 'Refunded', variant: 'muted' as const },
} as const

export const paymentStatusMap = {
  pending: { label: 'Pending', variant: 'warning' as const },
  paid: { label: 'Paid', variant: 'success' as const },
  refunded: { label: 'Refunded', variant: 'muted' as const },
} as const

export const productStatusMap = {
  draft: { label: 'Draft', variant: 'muted' as const },
  active: { label: 'Active', variant: 'success' as const },
  archived: { label: 'Archived', variant: 'secondary' as const },
} as const

export const customerStatusMap = {
  active: { label: 'Active', variant: 'success' as const },
  inactive: { label: 'Inactive', variant: 'muted' as const },
} as const

export const adjustmentTypeMap = {
  received: { label: 'Received', variant: 'success' as const },
  sold: { label: 'Sold', variant: 'info' as const },
  returned: { label: 'Returned', variant: 'warning' as const },
  adjusted: { label: 'Adjusted', variant: 'secondary' as const },
} as const

export const discountTypeMap = {
  percentage: { label: 'Percentage', variant: 'info' as const },
  fixed: { label: 'Fixed Amount', variant: 'success' as const },
  free_shipping: { label: 'Free Shipping', variant: 'secondary' as const },
} as const

export const campaignStatusMap = {
  draft: { label: 'Draft', variant: 'muted' as const },
  active: { label: 'Active', variant: 'success' as const },
  paused: { label: 'Paused', variant: 'warning' as const },
  completed: { label: 'Completed', variant: 'info' as const },
} as const

export const campaignTypeMap = {
  email: { label: 'Email', variant: 'info' as const },
  social: { label: 'Social', variant: 'success' as const },
  promotion: { label: 'Promotion', variant: 'warning' as const },
} as const

export const teamRoleMap = {
  admin: { label: 'Admin', variant: 'danger' as const },
  manager: { label: 'Manager', variant: 'info' as const },
  support: { label: 'Support', variant: 'success' as const },
} as const

export type StatusVariant = 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'muted'
