import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Database } from "@/types/database.types";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req: request, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is not signed in and the current path is not /auth/sign-in,
  // redirect the user to /auth/sign-in
  if (!session && !request.nextUrl.pathname.startsWith("/auth/")) {
    const redirectUrl = new URL("/auth/sign-in", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and trying to access /auth/sign-in,
  // redirect to / (or another protected route if / doesn't exist)
  if (session && request.nextUrl.pathname.startsWith("/auth/")) {
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - auth folder (authentication routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
