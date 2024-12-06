export default function SlugNavigationLoading() {
  return (
    <div className="flex flex-col w-full gap-2 pt-4 mb-8">
      <div className="flex w-full h-[37px] items-center px-2 justify-between">
        <div className="h-9 w-[104px] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-sm" />
        <div className="h-full flex flex-col gap-[6px] justify-center">
          <div className="bg-zinc-200 dark:bg-zinc-800 animate-pulse h-[3px] w-7 place-self-start" />
          <div className="bg-zinc-200 dark:bg-zinc-800 animate-pulse h-[3px] w-7" />
          <div className="bg-zinc-200 dark:bg-zinc-800 animate-pulse h-[3px] w-7" />
        </div>
      </div>
      <div className="w-full h-[3px] bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
    </div>
  )
}
