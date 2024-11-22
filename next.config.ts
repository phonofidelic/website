import type { NextConfig } from 'next'
import { withVercelToolbar } from '@vercel/toolbar/plugins/next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    after: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default withVercelToolbar()(nextConfig)
