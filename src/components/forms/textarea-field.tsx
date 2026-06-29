
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface TextAreaFieldProps {
  name: string
  label: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  required?: boolean
}

export function TextAreaField({ name, label, placeholder, rows = 4, disabled, required }: TextAreaFieldProps) {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </Label>
      <Textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...register(name)}
      />
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
