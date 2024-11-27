import { unstable_flag as flag } from '@vercel/flags/next'
import { checkGate } from '@/statsig'

export const getShowProjects = flag({
  key: 'projects_display',
  decide: async () => await checkGate('projects_display'),
})

export const getShowNavigation = flag({
  key: 'navigation',
  decide: async () => await checkGate('navigation'),
})
