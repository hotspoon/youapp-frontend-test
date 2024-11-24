import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, EyeIcon } from "lucide-react"
import { Metadata } from "next"
import React from "react"
import SignInForm from "./signin-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page"
}

function Page() {
  return (
    <div className="">
      <div className="pt-8">
        <h2 className="text-2xl font-bold mb-5 text-white">Login</h2>

        <SignInForm />
        <p className="text-center text-white text-sm mt-4">
          No account?{" "}
          <Link href="/register" className="text-gold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page
