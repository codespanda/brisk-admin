import { mockApiCall } from './api-client'
import type { Customer } from '@/types'

const mockCustomers: Customer[] = [
  {
    id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 555-0101',
    avatar: null, status: 'active', totalOrders: 24, totalSpent: 2450.00, averageOrderValue: 102.08,
    addresses: [
      { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
    ],
    notes: [
      { id: '1', content: 'VIP customer, prefers express shipping.', createdBy: 'Admin', createdAt: '2026-03-15T10:00:00Z' },
    ],
    createdAt: '2025-01-10T08:00:00Z', updatedAt: '2026-06-18T14:00:00Z',
  },
  {
    id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-0102',
    avatar: null, status: 'active', totalOrders: 18, totalSpent: 1890.50, averageOrderValue: 105.03,
    addresses: [
      { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-03-22T09:00:00Z', updatedAt: '2026-06-16T16:20:00Z',
  },
  {
    id: '3', name: 'Bob Wilson', email: 'bob@example.com', phone: '+1 555-0103',
    avatar: null, status: 'active', totalOrders: 7, totalSpent: 542.30, averageOrderValue: 77.47,
    addresses: [
      { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-06-14T11:00:00Z', updatedAt: '2026-06-17T20:05:00Z',
  },
  {
    id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1 555-0104',
    avatar: null, status: 'active', totalOrders: 3, totalSpent: 289.97, averageOrderValue: 96.66,
    addresses: [
      { street: '321 Elm Blvd', city: 'Houston', state: 'TX', zip: '77001', country: 'US' },
    ],
    notes: [
      { id: '2', content: 'Requested size exchange on last order.', createdBy: 'Support', createdAt: '2026-05-20T14:00:00Z' },
    ],
    createdAt: '2025-09-05T07:00:00Z', updatedAt: '2026-06-19T08:30:00Z',
  },
  {
    id: '5', name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1 555-0105',
    avatar: null, status: 'inactive', totalOrders: 2, totalSpent: 158.97, averageOrderValue: 79.49,
    addresses: [
      { street: '654 Maple Dr', city: 'Phoenix', state: 'AZ', zip: '85001', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-11-28T13:00:00Z', updatedAt: '2026-06-14T16:00:00Z',
  },
  {
    id: '6', name: 'Diana Miller', email: 'diana@example.com', phone: '+1 555-0106',
    avatar: null, status: 'active', totalOrders: 12, totalSpent: 1245.80, averageOrderValue: 103.82,
    addresses: [
      { street: '987 Cedar Ln', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
      { street: '111 Work Blvd', city: 'Seattle', state: 'WA', zip: '98102', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-04-18T10:00:00Z', updatedAt: '2026-06-19T12:00:00Z',
  },
  {
    id: '7', name: 'Edward Taylor', email: 'edward@example.com', phone: '+1 555-0107',
    avatar: null, status: 'active', totalOrders: 31, totalSpent: 4120.00, averageOrderValue: 132.90,
    addresses: [
      { street: '222 River St', city: 'Denver', state: 'CO', zip: '80201', country: 'US' },
    ],
    notes: [
      { id: '3', content: 'Loyal customer since launch. Send holiday gift.', createdBy: 'Admin', createdAt: '2025-12-01T09:00:00Z' },
    ],
    createdAt: '2025-01-02T08:00:00Z', updatedAt: '2026-06-18T10:00:00Z',
  },
  {
    id: '8', name: 'Fiona Garcia', email: 'fiona@example.com', phone: '+1 555-0108',
    avatar: null, status: 'active', totalOrders: 9, totalSpent: 876.45, averageOrderValue: 97.38,
    addresses: [
      { street: '333 Lake Ave', city: 'Miami', state: 'FL', zip: '33101', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-07-20T15:00:00Z', updatedAt: '2026-06-15T09:20:00Z',
  },
  {
    id: '9', name: 'George Harris', email: 'george@example.com', phone: '+1 555-0109',
    avatar: null, status: 'active', totalOrders: 15, totalSpent: 1530.75, averageOrderValue: 102.05,
    addresses: [
      { street: '444 Birch Ct', city: 'Portland', state: 'OR', zip: '97201', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-02-14T09:00:00Z', updatedAt: '2026-06-18T11:00:00Z',
  },
  {
    id: '10', name: 'Hannah Lee', email: 'hannah@example.com', phone: '+1 555-0110',
    avatar: null, status: 'inactive', totalOrders: 1, totalSpent: 54.99, averageOrderValue: 54.99,
    addresses: [
      { street: '555 Walnut St', city: 'Nashville', state: 'TN', zip: '37201', country: 'US' },
    ],
    notes: [
      { id: '4', content: 'Single purchase, did not opt into marketing.', createdBy: 'Support', createdAt: '2026-04-10T10:00:00Z' },
    ],
    createdAt: '2026-04-10T09:30:00Z', updatedAt: '2026-04-10T10:00:00Z',
  },
  {
    id: '11', name: 'Ivan Petrov', email: 'ivan@example.com', phone: '+1 555-0111',
    avatar: null, status: 'active', totalOrders: 42, totalSpent: 4875.20, averageOrderValue: 116.08,
    addresses: [
      { street: '666 Spruce Ave', city: 'Boston', state: 'MA', zip: '02101', country: 'US' },
      { street: '700 Office Park', city: 'Cambridge', state: 'MA', zip: '02139', country: 'US' },
    ],
    notes: [
      { id: '5', content: 'High-value repeat customer. Eligible for VIP tier.', createdBy: 'Admin', createdAt: '2026-01-05T09:00:00Z' },
    ],
    createdAt: '2024-11-01T08:00:00Z', updatedAt: '2026-06-19T09:00:00Z',
  },
  {
    id: '12', name: 'Julia Chen', email: 'julia@example.com', phone: '+1 555-0112',
    avatar: null, status: 'active', totalOrders: 8, totalSpent: 723.60, averageOrderValue: 90.45,
    addresses: [
      { street: '777 Magnolia Blvd', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-05-30T10:00:00Z', updatedAt: '2026-06-14T15:00:00Z',
  },
  {
    id: '13', name: 'Kevin Moore', email: 'kevin@example.com', phone: '+1 555-0113',
    avatar: null, status: 'active', totalOrders: 22, totalSpent: 2189.40, averageOrderValue: 99.52,
    addresses: [
      { street: '888 Ash St', city: 'Austin', state: 'TX', zip: '78701', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-01-18T11:00:00Z', updatedAt: '2026-06-17T13:00:00Z',
  },
  {
    id: '14', name: 'Laura Martinez', email: 'laura@example.com', phone: '+1 555-0114',
    avatar: null, status: 'inactive', totalOrders: 3, totalSpent: 218.97, averageOrderValue: 72.99,
    addresses: [
      { street: '999 Poplar Rd', city: 'San Diego', state: 'CA', zip: '92101', country: 'US' },
    ],
    notes: [
      { id: '6', content: 'Requested account deletion, on hold pending review.', createdBy: 'Support', createdAt: '2026-05-15T14:00:00Z' },
    ],
    createdAt: '2025-08-22T12:00:00Z', updatedAt: '2026-05-15T14:00:00Z',
  },
  {
    id: '15', name: 'Michael Scott', email: 'michael@example.com', phone: '+1 555-0115',
    avatar: null, status: 'active', totalOrders: 50, totalSpent: 4999.50, averageOrderValue: 99.99,
    addresses: [
      { street: '1725 Slough Ave', city: 'Scranton', state: 'PA', zip: '18501', country: 'US' },
    ],
    notes: [
      { id: '7', content: 'World\'s best customer. Always orders in bulk.', createdBy: 'Admin', createdAt: '2025-06-01T09:00:00Z' },
    ],
    createdAt: '2024-12-01T08:00:00Z', updatedAt: '2026-06-19T10:00:00Z',
  },
  {
    id: '16', name: 'Nina Patel', email: 'nina@example.com', phone: '+1 555-0116',
    avatar: null, status: 'active', totalOrders: 6, totalSpent: 489.94, averageOrderValue: 81.66,
    addresses: [
      { street: '202 Lotus Dr', city: 'Atlanta', state: 'GA', zip: '30301', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-10-05T13:00:00Z', updatedAt: '2026-06-12T10:00:00Z',
  },
  {
    id: '17', name: 'Oliver Kim', email: 'oliver@example.com', phone: '+1 555-0117',
    avatar: null, status: 'active', totalOrders: 11, totalSpent: 1102.89, averageOrderValue: 100.26,
    addresses: [
      { street: '303 Cherry Ln', city: 'Minneapolis', state: 'MN', zip: '55401', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-04-02T10:00:00Z', updatedAt: '2026-06-16T09:00:00Z',
  },
  {
    id: '18', name: 'Paula Robinson', email: 'paula@example.com', phone: '+1 555-0118',
    avatar: null, status: 'inactive', totalOrders: 2, totalSpent: 139.98, averageOrderValue: 69.99,
    addresses: [
      { street: '404 Hickory Way', city: 'Columbus', state: 'OH', zip: '43201', country: 'US' },
    ],
    notes: [],
    createdAt: '2026-01-28T15:00:00Z', updatedAt: '2026-03-10T11:00:00Z',
  },
  {
    id: '19', name: 'Quincy Adams', email: 'quincy@example.com', phone: '+1 555-0119',
    avatar: null, status: 'active', totalOrders: 19, totalSpent: 1876.30, averageOrderValue: 98.75,
    addresses: [
      { street: '505 Willow Creek Rd', city: 'Charlotte', state: 'NC', zip: '28201', country: 'US' },
      { street: '610 Business Park', city: 'Raleigh', state: 'NC', zip: '27601', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-03-11T08:00:00Z', updatedAt: '2026-06-18T16:00:00Z',
  },
  {
    id: '20', name: 'Rachel Green', email: 'rachel@example.com', phone: '+1 555-0120',
    avatar: null, status: 'active', totalOrders: 28, totalSpent: 3210.00, averageOrderValue: 114.64,
    addresses: [
      { street: '90 Bedford St', city: 'New York', state: 'NY', zip: '10014', country: 'US' },
    ],
    notes: [
      { id: '8', content: 'Frequent shopper. Interested in fashion and accessories.', createdBy: 'Admin', createdAt: '2026-02-14T10:00:00Z' },
    ],
    createdAt: '2024-10-15T09:00:00Z', updatedAt: '2026-06-19T11:00:00Z',
  },
  {
    id: '21', name: 'Samuel Torres', email: 'samuel@example.com', phone: '+1 555-0121',
    avatar: null, status: 'active', totalOrders: 4, totalSpent: 379.96, averageOrderValue: 94.99,
    addresses: [
      { street: '606 Palm Ave', city: 'Tampa', state: 'FL', zip: '33601', country: 'US' },
    ],
    notes: [],
    createdAt: '2025-12-10T14:00:00Z', updatedAt: '2026-06-10T09:00:00Z',
  },
  {
    id: '22', name: 'Tina Nguyen', email: 'tina@example.com', phone: '+1 555-0122',
    avatar: null, status: 'active', totalOrders: 37, totalSpent: 3745.80, averageOrderValue: 101.24,
    addresses: [
      { street: '707 Orchid St', city: 'Sacramento', state: 'CA', zip: '95814', country: 'US' },
    ],
    notes: [
      { id: '9', content: 'Prefers eco-friendly products. Add to sustainability segment.', createdBy: 'Marketing', createdAt: '2026-03-20T11:00:00Z' },
    ],
    createdAt: '2025-01-05T08:00:00Z', updatedAt: '2026-06-19T12:00:00Z',
  },
  {
    id: '23', name: 'Ulrich Weber', email: 'ulrich@example.com', phone: '+1 555-0123',
    avatar: null, status: 'inactive', totalOrders: 1, totalSpent: 79.99, averageOrderValue: 79.99,
    addresses: [
      { street: '808 Fern Blvd', city: 'Las Vegas', state: 'NV', zip: '89101', country: 'US' },
    ],
    notes: [],
    createdAt: '2026-05-01T10:00:00Z', updatedAt: '2026-05-15T10:00:00Z',
  },
]

export async function getCustomers(): Promise<Customer[]> {
  return mockApiCall(mockCustomers)
}

export async function getCustomer(id: string): Promise<Customer | undefined> {
  return mockApiCall(mockCustomers.find((c) => c.id === id))
}
