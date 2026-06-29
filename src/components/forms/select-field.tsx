
import { useFormContext, Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

interface SelectOption {
  label: string
  value: string
}

interface SelectFieldProps {
  name: string
  label: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
}

export function SelectField({ name, label, options, placeholder = 'Select...', disabled, required }: SelectFieldProps) {
  const { control, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedLabel = options.find((opt) => opt.value === field.value)?.label

          return (
          <Select
            value={field.value}
            onValueChange={(val) => field.onChange(val ?? '')}
            disabled={disabled}
          >
            <SelectTrigger id={name}>
              <span className="flex flex-1 text-left">
                {selectedLabel ?? placeholder}
              </span>
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          )
        }}
      />
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
