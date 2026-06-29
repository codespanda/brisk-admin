
import { useCallback, useRef, useState } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageUploadFieldProps {
  name: string
  label: string
  images: string[]
  onImagesChange: (images: string[]) => void
}

export function ImageUploadField({ name, label, images, onImagesChange }: ImageUploadFieldProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return
    const newImages: string[] = []
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        newImages.push(url)
      }
    })
    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages])
    }
  }, [images, onImagesChange])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    if (inputRef.current) inputRef.current.value = ''
  }, [handleFiles])

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors',
          isDragOver
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/40 hover:bg-muted/50'
        )}
      >
        <div className={cn(
          'rounded-full p-3 transition-colors',
          isDragOver ? 'bg-primary/10' : 'bg-muted'
        )}>
          <Upload className={cn(
            'h-6 w-6',
            isDragOver ? 'text-primary' : 'text-muted-foreground'
          )} />
        </div>
        <p className="mt-3 text-sm font-medium">
          {isDragOver ? 'Drop images here' : 'Drag & drop images here'}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
        <p className="mt-2 text-[10px] text-muted-foreground">PNG, JPG, WEBP up to 5MB each</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
            >
              {img.startsWith('blob:') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img}
                  alt={`Upload ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
                </div>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-6 w-6 rounded-full bg-background/80 p-0 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  removeImage(idx)
                }}
              >
                <X className="h-3 w-3" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-[10px] text-white">Image {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
