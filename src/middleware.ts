import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const ajsAnonymousId =
    request.cookies.get('ajs_anonymous_id')?.value ?? crypto.randomUUID()

  const response = NextResponse.next()
  response.cookies.set('ajs_anonymous_id', ajsAnonymousId, {
    maxAge: /* 1 year */ 1000 * 365 * 60 * 60 * 24,
  })

  return response
}
