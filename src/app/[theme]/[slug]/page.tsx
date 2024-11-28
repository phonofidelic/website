import { getShowNavigation } from '@/flags'
import { client, PAGES_QUERY } from '@/sanity/lib/client'
import { PAGES_QUERYResult } from '@/sanity/types'
import { PortableText } from 'next-sanity'
import { notFound, redirect } from 'next/navigation'
import { ProjectPreview, assertValidProject } from '../Project'

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
  const isNavigationEnabled = await getShowNavigation()

  if (!isNavigationEnabled) {
    redirect('/')
  }

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

  return (
    <div className="flex flex-col gap-32 pt-16 px-2">
      {Array.isArray(page.body) && (
        <div className="prose">
          <PortableText
            value={page.body}
            components={{
              marks: {
                link: ({ children, value }) => (
                  <a
                    className="hover:underline"
                    href={value.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>
      )}
      {Array.isArray(page.list?.listMembers) &&
        page.list.listMembers.length > 0 &&
        page.list.listMembers
          .filter((project) => assertValidProject(project))
          .map((project) => (
            <ProjectPreview key={project._id} project={project} />
          ))}
    </div>
  )
}
