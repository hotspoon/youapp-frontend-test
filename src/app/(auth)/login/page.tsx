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
      {/* <a href="/" className="flex items-center text-sm text-white">
        <ChevronLeft className="mr-2 h-8 w-8 text-white" />
        Back
      </a> */}

      <div className="pt-8">
        <h2 className="text-2xl font-bold mb-5 text-white">Login</h2>
        {/* <form>
          <div className="space-y-3 mb-6">
            <Input placeholder="Enter Username/Email" type="email" name="email" />
            <div className="relative">
              <Input placeholder="Enter Password" type="password" name="password" />
              <EyeIcon className="absolute right-3 top-3 text-white h-5 w-5" />
            </div>
          </div>
          <Button className="w-full mb-4 h-12">Login</Button>
        </form> */}
        <SignInForm />
        <p className="text-center text-white text-sm">
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
