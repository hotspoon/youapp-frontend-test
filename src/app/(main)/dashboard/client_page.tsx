"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Edit2 } from "iconsax-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AboutForm from "./about-form"
import { useAboutStatus } from "./use-about-status"

function ClientPage() {
  const { isEditAbout, setIsEditAbout } = useAboutStatus()
  return (
    <div>
      {!isEditAbout ? (
        <>
          <Card className="bg-[#162329]  relative border-none overflow-hidden rounded-lg mb-4">
            <CardContent className="relative h-full flex items-center justify-center">
              <button onClick={() => setIsEditAbout(!isEditAbout)}>
                <Edit2 className="absolute top-2 right-2 text-white" />
              </button>
              <p className="absolute top-2 left-2 font-bold pl-2 text-white">About</p>
              <p className="px-4 pt-10 pb-5 text-white text-opacity-[0.52]">
                Add in your your to help others know you better
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <AboutForm />
      )}

      <Card className="bg-[#162329]  relative border-none overflow-hidden rounded-lg mb-4">
        <CardContent className="relative h-full flex items-center justify-center">
          <Edit2 className="absolute top-2 right-2 text-white" />
          <p className="absolute top-2 left-2 font-bold pl-2 text-white">Interest</p>
          <p className="px-4 pt-10 pb-5 text-white text-opacity-[0.52]">
            Add in your interest to find a better match
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientPage
