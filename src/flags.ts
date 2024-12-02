import { cache } from 'react'
import { unstable_flag as flag } from '@vercel/flags/next'
import { checkGate } from '@/statsig'

export const getShowProjects = cache(
  flag({
    key: 'projects_display',
    decide: async () => await checkGate('projects_display'),
  }),
)

export const getShowNavigation = cache(
  flag({
    key: 'navigation',
    decide: async () => await checkGate('navigation'),
  }),
)
