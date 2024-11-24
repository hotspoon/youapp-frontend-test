import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getRequestCookie } from "./lib/getRequestCookie"
import { cookies } from "next/headers"

const urls = ["/dashboard", "/about", "/profile"]

export async function middleware(req: NextRequest) {
  try {
    const protectedPaths: String[] = ["/", ...urls]
    const res = NextResponse.next()

    // Extract the base path from the requested URL
    const basePath = req.nextUrl.pathname.split("/")[1]

    if (protectedPaths.includes(`/${basePath}`)) {
      const session = await getRequestCookie(cookies())

      if (session === undefined || Object.keys(session).length === 0) {
        req.nextUrl.pathname = "/login"
        return NextResponse.redirect(req.nextUrl)
      }
      return res
    }
    return res
  } catch (error) {
    console.log("Terjadi Error di middleware", error)
    req.nextUrl.pathname = "/login"
    return NextResponse.redirect(req.nextUrl)
  }
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|assets).*)"
}
