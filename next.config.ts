import type { NextConfig } from 'next'
import { withVercelToolbar } from '@vercel/toolbar/plugins/next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    after: true,
  },
}

export default withVercelToolbar()(nextConfig)
