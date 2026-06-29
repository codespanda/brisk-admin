import { useState } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthCard } from '@/features/auth/components/auth-card'
import { PasswordInput } from '@/features/auth/components/password-input'
import { SocialLoginButtons } from '@/features/auth/components/social-login-buttons'
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas'
import { registerService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth-store'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', acceptTerms: false },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setError('')
    try {
      const user = await registerService(data.name, data.email, data.password)
      login(user)
      navigate('/')
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <AuthCard
      title="Create an account"
      description="Get started with your admin panel"
      footer={
        <span>
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </span>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {error && <div className="rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...methods.register('name')} />
            {methods.formState.errors.name && <p className="text-sm text-danger">{methods.formState.errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" {...methods.register('email')} />
            {methods.formState.errors.email && <p className="text-sm text-danger">{methods.formState.errors.email.message}</p>}
          </div>
          <PasswordInput name="password" label="Password" />
          <PasswordInput name="confirmPassword" label="Confirm Password" />
          <div className="flex items-center space-x-2">
            <Controller
              name="acceptTerms"
              control={methods.control}
              render={({ field }) => (
                <Checkbox id="acceptTerms" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label htmlFor="acceptTerms" className="text-sm font-normal">
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>
          {methods.formState.errors.acceptTerms && <p className="text-sm text-danger">{methods.formState.errors.acceptTerms.message}</p>}
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
          <SocialLoginButtons />
        </form>
      </FormProvider>
    </AuthCard>
  )
}
