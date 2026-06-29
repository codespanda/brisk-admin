import { mockApiCall, mockApiError } from './api-client'
import type { User } from '@/types'

export async function loginService(email: string, password: string): Promise<User> {
  if (email === 'admin@store.com' && password === 'password') {
    return mockApiCall({
      id: '1',
      name: 'Admin User',
      email: 'admin@store.com',
      avatar: null,
      role: 'admin' as const,
    }, 800)
  }
  return mockApiError('Invalid email or password', 401)
}

export async function registerService(name: string, email: string, password: string): Promise<User> {
  return mockApiCall({
    id: Math.random().toString(36).substring(2, 11),
    name,
    email,
    avatar: null,
    role: 'admin' as const,
  }, 800)
}

export async function forgotPasswordService(email: string): Promise<{ message: string }> {
  return mockApiCall({ message: 'Password reset link sent to your email.' }, 800)
}

export async function resetPasswordService(token: string, password: string): Promise<{ message: string }> {
  return mockApiCall({ message: 'Password has been reset successfully.' }, 800)
}

export async function verifyEmailService(code: string): Promise<{ message: string }> {
  if (code === '123456') {
    return mockApiCall({ message: 'Email verified successfully.' }, 800)
  }
  return mockApiError('Invalid verification code', 400)
}
