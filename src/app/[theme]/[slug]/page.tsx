import { getShowNavigation } from '@/flags'
import { client } from '@/sanity/lib/client'
import { PAGE_QUERYResult, PAGE_SLUGS_QUERYResult, Slug } from '@/sanity/types'
import { defineQuery, PortableText } from 'next-sanity'
import { notFound, redirect } from 'next/navigation'
import { ProjectPreview, assertValidProject } from '../Project'

const PAGE_QUERY = defineQuery(
  `*[_type == "page" && slug.current == $slug] | {..., list->{..., listMembers[]->{..., categories[]->{'slug': slug.current}, mainImage{..., asset->{...}}, technologies[]->{...}}}}[0]`,
)

const assertValidPage = (
  page: NonNullable<PAGE_QUERYResult>,
): page is NonNullable<PAGE_QUERYResult> & {
  title: string
  slug: {
    current: string
  } | null
} => {
  return Boolean(
    page &&
      page.title &&
      (page.slug === null || (page.slug && page.slug.current)),
  )
}

const PAGE_SLUGS_QUERY = defineQuery(`*[_type == "page"] | {slug}`)

const assertValidPageSlug = (
  page: NonNullable<NonNullable<PAGE_SLUGS_QUERYResult>[number]>,
): page is NonNullable<NonNullable<PAGE_SLUGS_QUERYResult>[number]> & {
  slug: Slug
} => {
  return Boolean(page && page.slug && page.slug.current)
}

export const dynamicParams = false

export async function generateStaticParams() {
  const pageSlugsResult = await client.fetch<PAGE_SLUGS_QUERYResult>(
    PAGE_SLUGS_QUERY,
    {},
  )
  const pages = pageSlugsResult.filter(assertValidPageSlug)
  return pages.map((page) => ({
    slug: page.slug.current,
  }))
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
  const page = await client.fetch<PAGE_QUERYResult>(
    PAGE_QUERY,
    {
      slug,
    },
    {
      next: {
        tags: ['page', `page:${slug}`],
      },
    },
  )

  if (!page || !assertValidPage(page)) {
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
