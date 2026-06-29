
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterSelectProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: { label: string; value: string }[]
}

export function FilterSelect({ label, value, onValueChange, options }: FilterSelectProps) {
  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? label

  return (
    <Select value={value} onValueChange={(val) => onValueChange(val ?? '')}>
      <SelectTrigger size="sm">
        <span className="flex flex-1 text-left">{selectedLabel}</span>
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
}
