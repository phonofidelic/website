import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    after: true,
  },
  eslint: {
    dirs: ['src', 'sanity'],
  },
}

export default nextConfig
