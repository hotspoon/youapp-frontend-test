import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, EyeIcon } from "lucide-react"
import { Metadata } from "next"
import React from "react"
import SignUpForm from "./signup-form"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"

export const metadata: Metadata = {
  title: "Register",
  description: "Register Page"
}

function Page() {
  return (
    <div>
      <MobileNav />

      <div className="pt-8">
        <h2 className="text-2xl font-bold mb-5 text-white">Register</h2>
        <SignUpForm />
        <p className="text-center text-white text-sm">
          Have an account?{" "}
          <Link href="/login" className="text-gold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page
