import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio for chrisclemons.com',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
