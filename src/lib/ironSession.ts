import { SessionOptions } from "iron-session"

export interface SessionData {
  username: string
  email: string
  accessToken: string
  isLoggedIn: boolean
}

export const defaultSession: SessionData = {
  username: "",
  email: "",
  accessToken: "",
  isLoggedIn: false
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? "default",
  cookieName: "user_session",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    httpOnly: false,
    secure: false
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
