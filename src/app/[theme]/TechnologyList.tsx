'use client'

import { useState } from 'react'

export function TechnologyList({ children }: { children: React.ReactNode[] }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (children.length <= 3)
    return <div className="flex gap-1 w-full flex-wrap">{children}</div>

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 w-full flex-wrap">
        {isExpanded ? children : children.slice(0, 3)}
      </div>
      {isExpanded ? (
        <button
          className="text-right sm:text-left hover:underline"
          onClick={() => setIsExpanded(false)}
        >
          Show less
        </button>
      ) : (
        <button
          className="text-right sm:text-left hover:underline text-sm"
          onClick={() => setIsExpanded(true)}
        >
          Show {children.length - 3} more
        </button>
      )}
    </div>
  )
}
