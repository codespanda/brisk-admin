"use client"

import { useFormContext, Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface DateFieldProps {
  name: string
  label: string
  disabled?: boolean
  required?: boolean
}

function formatDisplayDate(date: Date | undefined): string {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function DateField({ name, label, disabled, required }: DateFieldProps) {
  const { control, formState: { errors } } = useFormContext()
  const error = errors[name]
  const [open, setOpen] = useState(false)

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
          const dateValue = field.value ? new Date(field.value) : undefined
          const isValidDate = dateValue && !isNaN(dateValue.getTime())

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                className={cn(
                  'flex h-9 w-full items-center rounded-lg border border-input bg-transparent px-3 text-sm transition-colors hover:bg-muted/50',
                  !isValidDate && 'text-muted-foreground',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                {isValidDate ? formatDisplayDate(dateValue) : 'Pick a date'}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={isValidDate ? dateValue : undefined}
                  onSelect={(date) => {
                    field.onChange(date ? date.toISOString() : '')
                    setOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          )
        }}
      />
      {error && (
        <p className="text-sm text-danger">{error.message as string}</p>
      )}
    </div>
  )
}
