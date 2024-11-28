import { Metadata } from 'next'
import {
  ALL_PROJECTS_QUERY,
  client,
  FEATURED_PROJECTS_QUERY,
} from '@/sanity/lib/client'
import {
  ALL_PROJECTS_QUERYResult,
  FEATURED_PROJECTS_QUERYResult,
} from '@/sanity/types'
import { getShowNavigation, getShowProjects } from '@/flags'
import { assertValidProject, ProjectPreview } from './Project'

export const metadata: Metadata = {
  title: 'Home | Web development by Christopher Clemons',
  description:
    'Portfolio site exhibiting web development works by Christopher Clemons',
}

export default async function Home() {
  const isNavigationEnabled = await getShowNavigation()

  const featuredProjectsResult = isNavigationEnabled
    ? await client.fetch<FEATURED_PROJECTS_QUERYResult>(
        FEATURED_PROJECTS_QUERY,
        {},
        {
          next: {
            /** 30 seconds */
            revalidate: 30,
          },
        },
      )
    : await client.fetch<ALL_PROJECTS_QUERYResult>(
        ALL_PROJECTS_QUERY,
        {},
        {
          next: {
            /** 30 seconds */
            revalidate: 30,
          },
        },
      )

  const showProjects = await getShowProjects()

  if (!featuredProjectsResult) {
    return null
  }

  const { listMembers } = featuredProjectsResult

  return (
    showProjects &&
    Array.isArray(listMembers) &&
    listMembers.length > 0 && (
      <div className="flex flex-col gap-32 pt-16 px-2">
        {listMembers
          .filter((project) => assertValidProject(project))
          .map((project) => (
            <ProjectPreview key={project._id} project={project} />
          ))}
      </div>
    )
  )
}
