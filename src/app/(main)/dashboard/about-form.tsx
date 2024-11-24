"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { aboutFormSchema, type AboutFormValues } from "@/lib/definitions"
import { getHoroscope, getZodiac } from "@/lib/calculationDate"

interface AboutFormProps {
  dataAbout: any
}

export default function AboutForm({ dataAbout }: AboutFormProps) {
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      name: dataAbout.name || "",
      gender: dataAbout.gender || "man",
      birthday: dataAbout.birthday || "",
      horoscope: dataAbout.horoscope || "",
      zodiac: dataAbout.zodiac || "",
      height: dataAbout.height || "",
      weight: dataAbout.weight || "",
      image: dataAbout.image || ""
    }
  })

  const { watch, setValue } = form

  // Watch birthday changes to update horoscope and zodiac
  useEffect(() => {
    const birthday = watch("birthday")
    if (birthday) {
      setValue("horoscope", getHoroscope(birthday))
      setValue("zodiac", getZodiac(birthday))
    }
  }, [watch("birthday"), setValue])

  async function onSubmit(data: AboutFormValues) {
    try {
      // if dataAbout.name is undefined then it will be created or updated
      const { image, zodiac, horoscope, ...rest } = data
      const payload = {
        ...rest,
        interests: []
      }
      const url = dataAbout.name ? "/api/updateProfile" : "/api/createProfile"
      let response: any
      if (dataAbout.name) {
        response = await axios.put(url, payload)
      } else {
        response = await axios.post(url, payload)
      }

      toast({ title: "Success", description: response.data.message })
      window.location.reload()
    } catch (error: any) {
      console.error("Save failed:", error)
      toast({ title: "Save failed", description: error.message })
    }
  }

  return (
    <Card className="bg-[#1a1a1a] border-none text-white rounded-lg mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">About</h2>
          <Button
            variant="ghost"
            className="text-[#FFD700] hover:text-[#FFD700]/80 hover:bg-transparent"
            onClick={form.handleSubmit(onSubmit)}
          >
            Save & Update
          </Button>
        </div>

        <div className="flex gap-4 items-center mb-6">
          <label
            htmlFor="image-upload"
            className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
          >
            <Plus className="w-6 h-6 text-[#FFD700]" />
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // Handle file upload logic here
                }
              }}
            />
          </label>
          <span className="text-sm text-white/60">Add Image</span>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-4">
                  <FormLabel className="text-white/60">Display Name</FormLabel>
                  <div className="col-span-2">
                    <FormControl>
                      <Input
                        placeholder="Enter name"
                        {...field}
                        className="bg-[#2a2a2a] border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-4">
                  <FormLabel className="text-white/60">Gender</FormLabel>
                  <div className="col-span-2">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#2a2a2a] border-none">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="man">Man</SelectItem>
                        <SelectItem value="woman">Woman</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-4">
                  <FormLabel className="text-white/60">Birthday</FormLabel>
                  <div className="col-span-2">
                    <FormControl>
                      <Input type="date" className="bg-[#2a2a2a] border-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="horoscope"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-4">
                  <FormLabel className="text-white/60">Horoscope</FormLabel>
                  <div className="col-span-2">
                    <FormControl>
                      <Input {...field} disabled className="bg-[#2a2a2a] border-none" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zodiac"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-4">
                  <FormLabel className="text-white/60">Zodiac</FormLabel>
                  <div className="col-span-2">
                    <FormControl>
                      <Input {...field} disabled className="bg-[#2a2a2a] border-none" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-4">
                  <FormLabel className="text-white/60">Height</FormLabel>
                  <div className="col-span-2">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Height in cm"
                        className="bg-[#2a2a2a] border-none"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-4">
                  <FormLabel className="text-white/60">Weight</FormLabel>
                  <div className="col-span-2">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Weight in kg"
                        className="bg-[#2a2a2a] border-none"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
