import { NextResponse } from 'next/server'
import { ACCESS_TOKEN_COOKIE_NAME, AUTHORIZATION_HEADER, BEARER } from './constants/AuthConstants';
import { PROTECTED_URLS } from './constants/URLConstants';

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Access-Control-Allow-Origin", "*");
  requestHeaders.set("Access-Control-Allow-Methods", process.env.CORS_ALLOWED_METHODS);
  requestHeaders.set("Referrer-Policy", process.env.CORS_REFERRER_POLICY);
  
  const { pathname } = request.nextUrl;

  if (PROTECTED_URLS.includes(pathname)) {
    const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
    requestHeaders.set(AUTHORIZATION_HEADER, BEARER + accessToken);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/api/:path*',
}
