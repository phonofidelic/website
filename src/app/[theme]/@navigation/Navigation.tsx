'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

export function Navigation({
  header,
  children,
}: {
  header: React.ReactNode
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) {
        return
      }
      if (isMenuOpen && !event.composedPath().includes(containerRef.current)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', onClickOutside)

    return () => {
      document.removeEventListener('click', onClickOutside)
    }
  }, [isMenuOpen])

  return (
    <nav
      ref={containerRef}
      className="mb-8 bg-white dark:bg-zinc-900 sticky top-0 z-50 "
    >
      <button
        title="Menu"
        className="flex w-full justify-between pt-4"
        onClick={() => setIsMenuOpen((previous) => !previous)}
      >
        {header}
        <div
          className={clsx(
            'absolute right-0 top-[24px] px-2 transition-[height]',
            {
              'h-[64px]': isMenuOpen,
              'h-[24px]': !isMenuOpen,
            },
          )}
        >
          <div className="h-full grid grid-rows-auto gap-1.5 place-content-between">
            <div className="bg-zinc-800 dark:bg-white h-[3px] w-7 place-self-start" />
            <div className="bg-zinc-800 dark:bg-white h-[3px] w-7" />
            <div className="bg-zinc-800 dark:bg-white h-[3px] w-7" />
          </div>
        </div>
      </button>
      <div
        className={clsx(
          'absolute w-full transition-[height] *:delay-75 *:transition-opacity flex flex-col bg-white dark:bg-zinc-900 border-b-3 border-zinc-800 dark:border-white',
          {
            '*:opacity-100': isMenuOpen,
            'overflow-hidden *:opacity-0': !isMenuOpen,
          },
        )}
        style={{
          height: isMenuOpen ? (64 + 8) * 3 : '0px',
        }}
      >
        {children}
      </div>
    </nav>
  )
}
