import { Metadata } from "next"
import React from "react"
import ClientPage from "./client_page"
import { cookies } from "next/headers"
import { getRequestCookie } from "@/lib/getRequestCookie"
import { getProfile } from "@/services/apiService"
import { InterestInput } from "@/components/interest-input"

export const metadata: Metadata = {
  title: "Edit Interest",
  description: "Edit Interest page"
}

async function Page() {
  const session = await getRequestCookie(cookies())
  const cookieStore = cookies()
  const user_session = cookieStore.get("user_session")?.value || ""
  const { data: dataInterest } = await getProfile(user_session)

  return (
    <>
      <ClientPage dataInterest={dataInterest} />
    </>
  )
}

export default Page
