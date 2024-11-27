import { client } from '@/sanity/lib/client'
import { PAGES_QUERYResult } from '@/sanity/types'
import { defineQuery } from 'next-sanity'
import { notFound } from 'next/navigation'

const PAGES_QUERY = defineQuery(`*[_type == "page"] | {...}`)
const assertValidPage = (
  page: NonNullable<PAGES_QUERYResult>[number],
): page is NonNullable<PAGES_QUERYResult>[number] & {
  title: string
  slug: {
    current: string
  }
} => {
  return Boolean(page && page.title && page.slug && page.slug.current)
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pagesResult = await client.fetch<PAGES_QUERYResult>(
    PAGES_QUERY,
    {},
    {
      next: {
        /** 30 seconds */
        revalidate: 30,
      },
    },
  )

  const pages = pagesResult.filter(assertValidPage)
  const page = pages.find((page) => page.slug.current === slug)
  if (!page) {
    notFound()
  }

  return <div className="flex flex-col gap-32 pt-16 px-2">{page.title}</div>
}
