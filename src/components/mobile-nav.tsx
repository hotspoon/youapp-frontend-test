"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface MobileNavProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  showBackButton?: boolean
  onBack?: () => void
}

export function MobileNav({
  title,
  showBackButton = true,
  onBack,
  className,
  children,
  ...props
}: MobileNavProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-14 py-8 text-white items-center bg-transparent",
        className
      )}
      {...props}
    >
      <div className="w-full px-4 flex items-center">
        {showBackButton && (
          <button onClick={handleBack} className="flex items-center text-sm transition-colors">
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        )}
        {title && (
          <h1
            className={cn("text-center text-base font-semibold", {
              "flex-1": showBackButton,
              "w-full": !showBackButton
            })}
          >
            {title}
          </h1>
        )}
        {children}
      </div>
    </div>
  )
}
