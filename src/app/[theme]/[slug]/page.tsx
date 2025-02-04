import { getShowNavigation } from '@/flags'
import { sanityFetchCached, sanityPreload } from '@/sanity/lib/client'
import { PAGE_QUERYResult } from '@/sanity/types'
import { defineQuery, PortableText } from 'next-sanity'
import { notFound, redirect } from 'next/navigation'
import { ProjectPreview, assertValidProject } from '../Project'
import { Metadata } from 'next'

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  sanityPreload<PAGE_QUERYResult>(
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

  const page = await sanityFetchCached<PAGE_QUERYResult>(
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

  return {
    title: page?.title
      ? `${page.title} | Web development by Christopher Clemons`
      : 'Web development by Christopher Clemons',
  }
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

  sanityPreload<PAGE_QUERYResult>(
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

  const page = await sanityFetchCached<PAGE_QUERYResult>(
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
