"use client"

import { useValues } from "./use-value"
import { AboutData } from "@/types/about"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { InterestInput } from "@/components/interest-input"

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
        interests: [...valuesEdit]
      }

      const response = await axios.put("/api/updateProfile", dataPost)
      const responseData = response.data
      toast({ title: responseData.data.message })
      window.location.href = "/dashboard"
    } catch (error: any) {
      console.error("save failed:", error)
      toast({ title: "save failed", description: error.message })
    }
  }
  return (
    <div>
      <InterestInput onSave={handleClickSave} defaultInterests={dataInterest.interests} />
    </div>
  )
}

export default ClientPage
