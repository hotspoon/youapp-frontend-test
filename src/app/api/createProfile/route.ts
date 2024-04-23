import Axios from "@/lib/axiosInstance"
import { getRequestCookie } from "@/lib/getRequestCookie"
import axios from "axios"
import { cookies } from "next/headers"

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()
    const session = await getRequestCookie(cookies())
    const response = await Axios(session).post("/createProfile", body)
    const data = response.data

    console.log(data)

    return Response.json({ data, status: response.status })
  } catch (error: any) {
    return Response.json({ error: error.message, status: 500 })
  }
}
