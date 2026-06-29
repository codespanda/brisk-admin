
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  name: string
  label: string
  placeholder?: string
}

export function PasswordInput({ name, label, placeholder = 'Enter password' }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          id={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
