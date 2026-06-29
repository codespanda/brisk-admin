import { mockApiCall } from './api-client'
import type { Product, ProductFormData } from '@/types'

const mockProducts: Product[] = [
  {
    id: '1', name: 'Wireless Bluetooth Headphones', slug: 'wireless-bluetooth-headphones',
    sku: 'WBH-001', description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    category: 'Electronics', brand: 'AudioTech', price: 129.99, comparePrice: 159.99,
    costPrice: 65.00, stock: 145, images: ['/placeholder.svg'], tags: ['wireless', 'bluetooth', 'audio'],
    status: 'active', createdAt: '2026-01-15T10:00:00Z', updatedAt: '2026-06-10T14:30:00Z',
  },
  {
    id: '2', name: 'Organic Cotton T-Shirt', slug: 'organic-cotton-t-shirt',
    sku: 'OCT-002', description: 'Soft organic cotton t-shirt available in multiple colors.',
    category: 'Clothing', brand: 'EcoWear', price: 34.99, comparePrice: null,
    costPrice: 12.00, stock: 523, images: ['/placeholder.svg'], tags: ['organic', 'cotton', 'sustainable'],
    status: 'active', createdAt: '2026-02-20T09:00:00Z', updatedAt: '2026-06-12T11:00:00Z',
  },
  {
    id: '3', name: 'Stainless Steel Water Bottle', slug: 'stainless-steel-water-bottle',
    sku: 'SSW-003', description: 'Double-walled insulated water bottle that keeps drinks cold for 24 hours.',
    category: 'Home & Kitchen', brand: 'HydroLife', price: 24.99, comparePrice: 29.99,
    costPrice: 8.50, stock: 312, images: ['/placeholder.svg'], tags: ['eco-friendly', 'insulated'],
    status: 'active', createdAt: '2026-03-05T08:00:00Z', updatedAt: '2026-06-08T16:45:00Z',
  },
  {
    id: '4', name: 'Running Shoes Pro', slug: 'running-shoes-pro',
    sku: 'RSP-004', description: 'Lightweight running shoes with advanced cushioning technology.',
    category: 'Footwear', brand: 'SpeedStep', price: 89.99, comparePrice: 119.99,
    costPrice: 35.00, stock: 87, images: ['/placeholder.svg'], tags: ['running', 'sports', 'comfort'],
    status: 'active', createdAt: '2026-01-28T07:30:00Z', updatedAt: '2026-06-15T09:20:00Z',
  },
  {
    id: '5', name: 'Smart Watch Series X', slug: 'smart-watch-series-x',
    sku: 'SWX-005', description: 'Advanced smartwatch with health monitoring and GPS.',
    category: 'Electronics', brand: 'TechPulse', price: 249.99, comparePrice: 299.99,
    costPrice: 120.00, stock: 5, images: ['/placeholder.svg'], tags: ['smartwatch', 'fitness', 'gps'],
    status: 'active', createdAt: '2026-04-10T12:00:00Z', updatedAt: '2026-06-18T08:00:00Z',
  },
  {
    id: '6', name: 'Leather Laptop Bag', slug: 'leather-laptop-bag',
    sku: 'LLB-006', description: 'Genuine leather laptop bag fits up to 15-inch laptops.',
    category: 'Accessories', brand: 'UrbanCarry', price: 79.99, comparePrice: null,
    costPrice: 32.00, stock: 0, images: ['/placeholder.svg'], tags: ['leather', 'laptop', 'business'],
    status: 'archived', createdAt: '2026-02-14T15:00:00Z', updatedAt: '2026-05-20T10:30:00Z',
  },
  {
    id: '7', name: 'Aromatherapy Candle Set', slug: 'aromatherapy-candle-set',
    sku: 'ACS-007', description: 'Set of 3 natural soy candles with essential oils.',
    category: 'Home & Kitchen', brand: 'ZenGlow', price: 42.99, comparePrice: 54.99,
    costPrice: 15.00, stock: 198, images: ['/placeholder.svg'], tags: ['candles', 'aromatherapy', 'gift'],
    status: 'active', createdAt: '2026-03-22T11:00:00Z', updatedAt: '2026-06-14T13:15:00Z',
  },
  {
    id: '8', name: 'Yoga Mat Premium', slug: 'yoga-mat-premium',
    sku: 'YMP-008', description: 'Extra thick non-slip yoga mat with carrying strap.',
    category: 'Sports', brand: 'FlexForm', price: 49.99, comparePrice: null,
    costPrice: 18.00, stock: 234, images: ['/placeholder.svg'], tags: ['yoga', 'fitness', 'exercise'],
    status: 'draft', createdAt: '2026-05-01T09:00:00Z', updatedAt: '2026-06-01T17:00:00Z',
  },
  {
    id: '9', name: 'Ceramic Coffee Mug Set', slug: 'ceramic-coffee-mug-set',
    sku: 'CCM-009', description: 'Set of 4 handcrafted ceramic coffee mugs.',
    category: 'Home & Kitchen', brand: 'ArtBrew', price: 38.99, comparePrice: 44.99,
    costPrice: 14.00, stock: 67, images: ['/placeholder.svg'], tags: ['ceramic', 'coffee', 'handmade'],
    status: 'active', createdAt: '2026-04-18T10:00:00Z', updatedAt: '2026-06-16T12:00:00Z',
  },
  {
    id: '10', name: 'Wireless Charging Pad', slug: 'wireless-charging-pad',
    sku: 'WCP-010', description: 'Fast wireless charging pad compatible with all Qi devices.',
    category: 'Electronics', brand: 'ChargeTech', price: 19.99, comparePrice: 24.99,
    costPrice: 7.00, stock: 412, images: ['/placeholder.svg'], tags: ['charging', 'wireless', 'tech'],
    status: 'active', createdAt: '2026-05-12T14:00:00Z', updatedAt: '2026-06-17T11:30:00Z',
  },
  {
    id: '11', name: 'Bamboo Cutting Board', slug: 'bamboo-cutting-board',
    sku: 'BCB-011', description: 'Eco-friendly bamboo cutting board with juice groove.',
    category: 'Home & Kitchen', brand: 'GreenChef', price: 28.99, comparePrice: 34.99,
    costPrice: 10.00, stock: 8, images: ['/placeholder.svg'], tags: ['bamboo', 'kitchen', 'eco'],
    status: 'active', createdAt: '2026-01-20T10:00:00Z', updatedAt: '2026-06-19T07:00:00Z',
  },
  {
    id: '12', name: 'Portable Bluetooth Speaker', slug: 'portable-bluetooth-speaker',
    sku: 'PBS-012', description: 'Waterproof portable speaker with 360-degree sound.',
    category: 'Electronics', brand: 'SoundWave', price: 69.99, comparePrice: 89.99,
    costPrice: 28.00, stock: 3, images: ['/placeholder.svg'], tags: ['bluetooth', 'speaker', 'waterproof'],
    status: 'active', createdAt: '2026-02-05T11:00:00Z', updatedAt: '2026-06-18T16:00:00Z',
  },
  {
    id: '13', name: 'Men\'s Slim Fit Chinos', slug: 'mens-slim-fit-chinos',
    sku: 'MSC-013', description: 'Classic slim fit chinos in stretch fabric for all-day comfort.',
    category: 'Clothing', brand: 'UrbanFit', price: 54.99, comparePrice: 69.99,
    costPrice: 22.00, stock: 175, images: ['/placeholder.svg'], tags: ['chinos', 'men', 'casual'],
    status: 'active', createdAt: '2026-03-10T09:00:00Z', updatedAt: '2026-06-15T10:00:00Z',
  },
  {
    id: '14', name: 'Resistance Band Set', slug: 'resistance-band-set',
    sku: 'RBS-014', description: 'Set of 5 resistance bands with different tension levels.',
    category: 'Sports', brand: 'FlexForm', price: 32.99, comparePrice: null,
    costPrice: 11.00, stock: 290, images: ['/placeholder.svg'], tags: ['fitness', 'resistance', 'workout'],
    status: 'active', createdAt: '2026-04-01T08:00:00Z', updatedAt: '2026-06-14T12:00:00Z',
  },
  {
    id: '15', name: 'Leather Wallet Slim', slug: 'leather-wallet-slim',
    sku: 'LWS-015', description: 'Minimalist genuine leather wallet with RFID blocking.',
    category: 'Accessories', brand: 'SlimCarry', price: 44.99, comparePrice: 54.99,
    costPrice: 16.00, stock: 132, images: ['/placeholder.svg'], tags: ['wallet', 'leather', 'rfid'],
    status: 'active', createdAt: '2026-01-25T12:00:00Z', updatedAt: '2026-06-13T09:30:00Z',
  },
  {
    id: '16', name: 'Air Purifier Compact', slug: 'air-purifier-compact',
    sku: 'APC-016', description: 'HEPA air purifier for rooms up to 300 sq ft.',
    category: 'Home & Kitchen', brand: 'PureAir', price: 89.99, comparePrice: 109.99,
    costPrice: 38.00, stock: 0, images: ['/placeholder.svg'], tags: ['air-purifier', 'hepa', 'home'],
    status: 'archived', createdAt: '2026-02-18T14:00:00Z', updatedAt: '2026-05-30T10:00:00Z',
  },
  {
    id: '17', name: 'Trail Hiking Boots', slug: 'trail-hiking-boots',
    sku: 'THB-017', description: 'Waterproof hiking boots with ankle support and durable outsole.',
    category: 'Footwear', brand: 'TrailMaster', price: 149.99, comparePrice: 179.99,
    costPrice: 62.00, stock: 54, images: ['/placeholder.svg'], tags: ['hiking', 'boots', 'waterproof'],
    status: 'active', createdAt: '2026-03-15T07:30:00Z', updatedAt: '2026-06-17T08:00:00Z',
  },
  {
    id: '18', name: 'Stainless Steel Cookware Set', slug: 'stainless-steel-cookware-set',
    sku: 'SSC-018', description: '10-piece stainless steel cookware set with glass lids.',
    category: 'Home & Kitchen', brand: 'ChefPro', price: 189.99, comparePrice: 229.99,
    costPrice: 82.00, stock: 41, images: ['/placeholder.svg'], tags: ['cookware', 'stainless', 'kitchen'],
    status: 'active', createdAt: '2026-04-22T10:00:00Z', updatedAt: '2026-06-12T11:00:00Z',
  },
  {
    id: '19', name: 'Women\'s Sports Leggings', slug: 'womens-sports-leggings',
    sku: 'WSL-019', description: 'High-waist compression leggings with four-way stretch fabric.',
    category: 'Clothing', brand: 'ActiveWear', price: 39.99, comparePrice: 49.99,
    costPrice: 14.00, stock: 348, images: ['/placeholder.svg'], tags: ['leggings', 'women', 'activewear'],
    status: 'active', createdAt: '2026-05-05T09:00:00Z', updatedAt: '2026-06-18T14:00:00Z',
  },
  {
    id: '20', name: 'USB-C Hub 7-in-1', slug: 'usb-c-hub-7-in-1',
    sku: 'UCH-020', description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader.',
    category: 'Electronics', brand: 'ChargeTech', price: 49.99, comparePrice: 59.99,
    costPrice: 19.00, stock: 210, images: ['/placeholder.svg'], tags: ['usb-c', 'hub', 'laptop'],
    status: 'active', createdAt: '2026-04-30T13:00:00Z', updatedAt: '2026-06-16T15:00:00Z',
  },
  {
    id: '21', name: 'Foam Roller Pro', slug: 'foam-roller-pro',
    sku: 'FRP-021', description: 'High-density foam roller for muscle recovery and massage.',
    category: 'Sports', brand: 'FlexForm', price: 29.99, comparePrice: null,
    costPrice: 10.00, stock: 167, images: ['/placeholder.svg'], tags: ['foam-roller', 'recovery', 'fitness'],
    status: 'active', createdAt: '2026-05-18T08:00:00Z', updatedAt: '2026-06-11T10:00:00Z',
  },
  {
    id: '22', name: 'Scented Linen Spray', slug: 'scented-linen-spray',
    sku: 'SLS-022', description: 'Natural lavender linen spray for bedding and soft furnishings.',
    category: 'Home & Kitchen', brand: 'ZenGlow', price: 16.99, comparePrice: 19.99,
    costPrice: 5.50, stock: 88, images: ['/placeholder.svg'], tags: ['lavender', 'linen', 'home'],
    status: 'draft', createdAt: '2026-06-01T11:00:00Z', updatedAt: '2026-06-10T09:00:00Z',
  },
  {
    id: '23', name: 'Canvas Sneakers Classic', slug: 'canvas-sneakers-classic',
    sku: 'CSC-023', description: 'Timeless canvas sneakers with rubber sole, available in 6 colors.',
    category: 'Footwear', brand: 'StepStyle', price: 59.99, comparePrice: 74.99,
    costPrice: 24.00, stock: 220, images: ['/placeholder.svg'], tags: ['sneakers', 'canvas', 'casual'],
    status: 'active', createdAt: '2026-02-28T10:00:00Z', updatedAt: '2026-06-19T08:30:00Z',
  },
  {
    id: '24', name: 'Polarized Sunglasses', slug: 'polarized-sunglasses',
    sku: 'PSG-024', description: 'UV400 polarized sunglasses with lightweight titanium frame.',
    category: 'Accessories', brand: 'ClearVision', price: 74.99, comparePrice: 99.99,
    costPrice: 28.00, stock: 63, images: ['/placeholder.svg'], tags: ['sunglasses', 'polarized', 'uv'],
    status: 'active', createdAt: '2026-03-08T09:00:00Z', updatedAt: '2026-06-18T13:00:00Z',
  },
  {
    id: '25', name: 'Mechanical Keyboard TKL', slug: 'mechanical-keyboard-tkl',
    sku: 'MKT-025', description: 'Tenkeyless mechanical keyboard with Cherry MX switches and RGB.',
    category: 'Electronics', brand: 'TypeMaster', price: 119.99, comparePrice: 149.99,
    costPrice: 50.00, stock: 77, images: ['/placeholder.svg'], tags: ['keyboard', 'mechanical', 'gaming'],
    status: 'active', createdAt: '2026-05-25T10:00:00Z', updatedAt: '2026-06-19T10:00:00Z',
  },
]

export async function getProducts(): Promise<Product[]> {
  return mockApiCall(mockProducts)
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return mockApiCall(mockProducts.find((p) => p.id === id))
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  const product: Product = {
    ...data,
    id: Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return mockApiCall(product)
}

export async function updateProduct(id: string, data: Partial<ProductFormData>): Promise<Product> {
  const existing = mockProducts.find((p) => p.id === id)
  if (!existing) throw new Error('Product not found')
  const updated = { ...existing, ...data, updatedAt: new Date().toISOString() }
  return mockApiCall(updated)
}

export async function deleteProduct(id: string): Promise<void> {
  return mockApiCall(undefined)
}
