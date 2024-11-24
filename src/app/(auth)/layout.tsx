"use client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showBack, setShowBack] = useState(false)
  const pathname = usePathname()
  return (
    <html lang="en">
      <body
        className={cn(
          "h-screen antialiased bg-[#09141A] container px-4 pt-8 mx-auto",
          inter.className
        )}
      >
        <MobileNav
          title={
            pathname === "/"
              ? "Home"
              : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)
          }
          showBackButton={showBack}
        />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
