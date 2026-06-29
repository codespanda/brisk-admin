import { create } from 'zustand'
import type { Notification } from '@/types'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  add: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markRead: (id: string) => void
  markAllRead: () => void
  remove: (id: string) => void
  removeAll: () => void
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order',
    message: 'Order #ORD-1234 has been placed by John Doe',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    message: 'Wireless Headphones is running low on stock (5 remaining)',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of $299.00 received for Order #ORD-1230',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '4',
    title: 'New Customer',
    message: 'Alice Brown just created an account',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 5400000).toISOString(),
  },
  {
    id: '5',
    title: 'Order Shipped',
    message: 'Order #ORD-1235 has been shipped via FedEx',
    type: 'success',
    read: true,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '6',
    title: 'Refund Requested',
    message: 'Charlie Davis requested a refund for Order #ORD-1238',
    type: 'error',
    read: true,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: '7',
    title: 'Campaign Completed',
    message: 'Summer Sale 2026 campaign has ended with 890 conversions',
    type: 'success',
    read: true,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: '8',
    title: 'Out of Stock',
    message: 'Leather Laptop Bag is now out of stock',
    type: 'error',
    read: true,
    createdAt: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: '9',
    title: 'New Review',
    message: 'Smart Watch Series X received a 5-star review',
    type: 'info',
    read: true,
    createdAt: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: '10',
    title: 'Coupon Expiring',
    message: 'Coupon SPRING25 is expiring tomorrow',
    type: 'warning',
    read: true,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
]

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.read).length,
  add: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substring(2, 11),
        read: false,
        createdAt: new Date().toISOString(),
      }
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }
    }),
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  remove: (id) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id)
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.read
          ? state.unreadCount - 1
          : state.unreadCount,
      }
    }),
  removeAll: () => set({ notifications: [], unreadCount: 0 }),
}))
