import { ProjectPreviewSkeleton } from '../Project'

export default function SlugLoading() {
  return (
    <div className="pt-16 px-2">
      <div className="w-full h-20 sm:h-12 flex flex-col justify-around">
        <div className="block sm:hidden w-full h-4 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-sm" />
        <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-sm" />
        <div className="w-32 h-4 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-sm" />
      </div>
      <div className="flex flex-col gap-32 pt-16 px-2">
        <ProjectPreviewSkeleton />
        <ProjectPreviewSkeleton />
        <ProjectPreviewSkeleton />
        <ProjectPreviewSkeleton />
      </div>
    </div>
  )
}
