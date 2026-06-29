"use client"

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthCard } from '@/features/auth/components/auth-card'
import { verifyEmailSchema, type VerifyEmailFormData } from '@/features/auth/schemas'
import { verifyEmailService } from '@/services/auth.service'
import { Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const methods = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: '' },
  })

  const onSubmit = async (data: VerifyEmailFormData) => {
    setError('')
    try {
      await verifyEmailService(data.code)
      setVerified(true)
    } catch {
      setError('Invalid verification code. Try 123456.')
    }
  }

  if (verified) {
    return (
      <AuthCard title="Email verified" description="Your email has been successfully verified">
        <div className="flex flex-col items-center py-4">
          <CheckCircle className="h-12 w-12 text-success" />
          <Link href="/">
            <Button className="mt-6">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Verify your email" description="Enter the 6-digit code sent to your email">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>
          )}
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              placeholder="123456"
              maxLength={6}
              className="text-center text-lg tracking-widest"
              {...methods.register('code')}
            />
            {methods.formState.errors.code && (
              <p className="text-sm text-danger">{methods.formState.errors.code.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive a code?{' '}
            <button type="button" className="text-primary hover:underline">Resend</button>
          </p>
        </form>
      </FormProvider>
    </AuthCard>
  )
}
