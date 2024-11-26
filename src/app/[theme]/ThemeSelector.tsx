'use client'

import React, { useEffect } from 'react'
import { clsx } from 'clsx'
import { useCookies } from 'react-cookie'
import { MdOutlineLightMode } from 'react-icons/md'
import { MdOutlineDarkMode } from 'react-icons/md'
import { PiComputerTower } from 'react-icons/pi'

export function ThemeSelector() {
  const [cookies, setCookie, removeCookie] = useCookies(['theme'])

  const [selectedTheme, setSelectedTheme] = React.useState<
    'light' | 'dark' | undefined
  >(cookies.theme)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const onThemeChange = (event: MediaQueryListEvent) => {
      document.body.classList.toggle('dark', event.matches)
    }

    if (selectedTheme === undefined) {
      mediaQuery.addEventListener('change', onThemeChange)
      document.body.classList.toggle('dark', mediaQuery.matches)
    }

    return () => {
      if (selectedTheme === undefined) {
        mediaQuery.removeEventListener('change', onThemeChange)
      }
    }
  }, [selectedTheme])

  return (
    <div className="grid grid-cols-3 gap-2">
      <button
        title="Light theme"
        className={clsx(
          'group flex items-center justify-center gap-1 rounded-full aspect-square p-1 hover:bg-gray-100 dark:hover:bg-gray-800',
          {
            'border border-zinc-800 dark:border-zinc-400':
              selectedTheme === 'light',
          },
        )}
        onClick={() => {
          setSelectedTheme('light')
          // localStorage.setItem('theme', 'light')
          setCookie('theme', 'light')
          document.body.classList.remove('dark')
        }}
      >
        <MdOutlineLightMode />
      </button>
      <button
        title="System theme"
        className={clsx(
          'group flex items-center justify-center gap-1 rounded-full aspect-square p-1 hover:bg-gray-100 dark:hover:bg-gray-800',
          {
            'border border-zinc-800 dark:border-zinc-400':
              selectedTheme === undefined,
          },
        )}
        onClick={() => {
          // localStorage.removeItem('theme')
          removeCookie('theme')
          setSelectedTheme(undefined)
          document.body.classList.toggle(
            'dark',

            window.matchMedia('(prefers-color-scheme: dark)').matches,
          )
        }}
      >
        <PiComputerTower />
      </button>
      <button
        title="Dark theme"
        className={clsx(
          'group flex items-center justify-center gap-1 rounded-full aspect-square p-1 hover:bg-gray-100 dark:hover:bg-gray-800',
          {
            'border border-zinc-800 dark:border-zinc-400':
              selectedTheme === 'dark',
          },
        )}
        onClick={() => {
          // localStorage.setItem('theme', 'dark')
          setCookie('theme', 'dark')
          setSelectedTheme('dark')
          document.body.classList.toggle('dark', true)
        }}
      >
        <MdOutlineDarkMode />
      </button>
    </div>
  )
}

export function ClientOnly({
  fallback = null,
  children,
}: {
  fallback?: React.ReactNode
  children: React.ReactNode
}) {
  const [hasMounted, setHasMounted] = React.useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return fallback
  }

  return <>{children}</>
}
