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
import { loginSchema, type LoginFormData } from '@/features/auth/schemas'
import { loginService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth-store'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    try {
      const user = await loginService(data.email, data.password)
      login(user)
      navigate('/')
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your account"
      footer={
        <span>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">Sign up</Link>
        </span>
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {error && <div className="rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@store.com" {...methods.register('email')} />
            {methods.formState.errors.email && <p className="text-sm text-danger">{methods.formState.errors.email.message}</p>}
          </div>
          <PasswordInput name="password" label="Password" />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Controller
                name="rememberMe"
                control={methods.control}
                render={({ field }) => (
                  <Checkbox id="rememberMe" checked={field.value ?? false} onCheckedChange={field.onChange} />
                )}
              />
              <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
            </div>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
          </div>
          <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
            {methods.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
          <SocialLoginButtons />
        </form>
      </FormProvider>
    </AuthCard>
  )
}
