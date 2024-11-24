"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function AuthError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full px-4 py-8 bg-card rounded-lg shadow-lg text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-warning" />
        <h1 className="mt-4 text-2xl font-bold text-foreground">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">
          {error.message || "An error occurred during request data to server."}
        </p>
        <div className="mt-6">
          <Button onClick={() => reset()} variant="outline" className="mr-2">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = "/login")}>Back to Login</Button>
        </div>
      </div>
    </div>
  )
}
