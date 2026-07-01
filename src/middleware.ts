import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    "http://localhost:3341",
    "http://localhost:3344",
    // "http://localhost:3343",
  ];

  // Handle preflight OPTIONS request
  if (request.method === "OPTIONS") {
    const preflightHeaders = new Headers();
    if (origin && allowedOrigins.includes(origin)) {
      preflightHeaders.set("Access-Control-Allow-Origin", origin);
      preflightHeaders.set("Access-Control-Allow-Credentials", "true");
    } else {
      preflightHeaders.set(
        "Access-Control-Allow-Origin",
        "http://localhost:3341",
      );
      preflightHeaders.set("Access-Control-Allow-Credentials", "true");
    }
    preflightHeaders.set(
      "Access-Control-Allow-Methods",
      "GET,POST,OPTIONS,DELETE,PUT,PATCH",
    );
    preflightHeaders.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    );

    return new NextResponse(null, {
      status: 200,
      headers: preflightHeaders,
    });
  }

  const { pathname } = request.nextUrl;

  // Validate session cookie for API requests, excluding login and session check endpoints
  if (pathname !== "/api/auth/login" && pathname !== "/api/auth/session") {
    const sessionCookie = request.cookies.get("neocentra_session");
    if (
      !sessionCookie ||
      sessionCookie.value !== "mock-jwt-token-neocentra-12345"
    ) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("timeout", "true");
      const redirectResponse = NextResponse.redirect(loginUrl);

      // Apply CORS headers on redirect response
      if (origin && allowedOrigins.includes(origin)) {
        redirectResponse.headers.set("Access-Control-Allow-Origin", origin);
        redirectResponse.headers.set(
          "Access-Control-Allow-Credentials",
          "true",
        );
      } else {
        redirectResponse.headers.set(
          "Access-Control-Allow-Origin",
          "http://localhost:3341",
        );
        redirectResponse.headers.set(
          "Access-Control-Allow-Credentials",
          "true",
        );
      }
      return redirectResponse;
    }
  }

  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  } else {
    // Default to the host origin if the request does not specify an origin
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:3341",
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,DELETE,PUT,PATCH",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  );

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
