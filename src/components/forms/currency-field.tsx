
import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CurrencyFieldProps {
  name: string
  label: string
  placeholder?: string
  currency?: string
  disabled?: boolean
  required?: boolean
}

export function CurrencyField({ name, label, placeholder = '0.00', currency = '$', disabled, required }: CurrencyFieldProps) {
  const { control, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          {currency}
        </span>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              id={name}
              type="number"
              step="0.01"
              min="0"
              placeholder={placeholder}
              disabled={disabled}
              className="pl-7"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
            />
          )}
        />
      </div>
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
