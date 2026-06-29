export interface StoreSettings {
  name: string
  url: string
  description: string
  currency: string
  timezone: string
  dateFormat: string
  supportEmail: string
  phone: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string | null
  role: TeamRole
  status: 'active' | 'inactive'
  lastActiveAt: string
}

export type TeamRole = 'admin' | 'manager' | 'support'

export interface RolePermission {
  module: string
  admin: boolean
  manager: boolean
  support: boolean
}
