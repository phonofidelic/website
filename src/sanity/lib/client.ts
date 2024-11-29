import { createClient, defineQuery } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const PAGES_QUERY = defineQuery(
  `*[_type == "page"] | {..., list->{..., listMembers[]->{..., mainImage{..., asset->{...}}, technologies[]->{...}}}}`,
)
export const FEATURED_PROJECTS_QUERY =
  defineQuery(`*[_type == "projectsList" && _id == "45c3a012-4053-462a-847c-e0650a5e1092"][0] | {
    _id,
    listTitle,
    listMembers[]->{..., mainImage{..., asset->{...}}, technologies[]->{...}}
  }`)

export const ALL_PROJECTS_QUERY =
  defineQuery(`*[_type == "projectsList" && _id == "15a3c4ec-0d3b-428c-8a9f-f7d2d54ef7eb"][0] | {
    _id,
    listTitle,
    listMembers[]->{..., mainImage{..., asset->{...}}, technologies[]->{...}}
  }`)
