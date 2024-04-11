import { NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE_NAME, AUTHORIZATION_HEADER, BEARER } from "./constants/AuthConstants";
import { MATERIALS_URL, PROTECTED_URLS } from "./constants/URLConstants";
import { decodeJWT } from "./utils/JWTUtils";
import { PUT } from "./constants/RequestMethodConstants";
import { INTERNAL_SERVER_ERROR_MESSAGE, JWT_EXPIRED_ERROR_CODE, SESSION_EXPIRED_ERROR_MESSAGE, UNAUTHORIZED_ERROR_MESSAGE } from "./constants/ErrorMessages";

export async function middleware(request) {
  const { method, headers, cookies, nextUrl } = request;
  const { pathname } = nextUrl;
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Access-Control-Allow-Origin", "*");
  requestHeaders.set("Access-Control-Allow-Methods", process.env.CORS_ALLOWED_METHODS);
  requestHeaders.set("Referrer-Policy", process.env.CORS_REFERRER_POLICY);

  const isProtectedMaterialsEndpoint =
    pathname === MATERIALS_URL && method === PUT;

  if (PROTECTED_URLS.includes(pathname) || isProtectedMaterialsEndpoint) {
    const accessTokenFromCookies = cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
    if (accessTokenFromCookies) {
      requestHeaders.set(AUTHORIZATION_HEADER, BEARER + accessTokenFromCookies);
    }

    const authorizationHeader = requestHeaders.get(AUTHORIZATION_HEADER);
    console.log("Authorization header", authorizationHeader);

    if (!authorizationHeader?.startsWith(BEARER)) {
      return NextResponse.json({ message: UNAUTHORIZED_ERROR_MESSAGE }, { status: 401 });
    }

    const accessToken = authorizationHeader.substring(BEARER.length);
    try {
      await decodeJWT(accessToken);
    } catch (error) {
      if (error.code === JWT_EXPIRED_ERROR_CODE) {
        console.log(error);
        return NextResponse.json(
          { expired: true, message: SESSION_EXPIRED_ERROR_MESSAGE },
          { status: 401 }
        );
      }
      console.log("Failed to verify JWT", error);
      return NextResponse.json(
        { message: INTERNAL_SERVER_ERROR_MESSAGE },
        { status: 500 }
      );
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/api/:path*",
};
