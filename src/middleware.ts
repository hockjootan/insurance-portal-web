import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken");

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.next();
    }
    // Show error page for unauthorized access
    return NextResponse.redirect(new URL("/error", req.url));
  }

  try {
    const isTokenValid = await checkTokenValidity(token.value);
    if (isTokenValid) {
      if (req.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }
    return redirectToLogin(req);
  } catch (error) {
    console.error("Token verification failed:", error);
    return redirectToLogin(req);
  }
}

async function checkTokenValidity(token: string) {
  try {
    // https://vercel.com/docs/functions/runtimes/edge-runtime
    // https://github.com/vercel/next.js/discussions/56322
    // due to middleware desinged to be compatible with Edge runtime, we can't use axios but fetch
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
    );
    const data = await response.json();
    if (response.ok && !data.error) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
}

function redirectToLogin(req: NextRequest) {
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login page
     * - error page
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets/images (images used in the app)
     */
    "/((?!error|api|_next/static|_next/image|favicon.ico|assets/images).*)",
  ],
};
