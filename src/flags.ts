import { cache } from 'react'
import { flag } from 'flags/next'
import { checkGateCached } from '@/statsig'

export const getShowProjects = cache(
  flag({
    key: 'projects_display',
    decide: async () => await checkGateCached('projects_display'),
  }),
)

export const getShowNavigation = cache(
  flag({
    key: 'navigation',
    decide: async () => await checkGateCached('navigation'),
  }),
)
