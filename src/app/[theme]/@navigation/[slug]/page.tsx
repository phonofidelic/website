import 'server-only'
import Link from 'next/link'
import { sanityFetchCached, sanityPreload } from '@/sanity/lib/client'
import { Navigation } from '../../Navigation'
import { PAGES_NAVIGATION_QUERYResult } from '@/sanity/types'
import {
  assertValidPageNavigationItem,
  PAGES_NAVIGATION_QUERY,
} from '../../layout'

export default async function SlugNavigationSlot({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  sanityPreload<PAGES_NAVIGATION_QUERYResult>(
    PAGES_NAVIGATION_QUERY,
    {},
    {
      next: {
        tags: ['page'],
      },
    },
  )

  const pagesNavigationQueryResults =
    await sanityFetchCached<PAGES_NAVIGATION_QUERYResult>(
      PAGES_NAVIGATION_QUERY,
      {},
      {
        next: {
          tags: ['page'],
        },
      },
    )

  const currentPage = pagesNavigationQueryResults
    .filter(assertValidPageNavigationItem)
    .find(({ slug: navSlug }) => navSlug?.current === slug)

  const navigationLinks = pagesNavigationQueryResults
    .filter(assertValidPageNavigationItem)
    .filter(({ slug: navSlug }) => navSlug?.current !== slug)
    .sort((a, b) => (a.title > b.title ? 1 : -1))
    .map(({ title, slug }) => ({
      title,
      href: `/${slug?.current ?? '#recent-projects'}`,
    }))

  if (!currentPage || !currentPage?.title) {
    return null
  }

  return (
    <Navigation
      header={
        <h2 className="text-4xl pb-2 px-2 sm:px-0">{currentPage.title}</h2>
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
