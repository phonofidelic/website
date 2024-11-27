import Link from 'next/link'

export default function ThemeNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        {`Oops! The page you're looking for doesn't exist.`}
      </p>
      <Link href="/" className="group">
        <h2 className="text-xl pb-2 pt-4 px-2 sm:px-0 w-fit">
          {'<'} Head back home
          <span className="block mt-1 duration-300 max-w-0 group-hover:max-w-full opacity-0 group-hover:opacity-100 transition-all h-[3px] bg-zinc-800 dark:bg-white" />
        </h2>
      </Link>
    </div>
  )
}
