import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthCard } from '@/features/auth/components/auth-card'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/features/auth/schemas'
import { forgotPasswordService } from '@/services/auth.service'
import { Loader2, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const methods = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await forgotPasswordService(data.email)
    setSent(true)
  }

  if (sent) {
    return (
      <AuthCard title="Check your email" description="We sent a password reset link to your email">
        <div className="flex flex-col items-center py-4">
          <CheckCircle className="h-12 w-12 text-success" />
          <p className="mt-4 text-sm text-muted-foreground text-center">
            If an account exists with that email, you will receive a password reset link.
          </p>
          <Link to="/login"><Button variant="outline" className="mt-6">Back to sign in</Button></Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Forgot password?"
      description="Enter your email and we'll send you a reset link"
      footer={<Link to="/login" className="text-primary hover:underline">Back to sign in</Link>}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@store.com" {...methods.register('email')} />
            {methods.formState.errors.email && <p className="text-sm text-danger">{methods.formState.errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send reset link
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  )
}
