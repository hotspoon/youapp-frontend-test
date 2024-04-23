"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Edit2 } from "iconsax-react"
import { ChevronLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { useAboutStatus } from "./use-about-status"

function AboutForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { isEditAbout, setIsEditAbout } = useAboutStatus()
  async function handleSaveUpdate() {
    try {
      let dataPost = {
        name: "",
        birthday: "",
        height: 0,
        weight: 0,
        interests: [""]
      }

      //   console.log(dataPost)
      const response = await axios.post("/api/createProfile", dataPost)
      const responseData = response.data
      console.log(responseData.data)
      toast({ title: responseData.data.message })
      setIsEditAbout(false)
    } catch (error: any) {
      console.error("save failed:", error)
      toast({ title: "save failed", description: error.message })
    }
  }
  return (
    <div>
      <Card className="bg-[#162329] border-none text-white rounded-lg mb-4 pb-2">
        <CardContent className="pl-4 pr-2">
          <div className="flex justify-between mt-2 items-center">
            <p className="font-bold">About</p>
            <Button
              variant="ghost"
              className="text-gold focus:bg-transparent focus:text-orange-500 hover:bg-transparent hover:text-gold"
              disabled={isLoading}
              onClick={handleSaveUpdate}
            >
              Save & Update
            </Button>
          </div>
          <div className="flex gap-2 items-center py-2">
            <input type="file" id="fileUpload" className="hidden" />
            <label
              htmlFor="fileUpload"
              className="bg-opacity-[0.52] w-12 h-12 bg-white flex rounded-xl justify-center items-center cursor-pointer"
            >
              <Plus className="w-5 h-5 text-gold" />
            </label>
            <p className="text-sm">Add Image</p>
          </div>
          <div className="form">
            <div className="grid gap-2 grid-cols-3 mb-4">
              <div className="col-span-1 flex items-center">
                <Label className="text-white text-opacity-[0.52]">Display Name</Label>
              </div>
              <div className="col-span-2">
                <Input placeholder="Enter name" />
              </div>
            </div>
            <div className="grid gap-2 grid-cols-3 mb-4">
              <div className="col-span-1 flex items-center">
                <Label className="text-white text-opacity-[0.52]">Gender</Label>
              </div>
              <div className="col-span-2">
                <div>
                  <select name="" id="" className="form-select">
                    <option value="">Select Gender</option>
                    <option value="man">man</option>
                    <option value="woman">woman</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid gap-2 grid-cols-3 mb-4">
              <div className="col-span-1 flex items-center">
                <Label className="text-white text-opacity-[0.52]">Birthday</Label>
              </div>
              <div className="col-span-2">
                <input type="date" placeholder="DD MM YYYY" className="form-control" />
              </div>
            </div>
            <div className="grid gap-2 grid-cols-3 mb-4">
              <div className="col-span-1 flex items-center">
                <Label className="text-white text-opacity-[0.52]">Horoscope</Label>
              </div>
              <div className="col-span-2">
                <Input placeholder="--" />
              </div>
            </div>
            <div className="grid gap-2 grid-cols-3 mb-4">
              <div className="col-span-1 flex items-center">
                <Label className="text-white text-opacity-[0.52]">Zodiac</Label>
              </div>
              <div className="col-span-2">
                <Input placeholder="--" />
              </div>
            </div>
            <div className="grid gap-2 grid-cols-3 mb-4">
              <div className="col-span-1 flex items-center">
                <Label className="text-white text-opacity-[0.52]">Height</Label>
              </div>
              <div className="col-span-2">
                <Input placeholder="Add height" />
              </div>
            </div>
            <div className="grid gap-2 grid-cols-3 mb-4">
              <div className="col-span-1 flex items-center">
                <Label className="text-white text-opacity-[0.52]">Weight</Label>
              </div>
              <div className="col-span-2">
                <Input placeholder="Add weight" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutForm
