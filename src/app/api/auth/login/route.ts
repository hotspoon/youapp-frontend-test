import axios, { AxiosError, AxiosResponse } from "axios"
import { cookies } from "next/headers"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "@/lib/ironSession"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await axios.post(`${process.env.API_BACKEND}/api/login`, body, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = response.data

    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    session.isLoggedIn = true
    session.username = body.username ?? "No username"
    session.email = body.email ?? "No email"
    session.accessToken = data.access_token
    await session.save()

    if (response.status === 201 && data.message === "User not found") {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ data, status: response.status })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = axiosError.response.status
        const errorMessage =
          (axiosError.response.data as { message?: string })?.message ||
          "An error occurred during login"

        switch (status) {
          case 400:
            return NextResponse.json({ error: "Bad Request: " + errorMessage }, { status: 400 })
          case 401:
            return NextResponse.json({ error: "Unauthorized: " + errorMessage }, { status: 401 })
          case 403:
            return NextResponse.json({ error: "Forbidden: " + errorMessage }, { status: 403 })
          case 404:
            return NextResponse.json({ error: "Not Found: " + errorMessage }, { status: 404 })
          case 500:
            return NextResponse.json(
              { error: "Internal Server Error: " + errorMessage },
              { status: 500 }
            )
          default:
            return NextResponse.json(
              { error: "An unexpected error occurred: " + errorMessage },
              { status }
            )
        }
      } else if (axiosError.request) {
        // The request was made but no response was received
        return NextResponse.json({ error: "No response received from the server" }, { status: 503 })
      } else {
        // Something happened in setting up the request that triggered an Error
        return NextResponse.json(
          { error: "Error setting up the request: " + axiosError.message },
          { status: 500 }
        )
      }
    } else {
      // For non-Axios errors
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  }
}
