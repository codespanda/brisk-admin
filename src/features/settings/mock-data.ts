import type { StoreSettings, TeamMember, RolePermission } from '@/types/settings'

export const mockStoreSettings: StoreSettings = {
  name: 'My Store',
  url: 'https://mystore.com',
  description: 'A modern ecommerce store',
  currency: 'USD',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  supportEmail: 'support@mystore.com',
  phone: '+1 555-0100',
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@mystore.com',
    avatar: null,
    role: 'admin',
    status: 'active',
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@mystore.com',
    avatar: null,
    role: 'manager',
    status: 'active',
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@mystore.com',
    avatar: null,
    role: 'support',
    status: 'active',
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@mystore.com',
    avatar: null,
    role: 'manager',
    status: 'inactive',
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: '5',
    name: 'Eva Green',
    email: 'eva@mystore.com',
    avatar: null,
    role: 'support',
    status: 'active',
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
]

export const mockPermissions: RolePermission[] = [
  { module: 'Products', admin: true, manager: true, support: false },
  { module: 'Orders', admin: true, manager: true, support: true },
  { module: 'Customers', admin: true, manager: true, support: true },
  { module: 'Inventory', admin: true, manager: true, support: false },
  { module: 'Discounts', admin: true, manager: true, support: false },
  { module: 'Marketing', admin: true, manager: false, support: false },
  { module: 'Analytics', admin: true, manager: true, support: false },
  { module: 'Settings', admin: true, manager: false, support: false },
]
