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
import { SignInFromSchema } from "@/lib/definitions"

type FormData = z.infer<typeof SignInFromSchema>

function SignInForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInFromSchema>>({
    resolver: zodResolver(SignInFromSchema),
    defaultValues: {
      username: "minji",
      email: "minji@gmail.com",
      password: "akuganteng123"
    }
  })

  const onSubmit = async (data: FormData, event?: any) => {
    event.preventDefault()
    try {
      const dataPost = {
        username: data.username,
        email: data.email,
        password: data.password
      }
      const response = await axios.post("/api/auth/login", dataPost, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      const responseData = response.data
      // toast({ title: responseData.data.message })

      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      console.error("Login Failed:", error)
      toast({ title: "Login Failed", description: error.message })
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
                    <Input placeholder="Enter Email " {...field} type="email" />
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
                    <Input placeholder="Enter Username" {...field} type="text" />
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
          </div>
          <Button className="w-full mb-4 h-12" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting...." : "Login"}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SignInForm
