
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TextFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  disabled?: boolean
  required?: boolean
}

export function TextField({ name, label, placeholder, type = 'text', disabled, required }: TextFieldProps) {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
      />
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
