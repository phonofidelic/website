import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  ANONYMOUS_ID_COOKIE_NAME,
  OVERRIDE_COOKIE_NAME,
  THEME_COOKIE_NAME,
} from './constants'

export function middleware(request: NextRequest) {
  const systemTheme = request.headers.get('sec-ch-prefers-color-scheme')
  const storedTheme = request.cookies.get(THEME_COOKIE_NAME)?.value
  const ajsAnonymousId =
    request.cookies.get(ANONYMOUS_ID_COOKIE_NAME)?.value ?? crypto.randomUUID()
  const overrideParam = request.nextUrl.searchParams.get('o')
  const { pathname, search } = request.nextUrl

  const response = storedTheme
    ? NextResponse.rewrite(
        new URL(`/${storedTheme}${pathname}${search}`, request.url).toString(),
      )
    : NextResponse.rewrite(
        new URL(
          `/${systemTheme ?? 'light'}${pathname}${search}`,
          request.url,
        ).toString(),
      )

  // Keep these attributes in sync with the client CookiesProvider
  // (src/app/[theme]/Providers.tsx) so the server and client never write the
  // same cookie with drifting attributes.
  const cookieOptions = {
    maxAge: /* 1 year */ 365 * 60 * 60 * 24,
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NEXT_PUBLIC_ENV !== 'development',
  }

  if (storedTheme) {
    response.cookies.set(THEME_COOKIE_NAME, storedTheme, cookieOptions)
  }

  response.cookies.set(ANONYMOUS_ID_COOKIE_NAME, ajsAnonymousId, cookieOptions)

  if (overrideParam) {
    response.cookies.set(OVERRIDE_COOKIE_NAME, overrideParam, cookieOptions)
  }

  response.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme')
  response.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme')
  response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - .well-known
     * - studio (Sanity Studio)
     * - monitoring (Sentry)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - manifest
     * - icon (icon generation route)
     */
    '/((?!api|_next/static|_next/image|.well-known|studio|monitoring|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|icon).*)',
  ],
}
