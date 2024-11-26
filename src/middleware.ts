import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const systemTheme = request.headers.get('sec-ch-prefers-color-scheme')
  const storedTheme = request.cookies.get('theme')?.value
  const ajsAnonymousId =
    request.cookies.get('ajs_anonymous_id')?.value ?? crypto.randomUUID()
  const overrideParam = request.nextUrl.searchParams.get('o')

  const response = storedTheme
    ? NextResponse.rewrite(new URL(`/${storedTheme}`, request.url).toString())
    : NextResponse.rewrite(
        new URL(`/${systemTheme ?? 'light'}`, request.url).toString(),
      )

  if (storedTheme) {
    response.cookies.set('theme', storedTheme, {
      maxAge: /* 1 year */ 1000 * 365 * 60 * 60 * 24,
    })
  }

  response.cookies.set('ajs_anonymous_id', ajsAnonymousId, {
    maxAge: /* 1 year */ 1000 * 365 * 60 * 60 * 24,
  })

  if (overrideParam) {
    response.cookies.set('override', overrideParam, {
      maxAge: /* 1 year */ 1000 * 365 * 60 * 60 * 24,
    })
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
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|.well-known|studio|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
