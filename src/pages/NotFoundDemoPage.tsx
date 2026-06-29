import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundDemoPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <FileQuestion className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-4xl font-bold">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">Page not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/"><Button className="mt-6">Go Home</Button></Link>
      </div>
    </div>
  )
}
