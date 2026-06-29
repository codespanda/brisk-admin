import { useForm, FormProvider } from 'react-hook-form'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  TextField, SelectField, TextAreaField, CurrencyField, DateField, SwitchField, ImageUploadField,
} from '@/components/forms'
import { toast } from 'sonner'
import { useState } from 'react'

const DEMO_SELECT_OPTIONS = [
  { label: 'Option One', value: 'one' },
  { label: 'Option Two', value: 'two' },
  { label: 'Option Three', value: 'three' },
]

const ROLE_OPTIONS = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Support', value: 'support' },
]

export default function FormsPage() {
  const [images, setImages] = useState<string[]>([])

  const methods = useForm({
    defaultValues: {
      textField: '',
      textFieldDisabled: 'Disabled value',
      emailField: '',
      passwordField: '',
      selectField: '',
      selectRequired: '',
      textAreaField: '',
      currencyField: null as number | null,
      currencyPercent: null as number | null,
      dateField: '',
      switchField: false,
      switchEnabled: true,
    },
  })

  const onSubmit = (data: Record<string, unknown>) => {
    toast.success('Form submitted successfully')
    console.log(data)
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Forms" description="Form fields, labels, inputs and validation patterns" />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader><CardTitle className="text-base">Text Fields</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <TextField name="textField" label="Default Text Field" placeholder="Enter text..." />
                <TextField name="textField" label="Required Field" placeholder="This field is required" required />
                <TextField name="emailField" label="Email Field" placeholder="john@example.com" type="email" required />
                <TextField name="passwordField" label="Password Field" placeholder="Enter password" type="password" />
                <TextField name="textFieldDisabled" label="Disabled Field" disabled />
                <TextField name="textField" label="Number Field" placeholder="0" type="number" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Native Inputs</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="native-text">Text Input</Label><Input id="native-text" placeholder="Basic input" /></div>
                <div className="space-y-2"><Label htmlFor="native-search">Search Input</Label><Input id="native-search" type="search" placeholder="Search..." /></div>
                <div className="space-y-2"><Label htmlFor="native-url">URL Input</Label><Input id="native-url" type="url" placeholder="https://example.com" /></div>
                <div className="space-y-2"><Label htmlFor="native-tel">Phone Input</Label><Input id="native-tel" type="tel" placeholder="+1 555-0100" /></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Select Fields</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <SelectField name="selectField" label="Default Select" options={DEMO_SELECT_OPTIONS} placeholder="Choose an option" />
                <SelectField name="selectRequired" label="Required Select" options={ROLE_OPTIONS} placeholder="Select role" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Text Area</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <TextAreaField name="textAreaField" label="Default TextArea" placeholder="Enter a longer description..." rows={4} />
              <div className="space-y-2"><Label htmlFor="native-textarea">Native Textarea</Label><Textarea id="native-textarea" placeholder="Write something here..." rows={3} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Currency Fields</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <CurrencyField name="currencyField" label="Price (USD)" placeholder="0.00" required />
                <CurrencyField name="currencyPercent" label="Percentage" placeholder="0" currency="%" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Date Picker</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <DateField name="dateField" label="Select Date" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Switch / Toggle</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <SwitchField name="switchField" label="Notifications" description="Receive email notifications for new orders" />
              <SwitchField name="switchEnabled" label="Active Status" description="Enable or disable this feature" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Checkbox</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2"><Checkbox id="terms" /><Label htmlFor="terms" className="font-normal">Accept terms and conditions</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="newsletter" defaultChecked /><Label htmlFor="newsletter" className="font-normal">Subscribe to newsletter</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="disabled-check" disabled /><Label htmlFor="disabled-check" className="font-normal text-muted-foreground">Disabled checkbox</Label></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Image Upload (Dropzone)</CardTitle></CardHeader>
            <CardContent>
              <ImageUploadField name="images" label="Upload Images" images={images} onImagesChange={setImages} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Labels & Validation States</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2"><Label>Default Label</Label><Input placeholder="Default state" /></div>
                <div className="space-y-2"><Label>Required Label <span className="text-danger ml-0.5">*</span></Label><Input placeholder="Required field" /></div>
                <div className="space-y-2"><Label>With Error</Label><Input placeholder="Invalid value" className="border-danger" /><p className="text-sm text-danger">This field is required</p></div>
                <div className="space-y-2"><Label>With Helper Text</Label><Input placeholder="Enter value" /><p className="text-sm text-muted-foreground">This is a helper text for guidance</p></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Form Actions</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Button type="submit">Submit Form</Button>
                <Button type="button" variant="outline" onClick={() => methods.reset()}>Reset</Button>
                <Button type="button" variant="ghost" onClick={() => toast.info('Cancelled')}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </div>
  )
}
