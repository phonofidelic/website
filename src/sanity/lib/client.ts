import { cache } from 'react'
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const sanityFetchCached = cache(client.fetch.bind(client))
