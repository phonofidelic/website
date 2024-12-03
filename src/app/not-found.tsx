import Link from 'next/link'
import localFont from 'next/font/local'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export default function GlobalNotFound() {
  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
        <p className="text-base mb-8">
          {`Oops! The page you're looking for doesn't exist.`}
        </p>
        <Link href="/" className="group">
          <h2 className="group pb-2 pt-4 px-2 sm:px-0 w-fit">
            {'<'} <span className="group-hover:underline">Head back home</span>
          </h2>
        </Link>
      </div>
    </body>
  )
}
