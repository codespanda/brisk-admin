import { Button } from '@/components/ui/button'

export function SocialLoginButtons() {
  return (
    <div className="space-y-2">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" type="button" disabled>
          Google
        </Button>
        <Button variant="outline" type="button" disabled>
          GitHub
        </Button>
      </div>
    </div>
  )
}
