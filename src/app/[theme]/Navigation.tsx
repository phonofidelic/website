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
    const onClickOutsider = (event: MouseEvent) => {
      if (!containerRef.current) {
        return
      }
      if (isMenuOpen && !event.composedPath().includes(containerRef.current)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', onClickOutsider)

    return () => {
      document.removeEventListener('click', onClickOutsider)
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
        <div className="pt-[3px]">
          <div className="grid grid-rows-3 gap-1.5 pt-2 px-2">
            <div className="bg-zinc-800 dark:bg-white h-[3px] w-7" />
            <div className="bg-zinc-800 dark:bg-white h-[3px] w-7" />
            <div className="bg-zinc-800 dark:bg-white h-[3px] w-7" />
          </div>
        </div>
      </button>
      <div
        className={clsx(
          'absolute w-full transition-[height] *:delay-75 *:transition-opacity flex flex-col bg-white dark:bg-zinc-900 last:*:pb-4 border-b-3 border-zinc-800 dark:border-white',
          {
            '*:opacity-100': isMenuOpen,
            'overflow-hidden *:opacity-0': !isMenuOpen,
          },
        )}
        style={{
          height: isMenuOpen ? (64 + 8) * 3 : '0px',
        }}
        onClick={() => setIsMenuOpen(false)}
      >
        {children}
      </div>
    </nav>
  )
}
