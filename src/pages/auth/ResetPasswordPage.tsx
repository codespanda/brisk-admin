import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AuthCard } from '@/features/auth/components/auth-card'
import { PasswordInput } from '@/features/auth/components/password-input'
import { resetPasswordSchema, type ResetPasswordFormData } from '@/features/auth/schemas'
import { resetPasswordService } from '@/services/auth.service'
import { Loader2, CheckCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const [success, setSuccess] = useState(false)
  const methods = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetPasswordService('mock-token', data.password)
    setSuccess(true)
  }

  if (success) {
    return (
      <AuthCard title="Password reset" description="Your password has been successfully reset">
        <div className="flex flex-col items-center py-4">
          <CheckCircle className="h-12 w-12 text-success" />
          <Link to="/login"><Button className="mt-6">Sign in with new password</Button></Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Reset password" description="Enter your new password">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <PasswordInput name="password" label="New Password" />
          <PasswordInput name="confirmPassword" label="Confirm Password" />
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset password
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  )
}
