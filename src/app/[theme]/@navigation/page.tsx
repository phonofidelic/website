import 'server-only'
import Link from 'next/link'
import { sanityFetchCached } from '@/sanity/lib/client'
import { PAGES_NAVIGATION_QUERYResult } from '@/sanity/types'
import { Navigation } from '../Navigation'

const PAGE_NAVIGATION_QUERY = `*[_type == "page"] | order(title asc) {
  title,
  "slug": slug.current,
}`

const assertValidNavigationItem = (
  item: NonNullable<NonNullable<PAGES_NAVIGATION_QUERYResult>[number]>,
): item is NonNullable<NonNullable<PAGES_NAVIGATION_QUERYResult>[number]> & {
  title: string
  slug: string | null
} => {
  return Boolean(item.title)
}

export default async function HomeNavigationSlot() {
  const pagesNavigationQueryResults =
    await sanityFetchCached<PAGES_NAVIGATION_QUERYResult>(
      PAGE_NAVIGATION_QUERY,
      {},
      {
        next: {
          tags: ['page'],
        },
      },
    )

  const navigationLinks = pagesNavigationQueryResults
    .filter(assertValidNavigationItem)
    .filter(({ slug }) => slug)
    .sort((a, b) => (a.title > b.title ? 1 : -1))
    .map(({ title, slug }) => ({
      title,
      href: `/${slug ?? '#recent-projects'}`,
    }))

  return (
    <Navigation
      header={
        <h2 id="recent-projects" className="text-4xl pb-2 px-2 sm:px-0">
          Recent Projects
        </h2>
      }
    >
      {navigationLinks.map(({ title, href }) => (
        <Link key={href} href={href} className="group">
          <h2 className="text-4xl pb-2 pt-4 px-2 sm:px-0 w-fit">
            {title}
            <span className="block mt-1 duration-300 max-w-0 group-hover:max-w-full opacity-0 group-hover:opacity-100 transition-all h-[3px] bg-zinc-800 dark:bg-white" />
          </h2>
        </Link>
      ))}
    </Navigation>
  )
}
