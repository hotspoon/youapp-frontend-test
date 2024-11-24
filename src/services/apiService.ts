import Axios from "@/lib/axiosInstance"
import { getRequestCookieApiRoute } from "@/lib/getRequestCookie"

export const getProfile = async (user_session: string): Promise<any> => {
  try {
    const userSession = await getRequestCookieApiRoute(user_session as string)
    const response = await Axios(userSession).get("/getProfile")
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("Unauthorized: Please log in again")
    }
    throw new Error(error.message || "An error occurred while fetching the profile")
  }
}
