import axios from "axios"
import { cookies } from "next/headers"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "@/lib/ironSession"

export async function POST(req: Request, res: Response) {
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
    session.username = (body.username as string) ?? "No username"
    session.email = (body.email as string) ?? "No email"
    session.accessToken = data.access_token
    await session.save()

    return Response.json({ data, status: response.status })
  } catch (error: any) {
    return Response.json({ error: error.message, status: 500 })
  }
}
