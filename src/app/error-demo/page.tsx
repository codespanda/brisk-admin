"use client"

import { ServerCrash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ErrorDemoPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <ServerCrash className="mx-auto h-16 w-16 text-danger" />
        <h1 className="mt-6 text-4xl font-bold">500</h1>
        <p className="mt-2 text-lg text-muted-foreground">Internal Server Error</p>
        <p className="mt-1 text-sm text-muted-foreground max-w-md">
          Something went wrong on our end. Please try again later or contact support if the problem persists.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
