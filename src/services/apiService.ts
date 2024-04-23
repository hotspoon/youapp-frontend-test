import Axios from "@/lib/axiosInstance"
import { getRequestCookieApiRoute } from "@/lib/getRequestCookie"

export const getProfile = async (user_session: string): Promise<any> => {
  try {
    // decode session agar bisa dipakai
    const userSession = await getRequestCookieApiRoute(user_session as string)
    const response = await Axios(userSession).get("/getProfile")

    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}
