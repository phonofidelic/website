import { cache } from 'react'
import { unstable_flag as flag } from '@vercel/flags/next'
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
