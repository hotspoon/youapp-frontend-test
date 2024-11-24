// import { SessionUser } from "@/api/user";
import { unsealData } from "iron-session"

/**
 * Can be called in page/layout server component.
 * @param cookies ReadonlyRequestCookies
 * @returns SessionUser or null
 */
export async function getRequestCookie(cookies: any): Promise<any> {
  const cookieName = process.env.SESSION_COOKIE_NAME as string
  const found = cookies.get(cookieName)
  if (!found) return null

  const userSession = await unsealData(found.value, {
    password: process.env.SESSION_SECRET as string
  })

  return userSession
}

/**
 * Can be called in app/layout server component.
 * @param cookies string
 * @returns SessionUser or null
 */
export async function getRequestCookieApiRoute(cookies: string): Promise<any> {
  if (!cookies) return null

  const userSession = await unsealData(cookies, {
    password: process.env.SESSION_SECRET as string
  })

  return userSession
}
