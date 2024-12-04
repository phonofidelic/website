import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Web development by Christopher Clemons',
    short_name: 'Christopher Clemons',
    description:
      'Portfolio site exhibiting web development works by Christopher Clemons',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
  }
}
