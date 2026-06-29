import { mockApiCall } from './api-client'
import type { Order, OrderStatus } from '@/types'

const mockOrders: Order[] = [
  {
    id: '1', orderNumber: 'ORD-1234',
    customer: { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 555-0101' },
    items: [
      { id: '1', productId: '1', productName: 'Wireless Bluetooth Headphones', productImage: '/placeholder.svg', sku: 'WBH-001', price: 129.99, quantity: 1, total: 129.99 },
      { id: '2', productId: '3', productName: 'Stainless Steel Water Bottle', productImage: '/placeholder.svg', sku: 'SSW-003', price: 24.99, quantity: 2, total: 49.98 },
    ],
    subtotal: 179.97, shipping: 9.99, tax: 15.30, total: 205.26,
    status: 'delivered', paymentStatus: 'paid',
    shippingAddress: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
    billingAddress: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
    timeline: [
      { id: '1', status: 'Delivered', description: 'Package delivered', timestamp: '2026-06-19T14:30:00Z' },
      { id: '2', status: 'Shipped', description: 'Package shipped via UPS', timestamp: '2026-06-17T10:00:00Z' },
      { id: '3', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-16T09:15:00Z' },
      { id: '4', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-15T15:00:00Z' },
      { id: '5', status: 'Placed', description: 'Order placed', timestamp: '2026-06-15T14:45:00Z' },
    ],
    createdAt: '2026-06-15T14:45:00Z', updatedAt: '2026-06-19T14:30:00Z',
  },
  {
    id: '2', orderNumber: 'ORD-1235',
    customer: { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-0102' },
    items: [
      { id: '3', productId: '5', productName: 'Smart Watch Series X', productImage: '/placeholder.svg', sku: 'SWX-005', price: 249.99, quantity: 1, total: 249.99 },
    ],
    subtotal: 249.99, shipping: 0, tax: 21.25, total: 271.24,
    status: 'shipped', paymentStatus: 'paid',
    shippingAddress: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
    billingAddress: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
    timeline: [
      { id: '1', status: 'Shipped', description: 'Package shipped via FedEx', timestamp: '2026-06-18T11:00:00Z' },
      { id: '2', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-17T08:30:00Z' },
      { id: '3', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-16T16:20:00Z' },
      { id: '4', status: 'Placed', description: 'Order placed', timestamp: '2026-06-16T16:15:00Z' },
    ],
    createdAt: '2026-06-16T16:15:00Z', updatedAt: '2026-06-18T11:00:00Z',
  },
  {
    id: '3', orderNumber: 'ORD-1236',
    customer: { id: '3', name: 'Bob Wilson', email: 'bob@example.com', phone: '+1 555-0103' },
    items: [
      { id: '4', productId: '2', productName: 'Organic Cotton T-Shirt', productImage: '/placeholder.svg', sku: 'OCT-002', price: 34.99, quantity: 3, total: 104.97 },
      { id: '5', productId: '7', productName: 'Aromatherapy Candle Set', productImage: '/placeholder.svg', sku: 'ACS-007', price: 42.99, quantity: 1, total: 42.99 },
    ],
    subtotal: 147.96, shipping: 5.99, tax: 12.58, total: 166.53,
    status: 'processing', paymentStatus: 'paid',
    shippingAddress: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601', country: 'US' },
    billingAddress: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601', country: 'US' },
    timeline: [
      { id: '1', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-18T09:00:00Z' },
      { id: '2', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-17T20:10:00Z' },
      { id: '3', status: 'Placed', description: 'Order placed', timestamp: '2026-06-17T20:05:00Z' },
    ],
    createdAt: '2026-06-17T20:05:00Z', updatedAt: '2026-06-18T09:00:00Z',
  },
  {
    id: '4', orderNumber: 'ORD-1237',
    customer: { id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1 555-0104' },
    items: [
      { id: '6', productId: '4', productName: 'Running Shoes Pro', productImage: '/placeholder.svg', sku: 'RSP-004', price: 89.99, quantity: 1, total: 89.99 },
    ],
    subtotal: 89.99, shipping: 7.99, tax: 7.65, total: 105.63,
    status: 'pending', paymentStatus: 'pending',
    shippingAddress: { street: '321 Elm Blvd', city: 'Houston', state: 'TX', zip: '77001', country: 'US' },
    billingAddress: { street: '321 Elm Blvd', city: 'Houston', state: 'TX', zip: '77001', country: 'US' },
    timeline: [
      { id: '1', status: 'Placed', description: 'Order placed', timestamp: '2026-06-19T08:30:00Z' },
    ],
    createdAt: '2026-06-19T08:30:00Z', updatedAt: '2026-06-19T08:30:00Z',
  },
  {
    id: '5', orderNumber: 'ORD-1238',
    customer: { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', phone: '+1 555-0105' },
    items: [
      { id: '7', productId: '10', productName: 'Wireless Charging Pad', productImage: '/placeholder.svg', sku: 'WCP-010', price: 19.99, quantity: 2, total: 39.98 },
      { id: '8', productId: '9', productName: 'Ceramic Coffee Mug Set', productImage: '/placeholder.svg', sku: 'CCM-009', price: 38.99, quantity: 1, total: 38.99 },
    ],
    subtotal: 78.97, shipping: 5.99, tax: 6.71, total: 91.67,
    status: 'cancelled', paymentStatus: 'refunded',
    shippingAddress: { street: '654 Maple Dr', city: 'Phoenix', state: 'AZ', zip: '85001', country: 'US' },
    billingAddress: { street: '654 Maple Dr', city: 'Phoenix', state: 'AZ', zip: '85001', country: 'US' },
    timeline: [
      { id: '1', status: 'Cancelled', description: 'Order cancelled by customer', timestamp: '2026-06-14T16:00:00Z' },
      { id: '2', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-13T10:00:00Z' },
      { id: '3', status: 'Placed', description: 'Order placed', timestamp: '2026-06-13T09:45:00Z' },
    ],
    createdAt: '2026-06-13T09:45:00Z', updatedAt: '2026-06-14T16:00:00Z',
  },
  {
    id: '6', orderNumber: 'ORD-1239',
    customer: { id: '6', name: 'Diana Miller', email: 'diana@example.com', phone: '+1 555-0106' },
    items: [
      { id: '9', productId: '8', productName: 'Yoga Mat Premium', productImage: '/placeholder.svg', sku: 'YMP-008', price: 49.99, quantity: 1, total: 49.99 },
    ],
    subtotal: 49.99, shipping: 5.99, tax: 4.25, total: 60.23,
    status: 'paid', paymentStatus: 'paid',
    shippingAddress: { street: '987 Cedar Ln', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
    billingAddress: { street: '987 Cedar Ln', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
    timeline: [
      { id: '1', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-19T12:00:00Z' },
      { id: '2', status: 'Placed', description: 'Order placed', timestamp: '2026-06-19T11:50:00Z' },
    ],
    createdAt: '2026-06-19T11:50:00Z', updatedAt: '2026-06-19T12:00:00Z',
  },
  {
    id: '7', orderNumber: 'ORD-1240',
    customer: { id: '7', name: 'Edward Taylor', email: 'edward@example.com', phone: '+1 555-0107' },
    items: [
      { id: '10', productId: '25', productName: 'Mechanical Keyboard TKL', productImage: '/placeholder.svg', sku: 'MKT-025', price: 119.99, quantity: 1, total: 119.99 },
      { id: '11', productId: '20', productName: 'USB-C Hub 7-in-1', productImage: '/placeholder.svg', sku: 'UCH-020', price: 49.99, quantity: 1, total: 49.99 },
    ],
    subtotal: 169.98, shipping: 0, tax: 14.45, total: 184.43,
    status: 'delivered', paymentStatus: 'paid',
    shippingAddress: { street: '222 River St', city: 'Denver', state: 'CO', zip: '80201', country: 'US' },
    billingAddress: { street: '222 River St', city: 'Denver', state: 'CO', zip: '80201', country: 'US' },
    timeline: [
      { id: '1', status: 'Delivered', description: 'Package delivered', timestamp: '2026-06-16T13:00:00Z' },
      { id: '2', status: 'Shipped', description: 'Package shipped via UPS', timestamp: '2026-06-14T09:00:00Z' },
      { id: '3', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-13T10:30:00Z' },
      { id: '4', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-12T18:00:00Z' },
      { id: '5', status: 'Placed', description: 'Order placed', timestamp: '2026-06-12T17:45:00Z' },
    ],
    createdAt: '2026-06-12T17:45:00Z', updatedAt: '2026-06-16T13:00:00Z',
  },
  {
    id: '8', orderNumber: 'ORD-1241',
    customer: { id: '8', name: 'Fiona Garcia', email: 'fiona@example.com', phone: '+1 555-0108' },
    items: [
      { id: '12', productId: '17', productName: 'Trail Hiking Boots', productImage: '/placeholder.svg', sku: 'THB-017', price: 149.99, quantity: 1, total: 149.99 },
    ],
    subtotal: 149.99, shipping: 9.99, tax: 12.75, total: 172.73,
    status: 'shipped', paymentStatus: 'paid',
    shippingAddress: { street: '333 Lake Ave', city: 'Miami', state: 'FL', zip: '33101', country: 'US' },
    billingAddress: { street: '333 Lake Ave', city: 'Miami', state: 'FL', zip: '33101', country: 'US' },
    timeline: [
      { id: '1', status: 'Shipped', description: 'Package shipped via FedEx', timestamp: '2026-06-18T14:00:00Z' },
      { id: '2', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-17T11:00:00Z' },
      { id: '3', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-16T20:30:00Z' },
      { id: '4', status: 'Placed', description: 'Order placed', timestamp: '2026-06-16T20:15:00Z' },
    ],
    createdAt: '2026-06-16T20:15:00Z', updatedAt: '2026-06-18T14:00:00Z',
  },
  {
    id: '9', orderNumber: 'ORD-1242',
    customer: { id: '9', name: 'George Harris', email: 'george@example.com', phone: '+1 555-0109' },
    items: [
      { id: '13', productId: '14', productName: 'Resistance Band Set', productImage: '/placeholder.svg', sku: 'RBS-014', price: 32.99, quantity: 2, total: 65.98 },
      { id: '14', productId: '21', productName: 'Foam Roller Pro', productImage: '/placeholder.svg', sku: 'FRP-021', price: 29.99, quantity: 1, total: 29.99 },
    ],
    subtotal: 95.97, shipping: 5.99, tax: 8.15, total: 110.11,
    status: 'processing', paymentStatus: 'paid',
    shippingAddress: { street: '444 Birch Ct', city: 'Portland', state: 'OR', zip: '97201', country: 'US' },
    billingAddress: { street: '444 Birch Ct', city: 'Portland', state: 'OR', zip: '97201', country: 'US' },
    timeline: [
      { id: '1', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-19T08:00:00Z' },
      { id: '2', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-18T22:00:00Z' },
      { id: '3', status: 'Placed', description: 'Order placed', timestamp: '2026-06-18T21:50:00Z' },
    ],
    createdAt: '2026-06-18T21:50:00Z', updatedAt: '2026-06-19T08:00:00Z',
  },
  {
    id: '10', orderNumber: 'ORD-1243',
    customer: { id: '11', name: 'Ivan Petrov', email: 'ivan@example.com', phone: '+1 555-0111' },
    items: [
      { id: '15', productId: '18', productName: 'Stainless Steel Cookware Set', productImage: '/placeholder.svg', sku: 'SSC-018', price: 189.99, quantity: 1, total: 189.99 },
      { id: '16', productId: '3', productName: 'Stainless Steel Water Bottle', productImage: '/placeholder.svg', sku: 'SSW-003', price: 24.99, quantity: 3, total: 74.97 },
    ],
    subtotal: 264.96, shipping: 0, tax: 22.52, total: 287.48,
    status: 'delivered', paymentStatus: 'paid',
    shippingAddress: { street: '666 Spruce Ave', city: 'Boston', state: 'MA', zip: '02101', country: 'US' },
    billingAddress: { street: '666 Spruce Ave', city: 'Boston', state: 'MA', zip: '02101', country: 'US' },
    timeline: [
      { id: '1', status: 'Delivered', description: 'Package delivered', timestamp: '2026-06-10T15:00:00Z' },
      { id: '2', status: 'Shipped', description: 'Package shipped via USPS', timestamp: '2026-06-08T09:00:00Z' },
      { id: '3', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-07T10:00:00Z' },
      { id: '4', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-06T14:00:00Z' },
      { id: '5', status: 'Placed', description: 'Order placed', timestamp: '2026-06-06T13:50:00Z' },
    ],
    createdAt: '2026-06-06T13:50:00Z', updatedAt: '2026-06-10T15:00:00Z',
  },
  {
    id: '11', orderNumber: 'ORD-1244',
    customer: { id: '12', name: 'Julia Chen', email: 'julia@example.com', phone: '+1 555-0112' },
    items: [
      { id: '17', productId: '24', productName: 'Polarized Sunglasses', productImage: '/placeholder.svg', sku: 'PSG-024', price: 74.99, quantity: 1, total: 74.99 },
    ],
    subtotal: 74.99, shipping: 5.99, tax: 6.38, total: 87.36,
    status: 'pending', paymentStatus: 'pending',
    shippingAddress: { street: '777 Magnolia Blvd', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' },
    billingAddress: { street: '777 Magnolia Blvd', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' },
    timeline: [
      { id: '1', status: 'Placed', description: 'Order placed', timestamp: '2026-06-19T13:00:00Z' },
    ],
    createdAt: '2026-06-19T13:00:00Z', updatedAt: '2026-06-19T13:00:00Z',
  },
  {
    id: '12', orderNumber: 'ORD-1245',
    customer: { id: '13', name: 'Kevin Moore', email: 'kevin@example.com', phone: '+1 555-0113' },
    items: [
      { id: '18', productId: '13', productName: 'Men\'s Slim Fit Chinos', productImage: '/placeholder.svg', sku: 'MSC-013', price: 54.99, quantity: 2, total: 109.98 },
      { id: '19', productId: '15', productName: 'Leather Wallet Slim', productImage: '/placeholder.svg', sku: 'LWS-015', price: 44.99, quantity: 1, total: 44.99 },
    ],
    subtotal: 154.97, shipping: 0, tax: 13.17, total: 168.14,
    status: 'delivered', paymentStatus: 'paid',
    shippingAddress: { street: '888 Ash St', city: 'Austin', state: 'TX', zip: '78701', country: 'US' },
    billingAddress: { street: '888 Ash St', city: 'Austin', state: 'TX', zip: '78701', country: 'US' },
    timeline: [
      { id: '1', status: 'Delivered', description: 'Package delivered', timestamp: '2026-06-05T12:00:00Z' },
      { id: '2', status: 'Shipped', description: 'Package shipped via FedEx', timestamp: '2026-06-03T10:00:00Z' },
      { id: '3', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-02T09:30:00Z' },
      { id: '4', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-01T16:00:00Z' },
      { id: '5', status: 'Placed', description: 'Order placed', timestamp: '2026-06-01T15:55:00Z' },
    ],
    createdAt: '2026-06-01T15:55:00Z', updatedAt: '2026-06-05T12:00:00Z',
  },
  {
    id: '13', orderNumber: 'ORD-1246',
    customer: { id: '15', name: 'Michael Scott', email: 'michael@example.com', phone: '+1 555-0115' },
    items: [
      { id: '20', productId: '1', productName: 'Wireless Bluetooth Headphones', productImage: '/placeholder.svg', sku: 'WBH-001', price: 129.99, quantity: 2, total: 259.98 },
      { id: '21', productId: '5', productName: 'Smart Watch Series X', productImage: '/placeholder.svg', sku: 'SWX-005', price: 249.99, quantity: 1, total: 249.99 },
    ],
    subtotal: 509.97, shipping: 0, tax: 43.35, total: 553.32,
    status: 'shipped', paymentStatus: 'paid',
    shippingAddress: { street: '1725 Slough Ave', city: 'Scranton', state: 'PA', zip: '18501', country: 'US' },
    billingAddress: { street: '1725 Slough Ave', city: 'Scranton', state: 'PA', zip: '18501', country: 'US' },
    timeline: [
      { id: '1', status: 'Shipped', description: 'Package shipped via UPS', timestamp: '2026-06-18T08:00:00Z' },
      { id: '2', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-17T10:00:00Z' },
      { id: '3', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-16T14:00:00Z' },
      { id: '4', status: 'Placed', description: 'Order placed', timestamp: '2026-06-16T13:45:00Z' },
    ],
    createdAt: '2026-06-16T13:45:00Z', updatedAt: '2026-06-18T08:00:00Z',
  },
  {
    id: '14', orderNumber: 'ORD-1247',
    customer: { id: '16', name: 'Nina Patel', email: 'nina@example.com', phone: '+1 555-0116' },
    items: [
      { id: '22', productId: '7', productName: 'Aromatherapy Candle Set', productImage: '/placeholder.svg', sku: 'ACS-007', price: 42.99, quantity: 2, total: 85.98 },
    ],
    subtotal: 85.98, shipping: 5.99, tax: 7.31, total: 99.28,
    status: 'refunded', paymentStatus: 'refunded',
    shippingAddress: { street: '202 Lotus Dr', city: 'Atlanta', state: 'GA', zip: '30301', country: 'US' },
    billingAddress: { street: '202 Lotus Dr', city: 'Atlanta', state: 'GA', zip: '30301', country: 'US' },
    timeline: [
      { id: '1', status: 'Refunded', description: 'Full refund issued', timestamp: '2026-06-09T14:00:00Z' },
      { id: '2', status: 'Delivered', description: 'Package delivered', timestamp: '2026-06-07T11:00:00Z' },
      { id: '3', status: 'Shipped', description: 'Package shipped via USPS', timestamp: '2026-06-05T09:00:00Z' },
      { id: '4', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-04T10:00:00Z' },
      { id: '5', status: 'Placed', description: 'Order placed', timestamp: '2026-06-03T18:00:00Z' },
    ],
    createdAt: '2026-06-03T18:00:00Z', updatedAt: '2026-06-09T14:00:00Z',
  },
  {
    id: '15', orderNumber: 'ORD-1248',
    customer: { id: '17', name: 'Oliver Kim', email: 'oliver@example.com', phone: '+1 555-0117' },
    items: [
      { id: '23', productId: '23', productName: 'Canvas Sneakers Classic', productImage: '/placeholder.svg', sku: 'CSC-023', price: 59.99, quantity: 1, total: 59.99 },
    ],
    subtotal: 59.99, shipping: 7.99, tax: 5.10, total: 73.08,
    status: 'delivered', paymentStatus: 'paid',
    shippingAddress: { street: '303 Cherry Ln', city: 'Minneapolis', state: 'MN', zip: '55401', country: 'US' },
    billingAddress: { street: '303 Cherry Ln', city: 'Minneapolis', state: 'MN', zip: '55401', country: 'US' },
    timeline: [
      { id: '1', status: 'Delivered', description: 'Package delivered', timestamp: '2026-06-13T16:00:00Z' },
      { id: '2', status: 'Shipped', description: 'Package shipped via FedEx', timestamp: '2026-06-11T10:00:00Z' },
      { id: '3', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-10T09:00:00Z' },
      { id: '4', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-09T20:00:00Z' },
      { id: '5', status: 'Placed', description: 'Order placed', timestamp: '2026-06-09T19:50:00Z' },
    ],
    createdAt: '2026-06-09T19:50:00Z', updatedAt: '2026-06-13T16:00:00Z',
  },
  {
    id: '16', orderNumber: 'ORD-1249',
    customer: { id: '19', name: 'Quincy Adams', email: 'quincy@example.com', phone: '+1 555-0119' },
    items: [
      { id: '24', productId: '9', productName: 'Ceramic Coffee Mug Set', productImage: '/placeholder.svg', sku: 'CCM-009', price: 38.99, quantity: 2, total: 77.98 },
      { id: '25', productId: '11', productName: 'Bamboo Cutting Board', productImage: '/placeholder.svg', sku: 'BCB-011', price: 28.99, quantity: 1, total: 28.99 },
    ],
    subtotal: 106.97, shipping: 5.99, tax: 9.09, total: 122.05,
    status: 'cancelled', paymentStatus: 'refunded',
    shippingAddress: { street: '505 Willow Creek Rd', city: 'Charlotte', state: 'NC', zip: '28201', country: 'US' },
    billingAddress: { street: '505 Willow Creek Rd', city: 'Charlotte', state: 'NC', zip: '28201', country: 'US' },
    timeline: [
      { id: '1', status: 'Cancelled', description: 'Order cancelled by customer', timestamp: '2026-06-08T10:00:00Z' },
      { id: '2', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-07T15:00:00Z' },
      { id: '3', status: 'Placed', description: 'Order placed', timestamp: '2026-06-07T14:45:00Z' },
    ],
    createdAt: '2026-06-07T14:45:00Z', updatedAt: '2026-06-08T10:00:00Z',
  },
  {
    id: '17', orderNumber: 'ORD-1250',
    customer: { id: '20', name: 'Rachel Green', email: 'rachel@example.com', phone: '+1 555-0120' },
    items: [
      { id: '26', productId: '19', productName: 'Women\'s Sports Leggings', productImage: '/placeholder.svg', sku: 'WSL-019', price: 39.99, quantity: 3, total: 119.97 },
      { id: '27', productId: '15', productName: 'Leather Wallet Slim', productImage: '/placeholder.svg', sku: 'LWS-015', price: 44.99, quantity: 1, total: 44.99 },
    ],
    subtotal: 164.96, shipping: 0, tax: 14.02, total: 178.98,
    status: 'delivered', paymentStatus: 'paid',
    shippingAddress: { street: '90 Bedford St', city: 'New York', state: 'NY', zip: '10014', country: 'US' },
    billingAddress: { street: '90 Bedford St', city: 'New York', state: 'NY', zip: '10014', country: 'US' },
    timeline: [
      { id: '1', status: 'Delivered', description: 'Package delivered', timestamp: '2026-06-03T14:00:00Z' },
      { id: '2', status: 'Shipped', description: 'Package shipped via UPS', timestamp: '2026-06-01T09:00:00Z' },
      { id: '3', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-05-31T10:00:00Z' },
      { id: '4', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-05-30T17:00:00Z' },
      { id: '5', status: 'Placed', description: 'Order placed', timestamp: '2026-05-30T16:50:00Z' },
    ],
    createdAt: '2026-05-30T16:50:00Z', updatedAt: '2026-06-03T14:00:00Z',
  },
  {
    id: '18', orderNumber: 'ORD-1251',
    customer: { id: '22', name: 'Tina Nguyen', email: 'tina@example.com', phone: '+1 555-0122' },
    items: [
      { id: '28', productId: '3', productName: 'Stainless Steel Water Bottle', productImage: '/placeholder.svg', sku: 'SSW-003', price: 24.99, quantity: 4, total: 99.96 },
    ],
    subtotal: 99.96, shipping: 0, tax: 8.50, total: 108.46,
    status: 'processing', paymentStatus: 'paid',
    shippingAddress: { street: '707 Orchid St', city: 'Sacramento', state: 'CA', zip: '95814', country: 'US' },
    billingAddress: { street: '707 Orchid St', city: 'Sacramento', state: 'CA', zip: '95814', country: 'US' },
    timeline: [
      { id: '1', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-19T07:00:00Z' },
      { id: '2', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-18T23:00:00Z' },
      { id: '3', status: 'Placed', description: 'Order placed', timestamp: '2026-06-18T22:45:00Z' },
    ],
    createdAt: '2026-06-18T22:45:00Z', updatedAt: '2026-06-19T07:00:00Z',
  },
  {
    id: '19', orderNumber: 'ORD-1252',
    customer: { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 555-0101' },
    items: [
      { id: '29', productId: '10', productName: 'Wireless Charging Pad', productImage: '/placeholder.svg', sku: 'WCP-010', price: 19.99, quantity: 5, total: 99.95 },
    ],
    subtotal: 99.95, shipping: 0, tax: 8.50, total: 108.45,
    status: 'shipped', paymentStatus: 'paid',
    shippingAddress: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
    billingAddress: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
    timeline: [
      { id: '1', status: 'Shipped', description: 'Package shipped via USPS', timestamp: '2026-06-19T10:00:00Z' },
      { id: '2', status: 'Processing', description: 'Order is being prepared', timestamp: '2026-06-18T11:00:00Z' },
      { id: '3', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-17T14:00:00Z' },
      { id: '4', status: 'Placed', description: 'Order placed', timestamp: '2026-06-17T13:50:00Z' },
    ],
    createdAt: '2026-06-17T13:50:00Z', updatedAt: '2026-06-19T10:00:00Z',
  },
  {
    id: '20', orderNumber: 'ORD-1253',
    customer: { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-0102' },
    items: [
      { id: '30', productId: '19', productName: 'Women\'s Sports Leggings', productImage: '/placeholder.svg', sku: 'WSL-019', price: 39.99, quantity: 2, total: 79.98 },
      { id: '31', productId: '8', productName: 'Yoga Mat Premium', productImage: '/placeholder.svg', sku: 'YMP-008', price: 49.99, quantity: 1, total: 49.99 },
    ],
    subtotal: 129.97, shipping: 5.99, tax: 11.05, total: 147.01,
    status: 'paid', paymentStatus: 'paid',
    shippingAddress: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
    billingAddress: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
    timeline: [
      { id: '1', status: 'Paid', description: 'Payment confirmed', timestamp: '2026-06-19T09:00:00Z' },
      { id: '2', status: 'Placed', description: 'Order placed', timestamp: '2026-06-19T08:50:00Z' },
    ],
    createdAt: '2026-06-19T08:50:00Z', updatedAt: '2026-06-19T09:00:00Z',
  },
  {
    id: '21', orderNumber: 'ORD-1254',
    customer: { id: '21', name: 'Samuel Torres', email: 'samuel@example.com', phone: '+1 555-0121' },
    items: [
      { id: '32', productId: '4', productName: 'Running Shoes Pro', productImage: '/placeholder.svg', sku: 'RSP-004', price: 89.99, quantity: 1, total: 89.99 },
      { id: '33', productId: '14', productName: 'Resistance Band Set', productImage: '/placeholder.svg', sku: 'RBS-014', price: 32.99, quantity: 1, total: 32.99 },
    ],
    subtotal: 122.98, shipping: 7.99, tax: 10.45, total: 141.42,
    status: 'pending', paymentStatus: 'pending',
    shippingAddress: { street: '606 Palm Ave', city: 'Tampa', state: 'FL', zip: '33601', country: 'US' },
    billingAddress: { street: '606 Palm Ave', city: 'Tampa', state: 'FL', zip: '33601', country: 'US' },
    timeline: [
      { id: '1', status: 'Placed', description: 'Order placed', timestamp: '2026-06-19T14:00:00Z' },
    ],
    createdAt: '2026-06-19T14:00:00Z', updatedAt: '2026-06-19T14:00:00Z',
  },
]

export async function getOrders(): Promise<Order[]> {
  return mockApiCall(mockOrders)
}

export async function getOrder(id: string): Promise<Order | undefined> {
  return mockApiCall(mockOrders.find((o) => o.id === id))
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const order = mockOrders.find((o) => o.id === id)
  if (!order) throw new Error('Order not found')
  return mockApiCall({ ...order, status, updatedAt: new Date().toISOString() })
}
