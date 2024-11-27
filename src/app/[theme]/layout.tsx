import { VercelToolbar } from '@vercel/toolbar/next'
import { Analytics } from '@vercel/analytics/next'
import localFont from 'next/font/local'
import { Providers } from './Providers'
import '@/app/globals.css'
import { notFound } from 'next/navigation'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export default async function ThemeLayout({
  params,
  children,
}: {
  params: Promise<{ theme: string }>
  children: React.ReactNode
}) {
  const { theme } = await params
  const shouldInjectToolbar = process.env.NODE_ENV === 'development'

  if (theme !== 'dark' && theme !== 'light') {
    notFound()
  }

  return (
    <body
      className={`${theme === 'dark' ? theme : ''} ${geistSans.variable} ${geistMono.variable} antialiased text-zinc-800 dark:text-gray-200 bg-white dark:bg-zinc-900`}
    >
      <Providers>{children}</Providers>
      {shouldInjectToolbar && <VercelToolbar />}
      <Analytics />
    </body>
  )
}
