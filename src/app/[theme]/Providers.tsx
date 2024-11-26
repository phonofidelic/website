'use client'

import { CookiesProvider } from 'react-cookie'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider
      defaultSetOptions={{
        maxAge: /* 1 year */ 1000 * 365 * 60 * 60 * 24,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NEXT_PUBLIC_ENV !== 'development',
      }}
    >
      {children}
    </CookiesProvider>
  )
}
