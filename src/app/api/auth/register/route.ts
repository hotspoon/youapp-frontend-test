import axios from "axios"

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()

    const response = await axios.post(`${process.env.API_BACKEND}/api/register`, body, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = response.data

    return Response.json({ data, status: response.status })
  } catch (error: any) {
    return Response.json({ error: error.message, status: 500 })
  }
}
