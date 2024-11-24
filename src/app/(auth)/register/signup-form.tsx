"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { EyeIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { SignupFormSchema } from "@/lib/definitions"

type FormData = z.infer<typeof SignupFormSchema>

function SignUpForm() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: ""
    }
  })
  const onSubmit = async (data: FormData) => {
    const { email, password, username } = data

    try {
      const response = await axios.post("/api/auth/register", data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      const responseData = response.data
      toast({ title: responseData.data.message })

      router.push("/login")
      router.refresh()
    } catch (error: any) {
      console.error("Register Failed:", error)
      toast({ title: "Register Failed", description: error.message })
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3 mb-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="relative">
                  <FormControl>
                    <div>
                      <Input {...field} type="password" />
                      <EyeIcon className="absolute right-3 top-3 text-white h-5 w-5" />
                    </div>
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <div className="relative">
                  <FormControl>
                    <div>
                      <Input {...field} type="password" />
                      <EyeIcon className="absolute right-3 top-3 text-white h-5 w-5" />
                    </div>
                  </FormControl>
                </div>
              )}
            />
          </div>
          <Button className="w-full mb-4 h-12" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting...." : "Register"}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SignUpForm
