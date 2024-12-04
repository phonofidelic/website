import { cookies, headers } from 'next/headers'
import { ProjectPreviewSkeleton } from './[theme]/Project'

export default async function RootLoading() {
  const headersList = await headers()
  const serverCookies = await cookies()
  const systemTheme = headersList.get('sec-ch-prefers-color-scheme')
  const theme = serverCookies.get('theme')?.value ?? systemTheme

  return (
    <body
      className={`${theme === 'dark' ? theme : ''} flex sm:max-w-screen-sm md:max-w-screen-md mx-auto w-full justify-center`}
    >
      <div className="w-full pt-16 px-2">
        <div className="w-full h-20 sm:h-12 flex flex-col justify-around">
          <div className="block sm:hidden w-full h-4 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-sm" />
          <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-sm" />
          <div className="w-32 h-4 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-sm" />
        </div>
        <div className="flex flex-col gap-32 pt-16 px-2">
          <ProjectPreviewSkeleton />
          <ProjectPreviewSkeleton />
          <ProjectPreviewSkeleton />
          <ProjectPreviewSkeleton />
        </div>
      </div>
    </body>
  )
}
