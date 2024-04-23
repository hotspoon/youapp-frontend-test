import React from "react"
import { cookies } from "next/headers"
import { getRequestCookie } from "@/lib/getRequestCookie"
import { Card, CardContent } from "@/components/ui/card"
import { Edit2 } from "iconsax-react"
import ClientPage from "./client_page"
import { getProfile } from "@/services/apiService"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page"
}

async function Page() {
  const session = await getRequestCookie(cookies())
  const cookieStore = cookies()
  const user_session = cookieStore.get("user_session")?.value || ""
  const { data: dataAbout } = await getProfile(user_session)

  return (
    <div>
      <div className="flex justify-center items-center text-white">
        {/* <a href="/" className="flex items-center text-sm text-white">
          <ChevronLeft className="mr-1 h-8 w-8 " />
          Back
        </a> */}
        <p>@{session.username}</p>
        {/* <DotsHorizontalIcon className="w-4 h-4" /> */}
        {/* <DetailIcon /> */}
      </div>

      <div className="pt-4">
        <Card className="bg-[#162329] text-white relative h-48 border-none overflow-hidden rounded-lg mb-4">
          <CardContent className="relative h-full">
            <img
              src="/assets/images/man_image.png"
              alt="man image"
              className="absolute w-full h-full object-cover object-center"
            />
            <Edit2 className="absolute top-2 right-2" />
            <p className="absolute bottom-2 left-2 font-bold">@{session.username}</p>
            <p className="absolute bottom-10 left-2">{dataAbout.horoscope}</p>
            <p className="absolute bottom-14 left-2">{dataAbout.zodiac}</p>
          </CardContent>
        </Card>

        <ClientPage dataAbout={dataAbout} />
      </div>
    </div>
  )
}

export default Page
