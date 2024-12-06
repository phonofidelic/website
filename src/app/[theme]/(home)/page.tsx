import 'server-only'
import { Metadata } from 'next'
import { defineQuery } from 'next-sanity'
import { sanityFetchCached, sanityPreload } from '@/sanity/lib/client'
import {
  ALL_PROJECTS_QUERYResult,
  FEATURED_PROJECTS_QUERYResult,
} from '@/sanity/types'
import { getShowNavigation, getShowProjects } from '@/flags'
import { assertValidProject, ProjectPreview } from '../Project'

export const metadata: Metadata = {
  title: 'Home | Web development by Christopher Clemons',
  description:
    'Portfolio site exhibiting web development works by Christopher Clemons',
}

const FEATURED_PROJECTS_QUERY =
  defineQuery(`*[_type == "projectsList" && _id == "45c3a012-4053-462a-847c-e0650a5e1092"][0] | {
    _id,
    listTitle,
    listMembers[]->{..., categories[]->{'slug': slug.current}, mainImage{..., asset->{...}}, technologies[]->{...}}
  }`)

const ALL_PROJECTS_QUERY =
  defineQuery(`*[_type == "projectsList" && _id == "15a3c4ec-0d3b-428c-8a9f-f7d2d54ef7eb"][0] | {
    _id,
    listTitle,
    listMembers[]->{..., categories[]->{'slug': slug.current}, mainImage{..., asset->{...}}, technologies[]->{...}}
  }`)

export default async function Home() {
  const isNavigationEnabled = await getShowNavigation()

  const projectsFetchConfig = {
    next: {
      tags: ['projectsList'],
    },
  }

  if (isNavigationEnabled) {
    sanityPreload<FEATURED_PROJECTS_QUERYResult>(
      FEATURED_PROJECTS_QUERY,
      {},
      projectsFetchConfig,
    )
  } else {
    sanityPreload<ALL_PROJECTS_QUERYResult>(
      ALL_PROJECTS_QUERY,
      {},
      projectsFetchConfig,
    )
  }

  const featuredProjectsResult = isNavigationEnabled
    ? await sanityFetchCached<FEATURED_PROJECTS_QUERYResult>(
        FEATURED_PROJECTS_QUERY,
        {},
        projectsFetchConfig,
      )
    : await sanityFetchCached<ALL_PROJECTS_QUERYResult>(
        ALL_PROJECTS_QUERY,
        {},
        projectsFetchConfig,
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
