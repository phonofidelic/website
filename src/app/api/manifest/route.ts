import { THEME_COOKIE_NAME } from '@/constants'
import { MetadataRoute } from 'next'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const storedTheme = request.cookies.get(THEME_COOKIE_NAME)?.value
  const systemTheme = request.headers.get('sec-ch-prefers-color-scheme')

  const theme = storedTheme ?? systemTheme ?? 'light'

  const manifest: MetadataRoute.Manifest = {
    name: 'Web development by Christopher Clemons',
    short_name: 'Christopher Clemons',
    description:
      'Portfolio site exhibiting web development works by Christopher Clemons',
    start_url: '/',
    display: 'standalone',
    background_color: theme === 'dark' ? '#18181b' : '#fff',
  }

  return new Response(JSON.stringify(manifest), { status: 200 })
}
