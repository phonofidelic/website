import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const ajsAnonymousId =
    request.cookies.get('ajs_anonymous_id')?.value ?? crypto.randomUUID()

  response.cookies.set('ajs_anonymous_id', ajsAnonymousId, {
    maxAge: /* 1 year */ 1000 * 365 * 60 * 60 * 24,
  })

  const overrideParam = request.nextUrl.searchParams.get('o')

  if (overrideParam) {
    response.cookies.set('override', overrideParam, {
      maxAge: /* 1 year */ 1000 * 365 * 60 * 60 * 24,
    })
  }

  return response
}
