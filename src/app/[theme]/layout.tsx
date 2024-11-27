import { VercelToolbar } from '@vercel/toolbar/next'
import { Analytics } from '@vercel/analytics/next'
import { notFound } from 'next/navigation'
import localFont from 'next/font/local'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { getShowNavigation, getShowProjects } from '@/flags'
import { Providers } from './Providers'
import { ClientOnly, ThemeSelector } from './ThemeSelector'
import '@/app/globals.css'
import { defineQuery } from 'next-sanity'
import { PAGES_NAVIGATION_QUERYResult } from '@/sanity/types'

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

export const PAGES_NAVIGATION_QUERY = defineQuery(
  `*[_type == "page"] | {title, slug}`,
)

export const assertValidPageNavigationItem = (
  navigationItem: NonNullable<PAGES_NAVIGATION_QUERYResult>[number],
): navigationItem is NonNullable<PAGES_NAVIGATION_QUERYResult>[number] & {
  title: string
  slug: { current: string } | null
} => {
  return Boolean(
    navigationItem &&
      navigationItem.title &&
      (navigationItem.slug === null || navigationItem.slug.current),
  )
}

export default async function ThemeLayout({
  header,
  navigation,
  params,
  children,
}: {
  header: React.ReactNode
  navigation: React.ReactNode
  params: Promise<{ theme: string }>
  children: React.ReactNode
}) {
  const { theme } = await params
  const shouldInjectToolbar = process.env.NODE_ENV === 'development'

  if (theme !== 'dark' && theme !== 'light') {
    notFound()
  }

  const showProjects = await getShowProjects()
  const isNavigationEnabled = await getShowNavigation()

  return (
    <body
      className={`${theme === 'dark' ? theme : ''} ${geistSans.variable} ${geistMono.variable} antialiased text-zinc-800 dark:text-gray-200 bg-white dark:bg-zinc-900`}
    >
      <Providers>
        {header}
        <div className="w-full">
          <main className="flex sm:max-w-screen-sm md:max-w-screen-md mx-auto w-full justify-center">
            <div className="flex flex-col max-w-full p-2 sm:p-20 w-full">
              {isNavigationEnabled ? (
                navigation
              ) : (
                <div className="mb-8 bg-white dark:bg-zinc-900 sticky top-0 z-50 border-b-3 border-zinc-800 dark:border-white">
                  <h2
                    id="recent-projects"
                    className="text-4xl pb-2 pt-4 px-2 sm:px-0 w-full "
                  >
                    Projects
                  </h2>
                </div>
              )}
              {children}
            </div>
          </main>
        </div>
        {showProjects && (
          <footer className="flex flex-col gap-4 items-center p-16 mt-32">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 grid-rows-auto gap-2">
              <div className="flex w-full gap-6 items-center justify-center sm:col-start-2">
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://github.com/phonofidelic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                  GitHub
                </a>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://linkedin.com/in/christopher-clemons-89182aba"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
              </div>
              <div className="justify-center sm:justify-end w-full flex">
                <ClientOnly fallback={<div>Loading...</div>}>
                  <ThemeSelector />
                </ClientOnly>
              </div>
            </div>
            <div>
              <p className="text-xs">
                Copyright &copy; {new Date().getFullYear()} Christopher Clemons
              </p>
            </div>
          </footer>
        )}
      </Providers>
      {shouldInjectToolbar && <VercelToolbar />}
      <Analytics />
    </body>
  )
}
