import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { getShowProjects } from '@/flags'

export default async function HomeHeader() {
  const showProjects = await getShowProjects()

  return (
    <header className="mb-20 w-full grid grid-rows-fr md:grid-rows-3 items-center h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 p-2 sm:px-20">
        <div className="flex flex-col gap-4 p-2">
          <h1 className="text-4xl max-w-xs">Christopher Clemons</h1>
          <h2 className="text-xl px-2">(Front-end web developer)</h2>
        </div>
        {showProjects ? (
          <div className="px-4">
            <p className="text-base">
              I use web technologies to build interactions between humans and
              computers.
            </p>
          </div>
        ) : (
          <div className="px-4">
            New website is on the way. In the meantime, you can reach me on{' '}
            <a
              href="https://linkedin.com/in/christopher-clemons-89182aba"
              target="_blank"
              className="underline"
            >
              LinkedIn
            </a>
          </div>
        )}
      </div>
      <div className="row-start-3 flex gap-6 w-full items-center justify-center p-2 sm:p-20 self-start">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/phonofidelic"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://linkedin.com/in/christopher-clemons-89182aba"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
          LinkedIn
        </a>
      </div>
    </header>
  )
}
