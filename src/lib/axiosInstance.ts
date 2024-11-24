import axios from "axios"

const Axios = (userSession: any) => {
  return axios.create({
    baseURL: `${process.env.API_BACKEND}/api`,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "x-access-token": userSession?.accessToken || ""
    }
  })
}
export default Axios
