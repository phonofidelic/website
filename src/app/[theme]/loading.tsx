import { ProjectPreviewSkeleton } from './Project'

export default function ThemeLoading() {
  return (
    <div className="flex flex-col gap-32 pt-16 px-2">
      <ProjectPreviewSkeleton />
      <ProjectPreviewSkeleton />
      <ProjectPreviewSkeleton />
      <ProjectPreviewSkeleton />
    </div>
  )
}
