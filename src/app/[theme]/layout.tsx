import { VercelToolbar } from '@vercel/toolbar/next'
import { Analytics } from '@vercel/analytics/next'
import localFont from 'next/font/local'
import { Providers } from './Providers'
import '@/app/globals.css'

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
  children: React.ReactNode
  params: Promise<{ theme: string }>
}) {
  const { theme } = await params
  const shouldInjectToolbar = process.env.NODE_ENV === 'development'

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
