import { Metadata } from 'next'
import Image from 'next/image'
import { defineQuery, PortableText } from 'next-sanity'
import { VscCode } from 'react-icons/vsc'
import { client } from '../sanity/client'
import { IconType } from 'react-icons'
import { checkGate } from './statsig'

export const metadata: Metadata = {
  title: 'Home | Web development by Christopher Clemons',
  description:
    'Portfolio site exhibiting web development works by Christopher Clemons',
}

const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | {
      _id,
      title,
      body,
      technologies[]->{_id, name, description, icon, link}  
    } | order(order asc)`)

export default async function Home() {
  const projects = await client.fetch(
    PROJECTS_QUERY,
    {},
    {
      next: {
        revalidate: 30,
      },
    },
  )

  const showProjects = await checkGate('projects_display')

  return (
    <div className="w-full">
      <header className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="max-w-screen-md mx-auto flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div>
            <h1 className="text-4xl">Christopher Clemons</h1>
            <h2 className="text-2xl">(frontend web developer)</h2>
          </div>
          <div>
            New website is on the way. In the meantime, you can reach me on{' '}
            <a
              href="https://linkedin.com/in/christopher-clemons-89182aba"
              target="_blank"
              className="underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/phonofidelic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:hidden"
              aria-hidden
              src="/github.svg"
              alt="GitHub icon"
              width={24}
              height={24}
            />
            <Image
              className="hidden dark:block"
              aria-hidden
              src="/github-dark.svg"
              alt="GitHub icon"
              width={24}
              height={24}
            />
            GitHub
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://linkedin.com/in/christopher-clemons-89182aba"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:hidden"
              aria-hidden
              src="/linkedin.svg"
              alt="LinkedIn icon"
              width={24}
              height={24}
            />
            <Image
              className="hidden dark:block"
              aria-hidden
              src="/linkedin-dark.svg"
              alt="LinkedIn icon"
              width={24}
              height={24}
            />
            LinkedIn
          </a>
        </footer>
      </header>
      {showProjects && (
        <main className="flex w-full justify-center p-8 sm:p-20">
          <div className="max-w-screen-md w-full flex flex-col gap-2">
            {projects.map((project) => (
              <div key={project._id}>
                <h2 className="text-2xl">{project.title}</h2>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex gap-1">
                    <h3 className="">Technologies used:</h3>
                    {project.technologies?.map(({ _id, name, icon, link }) => (
                      <TechnologyPill
                        key={_id}
                        name={name}
                        icon={<TechnologyIcon icon={icon} />}
                        link={link}
                      />
                    ))}
                  </div>
                )}
                <div className="prose">
                  {Array.isArray(project.body) && (
                    <PortableText value={project.body} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  )
}

async function TechnologyPill({
  name,
  icon,
  link,
}: {
  name: string | null
  icon: React.ReactNode
  link: string | null
}) {
  const Wrapper = ({
    link,
    children,
  }: {
    link: string | null
    children: React.ReactNode
  }) =>
    link ? (
      <a href={link} target="_blank">
        {children}
      </a>
    ) : (
      <span>{children}</span>
    )

  return (
    <Wrapper link={link}>
      <div className="flex gap-1 items-center text-xs border border-zinc-800 dark:border-none dark:bg-zinc-800 rounded-s-full rounded-e-full w-fit p-1 pr-2">
        {icon} {name}
      </div>
    </Wrapper>
  )
}

async function TechnologyIcon({
  icon,
}: {
  icon: {
    importPath?: string | undefined
    componentName?: string | undefined
  } | null
}) {
  if (!icon) {
    return <VscCode />
  }

  const { importPath, componentName } = icon

  if (!importPath || !componentName) {
    return <VscCode />
  }

  try {
    // @ts-expect-error Not getting the correct type for imports
    const iconPackage: { [key: string]: IconType | undefined } =
      await getIconImport(importPath)

    const Icon = iconPackage[componentName]
    if (!Icon) {
      throw new Error(
        `Failed to import icon from react-icons/${importPath}/${componentName}`,
      )
    }
    return <Icon />
  } catch (error) {
    console.error(error)
    return <VscCode />
  }
}

const getIconImport = (moduleId: string) => {
  switch (moduleId) {
    case 'ci':
      return import('react-icons/ci')
    case 'fa':
      return import('react-icons/fa')
    case 'fa6':
      return import('react-icons/fa6')
    case 'io':
      return import('react-icons/io')
    case 'io5':
      return import('react-icons/io5')
    case 'md':
      return import('react-icons/md')
    case 'ti':
      return import('react-icons/ti')
    case 'go':
      return import('react-icons/go')
    case 'fi':
      return import('react-icons/fi')
    case 'lu':
      return import('react-icons/lu')
    case 'gi':
      return import('react-icons/gi')
    case 'wi':
      return import('react-icons/wi')
    case 'di':
      return import('react-icons/di')
    case 'ai':
      return import('react-icons/ai')
    case 'bs':
      return import('react-icons/bs')
    case 'ri':
      return import('react-icons/ri')
    case 'fc':
      return import('react-icons/fc')
    case 'gr':
      return import('react-icons/gr')
    case 'hi':
      return import('react-icons/hi')
    case 'hi2':
      return import('react-icons/hi2')
    case 'si':
      return import('react-icons/si')
    case 'sl':
      return import('react-icons/sl')
    case 'im':
      return import('react-icons/im')
    case 'bi':
      return import('react-icons/bi')
    case 'cg':
      return import('react-icons/cg')
    case 'vsc':
      return import('react-icons/vsc')
    case 'tb':
      return import('react-icons/tb')
    case 'tfi':
      return import('react-icons/tfi')
    case 'rx':
      return import('react-icons/rx')
    case 'pi':
      return import('react-icons/pi')
    case 'lia':
      return import('react-icons/lia')
    default:
      throw new Error(`Unknown icon package: ${moduleId}`)
  }
}
