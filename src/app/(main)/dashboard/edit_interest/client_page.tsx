"use client"

import EditInterestForm from "./edit-interest-form"
import { Button } from "@/components/ui/button"
import { useValues } from "./use-value"
import Select from "react-select"
import { AboutData } from "@/types/about"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
]

interface ClientPageProps {
  dataInterest: AboutData
}

function ClientPage({ dataInterest }: ClientPageProps) {
  const { valuesEdit } = useValues()

  async function handleClickSave() {
    try {
      let { email, interests, ...rest } = dataInterest
      let dataPost = {
        ...rest,
        interests: [...interests, ...valuesEdit]
      }

      const response = await axios.post("/api/createProfile", dataPost)
      const responseData = response.data
      toast({ title: responseData.data.message })
      window.location.href = "/dashboard"
    } catch (error: any) {
      console.error("save failed:", error)
      toast({ title: "save failed", description: error.message })
    }
  }
  return (
    <div className="">
      <div className="flex justify-end">
        <Button variant="ghost" className="text-blue-500" onClick={handleClickSave}>
          Save
        </Button>
      </div>

      <div className="pt-10">
        <p className="text-gold">Tell everyone about yourself</p>
        <p className="text-xl font-bold text-white">What interest you?</p>

        <div className="mt-4">
          <EditInterestForm />
        </div>
      </div>
    </div>
  )
}

export default ClientPage
